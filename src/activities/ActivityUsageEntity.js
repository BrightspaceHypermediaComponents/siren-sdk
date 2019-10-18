'use strict';

import { Entity } from '../es6/Entity.js';
import { Actions, Classes, Rels } from '../hypermedia-constants';
import { OrganizationEntity } from '../organizations/OrganizationEntity.js';
import { UserActivityUsageEntity } from '../enrollments/UserActivityUsageEntity.js';
import { ActivityUsageCollectionEntity } from './ActivityUsageCollectionEntity.js';

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

	get dueDate() {
		if (!this._entity || !this._entity.hasSubEntityByClass(Classes.dates.dueDate)) {
			return;
		}

		return this._entity.getSubEntityByClass(Classes.dates.dueDate).properties.date;
	}

	get canEditDueDate() {
		return this._entity && this._entity.hasActionByName(Actions.activities.update);
	}

	get saveDueDateAction() {
		return this._entity && this._entity.getActionByName(Actions.activities.update);
	}
}
