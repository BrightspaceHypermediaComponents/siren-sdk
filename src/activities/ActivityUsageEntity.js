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
		return this._canEditDate( Classes.dates.dueDate )
	}

	/**
 	 * Updates the due date of the activity usage entity to the date specified
	 * @param {string} dateValue Date string to set as the due date, or empty string to clear the due date
	 */
	async setDueDate(dateValue) {
		await this._setDate(dateValue, Classes.dates.startDate, 'dueDate');
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
		return this._canEditDate( Classes.dates.startDate )
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
		return this._canEditDate( Classes.dates.endDate )
	}

	/**
 	 * Updates the end date of the activity usage entity to the date specified
	 * @param {string} dateValue Date string to set as the end date, or empty string to clear the end date
	 */
	async setEndDate(dateValue) {
		await this._setDate( dateValue, Classes.dates.endDate, 'endDate');
	}

	_getDateSubEntity(dateClass) {
		return this._entity
			&& this._entity.getSubEntityByClass(dateClass);
	}

	/**
	 * @param {string} dateClass The class for the date entity
	 * @returns {bool} Whether or not edit *date* action is present on the activity usage entity
	 */
	_canEditDate( dateClass ) {
		const date = this._getDateSubEntity(dateClass);
		return (date && date.hasActionByName(Actions.activities.update))
			|| this._entity.hasActionByName(Actions.activities.startAddNew);
	}

	/**
	 * Updates either start, end or due date of the activity usage entity to the date specified
	 * @param {string} dateValue Date value to set as the date, or empty string to clear the date
	 * @param {string} dateClass The class for the date to update
	 * @param {string} dateField The field of the date to update. example: "endDate"
	 */
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
}
