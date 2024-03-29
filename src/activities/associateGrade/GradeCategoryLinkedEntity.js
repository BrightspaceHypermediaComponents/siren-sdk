import { Actions, Classes, Rels } from '../../hypermedia-constants.js';
import { AssociateGradeEntity } from './AssociateGradeEntity.js';
import { Entity } from '../../es6/Entity.js';
import { performSirenAction } from '../../es6/SirenAction.js';

/**
 * GradeCategoryLinkedEntity class representation of a grade category linked entity
 */
export class GradeCategoryLinkedEntity extends Entity {

	/**
	 * @returns {Array} Category's URL
	*/
	href() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.Grades.category)) {
			return;
		}
		return this._entity.getLinkByRel(Rels.Grades.category).href;
	}

	canChooseCategory() {
		if (!this._entity) {
			return false;
		}
		return this._entity.hasActionByName(Actions.activities.associateGrade.chooseCategory);
	}

	isSelected() {
		if (!this._entity) {
			return false;
		}
		return this._entity.hasClass(Classes.activities.associateGrade.selected);
	}

	async selectCategory() {
		if (!this.canChooseCategory()) {
			return;
		}

		let entity;
		try {
			const action = this._entity.getActionByName(Actions.activities.associateGrade.chooseCategory);
			entity = await performSirenAction(this._token, action);
		} catch (e) {
			return Promise.reject(e);
		}

		if (!entity) return;
		return new AssociateGradeEntity(entity, this._token);
	}
}
