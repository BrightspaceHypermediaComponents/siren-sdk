import { Entity } from '../es6/Entity.js';
import { Actions, Classes, Rels } from '../hypermedia-constants';
import { OrganizationEntity } from '../organizations/OrganizationEntity.js';
import { UserActivityUsageEntity } from '../enrollments/UserActivityUsageEntity.js';
import { ActivityUsageCollectionEntity } from './ActivityUsageCollectionEntity.js';
import { performSirenAction } from '../es6/SirenAction.js';

/**
 * ActivityUsageEntity class representation of a d2l activity usage.
 */
const specializationRel = 'https://api.brightspace.com/rels/specialization';

export class ActivityUsageEntity extends Entity {
	/**
	 * @returns {string} URL of the organization associated with the activity usage, if present
	 */
	organizationHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.organization)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.organization).href;
	}

	/**
	 * @returns {string} URL of the specialization associated with the activity usage, if present
	 */
	specializationHref() {
		if (!this._entity || !this._entity.hasLinkByRel(specializationRel)) {
			return;
		}

		return this._entity.getLinkByRel(specializationRel).href;
	}

	/**
	 * @returns {string} URL of the user activity usage associated with the activity usage (for the current user), if present
	 */
	userActivityUsageHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.Activities.userActivityUsage)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.Activities.userActivityUsage).href;
	}

	/**
	 * @returns {string} URL of the activity collection associated with the activity usage, if present
	 */
	activityCollectionHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.Activities.activityCollection)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.Activities.activityCollection).href;
	}

	/**
	 * @returns {string} URL of the grade-candidates collection associated with the activity usage, if present
	 */
	gradeCandidatesHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.Activities.gradeCandidates)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.Activities.gradeCandidates).href;
	}

	/**
	 * @returns {bool} Whether the release conditions dialog opener sub entity is present.
	 */
	canEditReleaseConditions() {

		if (!this._entity) {
			return false;
		}

		return this._entity.hasSubEntityByRel(Rels.Activities.releaseConditionsDialogOpener);
	}

	/**
	 * @returns {string} Url of the MVC release conditions dialog.
	 */
	editReleaseConditionsUrl() {

		const entity = this._entity.getSubEntityByRel(Rels.Activities.releaseConditionsDialogOpener);
		return entity ? entity.properties.url : undefined;
	}

	/**
	 * @returns {string} URL to edit the activity usage, if present
	 */
	editHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.IANA.edit)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.IANA.edit).href;
	}

	onOrganizationChange(onChange) {
		const organizationHref = this.organizationHref();
		organizationHref && this._subEntity(OrganizationEntity, organizationHref, onChange);
	}

	onSpecializationChange(entityType, onChange) {
		const specializationHref = this.specializationHref();
		specializationHref && this._subEntity(entityType, specializationHref, onChange);
	}

	onUserActivityUsageChange(onChange) {
		const userActivityUsageHref = this.userActivityUsageHref();
		userActivityUsageHref && this._subEntity(UserActivityUsageEntity, userActivityUsageHref, onChange);
	}

	onActivityCollectionChange(onChange) {
		const activityCollectionHref = this.activityCollectionHref();
		activityCollectionHref && this._subEntity(ActivityUsageCollectionEntity, activityCollectionHref, onChange);
	}

	/**
	 * @returns {string} Due date of the activity usage
	 */
	dueDate() {
		const dueDate = this._getDateSubEntity(Classes.dates.dueDate);
		return dueDate && dueDate.properties.date;
	}

	/**
	 * @returns {bool} Whether or not the edit due date action is present on the activity usage entity
	 */
	canEditDueDate() {
		return this._canEditDate(Classes.dates.dueDate);
	}

	/**
 	 * Updates the due date of the activity usage entity to the date specified
	 * @param {string} dateValue Date string to set as the due date, or empty string to clear the due date
	 */
	async setDueDate(dateValue) {
		await this._setDate(dateValue, Classes.dates.dueDate, 'dueDate');
	}

	/**
	 * @returns {string} Start date of the activity usage
	 */
	startDate() {
		const startDate = this._getDateSubEntity(Classes.dates.startDate);
		return startDate && startDate.properties.date;
	}

	/**
	 * @returns {bool} Whether or not the edit start date action is present on the activity usage entity
	 */
	canEditStartDate() {
		return this._canEditDate(Classes.dates.startDate);
	}

	/**
 	 * Updates the start date of the activity usage entity to the date specified
	 * @param {string} dateValue Date string to set as the start date, or empty string to clear the start date
	 */
	async setStartDate(dateValue) {
		await this._setDate(dateValue, Classes.dates.startDate, 'startDate');
	}

	/**
	 * @returns {string} End date of the activity usage
	 */
	endDate() {
		const endDate = this._getDateSubEntity(Classes.dates.endDate);
		return endDate && endDate.properties.date;
	}

	/**
	 * @returns {bool} Whether or not the edit end date action is present on the activity usage entity
	 */
	canEditEndDate() {
		return this._canEditDate(Classes.dates.endDate);
	}

	/**
 	 * Updates the end date of the activity usage entity to the date specified
	 * @param {string} dateValue Date string to set as the end date, or empty string to clear the end date
	 */
	async setEndDate(dateValue) {
		await this._setDate(dateValue, Classes.dates.endDate, 'endDate');
	}

	/**
	 * @returns {bool} Whether or not the edit dates action is present on the activity usage entity (for saving start, end, and due date together)
	 */
	canEditDates() {
		const datesEntity = this._getDateSubEntity('dates');
		return datesEntity && datesEntity.hasActionByName(Actions.activities.update);
	}

	/**
	 * Updates start date, due date and end date together to the dates specified
	 * @param {string} startDate Date string to set as the start date, or empty string to clear the start date
	 * @param {string} dueDate Date string to set as the due date, or empty string to clear the due date
	 * @param {string} endDate Date string to set as the end date, or empty string to clear the end date
	 */
	async setDates(startDate, dueDate, endDate) {
		let action;
		const datesEntity = this._getDateSubEntity('dates');
		if (datesEntity) {
			action = datesEntity.getActionByName(Actions.activities.update);
		}

		if (!action) {
			return;
		}

		const startDateChanged = this._hasDateChanged(startDate, this.startDate());
		const dueDateChanged = this._hasDateChanged(dueDate, this.dueDate());
		const endDateChanged = this._hasDateChanged(endDate, this.endDate());

		if (startDateChanged || dueDateChanged || endDateChanged) {
			const startDateValue = this._getDateValue(startDate, this.startDate());
			const dueDateValue = this._getDateValue(dueDate, this.dueDate());
			const endDateValue = this._getDateValue(endDate, this.endDate());

			const fields = [
				{ name: 'startDate', value: startDateValue },
				{ name: 'dueDate', value: dueDateValue },
				{ name: 'endDate', value: endDateValue }
			];

			await performSirenAction(this._token, action, fields);
		}
	}

	_hasDateChanged(newDate, oldDate) {
		return typeof newDate !== 'undefined' && newDate !== oldDate;
	}

	_getDateValue(primaryDate, secondaryDate) {
		if (typeof primaryDate !== 'undefined') {
			return primaryDate;
		}

		if (secondaryDate) {
			return secondaryDate;
		}

		return '';
	}

	_getDateSubEntity(dateClass) {
		return this._entity
			&& this._entity.getSubEntityByClass(dateClass);
	}

	async _canEditDate(dateClass) {

		const dateEntity = this._getDateSubEntity(dateClass);
		if (dateEntity && dateEntity.hasActionByName(Actions.activities.update)) {
			return true;
		}

		const addNewAction = this._entity.getActionByName(Actions.activities.startAddNew);
		if (!addNewAction) {
			return false;
		}

		const addNewEntity = await performSirenAction(this._token, addNewAction);

		if (addNewEntity && addNewEntity.hasSubEntityByClass(dateClass)) {
			return true;
		} else {
			return false;
		}
	}

	async _setDate(dateValue, dateClass, dateField) {
		if (!this._canEditDate(dateClass)) {
			return;
		}

		let action;
		const dateEntity = this._getDateSubEntity(dateClass);
		if (dateEntity) {
			action = dateEntity.getActionByName(Actions.activities.update);
		} else {
			if (!this._entity.hasActionByName(Actions.activities.startAddNew)) {
				return;
			}

			const addNewAction = this._entity.getActionByName(Actions.activities.startAddNew);
			const addNewEntity = await performSirenAction(this._token, addNewAction);

			if (!addNewEntity.hasSubEntityByClass(dateClass)) {
				return;
			}

			const addNewDateEntity = addNewEntity.getSubEntityByClass(dateClass);
			action = addNewDateEntity.getActionByName(Actions.activities.create);
		}

		if (!action) {
			return;
		}
		const fields = [{ name: dateField, value: dateValue }];
		await performSirenAction(this._token, action, fields);
	}

	/**
	 * @returns {bool} Whether or not edit draft action is present on the activity usage entity
	 */
	canEditDraft() {
		return this._entity && this._entity.hasActionByName(Actions.activities.updateDraft);
	}

	/**
	 * Updates the draft status of the activity usage entity to draft or published
	 * @param {bool} isDraft The draft state to bet set for the activity usage entity
	 */
	async setDraftStatus(isDraft) {
		if (!this.canEditDraft()) {
			return;
		}

		const updateDraftAction = this._entity.getActionByName(Actions.activities.updateDraft);
		const fields = [{ name: 'draft', value: isDraft }];
		await performSirenAction(this._token, updateDraftAction, fields);
	}

	/**
	 * @returns {bool} Whether or not the activity usage entity is draft
	 */
	isDraft() {
		return this._entity && this._entity.hasClass(Classes.activities.draftPublishedEntity) && this._entity.hasClass(Classes.activities.draft);
	}

	/**
	 * @returns {bool} Whether or not the activity usage entity is published
	 */
	isPublished() {
		return this._entity && this._entity.hasClass(Classes.activities.draftPublishedEntity) && this._entity.hasClass(Classes.activities.published);
	}

	/**
	 * @returns {string} Score out of value of the activity usage
	 */
	scoreOutOf() {
		const action = this._getScoreOutOfAction();
		if (action && action.hasFieldByName('scoreOutOf')) {
			return action.getFieldByName('scoreOutOf').value;
		}
		const scoreOutOfEntity = this._getScoreOutOfEntity();
		return scoreOutOfEntity ? scoreOutOfEntity.properties.scoreOutOf : undefined;
	}

	/**
	 * @returns {string} True if the activity usage is associated with a grade item, False otherwise
	 */
	inGrades() {
		const action = this._getScoreOutOfAction();
		if (action && action.hasFieldByName('inGrades')) {
			return action.getFieldByName('inGrades').value;
		}
		const scoreOutOfEntity = this._getScoreOutOfEntity();
		return scoreOutOfEntity ? scoreOutOfEntity.properties.inGrades : undefined;
	}

	/**
	 * @returns {string} Grade type of the grade item associated with the activity usage
	 */
	gradeType() {
		const action = this._getScoreOutOfAction();
		if (action && action.hasFieldByName('gradeType')) {
			const gradeTypes = action.getFieldByName('gradeType').value.filter(x => x.selected);
			if (gradeTypes.length > 0) {
				return gradeTypes[0].title;
			}
		}
		const scoreOutOfEntity = this._getScoreOutOfEntity();
		return scoreOutOfEntity ? scoreOutOfEntity.properties.gradeType : undefined;
	}

	/**
	 * Updates the score out of value of the activity usage entity
	 * @param {number} score The numerical score value to bet set for the activity usage entity
	 * @param {boolean} addToGrades True if a new grade item should be associated with this activity usage
	 */
	async setScoreOutOf(score, addToGrades) {
		if (!this.canEditScoreOutOf()) {
			return;
		}

		const fields = [{ name: 'scoreOutOf', value: score }];
		if (addToGrades) {
			fields.push({ name: 'inGrades', value: true });
			fields.push({ name: 'gradeType', value: 'Numeric' });
		}
		await performSirenAction(this._token, this._getScoreOutOfAction(), fields);
	}

	/**
	 * Removes the grade association with the activity usage entity
	 */
	async removeFromGrades() {
		if (!this.canEditScoreOutOf()) {
			return;
		}

		const fields = [{ name: 'inGrades', value: false }];
		await performSirenAction(this._token, this._getScoreOutOfAction(), fields);
	}

	/**
	 * Creates a new grade item and adds it as a grade association with the activity usage entity
	 */
	async addToGrades() {
		if (!this.canEditScoreOutOf()) {
			return;
		}

		const fields = [
			{ name: 'inGrades', value: true },
			{ name: 'gradeType', value: 'Numeric' }
		];
		await performSirenAction(this._token, this._getScoreOutOfAction(), fields);
	}

	/**
	 * Updates the score out of value of the activity usage entity to ungraded and removes any grade association
	 */
	async setUngraded() {
		if (!this.canEditScoreOutOf()) {
			return;
		}

		const fields = [
			{ name: 'inGrades', value: false },
			{ name: 'scoreOutOf', value: '' }
		];
		await performSirenAction(this._token, this._getScoreOutOfAction(), fields);
	}

	/**
	 * @returns {bool} Whether or not the update score out of action is present on the score-out-of subentity of the activity usage entity
	 */
	canEditScoreOutOf() {
		const scoreOutOfEntity = this._getScoreOutOfEntity();
		return scoreOutOfEntity
			&& scoreOutOfEntity.hasActionByName(Actions.activities.scoreOutOf.update);
	}

	/**
	 * @returns {bool} Whether or not the inGrades property is present on the score-out-of subentity of the activity usage entity
	 */
	canSeeGrades() {
		const scoreOutOfEntity = this._getScoreOutOfEntity();
		return scoreOutOfEntity
			&& scoreOutOfEntity.properties.hasOwnProperty('inGrades');
	}

	/**
	 * @returns {bool} Whether or not the inGrades field is present on the update action of the score-out-of subentity of the activity usage entity
	 */
	canEditGrades() {
		const scoreOutOfAction = this._getScoreOutOfAction();
		return scoreOutOfAction
			&& scoreOutOfAction.hasFieldByName('inGrades');
	}

	_getScoreOutOfEntity() {
		return this._entity
			&& this._entity.getSubEntityByRel(Rels.Activities.scoreOutOf);
	}

	_getScoreOutOfAction() {
		const scoreOutOfEntity = this._getScoreOutOfEntity();
		return scoreOutOfEntity
			&& scoreOutOfEntity.getActionByName(Actions.activities.scoreOutOf.update);
	}

	async save(activity) {
		if (typeof activity.isDraft !== 'undefined' &&
			activity.isDraft !== this.isDraft()) {
			await this.setDraftStatus(activity.isDraft);
		}

		await this.setDates(activity.startDate, activity.dueDate, activity.endDate);
	}

	/**
	 * @returns {string} The href to the associations collection.
	 */
	getRubricAssociationsHref(){
		if (!this._entity) {
			return [];
		}

		return this._entity.getLinkByRel(Rels.Activities.associations).href;

	}
}
