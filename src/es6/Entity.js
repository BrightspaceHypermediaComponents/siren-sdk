'use strict';
import { entityFactory, dispose } from './EntityFactory.js';

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
	/**
	 * Checks to see if the entity has className attached.
	 * @param {*} className Class name you want to see if the entity has attached to it.
	 */
	hasClass(className) {
		return this._entity && this._entity.hasClass(className);
	}
	/**
	 * Get the url assigned to this entity.
	 */
	self() {
		if (!this._entity || !this._entity.hasLinkByRel('self')) {
			return;
		}

		return this._entity.getLinkByRel('self').href;
	}
	/**
	 * Cleans up this entity by deleting the callbacks listeners stored in the entity store.
	 */
	dispose() {
		this._subEntities.forEach(entity => dispose(entity));
		this._listener.remove();
	}
	/**
	 * Get the action with an Action name that is attached to the entity
	 * @param {*} actionName Action name to get the action attached to the entity.
	 */
	getActionByName(actionName) {
		if (!this._entity || !this._entity.hasActionByName(actionName)) {
			return;
		}

		return this._entity.getActionByName(actionName);
	}

	/**
	 * Protected: Add a listener to a subentity of this entity.
	 * @param {*} entityType A entity class that extends this class.
	 * @param {*} href Href or Entity of the entity to be created
	 * @param {*} onChange callback function that accepts an {entityType} to be called when subentity changes.
	 */
	_subEntity(entityType, href, onChange) {
		// Clean up if that href has already been added.
		if (typeof href === 'string') {
			this._subEntityByHref(entityType, href, onChange);
		} else {
			this._subEntityByEntity(entityType, href, onChange);
		}
	}

	/**
	 * Protected: Add a listener to a subentity of this entity.
	 * @param {*} entityType A entity class that extends this class.
	 * @param {*} source Href of the entity to be created
	 * @param {*} onChange callback function that accepts an {entityType} to be called when subentity changes.
	 */
	_subEntityByHref(entityType, source, onChange) {
		// Clean up if that href has already been added.
		if (this._subEntities.has(source)) {
			dispose(this._subEntities.get(source));
		}
		entityFactory(entityType, source, this._token, (entity) => {
			this._subEntities.set(source, entity);
			onChange(entity);
		});
	}

	/**
	 * Protected: Add a listener to a subentity of this entity.
	 * @param {*} entityType A entity class that extends this class.
	 * @param {*} entity Entity that has already been fetched as a sub-entity. Requires either an href or a self link
	 * @param {*} onChange callback function that accepts an {entityType} to be called when subentity changes.
	 */
	_subEntityByEntity(entityType, entity, onChange) {
		if (entity.href) {
			return this._subEntityByHref(entityType, entity.href, onChange);
		} else if (!entity || !entity.hasLinkByRel('self')) {
			return;
		}

		const href = entity.getLinkByRel('self').href;

		// Clean up if that href has already been added.
		if (this._subEntities.has(href)) {
			dispose(this._subEntities.get(href));
		}
		entityFactory(entityType, href, this._token, (entity) => {
			this._subEntities.set(href, entity);
			onChange(entity);
		}, entity);
	}
}
