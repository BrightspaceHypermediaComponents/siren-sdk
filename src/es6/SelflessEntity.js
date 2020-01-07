'use strict';
import { EntitySirenProperties } from './EntitySirenProperties.js';

/**
 * Abstract Entity class to help create entity classes without self-links.
 * These entities are transient, and are not saved within the Entity Store.
 */
export class SelflessEntity extends EntitySirenProperties {
	/**
	 * Sets the parent object and setups the siren entity ready to be decoded by extending this class.
	 * @param {Object} sdkParentEntity Parent entity that is a Entity.
	 * @param {Object} entity A hypermedia siren entity as defined by [the siren specification]{@link https://github.com/kevinswiber/siren}
	 */
	constructor(sdkParentEntity, entity) {
		super();
		if (this.constructor === SelflessEntity) {
			throw new TypeError('Cannot construct Entity instances directly');
		}
		this._entity = entity;
		this._sdkParentEntity = sdkParentEntity;
	}
	/**
	 * Protected: Add a listener to a subentity of the this entity and gives ownership to parent entity.
	 * @param {*} entityType A entity class that extends this class.
	 * @param {*} href Href or Entity of the entity to be created
	 * @param {*} onChange callback function that accepts an {entityType} to be called when subentity changes.
	 */
	_subEntity(entityType, href, onChange) {
		this._sdkParentEntity._subEntity(entityType, href, onChange);
	}
}
