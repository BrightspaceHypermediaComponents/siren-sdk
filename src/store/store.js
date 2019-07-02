'use strict';
import 'd2l-fetch/d2l-fetch.js';
import SirenParse from 'siren-parser';
import { getToken } from './token.js';

class EntityStore {
	constructor(fetch) {
		this._listeners = new Map();
		this._entities = new Map();
		this._d2lfetch = fetch;
	}

	get(entityId, token) {
		const lowerCaseEntityId = entityId.toLowerCase();
		return this._entities.has(token.toString()) && this._entities.get(token.toString()).has(lowerCaseEntityId) && this._entities.get(token.toString()).get(lowerCaseEntityId);
	}

	addListener(entityId, token, listener) {
		if (!entityId || !token.toString || typeof listener !== 'function') {
			return;
		}

		const registrations = this._initContainer(this._listeners, entityId, token, new Map());
		if (!registrations.has(listener)) {
			registrations.set(listener, new Set());
		}
		registrations.get(listener).add(token);

		return () => this.removeListener(entityId, token, listener);
	}

	removeListener(entityId, token, listener) {
		if (!entityId || token.toString || typeof listener !== 'function' || !this._listeners) {
			return;
		}

		const registrations = this._initContainer(this._listeners, entityId, token, new Map());
		const tokenValues = registrations.get(listener);
		if (!tokenValues) {
			return;
		}

		// try to remove this specific registration, since a listener could be
		// registered with multiple tokens (hopefully temporarily) despite sharing the same
		// cache key (which is an internal detail)
		if (!tokenValues.delete(token)) {
			// we weren't aware of this particularly tokenValue for this listener, so
			// assuemedly the component called removeListener directly with its latest
			// values instead of the "removeListener" function returned by addListener.
			// component is probably unregistering, so remove the listener entirely
			registrations.delete(listener);
			return;
		}

		// no registrations left for this listener, remove it from the list
		if (tokenValues.size === 0) {
			registrations.delete(listener);
			return;
		}
	}

	async fetch(entityId, token, bypassCache) {
		this._initContainer(this._entities, entityId, token);
		let entity = this.get(entityId, token);
		if (entity && !bypassCache) {
			return entity.entity;
		}

		this._setFetchingState(entityId, token);

		const headers = new Headers();
		token.value && headers.set('Authorization', 'Bearer ' + token.value);

		if (bypassCache) {
			headers.set('pragma', 'no-cache');
			headers.set('cache-control', 'no-cache');
		}

		try {
			const response = await this._d2lfetch.fetch(entityId, { headers });
			if (!response.ok) {
				throw response.status;
			}
			await this._handleCachePriming(token, response);
			const json = await response.json();
			entity = await SirenParse(json);

			return this.update(entityId, token, entity);
		} catch (err) {
			return this.setError(entityId, token, err);
		}
	}

	update(entityId, token, entity) {
		const entityStatus = {
			status: '',
			entity
		};
		const lowerCaseEntityId = entityId.toLowerCase();
		const tokenCache = token.toString();
		this._initContainer(this._entities, entityId, token);
		this._entities.get(tokenCache).set(lowerCaseEntityId, entityStatus);

		this.notify(entityId, token);
		return entity;
	}

	notify(entityId, token) {
		const lowerCaseEntityId = entityId.toLowerCase();
		const tokenCache = token.toString();
		const listeners = (this._listeners.get(tokenCache) && this._listeners.get(tokenCache).get(lowerCaseEntityId)) || [];
		const entity = this.get(entityId, tokenCache);

		listeners.forEach((_, listener) => {
			listener(entity.entity);
		});
	}

	notifyError(entityId, token, error) {
		const lowerCaseEntityId = entityId.toLowerCase();
		const tokenCache = token.toString();
		const listeners = (this._listeners.get(tokenCache) && this._listeners.get(tokenCache).get(lowerCaseEntityId)) || [];

		listeners.forEach((_, listener) => {
			listener(null, error);
		});
	}

	setError(entityId, token, error) {
		const lowerCaseEntityId = entityId.toLowerCase();
		const tokenCache = token.toString();
		this._entities.get(tokenCache).set(lowerCaseEntityId, {
			status: 'error',
			entity: null,
			error: error,
			request: null
		});
		this.notifyError(entityId, token, error);
	}

	_setFetchingState(entityId, token) {
		const lowerCaseEntityId = entityId.toLowerCase();
		const tokenCache = token.toString();
		this._entities.get(tokenCache).set(lowerCaseEntityId, {
			status: 'fetching',
			entity: null
		});
	}

	_initContainer(map, entityId, token, init) {
		const lowerCaseEntityId = entityId.toLowerCase();
		const tokenCache = token.toString();
		if (!map.has(tokenCache)) {
			map.set(tokenCache, new Map());
		}
		const entityMap = map.get(tokenCache);
		if (init && !entityMap.has(lowerCaseEntityId)) {
			entityMap.set(lowerCaseEntityId, init);
		}
		return entityMap.get(lowerCaseEntityId);
	}

	async _handleCachePriming(token, response) {
		const linkHeaderValues = response.headers && response.headers.get('Link');
		if (!linkHeaderValues) {
			return;
		}

		const cachePrimers = this._parseLinkHeader(linkHeaderValues)
			.filter(function(link) {
				return link.rel.indexOf('https://api.brightspace.com/rels/cache-primer') !== -1;
			});

		if (cachePrimers.length === 0) {
			return;
		}

		await Promise.all(cachePrimers.map((cachePrimer) => {
			return this.fetch(cachePrimer.href, token, true);
		}));
	}

	// parse a Link header
	//
	// Link:<https://example.org/.meta>; rel=meta
	//
	// var r = parseLinkHeader(xhr.getResponseHeader('Link');
	// r['meta'] outputs https://example.org/.meta
	//
	_parseLinkHeader(links) {
		const linkexp = /<[^>]*>\s*(\s*;\s*[^\(\)<>@,;:"\/\[\]\?={} \t]+=(([^\(\)<>@,;:"\/\[\]\?={} \t]+)|("[^"]*")))*(,|$)/g; // eslint-disable-line no-useless-escape
		const paramexp = /[^\(\)<>@,;:"\/\[\]\?={} \t]+=(([^\(\)<>@,;:"\/\[\]\?={} \t]+)|("[^"]*"))/g; // eslint-disable-line no-useless-escape

		const matches = links.match(linkexp);
		const _links = [];
		for (let i = 0; i < matches.length; i++) {
			const split = matches[i].split('>');
			const href = split[0].substring(1);
			_links.push({
				href
			});
			const ps = split[1];
			const s = ps.match(paramexp);
			for (let j = 0; j < s.length; j++) {
				const p = s[j];
				const paramsplit = p.split('=');
				const name = paramsplit[0];
				const val = paramsplit[1].replace(/["']/g, '');
				if (name === 'rel') {
					const relsplit = val.split(' ');
					_links[i][name] = relsplit;
				} else {
					_links[i][name] = val;
				}
			}
		}
		return _links;
	}
}

window.D2L = window.D2L || {};
window.D2L.SirenSdk = window.D2L.SirenSdk || {};
window.D2L.SirenSdk.EntityStore = window.D2L.SirenSdk.EntityStore || new EntityStore(window.d2lfetch);

export async function fetch(entityIds, token, bypassCache) {
	entityIds = Array.isArray(entityIds) ? entityIds : [entityIds];
	const tokenResolved = await getToken(token);

	const responses = [];
	entityIds.forEach((entityId) => {
		responses.push(window.D2L.SirenSdk.EntityStore.fetch(entityId, tokenResolved, bypassCache));
	});

	await Promise.all(responses);
}

export async function get(entityId, token) {
	const tokenResolved = await getToken(token);
	const entityStatus = window.D2L.SirenSdk.EntityStore.get(entityId, tokenResolved);
	return entityStatus && entityStatus.entity;
}

export async function update(entityId, token, entity) {
	const tokenResolved = await getToken(token);
	const entityStatus = window.D2L.SirenSdk.EntityStore.update(entityId, tokenResolved, entity);
	return entityStatus && entityStatus.entity;
}

export async function notify(entityIds, token) {
	entityIds = Array.isArray(entityIds) ? entityIds : [entityIds];
	const tokenResolved = await getToken(token);
	entityIds.forEach((entityId) => {
		window.D2L.SirenSdk.EntityStore.notify(entityId, tokenResolved);
	});
}

export async function addListener(entityId, token, listner) {
	const tokenResolved = await getToken(token);
	return window.D2L.SirenSdk.EntityStore.addListener(entityId, tokenResolved, listner);
}

export async function removeListner(entityId, token, listner) {
	const tokenResolved = await getToken(token);
	return window.D2L.SirenSdk.EntityStore.removeListener(entityId, tokenResolved, listner);
}
