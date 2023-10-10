/**
 * CourseMergeLogDetailEntity class representation of course merge log as defined in the LMS
 * See: ISirenCourseMergeSerializer.SerializeCourseMergeLogDetailsListResult
 */
import { Classes } from '../../hypermedia-constants.js';
import { Entity } from '../../es6/Entity.js';

export class CourseMergeLogDetailEntity extends Entity {
	targetCourse() {
		return this._entity?.getSubEntityByClass(Classes.ipsis.sisCourseMerge.targetLog);
	}

	user() {
		return this._entity?.getSubEntityByClass(Classes.ipsis.sisCourseMerge.logUser);
	}

	isMerge() {
		return this._entity?.properties?.isMerge;
	}

	status() {
		return this._entity?.properties?.status;
	}

	mergeStartDateTime() {
		return this._entity?.properties?.mergeStartDateTime;
	}

	mergeEndDateTime() {
		return this._entity?.properties?.mergeEndDateTime;
	}

	numMergedCourses() {
		return this._entity?.properties?.numMergedCourses;
	}
}
