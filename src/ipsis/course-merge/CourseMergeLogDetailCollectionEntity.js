/**
 * CourseMergeLogDetailCollectionEntity class representation of course merge log collection as defined in the LMS
 * See: ISirenCourseMergeSerializer.SerializeCourseMergeLogDetailsListResult
 */
import { Entity } from '../../es6/Entity.js';

export class CourseMergeLogDetailCollectionEntity extends Entity {
	getCourseMergeLogs() {
		return this._entity?.entities;
	}

	hasCourseMergeLogs() {
		return this._entity?.entities?.length > 0;
	}

	canGetLogs() {
		return this._entity?.properties?.canGetLogs;
	}
}
