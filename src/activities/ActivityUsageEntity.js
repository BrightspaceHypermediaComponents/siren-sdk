import { Actions, Classes, Rels } from '../hypermedia-constants.js';
import { ActivityUsageCollectionEntity } from './ActivityUsageCollectionEntity.js';
import { Entity } from '../es6/Entity.js';
import { OrganizationEntity } from '../organizations/OrganizationEntity.js';
import { performSirenAction } from '../es6/SirenAction.js';
import { UserActivityUsageEntity } from '../enrollments/UserActivityUsageEntity.js';

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
		const dueDate = this._getSubEntityByClass(Classes.dates.dueDate);
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
	 * @returns {boolean} If ActivityAvailabilityDates entity is present
	 */
	hasActivityAvailabilityDates() {
		const dateEntity = this._getSubEntityByClass(Classes.availabilityDates.availabilityDates);
		return dateEntity !== undefined && dateEntity !== null;
	}

	/**
	 * @returns {string} Start date of the activity usage
	 */
	startDate() {
		if (this.hasActivityAvailabilityDates()) {
			const availabilityStartDate = this._getAvailabilityStartDateEntity();

			if (availabilityStartDate && availabilityStartDate.properties && availabilityStartDate.properties.dateTime) {
				return availabilityStartDate.properties.dateTime.date;
			}

			return;
		} else {
			const startDate = this._getSubEntityByClass(Classes.dates.startDate);

			if (!startDate || !startDate.properties) {
				return;
			}

			return startDate.properties.date;
		}
	}

	/**
	 * @returns {Number} Start date type of the activity usage
	 */
	startDateType() {
		const availabilityStartDate = this._getAvailabilityStartDateEntity();

		if (!availabilityStartDate || !availabilityStartDate.properties) {
			return;
		}

		return availabilityStartDate.properties.dateType;
	}

	/**
	 * @returns {Number} Default start date type of the activity usage
	 */
	defaultStartDateType() {
		const dateEntity = this._getSubEntityByClass(Classes.availabilityDates.availabilityDates);
		if (!dateEntity) {
			return;
		}

		const action = dateEntity.getActionByName(Actions.activities.availabilityDates.create);
		if (!action || !action.getFieldByName('availabilityStartType')) {
			return;
		}

		return action.getFieldByName('availabilityStartType').value;
	}

	/**
	 * @returns {bool} Whether or not the edit start date action is present on the activity usage entity
	 */
	canEditStartDate() {
		return this._canEditDate(Classes.dates.startDate);
	}

	/**
	 * @returns {bool} Whether or not the ActivityAvailabilityDates create action is present
	 */
	canEditAvailabilityDates() {
		const dateEntity = this._getSubEntityByClass(Classes.availabilityDates.availabilityDates);
		if (!dateEntity) {
			return false;
		}

		const action = dateEntity.getActionByName(Actions.activities.availabilityDates.create);
		if (action) {
			return true;
		}

		return false;
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
		if (this.hasActivityAvailabilityDates()) {
			const availabilityEndDate = this._getAvailabilityEndDateEntity();
			if (availabilityEndDate && availabilityEndDate.properties && availabilityEndDate.properties.dateTime) {
				return availabilityEndDate.properties.dateTime.date;
			}

			return;
		} else {
			const endDate = this._getSubEntityByClass(Classes.dates.endDate);

			if (!endDate || !endDate.properties) {
				return;
			}

			return endDate.properties.date;
		}
	}

	/**
	 * @returns {Number} End date type of the activity usage
	 */
	endDateType() {
		const availabilityEndDate = this._getAvailabilityEndDateEntity();

		if (!availabilityEndDate || !availabilityEndDate.properties) {
			return;
		}

		return availabilityEndDate.properties.dateType;
	}

	/**
	 * @returns {Number} Default start date type of the activity usage
	 */
	defaultEndDateType() {
		const dateEntity = this._getSubEntityByClass(Classes.availabilityDates.availabilityDates);
		if (!dateEntity) {
			return;
		}

		const action = dateEntity.getActionByName(Actions.activities.availabilityDates.create);
		if (!action || !action.getFieldByName('availabilityEndType')) {
			return;
		}

		return action.getFieldByName('availabilityEndType').value;
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
		const datesEntity = this._getSubEntityByClass('dates');
		return datesEntity && datesEntity.hasActionByName(Actions.activities.update);
	}

	/**
	 * Validates range/order of start date, due date, and end date against each other
	 * @param {object} dates Dates object containing start, due, and end date, or empty strings to clear
	 */
	async validateDates(dates) {
		if (!dates) return;
		if (!this._hasDatesChanged(dates.startDate, dates.dueDate, dates.endDate, dates.startDateType, dates.endDateType)) return;

		const datesActionAndFields = this._generateDatesAction(dates.startDate, dates.dueDate, dates.endDate, true, dates.startDateType, dates.endDateType);
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
		if (!this._hasDatesChanged(dates.startDate, dates.dueDate, dates.endDate, dates.startDateType, dates.endDateType)) return;

		const datesActionAndFields = this._generateDatesAction(dates.startDate, dates.dueDate, dates.endDate, false, dates.startDateType, dates.endDateType);
		if (!datesActionAndFields) return;
		if (deferSave) {
			return datesActionAndFields;
		} else {
			await performSirenAction(this._token, datesActionAndFields.action, datesActionAndFields.fields);
		}
	}

	_generateDatesAction(startDate, dueDate, endDate, validateOnly, startDateType, endDateType) {
		let action;
		const datesEntity = this._getSubEntityByClass('dates');
		if (datesEntity) {
			action = datesEntity.getActionByName(Actions.activities.update);
		}

		if (!action) {
			return;
		}

		const startDateValue = this._getDateParamValue(startDate, this.startDate());
		const dueDateValue = this._getDateParamValue(dueDate, this.dueDate());
		const endDateValue = this._getDateParamValue(endDate, this.endDate());
		const startDateTypeValue = this._getDateParamValue(startDateType, this.startDateType());
		const endDateTypeValue = this._getDateParamValue(endDateType, this.endDateType());

		const fields = [
			{ name: 'startDate', value: startDateValue },
			{ name: 'dueDate', value: dueDateValue },
			{ name: 'endDate', value: endDateValue },
			{ name: 'availabilityStartType', value: startDateTypeValue },
			{ name: 'availabilityEndType', value: endDateTypeValue },
		];

		if (validateOnly) {
			fields.push({ name: 'validateOnly', value: true });
		}

		return { action, fields };
	}

	_hasValueChanged(newValue, oldValue = '') {
		return typeof newValue !== 'undefined' && newValue !== oldValue;
	}

	_hasDatesChanged(startDate, dueDate, endDate, startDateType, endDateType) {
		return this._hasValueChanged(startDate, this.startDate())
			|| this._hasValueChanged(startDateType, this.startDateType())
			|| this._hasValueChanged(dueDate, this.dueDate())
			|| this._hasValueChanged(endDate, this.endDate())
			|| this._hasValueChanged(endDateType, this.endDateType());
	}

	_getDateParamValue(primaryDate, secondaryDate) {
		if (typeof primaryDate !== 'undefined') {
			return primaryDate;
		}

		if (secondaryDate) {
			return secondaryDate;
		}

		return '';
	}

	_getAvailabilityStartDateEntity() {
		const availabilityDatesEntity = this._getSubEntityByClass(Classes.availabilityDates.availabilityDates);

		if (!availabilityDatesEntity) {
			return;
		}

		return availabilityDatesEntity.getSubEntityByClass(Classes.availabilityDates.startDate);
	}

	_getAvailabilityEndDateEntity() {
		const availabilityDatesEntity = this._getSubEntityByClass(Classes.availabilityDates.availabilityDates);

		if (!availabilityDatesEntity) {
			return;
		}

		return availabilityDatesEntity.getSubEntityByClass(Classes.availabilityDates.endDate);
	}

	_getSubEntityByClass(className) {
		return this._entity
			&& this._entity.getSubEntityByClass(className);
	}

	_getAvailabilityDateSubEntity(dateClass) {
		return this._entity
			&& this._entity.getSubEntityByClass(dateClass);
	}

	async _canEditDate(dateClass) {

		const dateEntity = this._getSubEntityByClass(dateClass);
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
		const dateEntity = this._getSubEntityByClass(dateClass);
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
	 * @returns {Number} Count of Scoring API URLs attached to this activity
	 */
	scoringCount() {
		const scoringHrefs = this.scoringHrefs();
		return scoringHrefs ? scoringHrefs.length : 0;
	}

	/**
	 * @returns {string} URL of the scoring API, for managing activity's scoreOutOf
	 */
	scoringHref() {
		const scoreOutOfSubEntity = this._entity && this._entity.getSubEntityByRel(Rels.Activities.scoreOutOf);
		return scoreOutOfSubEntity && scoreOutOfSubEntity.href;
	}

	/**
	 * @returns {Array} Scoring API URLs attached to this activity, for managing the activity's grades' scoreOutOf
	 */
	scoringHrefs() {
		const scoreOutOfSubEntities = this._entity && this._entity.getSubEntitiesByRel(Rels.Activities.scoreOutOf);
		return scoreOutOfSubEntities && scoreOutOfSubEntities.map(entity => (entity.href));
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

	/**
	 * @returns {string} URL of the associate-multiple-grades API, for managing grade associations with the activity usage, using working copy, if present
	 */
	associateMultipleGradesHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.Activities.associateGrade)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.Activities.associateMultipleGrades).href;
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
