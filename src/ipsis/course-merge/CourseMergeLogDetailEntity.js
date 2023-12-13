/**
 * CourseMergeLogDetailEntity class representation of course merge log as defined in the LMS
 * See: ISirenCourseMergeSerializer.SerializeCourseMergeLogDetailsListResult
 */
import { Classes, Rels } from '../../hypermedia-constants.js';
import { Entity } from '../../es6/Entity.js';

export class CourseMergeLogDetailEntity extends Entity {
	targetCourse() {
		return this._entity?.getSubEntityByClass(Classes.ipsis.sisCourseMerge.targetLog);
	}

	sourceCourses() {
		return this._entity?.getSubEntitiesByClass(Classes.ipsis.sisCourseMerge.sourceLog);
	}

	userHref() {
		return this._entity?.getSubEntityByClass(Classes.ipsis.sisCourseMerge.logUser)?.getLinkByRel(Rels.ipsis.sisCourseMerge.logUser)?.href;
	}

	jobType() {
		return this._entity?.properties?.jobType;
	}

	status() {
		return this._entity?.properties?.status;
	}

	batchId() {
		return this._entity?.properties?.batchId;
	}

	batchStartDateTime() {
		return this._entity?.properties?.batchStartDateTime;
	}

	batchFinishDateTime() {
		return this._entity?.properties?.batchFinishDateTime;
	}

	numMergedCourses() {
		return this._entity?.properties?.numMergedCourses;
	}
}
