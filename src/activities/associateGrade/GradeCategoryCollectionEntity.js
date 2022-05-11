import { Classes } from '../../hypermedia-constants.js';
import { Entity } from '../../es6/Entity.js';

/**
 * Entity representation of a collection of grade categories
 */
export class GradeCategoryCollectionEntity extends Entity {
	/**
	 * @returns {Array} Returns all grade-category sub-entities
	 */
	getGradeCategories() {
		return (this._entity && this._entity.getSubEntitiesByRel('item')) || [];
	}

	getSelectedCategory() {
		const gradeCategories = this.getGradeCategories();
		if (!gradeCategories) {
			return;
		}

		return gradeCategories.find(category => category.class.includes(Classes.activities.associateGrade.selected));
	}
}
