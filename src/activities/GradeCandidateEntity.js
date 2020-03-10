import { Classes, Rels } from '../hypermedia-constants';
import { Entity } from '../es6/Entity';
import { performSirenAction } from '../es6/SirenAction';

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

		if (this.isCategory() && entity.hasLinkByRel(Rels.Grades.category)) {
			return entity.getLinkByRel(Rels.Grades.category).href;
		}

		if (!this.isCategory() && entity.hasLinkByRel(Rels.Grades.grade)) {
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
	 * @returns {bool} True if candidate is the currently associated item
	 */
	isCurrentAssociation() {
		return this._entity && this._entity.hasClass(Classes.grades.currentAssociation);
	}

	/**
	 * @returns {bool} True if the associate-grade action is present on the grade candidate
	 */
	canAssociateGrade() {
		return this._entity && this._entity.hasActionByName('associate-grade');
	}

	/**
	 * Calls the Siren action to associate this grade with the activity
	 */
	async associateGrade() {
		if (!this.canAssociateGrade()) {
			return;
		}

		const action = this._entity.getActionByName('associate-grade');
		await performSirenAction(this._token, action);
	}
}
