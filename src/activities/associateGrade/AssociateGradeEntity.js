import { Entity } from '../../es6/Entity';
import { Actions, Classes } from '../../hypermedia-constants';
import { performSirenAction } from '../../es6/SirenAction.js';

/**
 * AssociateGrade entity of an activity.
 */
const GRADEBOOK_STATUS = 'gradebookStatus';
const GRADE_NAME = 'gradeName';
const MAX_POINTS = 'maxPoints';

export class AssociateGradeEntity extends Entity {

	canEditGradebookStatus() {
		return this._entity && this._entity.hasActionByName(Actions.activities.associateGrade.gradebookStatus);
	}

	canEditNewGrade() {
		const newGradeEntity = this._entity && this._entity.getSubEntityByClass(Classes.activities.associateGrade.newGrade);
		return newGradeEntity && newGradeEntity.hasActionByName(Actions.activities.associateGrade.chooseType);
	}

	async setGradebookStatus(newStatus, gradeName, maxPoints) {
		if (!this.canEditGradebookStatus()) return;

		const action = this._entity.getActionByName(Actions.activities.associateGrade.gradebookStatus);

		const fields = [{ name: GRADEBOOK_STATUS, value: newStatus }];
		if (gradeName) {
			fields.push({ name: GRADE_NAME, value: gradeName });
		}
		if (maxPoints) {
			fields.push({ name: MAX_POINTS, value: maxPoints });
		}

		const returnedEntity = await performSirenAction(this._token, action, fields);
		if (!returnedEntity) return;
		return new AssociateGradeEntity(returnedEntity);
	}

	async setGradeMaxPoints(maxPoints) {
		if (!this.canEditNewGrade()) return;

		const action = this._getNewGradeEntity().getActionByName(Actions.activities.associateGrade.chooseType);
		const fields = [{ name: MAX_POINTS, value: maxPoints }];

		const returnedEntity = await performSirenAction(this._token, action, fields);
		if (!returnedEntity) return;
		return new AssociateGradeEntity(returnedEntity);
	}

	async setGradeName(gradeName) {
		if (!this.canEditNewGrade()) return;

		const action = this._getNewGradeEntity().getActionByName(Actions.activities.associateGrade.chooseType);
		const fields = [{ name: GRADE_NAME, value: gradeName }];

		const returnedEntity = await performSirenAction(this._token, action, fields);
		if (!returnedEntity) return;
		return new AssociateGradeEntity(returnedEntity);
	}

	_getNewGradeEntity() {
		return this._entity && this._entity.getSubEntityByClass(Classes.activities.associateGrade.newGrade);
	}
}
