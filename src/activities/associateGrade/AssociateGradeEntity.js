import { Entity } from '../../es6/Entity';
import { Actions, Classes } from '../../hypermedia-constants';
import { performSirenAction } from '../../es6/SirenAction.js';
import { GradeCategoryCollectionEntity } from './GradeCategoryCollectionEntity.js';
import { GradeCandidateCollectionEntity } from '../GradeCandidateCollectionEntity.js';

/**
 * AssociateGrade entity of an activity.
 */
const GRADEBOOK_STATUS = 'gradebookStatus';
const GRADE_NAME = 'gradeName';
const MAX_POINTS = 'maxPoints';

export const GradebookStatus = Object.freeze({
	NotInGradebook: 'not-in-gradebook',
	NewGrade: 'new-grade',
	ExistingGrade: 'existing-grade'
});

export const GradeType = Object.freeze({
	Selectbox: 'selectbox',
	Numeric: 'numeric'
});

export class AssociateGradeEntity extends Entity {

	gradebookStatus() {
		if (!this._entity) return;

		if (this._entity.hasClass(Classes.activities.associateGrade.newGrade)) {
			return GradebookStatus.NewGrade;
		}
		if (this._entity.hasClass(Classes.activities.associateGrade.existingGrade)) {
			return GradebookStatus.ExistingGrade;
		}
		if (this._entity.hasClass(Classes.activities.associateGrade.notInGradebook)) {
			return GradebookStatus.NotInGradebook;
		}
	}

	gradeName() {
		const newGradeEntity = this._getNewGradeEntity();
		return newGradeEntity && newGradeEntity.properties && newGradeEntity.properties.name;
	}

	maxPoints() {
		const newGradeEntity = this._getNewGradeEntity();
		return newGradeEntity && newGradeEntity.properties && newGradeEntity.properties.maxPoints;
	}

	gradeType() {
		const newGradeEntity = this._getNewGradeEntity();
		if (!newGradeEntity) return;

		if (newGradeEntity.hasClass(Classes.activities.associateGrade.selectbox)) {
			return GradeType.Selectbox;
		}

		if (newGradeEntity.hasClass(Classes.activities.associateGrade.numeric)) {
			return GradeType.Numeric;
		}
	}

	canEditGradebookStatus() {
		return this._entity && this._entity.hasActionByName(Actions.activities.associateGrade.gradebookStatus);
	}

	canCreateNewGrade() {
		if (!this.canEditGradebookStatus()) return false;

		const action = this._entity.getActionByName(Actions.activities.associateGrade.gradebookStatus);
		if (!action) return false;

		const field = action.getFieldByName(GRADEBOOK_STATUS) || {};
		return (field.value || []).some(val => val.value === GradebookStatus.NewGrade);
	}

	canEditNewGrade() {
		const newGradeEntity = this._getNewGradeEntity();
		return typeof newGradeEntity !== 'undefined' && newGradeEntity.hasActionByName(Actions.activities.associateGrade.chooseType);
	}

	canGetCategories() {
		const newGradeEntity = this._getNewGradeEntity();
		return typeof newGradeEntity !== 'undefined' && newGradeEntity.hasActionByName(Actions.activities.associateGrade.getCategories);
	}

	canChooseGrade() {
		const existingGradeEntity = this._getExistingGradeEntity();
		return typeof existingGradeEntity !== 'undefined' && existingGradeEntity.hasActionByName(Actions.activities.associateGrade.chooseGrade);
	}

	async getGradeCategories() {
		const newGradeEntity = this._getNewGradeEntity();
		if (!newGradeEntity || !this.canGetCategories()) return;

		const action = newGradeEntity.getActionByName(Actions.activities.associateGrade.getCategories);

		const fields = [];
		// HACK adding query param as field due to bug in performSirenAction (_getSirenFields function)
		const url = new URL(action.href, window.location.origin);
		const wcId = url.searchParams.get('workingCopyId');
		fields.push({name: 'workingCopyId', value: wcId});

		const returnedEntity = await performSirenAction(this._token, action, fields);

		if (!returnedEntity) return;
		return new GradeCategoryCollectionEntity(returnedEntity);
	}

	async getGradeCandidates() {
		const existingGradeEntity = this._getExistingGradeEntity();
		if (!existingGradeEntity || !this.canChooseGrade()) return;

		const action = existingGradeEntity.getActionByName(Actions.activities.associateGrade.chooseGrade);

		const fields = [];
		// HACK adding query param as field due to bug in performSirenAction (_getSirenFields function)
		const url = new URL(action.href, window.location.origin);
		const wcId = url.searchParams.get('workingCopyId');
		fields.push({name: 'workingCopyId', value: wcId});

		const returnedEntity = await performSirenAction(this._token, action, fields);

		if (!returnedEntity) return;
		return new GradeCandidateCollectionEntity(returnedEntity);
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
	_getExistingGradeEntity() {
		return this._entity && this._entity.getSubEntityByClass(Classes.activities.associateGrade.existingGrade);
	}
}
