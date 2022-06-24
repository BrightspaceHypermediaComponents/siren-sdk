/**
 * CourseMergeOfferingEntity class representation of course merge offering as defined in the LMS
 * See: ISirenCourseMergeSerializer.SerializeCourseOfferingResult
 */
import { Entity } from '../../es6/Entity.js';

export class CourseMergeOfferingEntity extends Entity {
	ownedByMultipleSourceSystems() {
		return this._entity?.properties?.ownedByMultipleSourceSystems;
	}
	orgUnitId() {
		return this._entity?.properties?.orgUnitId;
	}
	_organizationHref() {
		// TODO: Figure this out
	}
}
