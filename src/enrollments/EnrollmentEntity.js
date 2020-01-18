import { Entity } from '../es6/Entity.js';
import { Actions, Rels } from '../hypermedia-constants';
import { OrganizationEntity } from '../organizations/OrganizationEntity';
import { UserActivityUsageEntity  } from './UserActivityUsageEntity.js';

export const classes = {
	pinned: 'pinned',
	enrollment: 'enrollment'
};

/**
 * EnrollmentEntity class representation of a d2l enrollment.
 */
export class EnrollmentEntity extends Entity {
	organizationHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.organization)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.organization).href;
	}

	enrollments() {
		return this._entity && this._entity.getSubEntities('https://api.brightspace.com/rels/enrollment');
	}

	userActivityUsageUrl() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.Activities.userActivityUsage)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.Activities.userActivityUsage).href;
	}

	pinned() {
		return this.hasClass(classes.pinned);
	}

	pinAction() {
		if (!this._entity || !this._entity.getActionByName) {
			return;
		}

		return this.pinned()
			? this._entity.getActionByName(Actions.enrollments.unpinCourse)
			: this._entity.getActionByName(Actions.enrollments.pinCourse);
	}

	onOrganizationChange(onChange) {
		const organizationHref = this.organizationHref();
		organizationHref && this._subEntity(OrganizationEntity, organizationHref, onChange);
	}

	onUserActivityUsageChange(onChange) {
		const userActivityUsageUrl = this.userActivityUsageUrl();
		userActivityUsageUrl && this._subEntity(UserActivityUsageEntity, userActivityUsageUrl, onChange);
	}
}
