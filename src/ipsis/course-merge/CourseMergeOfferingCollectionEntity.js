/**
 * CourseMergeOfferingCollectionEntity class representation of a list of course merge offering as defined in the LMS
 * See: ISirenCourseMergeSerializer.SerializeCourseOfferingListResult
 */
import { Entity } from '../../es6/Entity.js';
import { Rels } from '../../hypermedia-constants.js';

export class CourseMergeOfferingCollectionEntity extends Entity {
	courseMergeOfferings() {
		if (!this._entity) {
			return;
		}
		return this._entity.entities;
	}

	prependCourseMergeOfferings(previousCourseMergeOfferingCollectionEntity) {
		this._entity.entities.unshift(...previousCourseMergeOfferingCollectionEntity._entity.entities);
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

	loadMorePageSize() {
		const pageSize = this._pagingInfo()?.pageSize;
		const totalCount = this.totalCount() ?? 0;
		const courseMergeOfferingsLength = this.courseMergeOfferings()?.length ?? 0;
		// if pageSize is larger than the number remaining items, return the number of remaining items to be loaded
		if (totalCount < courseMergeOfferingsLength + (pageSize ?? 0)) {
			return totalCount - courseMergeOfferingsLength;
		}
		return pageSize;
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

	updateEntity(entity) {
		this._entity = entity;
	}
}

