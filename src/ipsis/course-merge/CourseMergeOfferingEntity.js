/**
 * CourseMergeOfferingEntity class representation of course merge offering as defined in the LMS
 * See: ISirenCourseMergeSerializer.SerializeCourseOfferingResult
 */
import { Entity } from '../../es6/Entity.js';
import { OrganizationEntity } from '../../organizations/OrganizationEntity.js';
import { Rels } from '../../hypermedia-constants.js';

export class CourseMergeOfferingEntity extends Entity {
	ownedByMultipleSourceSystems() {
		return this._entity?.properties?.ownedByMultipleSourceSystems;
	}

	orgUnitId() {
		return this._entity?.properties?.orgUnitId;
	}

	onOrganizationChange(onChange) {
		const courseOfferingHref = this.courseOfferingHref();
		// _subEntity builds new sub entity and allows this object to track it.
		// So all sub entities are dispose when this object is disposed.
		courseOfferingHref && this._subEntity(OrganizationEntity, courseOfferingHref, onChange);
	}

	courseOfferingHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.organization)) {
			return;
		}
		return this._entity.getLinkByRel(Rels.organization).href;
	}
}
