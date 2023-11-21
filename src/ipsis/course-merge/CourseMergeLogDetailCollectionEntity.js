/**
 * CourseMergeLogDetailCollectionEntity class representation of course merge log collection as defined in the LMS
 * See: ISirenCourseMergeSerializer.SerializeCourseMergeLogDetailsListResult
 */
import { Actions } from '../../hypermedia-constants.js';
import { BaseCollectionEntity } from './BaseCollectionEntity.js';

export class CourseMergeLogDetailCollectionEntity extends BaseCollectionEntity {
	getCourseMergeLogs() {
		return this._entity?.entities;
	}

	hasCourseMergeLogs() {
		return this._entity?.entities?.length > 0;
	}

	hasSearchAction() {
		return this._entity.hasActionByName(Actions.ipsis.sisCourseMerge.searchCourseMergeLogs);
	}

	getSearchAction() {
		if (!this.hasSearchAction()) {
			return;
		}

		return this._entity.getActionByName(Actions.ipsis.sisCourseMerge.searchCourseMergeLogs);
	}

	canGetLogs() {
		return this._entity?.properties?.canGetLogs;
	}

	loadMorePageSize() {
		return super.loadMorePageSize(this.getCourseMergeLogs.bind(this));
	}
}
