import 'd2l-fetch/d2l-fetch.js';
import 'd2l-polymer-siren-behaviors/store/entity-store.js';
import SirenParse from 'siren-parser';

export const SirenFetchMixinLit = superclass => class extends superclass {

	getSirenFields(action) {
		const url = new URL(action.href, window.location.origin);
		const fields = [];
		if (action.method === 'GET' || action.method === 'HEAD') {
			for (const param in url.searchParams.entries()) {
				fields.push({ name: param[0], value: param[1] });
			}
			// Disable URLSearchParams until they are fully supported (i.e. Edge)
			/*
			} else if (window.URLSearchParams && action.type === 'application/x-www-form-urlencoded') {
				fields = new URLSearchParams();
			*/
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
	}

	getEntityUrl(action, fields) {
		if (!action) {
			return null;
		}

		let url = new URL(action.href, window.location.origin);

		fields = fields || this.getSirenFields(action);
		if (action.method === 'GET' || action.method === 'HEAD') {
			const params = this._createURLSearchParams(fields);
			url = new URL(url.pathname + '?' + params.toString(), url.origin);
		}

		return url;
	}

	_createURLSearchParams(fields) {
		const sequence = [];
		for (let i = 0; i < fields.length; i++) {
			const field = fields[i];
			sequence.push([field.name, field.value]);
		}
		return new URLSearchParams(sequence);
	}

	_createFormData(fields) {
		const formData = new FormData();
		for (let i = 0; i < fields.length; i++) {
			formData.append(fields[i].name, fields[i].value);
		}
		return formData;
	}

	_appendHiddenFields(action, fields) {
		if (action.fields && action.fields.forEach) {
			action.fields.forEach(function(field) {
				if (field.type === 'hidden' && field.value !== undefined) {
					fields.push({ name: field.name, value: field.value });
				}
			});
		}
		return fields;
	}

	_fetch(href, opts) {
		const methodTypes = ['POST', 'PUT', 'DELETE', 'PATCH'];
		const sendSaveEvent = methodTypes.indexOf(opts.method) !== -1;
		const self = this;

		if (sendSaveEvent) {
			self.dispatchEvent(new CustomEvent('d2l-siren-entity-save-start'));
		}
		return window.d2lfetch.fetch(href, opts)
			.then(function(resp) {
				if (sendSaveEvent && resp.ok) {
					self.dispatchEvent(new CustomEvent('d2l-siren-entity-save-end'));
				}
				return resp;
			})
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
			})
			.catch(function(reason) {
				self.dispatchEvent(new CustomEvent('d2l-siren-entity-save-error', { error: reason }));
				throw reason;
			});
	}

	_performSirenAction(action, fields, tokenValue) {
		if (!action) {
			return Promise.reject(new Error('No action given'));
		}

		const headers = new Headers();
		tokenValue && headers.append('Authorization', 'Bearer ' + tokenValue);

		const url = this.getEntityUrl(action, fields);

		let body;

		if (fields) {
			fields = this._appendHiddenFields(action, fields);
		} else {
			fields = this.getSirenFields(action);
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
			body = this._createFormData(fields);
		}

		const token = tokenValue;

		return this._fetch(url.href, {
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
				const entity = SirenParse(result.body);
				return Promise.all(linkRequests).then(function() {
					return window.D2L.Siren.EntityStore.update(url.href, token, entity);
				});
			});
	}

	performSirenAction(action, fields, immediate) {
		const self = this;
		return window.D2L.Siren.EntityStore.getToken(this.token)
			.then(function(resolved) {
				const tokenValue = resolved.tokenValue;
				return !immediate ? window.D2L.Siren.ActionQueue.enqueue(function() {
					return self._performSirenAction(action, fields, tokenValue);
				}) : self._performSirenAction(action, fields, tokenValue);
			});
	}
};
