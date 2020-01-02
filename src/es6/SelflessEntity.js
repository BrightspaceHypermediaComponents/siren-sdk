'use strict';
import { entityFactory, dispose, updateEntity } from './EntityFactory.js';

/**
 * Abstract Entity class to help create entity classes.
 */
export class SelflessEntity {
	/**
	 * Primes the object used by the entityFactory. Should never be called outside.
	 * @param {Object} sdkParentEntity Parent entity that is a Entity.
	 * @param {Object} entity A hypermedia siren entity as defined by [the siren specification]{@link https://github.com/kevinswiber/siren}
	 */
	constructor(sdkParentEntity, entity) {
		if (this.constructor === SelflessEntity) {
			throw new TypeError('Cannot construct Entity instances directly');
		}
		this._entity = entity;
		this._sdkParentEntity = sdkParentEntity;
	}
	/**
	 * Checks to see if the entity has className attached.
	 * @param {*} className Class name you want to see if the entity has attached to it.
	 */
	hasClass(className) {
		return this._entity && this._entity.hasClass(className);
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
		this._sdkParentEntity._subEntity(entityType, href, onChange);
	}
}
