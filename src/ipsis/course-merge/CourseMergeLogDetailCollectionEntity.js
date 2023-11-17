/**
 * CourseMergeLogDetailCollectionEntity class representation of course merge log collection as defined in the LMS
 * See: ISirenCourseMergeSerializer.SerializeCourseMergeLogDetailsListResult
 */
import { BaseCollectionEntity } from './BaseCollectionEntity.js';

export class CourseMergeLogDetailCollectionEntity extends BaseCollectionEntity {
	getCourseMergeLogs() {
		return this._entity?.entities;
	}

	hasCourseMergeLogs() {
		return this._entity?.entities?.length > 0;
	}

	canGetLogs() {
		return this._entity?.properties?.canGetLogs;
	}

	loadMorePageSize() {
		return super.loadMorePageSize(() => this.getCourseMergeLogs);
	}
}
