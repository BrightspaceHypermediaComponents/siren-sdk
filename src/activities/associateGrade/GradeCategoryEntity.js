import { Entity } from '../../es6/Entity';

/**
 * GradeCategoryEntity class representation of a grade category
 */
export class GradeCategoryEntity extends Entity {
	/**
	 * @returns {string} Grade Category's name
	 */
	name() {
		return this._entity && this._entity.properties && this._entity.properties.name;
	}
	/**
	 * @returns {boolean} Is Auto Points set on the Grade Category (auto set max points for Grade items within the category)
	 */
	autoPoints() {
		return this._entity && this._entity.properties && this._entity.properties.autoPoints;
	}
	/**
	 * @returns {number} Grade Category's Max Points
	 * This value will be used for Grade Items that belong to the Grade Category when Auto Points is `true`
	 */
	maxPoints() {
		return this._entity && this._entity.properties && this._entity.properties.maxPoints;
	}
}
