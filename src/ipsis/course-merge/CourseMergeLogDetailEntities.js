/**
 * CourseMergeOfferingEntity class representation of course merge offering as defined in the LMS
 * See: ISirenCourseMergeSerializer.SerializeCourseOfferingResult
 */
import { Entity } from '../../es6/Entity.js';

export class CourseMergeLogDetailEntities extends Entity {
	courseMergeLogs() {
		if (!this._entity) {
			return;
		}
		return this._entity.entities;
	}
}
