'use strict';
import { entityFactory, dispose } from './EntityFactory.js.js';

/**
 * Abstract Entity class to help create entity classes.
 */
export class Entity {
	/**
	 * Primes the object used by the entityFactory. Should never be called outside.
	 * @param {Object} entity A hypermedia siren entity as defined by [the siren specification]{@link https://github.com/kevinswiber/siren}
	 * @param {String|Function|null} token JWT Token for brightspace | a function that returns a JWT token for brightspace | null (defaults to cookie authentication in a browser)
	 * @param {Function} listener Listener helper class
	 */
	constructor(entity, token, listener) {
		if (this.constructor === Entity) {
			throw new TypeError('Cannot construct Entity instances directly');
		}
		this._entity = entity;
		this._subEntities = new Map();
		this._token = token;
		this._listener = listener;
	}

	hasClass(className) {
		return this._entity.hasClass(className);
	}

	/**
	 * Cleans up this entity by deleting the callbacks listeners stored in the entity store.
	 */
	dispose() {
		this._subEntities.forEach(entity => dispose(entity));
		this._listener.remove();
	}

	/**
	 * Protected: Add a listener to a subentity of this entity.
	 * @param {*} entityType A entity class that extends this class.
	 * @param {*} href Href of the entity to be created
	 * @param {*} onChange callback function that accepts an {entityType} to be called when subentity changes.
	 */
	_subEntity(entityType, href, onChange) {
		// Clean up if that href has already been added.
		if (this._subEntities.has(href)) {
			dispose(this._subEntities.get(href));
		}
		entityFactory(entityType, href, this._token, (entity) => {
			this._subEntities.set(href, entity);
			onChange(entity);
		});
	}
}
