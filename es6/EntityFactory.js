'use strict';

import 'd2l-polymer-siren-behaviors/store/entity-store.js';

/**
 * This creates and fetch a new entity. Whenever the entity changes onChange is called.
 * @param {Function} entityType The type of the entity. For example OrganizationEntity
 * @param {String} href Href of the entity to be created
 * @param {String|Token|Null} token JWT Token for brightspace | a function that returns a JWT token for brightspace | null (defaults to cookie authentication in a browser)
 * @param {Function} onChange Callback function that accepts an {entityType} to be called when entity changes.
 */
export function entityFactory(entityType, href, token, onChange) {
	const entityListener = new EntityListener();
	const onChangeWrapped = (entity) => {
		const entityWrapped = new entityType(entity, token, entityListener);
		onChange(entityWrapped);
	};

	// This add the listener then calls the fetch.
	entityListener.add(href, token, onChangeWrapped);
}

/**
 * Some times the entity doesn't exists so this allows the cleanup code to be cleaner.
 * @param {Object|Null} entity Object that is of an Entity type.
 */
export function dispose(entity) {
	entity && entity.decompose && entity.dispose();
}

/** Allows one to manage the event store listeners. Makes it easy to update, add and remove a listener for the entity store. */
class EntityListener {
	constructor() {
		this._href;
		this._token;
		this._onChange;
	}

	add(href, token, onChange) {
		if (!this._validate(href, token, onChange)) {
			return;
		}

		this._href = href;
		this._token = token;
		this._onChange = onChange;

		window.D2L.Siren.EntityStore.addListener(this._href, this._token, this._onChange);
		window.D2L.Siren.EntityStore.fetch(href, token);
	}

	update(href, token, onChange) {
		if (href === this._href || token === this._token || onChange === this._onChange) {
			return;
		}
		this._removeListener();
		this._addListener(href, token, onChange);
	}

	remove() {
		if (!this._validate(this._href, this._token, this._onChange)) {
			return;
		}
		window.D2L.Siren.EntityStore.removeListener(this._href, this._token, this._listener);
	}

	_validate(href, token, onChange) {
		// token can be empty.
		return href && typeof onChange === 'function';
	}
}
