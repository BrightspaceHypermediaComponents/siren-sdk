import { Entity } from '../es6/Entity';

/**
 * RestrictedEntity class representation of restricted extensions
 */
export class RestrictedEntity extends Entity {

	/**
	 * @returns {object} Returns the list of restricted extensions
	 */
	extensions() {
		return this._entity && this._entity.properties && this._entity.properties.extensions;
	}
}
