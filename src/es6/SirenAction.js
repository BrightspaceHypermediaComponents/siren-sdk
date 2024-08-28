import 'd2l-fetch/d2l-fetch.js';
import 'd2l-polymer-siren-behaviors/store/entity-store.js';
import 'd2l-polymer-siren-behaviors/store/action-queue.js';
import SirenParse from 'siren-parser';

/**
 * @typedef {import('siren-parser').Action} Action
 * @typedef {import('siren-parser').Field} Field
 * @typedef {import('siren-parser').Entity} ParsedEntity
 * @typedef {{ name: string; value: string }} FieldOverride
 */

/**
 * @param {Action} action
 * @returns {FieldOverride[]}
 */
const _getSirenFields = function(action) {
	const url = new URL(action.href, window.location.origin);
	const fields = [];
	if (action.method === 'GET' || action.method === 'HEAD') {
		for (const param in url.searchParams.entries()) {
			fields.push({ name: param[0], value: param[1] });
		}
	}

	if (action.fields && action.fields.forEach) {
		action.fields.forEach((field) => {
			if (field.value === undefined) {
				return;
			}
			// if the field is specified multiple times, assume it is intentional
			fields.push({ name: field.name, value: field.value });
		});
	}
	return fields;
};

/**
 * @param {FieldOverride[]} fields
 * @returns {URLSearchParams}
 */
const _createURLSearchParams = function(fields) {
	const sequence = [];
	for (let i = 0; i < fields.length; i++) {
		const field = fields[i];
		sequence.push([field.name, field.value]);
	}
	return new URLSearchParams(sequence);
};

/**
 * @param {Action} action
 * @param {FieldOverride[]} fields
 * @returns {URL}
 */
const _getEntityUrl = function(action, fields) {
	if (!action) {
		return null;
	}

	let url = new URL(action.href, window.location.origin);
	if (action.method === 'GET' || action.method === 'HEAD') {
		const params = _createURLSearchParams(fields);
		url = new URL(`${url.pathname}?${params.toString()}`, url.origin);
	}

	return url;
};

const _createFormData = function(fields) {
	const formData = new FormData();
	for (let i = 0; i < fields.length; i++) {
		formData.append(fields[i].name, fields[i].value);
	}
	return formData;
};

/**
 * @param {Action} action
 * @param {FieldOverride[]} fields
 * @returns {FieldOverride[]}
 */
const _appendHiddenFields = function(action, fields) {
	if (action.fields && action.fields.forEach) {
		action.fields.forEach((field) => {
			if (field.type === 'hidden' && field.value !== undefined) {
				fields.push({ name: field.name, value: field.value });
			}
		});
	}
	return fields;
};

const _fetch = function(href, opts) {
	return window.d2lfetch.fetch(href, opts)
		.then((resp) => {
			if (!resp.ok) {
				const errMsg = `${resp.statusText} response executing ${opts.method} on ${href}.`;
				return resp.json().then((data) => {
					throw { json: data, message: errMsg };
				}, (data) => {
					throw { string: data, message: errMsg };
				});
			}
			const linkHeader = resp.headers ? resp.headers.get('Link') : null;
			let links;
			if (linkHeader) {
				links = window.D2L.Siren.EntityStore.parseLinkHeader(linkHeader);
			}
			if (resp.status === 204) {
				return {
					body: null,
					links: links
				};
			}
			return resp.json().then((body) => {
				return {
					body: body,
					links: links
				};
			});
		});
};

const _performSirenAction = function(action, fields, tokenValue, bypassCache) {
	if (!action) {
		return Promise.reject(new Error('No action given'));
	}

	const headers = new Headers();
	tokenValue && headers.append('Authorization', `Bearer ${tokenValue}`);

	if (bypassCache) {
		headers.append('pragma', 'no-cache');
		headers.append('cache-control', 'no-cache');
	}
	let body;

	if (fields) {
		_appendHiddenFields(action, fields);
	} else {
		fields = _getSirenFields(action);
	}

	const url = _getEntityUrl(action, fields);

	if (action.type.indexOf('json') !== -1) {
		const json = {};
		for (let i = 0; i < fields.length; i++) {
			const field = fields[i];
			json[field.name] = field.value;
		}
		headers.set('Content-Type', action.type);
		body = JSON.stringify(json);
	} else if (action.method !== 'GET' && action.method !== 'HEAD') {
		body = _createFormData(fields);
	}

	const token = tokenValue;

	return _fetch(url.href, {
		method: action.method,
		body: body,
		headers: headers
	})
		.then((result) => {
			const linkRequests = [];
			if (result.links) {
				result.links.forEach((link) => {
					linkRequests.push(window.D2L.Siren.EntityStore.fetch(link.href, token, true));
				});
			}
			const entity = result.body ? SirenParse(result.body) : null;
			return Promise.all(linkRequests).then(() => {
				if (!entity) {
					return window.D2L.Siren.EntityStore.remove(url.href, token);
				}
				const selfLink = entity.getLinkByRel('self');
				if (selfLink && selfLink.href !== url.href) {
					return window.D2L.Siren.EntityStore.update(selfLink.href, token, entity);
				}
				return window.D2L.Siren.EntityStore.update(url.href, token, entity);
			});
		});
};

const _combineActions = function(actionsAndFields) {
	if (!actionsAndFields) return [];

	// The structure of this is a map (hrefs) containing a map (methods) containing a map (fields)
	const hrefsMap = new Map();

	actionsAndFields.forEach(actionAndField => {
		if (!actionAndField || !actionAndField.action) return;
		const href = actionAndField.action.href;
		const method = actionAndField.action.method;
		if (!href || !method) return;

		const methodsMap = hrefsMap.get(href) || new Map();
		const fieldsMap = methodsMap.get(method) || new Map();

		let fields;
		if (actionAndField.fields) {
			fields = _appendHiddenFields(actionAndField.action, actionAndField.fields);
		} else {
			fields = _getSirenFields(actionAndField.action);
		}
		fields.forEach(field => fieldsMap.set(field.name, field.value));

		methodsMap.set(method, fieldsMap);
		hrefsMap.set(href, methodsMap);
	});

	const combinedActions = [];
	for (const [href, methodsMap] of hrefsMap.entries()) {
		for (const [method, fieldsMap] of methodsMap) {
			const fields = [];
			for (const [fieldName, fieldValue] of fieldsMap) {
				fields.push({ name: fieldName, value: fieldValue });
			}
			const action = { href, method, fields, type: 'application/x-www-form-urlencoded' };
			combinedActions.push(action);
		}
	}

	return combinedActions;
};

/**
 * Combines actions that share the same action href and method into one action.
 * Then executes list of combined actions. Performing siren actions immediately not supported.
 *
 * @param {string|Function} token
 * @param {{ action: Action, fields: FieldOverride[] }[]} actionsAndFields
 * @returns {ParsedEntity[]>}
 */
export const performSirenActions = function(token, actionsAndFields) {
	if (!actionsAndFields || !actionsAndFields.length) return;
	const combinedActions = _combineActions(actionsAndFields);

	return window.D2L.Siren.EntityStore.getToken(token)
		.then((resolved) => {
			const tokenValue = resolved.tokenValue;
			const actionPromises = combinedActions.map(action => {
				return window.D2L.Siren.ActionQueue.enqueue(() => {
					return _performSirenAction(action, null, tokenValue);
				});
			});
			return Promise.all(actionPromises);
		});
};

/**
 * @param {string|Function} token
 * @param {Action} action
 * @param {FieldOverride[]} fields
 * @param {boolean} [immediate]
 * @param {boolean} [bypassCache]
 * @returns {Promise<ParsedEntity>}
 */
export const performSirenAction = function(token, action, fields, immediate, bypassCache) {
	return window.D2L.Siren.EntityStore.getToken(token)
		.then((resolved) => {
			const tokenValue = resolved.tokenValue;
			return !immediate ? window.D2L.Siren.ActionQueue.enqueue(() => {
				return _performSirenAction(action, fields, tokenValue, bypassCache);
			}) : _performSirenAction(action, fields, tokenValue, bypassCache);
		});
};

/**
 * @param {string|Function} token
 * @param {() => Action} actionFactory
 * @param {FieldOverride[]} fieldOverrides
 * @param {boolean} [bypassCache]
 * @returns {Promise<ParsedEntity>}
 */
export const performLazySirenAction = function(token, actionFactory, fieldOverrides, bypassCache) {
	fieldOverrides = fieldOverrides || {};
	return window.D2L.Siren.EntityStore.getToken(token).then(
		resolved => window.D2L.Siren.ActionQueue.enqueue(() => {
			const action = actionFactory();
			if (!action) return;

			const fields = [];
			(action.fields || []).forEach(actionField => {
				const valueOverride = fieldOverrides[actionField.name];
				fields.push({
					name: actionField.name,
					value: valueOverride !== undefined ? valueOverride : actionField.value
				});
			});

			return _performSirenAction(action, fields, resolved.tokenValue, bypassCache);
		})
	);
};

export const getEntityUrl = _getEntityUrl;
export const appendHiddenFields = _appendHiddenFields;
export const getSirenFields = _getSirenFields;
