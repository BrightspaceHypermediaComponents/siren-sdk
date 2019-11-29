import 'd2l-fetch/d2l-fetch.js';
import 'd2l-polymer-siren-behaviors/store/entity-store.js';
import 'd2l-polymer-siren-behaviors/store/action-queue.js';
import SirenParse from 'siren-parser';

const _getSirenFields = function(action) {
	const url = new URL(action.href, window.location.origin);
	const fields = [];
	if (action.method === 'GET' || action.method === 'HEAD') {
		for (const param in url.searchParams.entries()) {
			fields.push({ name: param[0], value: param[1] });
		}
	}

	if (action.fields && action.fields.forEach) {
		action.fields.forEach(function(field) {
			if (field.value === undefined) {
				return;
			}
			// if the field is specified multiple times, assume it is intentional
			fields.push({ name: field.name, value: field.value });
		});
	}
	return fields;
};

const _getEntityUrl = function(action, fields) {
	if (!action) {
		return null;
	}

	let url = new URL(action.href, window.location.origin);

	fields = fields || _getSirenFields(action);
	if (action.method === 'GET' || action.method === 'HEAD') {
		const params = _createURLSearchParams(fields);
		url = new URL(url.pathname + '?' + params.toString(), url.origin);
	}

	return url;
};

const _createURLSearchParams = function(fields) {
	const sequence = [];
	for (let i = 0; i < fields.length; i++) {
		const field = fields[i];
		sequence.push([field.name, field.value]);
	}
	return new URLSearchParams(sequence);
};

const _createFormData = function(fields) {
	const formData = new FormData();
	for (let i = 0; i < fields.length; i++) {
		formData.append(fields[i].name, fields[i].value);
	}
	return formData;
};

const _appendHiddenFields = function(action, fields) {
	if (action.fields && action.fields.forEach) {
		action.fields.forEach(function(field) {
			if (field.type === 'hidden' && field.value !== undefined) {
				fields.push({ name: field.name, value: field.value });
			}
		});
	}
	return fields;
};

const _fetch = function(href, opts) {
	return window.d2lfetch.fetch(href, opts)
		.then(function(resp) {
			if (!resp.ok) {
				const errMsg = resp.statusText + ' response executing ' + opts.method + ' on ' + href + '.';
				return resp.json().then(function(data) {
					throw { json: data, message: errMsg };
				}, function(data) {
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
			return resp.json().then(function(body) {
				return {
					body: body,
					links: links
				};
			});
		});
};

const _performSirenAction = function(action, fields, tokenValue) {
	if (!action) {
		return Promise.reject(new Error('No action given'));
	}

	const headers = new Headers();
	tokenValue && headers.append('Authorization', 'Bearer ' + tokenValue);

	const url = _getEntityUrl(action, fields);

	let body;

	if (fields) {
		fields = _appendHiddenFields(action, fields);
	} else {
		fields = _getSirenFields(action);
	}

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
		.then(function(result) {
			const linkRequests = [];
			if (result.links) {
				result.links.forEach(function(link) {
					linkRequests.push(window.D2L.Siren.EntityStore.fetch(link.href, token, true));
				});
			}
			const entity = result.body ? SirenParse(result.body) : null;
			return Promise.all(linkRequests).then(function() {
				if (!entity) {
					return window.D2L.Siren.EntityStore.remove(url.href, token);
				}
				return window.D2L.Siren.EntityStore.update(url.href, token, entity);
			});
		});
};

export const performSirenAction = function(token, action, fields, immediate) {
	return window.D2L.Siren.EntityStore.getToken(token)
		.then(function(resolved) {
			const tokenValue = resolved.tokenValue;
			return !immediate ? window.D2L.Siren.ActionQueue.enqueue(function() {
				return _performSirenAction(action, fields, tokenValue);
			}) : _performSirenAction(action, fields, tokenValue);
		});
};
