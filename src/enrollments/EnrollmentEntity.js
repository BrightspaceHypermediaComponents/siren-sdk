import { Entity } from '../es6/Entity.js';
import { Actions, Rels } from '../hypermedia-constants.js';
import { OrganizationEntity } from '../organizations/OrganizationEntity.js';
import { UserActivityUsageEntity  } from './UserActivityUsageEntity.js';
import { UserEntity  } from '../users/UserEntity.js';

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

	userUrl() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.user)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.user).href;
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

	onUserChange(onChange) {
		const userUrl = this.userUrl();
		userUrl && this._subEntity(UserEntity, userUrl, onChange);
	}
}
