import { Classes } from '../../hypermedia-constants.js';
import { Entity } from '../../es6/Entity.js';

/**
 * Entity representation of a collection of grade schemes
 */
export class GradeSchemeCollectionEntity extends Entity {
	/**
	 * @returns {Array} Returns all grade-scheme sub-entities
	 */
	getGradeSchemes() {
		return (this._entity && this._entity.getSubEntitiesByRel('item')) || [];
	}

	getSelectedScheme() {
		const gradeSchemes = this.getGradeSchemes();
		if (!gradeSchemes) {
			return;
		}

		return gradeSchemes.find(scheme => scheme.class.includes(Classes.activities.associateGrade.selected));
	}
}
