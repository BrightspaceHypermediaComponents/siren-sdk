import { Entity } from '../../es6/Entity';
import { Actions, Classes, Rels } from '../../hypermedia-constants';
import { performSirenAction } from '../../es6/SirenAction.js';
import { GradeCategoryCollectionEntity } from './GradeCategoryCollectionEntity.js';
import { GradeCandidateCollectionEntity } from '../GradeCandidateCollectionEntity.js';
import { GradeSchemeCollectionEntity } from './GradeSchemeCollectionEntity.js';

/**
 * AssociateGrade entity of an activity.
 */
const GRADEBOOK_STATUS = 'gradebookStatus';
const GRADE_NAME = 'gradeName';
const MAX_POINTS = 'maxPoints';
const GRADE_TYPE = 'gradeType';

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

	hasSelectboxType() {
		const newGradeEntity = this._getNewGradeEntity();
		return newGradeEntity && newGradeEntity.hasSubEntityByClass(Classes.activities.associateGrade.selectbox);
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
		if (!newGradeEntity) return false;

		return newGradeEntity.hasActionByName(Actions.activities.associateGrade.chooseType);
	}

	canGetCategories() {
		const newGradeEntity = this._getNewGradeEntity();
		if (!newGradeEntity) return false;

		return newGradeEntity.hasActionByName(Actions.activities.associateGrade.getCategories);
	}

	canChooseGrade() {
		const existingGradeEntity = this._getExistingGradeEntity();
		if (!existingGradeEntity) return false;

		return existingGradeEntity.hasActionByName(Actions.activities.associateGrade.chooseGrade);
	}

	canGetSchemesForType(gradeType) {
		const newGradeEntity = this._getNewGradeEntity();
		if (!newGradeEntity) return false;

		const gradeSchemeEntity = newGradeEntity.getSubEntityByClass(gradeType);
		if (!gradeSchemeEntity) return false;

		return gradeSchemeEntity.hasActionByName(Actions.activities.associateGrade.getSchemes);
	}

	async getGradeCategories() {
		const newGradeEntity = this._getNewGradeEntity();
		if (!newGradeEntity || !this.canGetCategories()) return;

		const action = newGradeEntity.getActionByName(Actions.activities.associateGrade.getCategories);

		const returnedEntity = await this._performGetActionWithWorkingCopy(action);
		if (!returnedEntity) return;

		return new GradeCategoryCollectionEntity(returnedEntity);
	}

	async getGradeCandidates() {
		const existingGradeEntity = this._getExistingGradeEntity();
		if (!existingGradeEntity || !this.canChooseGrade()) return;

		const action = existingGradeEntity.getActionByName(Actions.activities.associateGrade.chooseGrade);

		const returnedEntity = await this._performGetActionWithWorkingCopy(action);
		if (!returnedEntity) return;

		return new GradeCandidateCollectionEntity(returnedEntity);
	}

	async getGradeSchemesForType(gradeType) {
		if (!this.canGetSchemesForType(gradeType)) return;

		const newGradeEntity = this._getNewGradeEntity();
		const gradeSchemeEntity = newGradeEntity.getSubEntityByClass(gradeType);

		const action = gradeSchemeEntity.getActionByName(Actions.activities.associateGrade.getSchemes);

		const returnedEntity = await this._performGetActionWithWorkingCopy(action);
		if (!returnedEntity) return;

		return new GradeSchemeCollectionEntity(returnedEntity);
	}

	selectedSchemeHref() {
		const newGradeEntity = this._getNewGradeEntity();
		if (!newGradeEntity) return;

		const gradeType = this.gradeType();
		if (!gradeType) return;

		const gradeSchemeEntity = newGradeEntity.getSubEntityByClass(gradeType);
		if (!gradeSchemeEntity) return;

		const link = gradeSchemeEntity.getLinkByRel(Rels.Grades.scheme);
		if (!link) return;

		return link.href;
	}

	selectedCategoryHref() {
		const newGradeEntity = this._getNewGradeEntity();
		if (!newGradeEntity) return;

		const link = newGradeEntity.getLinkByRel(Rels.Grades.category);
		if (!link) return;

		return link.href;
	}

	async setGradebookStatus(newStatus) {
		if (!this.canEditGradebookStatus()) return;

		const action = this._entity.getActionByName(Actions.activities.associateGrade.gradebookStatus);

		const fields = [{ name: GRADEBOOK_STATUS, value: newStatus }];
		const returnedEntity = await performSirenAction(this._token, action, fields);

		if (!returnedEntity) return;
		return new AssociateGradeEntity(returnedEntity);
	}

	setGradeMaxPoints(maxPoints) {
		return this._setNewGradeProperty(MAX_POINTS, maxPoints);
	}

	setGradeName(gradeName) {
		return this._setNewGradeProperty(GRADE_NAME, gradeName);
	}

	setGradeType(gradeType) {
		return this._setNewGradeProperty(GRADE_TYPE, gradeType);
	}

	_getNewGradeEntity() {
		return this._entity && this._entity.getSubEntityByClass(Classes.activities.associateGrade.newGrade);
	}

	_getExistingGradeEntity() {
		return this._entity && this._entity.getSubEntityByClass(Classes.activities.associateGrade.existingGrade);
	}

	async _setNewGradeProperty(name, value) {
		if (!this.canEditNewGrade()) return;

		const action = this._getNewGradeEntity().getActionByName(Actions.activities.associateGrade.chooseType);
		const fields = [{ name: name, value: value }];

		const returnedEntity = await performSirenAction(this._token, action, fields);
		if (!returnedEntity) return;
		return new AssociateGradeEntity(returnedEntity);
	}

	/* This helper is for GET actions with a workingCopyId query parameter only, needed because of a bug in SirenAction.js.
	 * Other action methods (PATCH/POST/DELETE work correctly without this helper.)
	*/
	_performGetActionWithWorkingCopy(action) {
		const fields = [];
		// HACK adding query params as fields due to bug in performSirenAction (_getSirenFields function)
		const url = new URL(action.href, window.location.origin);
		for (const [key, value] of url.searchParams) {
			fields.push({name: key, value: value});
		}

		return performSirenAction(this._token, action, fields, false, true);
	}
}
