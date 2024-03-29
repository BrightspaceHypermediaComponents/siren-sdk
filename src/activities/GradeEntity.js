import { Entity } from '../es6/Entity.js';

/**
 * GradeEntity class representation of a grade
 */
export class GradeEntity extends Entity {
	/**
	 * @returns {string} Grade's name
	 */
	name() {
		return this._entity && this._entity.properties && this._entity.properties.name;
	}

	/**
	 * @returns {string} Grade's base weight value
	 */
	baseWeight() {
		return this._entity && this._entity.properties && this._entity.properties.baseWeight;
	}

	/**
	 * @returns {bool} If Grade has auto points set by it's Grade Category
	 */
	autoPoints() {
		return this._entity && this._entity.properties && this._entity.properties.autoPoints;
	}

	/**
	 * @returns {string} Grade's max points value
	 */
	maxPoints() {
		return this._entity && this._entity.properties && this._entity.properties.maxPoints;
	}
}
