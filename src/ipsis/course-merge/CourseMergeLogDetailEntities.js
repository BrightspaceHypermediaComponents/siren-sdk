/**
 * CourseMergeLogDetailEntities class representation of course merge logs as defined in the LMS
 * See: Not yet defined
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
