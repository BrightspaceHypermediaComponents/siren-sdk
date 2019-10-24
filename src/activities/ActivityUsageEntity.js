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
	organizationHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.organization)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.organization).href;
	}

	userActivityUsageHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.Activities.userActivityUsage)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.Activities.userActivityUsage).href;
	}

	activityCollectionHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.Activities.activityCollection)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.Activities.activityCollection).href;
	}

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

	onUserActivityUsageChange(onChange) {
		const userActivityUsageHref = this.userActivityUsageHref();
		userActivityUsageHref && this._subEntity(UserActivityUsageEntity, userActivityUsageHref, onChange);
	}

	onActivityCollectionChange(onChange) {
		const activityCollectionHref = this.activityCollectionHref();
		activityCollectionHref && this._subEntity(ActivityUsageCollectionEntity, activityCollectionHref, onChange);
	}

	_getDueDateSubEntity() {
		return this._entity
			&& this._entity.getSubEntityByClass(Classes.dates.dueDate);
	}

	dueDate() {
		const dueDate = this._getDueDateSubEntity();
		return dueDate && dueDate.properties.date;
	}

	canEditDueDate() {
		const dueDate = this._getDueDateSubEntity();
		return (dueDate && dueDate.hasActionByName(Actions.activities.update)) || false;
	}

	saveDueDateAction() {
		const dueDate = this._getDueDateSubEntity();
		return dueDate && dueDate.getActionByName(Actions.activities.update);
	}

	async setDueDate(dateString) {
		const dueDate = this.canEditDueDate && this._getDueDateSubEntity();
		if (!dueDate) {
			return;
		}

		const action = dueDate.getActionByName(Actions.activities.update);
		if (!action) {
			return;
		}

		const fields = [{ name: 'dueDate', value: dateString }];
		await performSirenAction(this._token, action, fields);
	}
}
