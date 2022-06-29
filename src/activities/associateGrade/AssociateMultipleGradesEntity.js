// import { Actions, Classes, Rels } from '../../hypermedia-constants.js';
import { AssociateGradeEntity } from './AssociateGradeEntity.js';
import { Entity } from '../../es6/Entity.js';
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

	createNewGrade() {
		console.log('sirensdk - making new grade');
	}
}
