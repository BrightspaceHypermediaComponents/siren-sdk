import { Entity } from '../../es6/Entity';

/**
 * GradeSchemeEntity class representation of a grade scheme
 */
export class GradeSchemeEntity extends Entity {
	/**
	 * @returns {string} Grade scheme's name
	 */
	name() {
		return this._entity && this._entity.properties && this._entity.properties.name;
	}
}
