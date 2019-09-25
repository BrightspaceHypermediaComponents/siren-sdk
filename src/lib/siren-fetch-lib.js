import 'd2l-fetch/d2l-fetch.js';

export class SirenFetchLib {
	callUrl(url, method, body, jsonContent = false) {
		var headersObject = {
			accept: 'application/vnd.siren+json',
		};
		if (jsonContent) {
			headersObject['content-type'] = 'application/json';
		}
		var requestObject = {
			headers: new Headers(headersObject),
			method: method || 'GET',
		};
		if (body) {
			requestObject.body = body;
		}

		requestObject.headers = new Headers(headersObject);
		var request = new Request(url, requestObject);
		return window.d2lfetch.fetch(request);
	}

	callAction(action, fields) {
		var body = {};
		if (fields) {
			fields.forEach(function(field) {
				if (field.value !== undefined) {
					body[field.name] = field.value;
				}
			});
		}
		if (action.fields) {
			action.fields.forEach(function(field) {
				if (field.value !== undefined && !(field.name in body)) {
					body[field.name] = field.value;
				}
			});
		}
		var formBody = new FormData();
		for (var key in body) {
			if (!body.hasOwnProperty(key)) continue;
			formBody.append(key, body[key]);
		}
		return this.callUrl(action.href, action.method, formBody);
	}
}
