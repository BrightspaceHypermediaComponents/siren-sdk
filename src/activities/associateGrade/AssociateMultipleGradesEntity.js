import { Actions } from '../../hypermedia-constants.js';
import { Entity } from '../../es6/Entity.js';
import { performSirenAction } from '../../es6/SirenAction.js';

/**
 * AssociateMultipleGrades entity of an activity.
 */
export class AssociateMultipleGradesEntity extends Entity {
	/**
	 * @returns {Array} siren representations of all AssociateGrade entities
	 */
	getAssociateGrades() {
		const subEntities = this._entity.getSubEntitiesByClass('specific-grade');

		return [...subEntities];

		// TODO: messes up the order
		// const existingGradeEntities = this._entity.getSubEntitiesByRel('existing-grade');
		// const newGradeEntities = this._entity.getSubEntitiesByRel('new-grade');
		// const notInGradebookGradeEntities = this._entity.getSubEntitiesByRel('not-in-gradebook');
		//
		// return [...existingGradeEntities, ...newGradeEntities, ...notInGradebookGradeEntities];
	}

	/**
	 * Creates a new grade object to be associated with this topic
	 */
	async createNewGrade(gradeName) {
		const action = this._entity.getActionByName(Actions.activities.associateMultipleGrades.gradebookStatus);
		const fields = [
			{ name: 'gradebookStatus', value: 'new-grade' },
			{ name: 'gradeName', value: gradeName }
		];

		const returnedEntity = await performSirenAction(this._token, action, fields);

		if (!returnedEntity) {
			return;
		}

		return new AssociateMultipleGradesEntity(returnedEntity, this._token);
	}
}
