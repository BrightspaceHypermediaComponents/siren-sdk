import { Entity } from '../es6/Entity.js';
import { Actions, Classes, Rels } from '../hypermedia-constants';
import { OrganizationEntity } from '../organizations/OrganizationEntity.js';
import { UserActivityUsageEntity } from '../enrollments/UserActivityUsageEntity.js';
import { ActivityUsageCollectionEntity } from './ActivityUsageCollectionEntity.js';
import { performSirenAction } from '../es6/SirenAction.js';

/**
 * ActivityUsageEntity class representation of a d2l activity usage.
 */

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
		if (!this._entity || !this._entity.hasLinkByRel(Rels.specialization)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.specialization).href;
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
	 * @returns {string} URL of the new grade association candidates with the activity usage, if present
	 */
	newGradeCandidatesHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.Activities.newGradeAssociation)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.Activities.newGradeAssociation).href;
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

	/** @returns {string} Href of the related conditions entity */
	conditionsHref() {

		if (!this._entity) {
			return null;
		}

		const link = this._entity.getLinkByRel(Rels.Conditions.conditions);
		if (!link) {
			return null;
		}

		return link.href;
	}

	/** @returns {string} Href of the related special access entity */
	specialAccessHref() {

		if (!this._entity) {
			return null;
		}

		const link = this._entity.getLinkByRel(Rels.Activities.specialAccess);
		if (!link) {
			return null;
		}

		return link.href;
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

	/**
	 * @returns {string} URL to create the activity usage, if present
	 */
	createFormHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.IANA.createForm)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.IANA.createForm).href;
	}

	competenciesHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.Alignments.legacyCompetencies)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.Alignments.legacyCompetencies).href;
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
	 * Validates range/order of start date, due date, and end date against each other
	 * @param {object} dates Dates object containing start, due, and end date, or empty strings to clear
	 */
	async validateDates(dates) {
		if (!dates) return;
		if (!this._hasDatesChanged(dates.startDate, dates.dueDate, dates.endDate)) return;

		const datesActionAndFields = this._generateDatesAction(dates.startDate, dates.dueDate, dates.endDate, true);
		if (datesActionAndFields) {
			await performSirenAction(this._token, datesActionAndFields.action, datesActionAndFields.fields);
		}
	}

	/**
	 * Updates start date, due date and end date together to the dates specified
	 * @param {object} dates Dates object containing start, due, and end date, or empty strings to clear
	 */
	async saveDates(dates, deferSave) {
		if (!dates) return;
		if (!this._hasDatesChanged(dates.startDate, dates.dueDate, dates.endDate)) return;

		const datesActionAndFields = this._generateDatesAction(dates.startDate, dates.dueDate, dates.endDate, false);
		if (!datesActionAndFields) return;
		if (deferSave) {
			return datesActionAndFields;
		} else {
			await performSirenAction(this._token, datesActionAndFields.action, datesActionAndFields.fields);
		}
	}

	_generateDatesAction(startDate, dueDate, endDate, validateOnly) {
		let action;
		const datesEntity = this._getDateSubEntity('dates');
		if (datesEntity) {
			action = datesEntity.getActionByName(Actions.activities.update);
		}

		if (!action) {
			return;
		}

		const startDateValue = this._getDateValue(startDate, this.startDate());
		const dueDateValue = this._getDateValue(dueDate, this.dueDate());
		const endDateValue = this._getDateValue(endDate, this.endDate());

		const fields = [
			{ name: 'startDate', value: startDateValue },
			{ name: 'dueDate', value: dueDateValue },
			{ name: 'endDate', value: endDateValue }
		];

		if (validateOnly) {
			fields.push({ name: 'validateOnly', value: true });
		}

		return { action, fields };
	}

	_hasDateChanged(newDate, oldDate = '') {
		return typeof newDate !== 'undefined' && newDate !== oldDate;
	}

	_hasDatesChanged(startDate, dueDate, endDate) {
		return this._hasDateChanged(startDate, this.startDate())
			|| this._hasDateChanged(dueDate, this.dueDate())
			|| this._hasDateChanged(endDate, this.endDate());
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
		if (!this.canEditDraft() || typeof isDraft === 'undefined' || isDraft === this.isDraft()) {
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
	 * @returns {string} URL of the grade associated with the activity usage, if present
	 */
	gradeHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.Grades.grade)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.Grades.grade).href;
	}

	/**
	* @returns {string} URL of the scoring API, for managing activity's scoreOutOf
	*/
	scoringHref() {
		const scoreOutOfSubEntity = this._entity && this._entity.getSubEntityByRel(Rels.Activities.scoreOutOf);
		return scoreOutOfSubEntity && scoreOutOfSubEntity.href;
	}

	async validate(activity) {
		await this.validateDates(activity.dates);
	}

	async save(activity) {
		if (!activity) return;

		await this.setDraftStatus(activity.isDraft);
		await this.saveDates(activity.dates);
	}

	equals(activity) {
		const diffs = [
			[this.dueDate(), activity.dates.dueDate],
			[this.startDate(), activity.dates.startDate],
			[this.endDate(), activity.dates.endDate],
			[this.isDraft(), activity.isDraft]
		];

		for (const [left, right] of diffs) {
			if (left !== right) {
				return false;
			}
		}
		return true;
	}
	/**
	 * @returns {string} The href to the associations collection.
	 */
	getRubricAssociationsHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.Activities.associations)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.Activities.associations).href;
	}

	getDirectRubricAssociationsHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.Activities.directAssociations)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.Activities.directAssociations).href;
	}

	getIndirectRubricAssociationsHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.Activities.indirectAssociations)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.Activities.indirectAssociations).href;
	}

	alignmentsHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.Alignments.alignments)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.Alignments.alignments).href;
	}

	alignmentsHierarchicalHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.Alignments.alignmentsHierarchical)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.Alignments.alignmentsHierarchical).href;
	}

	/**
	* @returns {string} URL of the associate-grade API, for managing grade association with the activity usage, using working copy, if present
	*/
	associateGradeHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.Activities.associateGrade)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.Activities.associateGrade).href;
	}

	_canCheckout() {
		return this._entity && this._entity.hasActionByName(Actions.workingCopy.checkout);
	}

	canCheckin() {
		return this._entity && this._entity.hasActionByName(Actions.workingCopy.checkin);
	}

	/**
	 * Checkout activity usage working copy
	 */
	async checkout() {
		if (this._canCheckout()) {
			const action = this.getActionByName(Actions.workingCopy.checkout);
			const entity = await performSirenAction(this._token, action);
			if (!entity) return;
			return new ActivityUsageEntity(entity, this._token);
		}
	}

	/**
	 * Checkin activity usage working copy
	 */
	async checkin() {
		if (this.canCheckin()) {
			const action = this.getActionByName(Actions.workingCopy.checkin);
			let entity;
			try {
				entity = await performSirenAction(this._token, action);
			} catch (e) {
				return Promise.reject(e);
			}
			if (!entity) return;
			return new ActivityUsageEntity(entity, this._token);
		}
	}
}
