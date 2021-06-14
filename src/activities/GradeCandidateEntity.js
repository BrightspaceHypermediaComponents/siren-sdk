import { Actions, Classes, Rels } from '../hypermedia-constants';
import { Entity } from '../es6/Entity';
import { performSirenAction } from '../es6/SirenAction';
import { AssociateGradeEntity } from './associateGrade/AssociateGradeEntity';

/**
 * GradeCandidateEntity class representation of a grade-candidate
 */
export class GradeCandidateEntity extends Entity {
	/**
	 * @returns {string} Grade's URL
	 */
	href() {
		const entity = this._entity;
		if (!this._entity) {
			return;
		}

		const canHaveCategoryLink = this.isCategory() || this.isNewGradeCandidate();
		if (canHaveCategoryLink && entity.hasLinkByRel(Rels.Grades.category)) {
			return entity.getLinkByRel(Rels.Grades.category).href;
		}

		if (!canHaveCategoryLink && entity.hasLinkByRel(Rels.Grades.grade)) {
			return entity.getLinkByRel(Rels.Grades.grade).href;
		}
	}

	/**
	 * @returns {Array} Returns all grade-candidate sub-entities
	 */
	getGradeCandidates() {
		return (this._entity && this._entity.getSubEntitiesByRel(Rels.Grades.grade)) || [];
	}

	/**
	 * @returns {bool} True if candidate is a category
	 */
	isCategory() {
		return this._entity && this._entity.hasClass(Classes.grades.category);
	}

	/**
	 * @returns {bool} True if candidate is a new grade candidate
	 */
	isNewGradeCandidate() {
		return this._entity && this._entity.hasClass(Classes.grades.newGradeCandidate);
	}

	/**
	 * @returns {bool} True if candidate is the currently associated item
	 */
	isCurrentAssociation() {
		return this._entity && this._entity.hasClass(Classes.grades.currentAssociation);
	}

	/**
	 * @returns {bool} True if the associate-grade action is present on the grade candidate
	 */
	canAssociateGrade() {
		return this._entity && this._entity.hasActionByName(Actions.activities.associateGrade.associateGrade);
	}

	/**
	 * @returns {object} Returns the save action if it is present on the grade candidate
	 */
	getSaveAction() {
		return this._entity && this._entity.getActionByName(Actions.activities.save);
	}

	/**
	 * Calls the Siren action to associate this grade with the activity
	 */
	async associateGrade() {
		if (!this.canAssociateGrade()) {
			return;
		}

		let entity;
		try {
			const action = this._entity.getActionByName(Actions.activities.associateGrade.associateGrade);
			entity = await performSirenAction(this._token, action);
		} catch (e) {
			return Promise.reject(e);
		}

		if (!entity) return;
		return new AssociateGradeEntity(entity, this._token);
	}
}
