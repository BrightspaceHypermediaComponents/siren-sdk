/**
 * CourseMergeOfferingCollectionEntity class representation of a list of course merge offering as defined in the LMS
 * See: ISirenCourseMergeSerializer.SerializeCourseOfferingListResult
 */
import { Actions, Rels } from '../../hypermedia-constants.js';
import { Entity } from '../../es6/Entity.js';

export class CourseMergeOfferingCollectionEntity extends Entity {
	courseMergeOfferings() {
		if (!this._entity) {
			return;
		}
		return this._entity.getSubEntitiesByRel(Rels.IPSIS.SISCourseMerge.courseMergeOffering);
	}

	userOwnedByMultipleSourceSystems() {
		return this._entity?.properties?.userOwnedByMultipleSourceSystems;
	}

	canMergeCourses() {
		return this._entity?.properties?.canMergeCourses;
	}

	totalCount() {
		return this._pagingInfo()?.totalCount;
	}

	page() {
		return this._pagingInfo()?.page;
	}

	pageSize() {
		return this._pagingInfo()?.pageSize;
	}

	_pagingInfo() {
		return this._entity?.properties?.pagingInfo;
	}

	hasNextPage() {
		return this._entity.hasLinkByRel('next');
	}

	hasPrevPage() {
		return this._entity.hasLinkByRel('prev');
	}

	nextPageHref() {
		if (!this.hasNextPage()) {
			return;
		}

		return this._entity.getLinkByRel('next').href;
	}

	prevPageHref() {
		if (!this.hasPrevPage()) {
			return;
		}

		return this._entity.getLinkByRel('prev').href;
	}

	filtersHref() {
		if (!this._entity.hasLinkByRel(Rels.filters)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.filters).href;
	}

	hasSearchAction() {
		return this._entity.hasActionByName(Actions.ipsis.sisCourseMerge.searchCourseOfferings);
	}

	getSearchAction() {
		if (!this.hasSearchAction()) {
			return;
		}

		return this._entity.getActionByName(Actions.ipsis.sisCourseMerge.searchCourseOfferings);
	}

	updateEntity(entity) {
		this._entity = entity;
	}
}

