'use strict';

import { fetch, get, addListener, update } from '../store/store.js';

/**
 * This creates and fetch a new entity. Whenever the entity changes onChange is called.
 * @param {Function} entityType The type of the entity. For example OrganizationEntity
 * @param {String} href Href of the entity to be created
 * @param {String|Token|Null} token JWT Token for brightspace | a function that returns a JWT token for brightspace | null (defaults to cookie authentication in a browser)
 * @param {Function} onChange Callback function that accepts an {entityType} to be called when entity changes.
 * @param {Object} entity (Optional) Entity that has already been fetched.
 */
export async function entityFactory(entityType, href, token, onChange, entity) {
	const entityListener = new EntityListener();
	const onChangeWrapped = (entity) => {
		const entityWrapped = new entityType(entity, token, entityListener);
		onChange(entityWrapped);
	};

	// This add the listener then calls the fetch.
	await entityListener.add(href, token, onChangeWrapped, entity);
}

export function updateEntity(href, token) {
	window.D2L.Siren.EntityStore.fetch(href, token, true);
}

/**
 * Some times the entity doesn't exists so this allows the cleanup code to be cleaner.
 * @param {Object|Null} entity Object that is of an Entity type.
 */
export function dispose(entity) {
	entity && entity.dispose && entity.dispose();
}

/** Allows one to manage the event store listeners. Makes it easy to update, add and remove a listener for the entity store. */
class EntityListener {
	constructor() {
		this._href;
		this._token;
		this._onChange;
		this._removeListener;
	}

	async add(href, token, onChange, entity) {
		if (!this._validate(href, onChange, entity)) {
			return;
		}

		this._href = href;
		this._token = token;
		this._onChange = onChange;

		this._removeListener = await addListener(this._href, this._token, this._onChange);
		const storedEntity = await get(this._href, this._token);

		if (storedEntity) {
			this._onChange(storedEntity);
			return;
		}

		if (entity) {
			await update(href, token, entity);
		} else {
			await fetch(href, token);
		}
	}

	update(href, token, onChange, entity) {
		if (href === this._href || token === this._token || onChange === this._onChange) {
			return;
		}
		this._removeListener();
		this._addListener(href, token, onChange, entity);
	}

	remove() {
		this._removeListener && this._removeListener();
	}

	_validate(href, onChange, entity) {
		const entityIsGood = !entity || (entity.hasLinkByRel('self')  && entity.getLinkByRel('self').href === href);

		// token can be empty.
		return href && typeof onChange === 'function' && entityIsGood;
	}
}
