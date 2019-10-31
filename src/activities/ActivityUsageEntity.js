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
		return (dueDate && dueDate.hasActionByName(Actions.activities.update))
			|| this._entity.hasActionByName(Actions.activities.startAddNew);
	}

	async setDueDate(dateString) {
		if (!this.canEditDueDate) {
			return;
		}

		let action;
		const dueDateEntity = this._getDueDateSubEntity();
		if (dueDateEntity) {
			action = dueDateEntity.getActionByName(Actions.activities.update);
		} else {
			if (!this._entity.hasActionByName(Actions.activities.startAddNew)) {
				return;
			}

			const addNewAction = this._entity.getActionByName(Actions.activities.startAddNew);
			const addNewEntity = await performSirenAction(this._token, addNewAction);

			if (!addNewEntity.hasSubEntityByClass(Classes.dates.dueDate)) {
				return;
			}

			const addNewDueDateEntity = addNewEntity.getSubEntityByClass(Classes.dates.dueDate);
			action = addNewDueDateEntity.getActionByName(Actions.activities.create);
		}

		if (!action) {
			return;
		}

		const fields = [{ name: 'dueDate', value: dateString }];
		await performSirenAction(this._token, action, fields);
	}

	canEditDraft() {
		return this._entity && this._entity.hasActionByName(Actions.activities.updateDraft);
	}

	async setDraftStatus(isDraft) {
		if (!this.canEditDraft()) {
			return;
		}

		const updateDraftAction = this._entity.getActionByName(Actions.activities.updateDraft);
		const fields = [{ name: 'draft', value: isDraft }];
		await performSirenAction(this._token, updateDraftAction, fields);
	}

	isDraft() {
		return this._entity && this._entity.hasClass(Classes.activities.draft);
	}
}
