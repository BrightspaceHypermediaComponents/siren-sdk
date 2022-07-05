// import { Actions, Classes, Rels } from '../../hypermedia-constants.js';
import { AssociateGradeEntity } from './AssociateGradeEntity.js';
import { Entity } from '../../es6/Entity.js';
import { Actions } from '../../hypermedia-constants.js';
import { performSirenAction } from '../../es6/SirenAction.js';
// import { GradeCandidateCollectionEntity } from '../GradeCandidateCollectionEntity.js';
// import { GradeCategoryCollectionEntity } from './GradeCategoryCollectionEntity.js';
// import { GradeSchemeCollectionEntity } from './GradeSchemeCollectionEntity.js';
// import { performSirenAction } from '../../es6/SirenAction.js';

/**
 * AssociateGrade entity of an activity.
 */
export class AssociateMultipleGradesEntity extends Entity {
	getAssociateGrades() {
		console.log({theAssociateMultipleGradesEntity: this._entity});

		return this._entity.getSubEntitiesByRel('existing-grade').map(subEntity => {
			return subEntity;
			// const associateGradeEntity = new AssociateGradeEntity(subEntity);
			//
			// // eslint-disable-next-line no-console
			// console.log({ AssociateGradeEntity });
			//
			// return associateGradeEntity;
		});
	}

	async createNewGrade() {
		// if (!this.canEditGradebookStatus()) return;

		const action = this._entity.getActionByName(Actions.activities.associateMultipleGrades.gradebookStatus);
		const fields = [{ name: 'gradebookStatus', value: 'new-grade' }];
		const returnedEntity = await performSirenAction(this._token, action, fields);

		if (!returnedEntity) return;
		return new AssociateMultipleGradesEntity(returnedEntity, this._token);
	}
}
