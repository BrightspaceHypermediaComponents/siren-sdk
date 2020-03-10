import { Entity } from '../es6/Entity';

/**
 * GradeCategoryEntity class representation of a grade category
 */
export class GradeCategoryEntity extends Entity {
	/**
	 * @returns {string} Grade cateogry's name
	 */
	name() {
		return this._entity && this._entity.properties && this._entity.properties.name;
	}
}
