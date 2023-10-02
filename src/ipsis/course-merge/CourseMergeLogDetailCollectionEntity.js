/**
 * CourseMergeLogDetailEntities class representation of course merge logs as defined in the LMS
 * See: Not yet defined
 */
import { Entity } from '../../es6/Entity.js';

export class CourseMergeLogDetailCollectionEntity extends Entity {
	getCourseMergeLogs() {
		if (!this._entity) {
			return;
		}
		return this._entity.entities;
	}

	hasCourseMergeLogs() {
		if (!this._entity) {
			return false;
		}
		return this._entity.entities?.length > 0;
	}
}
