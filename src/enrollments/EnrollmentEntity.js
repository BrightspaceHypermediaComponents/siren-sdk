'use strict';

import { Entity } from '../es6/Entity.js';
import { Rels } from '../hypermedia-constants';
import { OrganizationEntity } from '../organizations/OrganizationEntity';

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

	completionDate() {
		if (!this._entity) {
			return;
		}
		return this._sirenClassProperty(this._entity, 'completion');
	}

	dueDate() {
		if (!this._entity) {
			return;
		}
		return this._sirenClassProperty(this._entity, 'due-date');
	}

	isAttended() {
		return this.hasClass('attended');
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

	onOrganizationChange(onChange) {
		const organizationHref = this.organizationHref();
		organizationHref && this._subEntity(OrganizationEntity, organizationHref, onChange);
	}

	_sirenClassProperty(entity, sirenClass) {
		if (!entity.hasSubEntityByClass(sirenClass)) {
			return;
		}
		var subEntity = entity.getSubEntityByClass(sirenClass);

		if (subEntity.hasClass('date')) {
			return subEntity.properties ? subEntity.properties.date : null;
		} else if (subEntity.hasClass('duration')) {
			return subEntity.properties ? subEntity.properties.seconds : null;
		} else if (subEntity.hasClass('completion')) {
			return this._sirenClassProperty(subEntity,  'completion-date');
		}
	}

}
