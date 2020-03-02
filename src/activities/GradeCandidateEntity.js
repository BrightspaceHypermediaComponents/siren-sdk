import { Classes, Rels } from '../hypermedia-constants';
import { Entity } from '../es6/Entity';
import { performSirenAction } from '../es6/SirenAction';

/**
 * GradeCandidateEntity class representation of a grade-candidate
 */
export class GradeCandidateEntity extends Entity {
	/**
	 * @returns {string} Grade candidate's name
	 */
	name() {
		return this._entity && this._entity.properties && this._entity.properties.name;
	}

	/**
	 * @returns {string} Grade candidate's weight value
	 */
	weight() {
		const weightEntity = !this.isCategory() && this._entity && this._entity.getSubEntitiesByRel(Rels.Grades.weight);
		if (weightEntity) {
			return weightEntity[0].properties && weightEntity[0].properties.weight;
		}
		return '';
	}

	/**
	 * @returns {bool} True if candidate is a category
	 */
	isCategory() {
		return this._entity && this._entity.hasClass(Classes.grades.category);
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
