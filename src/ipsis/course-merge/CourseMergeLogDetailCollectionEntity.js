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
		const pageSize = 20;
		const totalCount = this.totalCount() ?? 0;
		const courseMergeLogsLength = this.getCourseMergeLogs()?.length ?? 0;
		// if pageSize is larger than the number remaining items, return the number of remaining items to be loaded
		if (totalCount < courseMergeLogsLength + pageSize) {
			return totalCount - courseMergeLogsLength;
		}
		return pageSize;
	}
}
