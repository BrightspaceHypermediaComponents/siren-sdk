/**
 * CourseMergeLogDetailCollectionEntity class representation of course merge log collection as defined in the LMS
 * See: ISirenCourseMergeSerializer.SerializeCourseMergeLogDetailsListResult
 */
import { Actions, Rels } from '../../hypermedia-constants.js';
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

	filtersHref() {
		if (!this._entity.hasLinkByRel(Rels.filters)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.filters).href;
	}

	hasTimeFilterAction() {
		return this._entity?.hasActionByName(Actions.ipsis.sisCourseMerge.timeFilter);
	}

	getTimeFilterAction() {
		if (!this.hasTimeFilterAction()) {
			return;
		}

		return this._entity.getActionByName(Actions.ipsis.sisCourseMerge.timeFilter);
	}

	async timeFilter(startTime, endTime) {
		const action = this.getTimeFilterAction();
		if (!action) {
			return;
		}

		const fields = [
			{ name: 'startTime', value: startTime },
			{ name: 'endTime', value: endTime }
		];
		
		return await performSirenAction(this._token, action, fields, true);
	}
}
