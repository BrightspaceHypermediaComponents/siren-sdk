/**
 * CourseMergeLogDetailEntity class representation of course merge log as defined in the LMS
 * See: Not yet defined
 */
import { Entity } from '../../es6/Entity.js';
import { Classes } from '../../hypermedia-constants.js';

export class CourseMergeLogDetailEntity extends Entity {
	targetCourse() {
		if (!this._entity) {
			return;
		}
		return this._entity.getSubEntityByClass('target-log'); // Should this be changed to target since we already have a 'target' class?
	}

	user() {
		if (!this._entity) {
			return;
		}
		return this._entity.getSubEntityByClass(Classes.ipsis.sisCourseMerge.logUser);
	}

	isMerge() {
		return this._entity?.properties?.isMerge;
	}

	orgUnitId() {
		return this._entity?.properties?.orgUnitId;
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

	updateEntity(entity) {
		this._entity = entity;
	}
}
