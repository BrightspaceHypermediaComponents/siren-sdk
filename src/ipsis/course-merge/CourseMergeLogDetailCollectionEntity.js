/**
 * CourseMergeLogDetailCollectionEntity class representation of course merge log collection as defined in the LMS
 * See: ISirenCourseMergeSerializer.SerializeCourseMergeLogDetailsListResult
 */
import { Actions, Rels } from '../../hypermedia-constants.js';
import { getEntityUrl, getSirenFields } from '../../es6/SirenAction.js';
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

	hasSortAction() {
		return this._entity.hasActionByName(Actions.ipsis.sisCourseMerge.sortCourseMergeLogsByStartTime);
	}

	getSortAction() {
		if (!this.hasSortAction()) {
			return;
		}

		return this._entity.getActionByName(Actions.ipsis.sisCourseMerge.sortCourseMergeLogsByStartTime);
	}

	courseMergeLogsSortHref(sort) {
		const action = this.getSortAction();
		if (!action) {
			return;
		}

		const fields = [{ name: 'sortByStartTimeAsc', value: sort }];
		const existingFields = getSirenFields(action);

		return getEntityUrl(action, [...existingFields, ...fields]);
	}

	canGetLogs() {
		return this._entity?.properties?.canGetLogs;
	}

	dataHubHref() {
		if (!this._entity.hasLinkByRel(Rels.dataHub)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.dataHub).href;
	}

	loadMorePageSize() {
		return super.loadMorePageSize(this.getCourseMergeLogs.bind(this));
	}

	isFiltered() {
		return this._entity?.properties?.isFiltered;
	}

	isSortAscending() {
		return this._entity?.properties?.sortByStartTimeAsc;
	}

	filtersHref() {
		if (!this._entity.hasLinkByRel(Rels.filters)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.filters).href;
	}
}
