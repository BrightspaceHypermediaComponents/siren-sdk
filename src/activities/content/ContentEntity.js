import { Entity } from '../../es6/Entity';

/**
 * ContentEntity class representation of a d2l content entity.
 */
export class ContentEntity extends Entity {
	/**
	 * @returns {string} Name of the assignment
	 */
	name() {
		return this._entity && this._entity.properties && this._entity.properties.name;
	}
}
