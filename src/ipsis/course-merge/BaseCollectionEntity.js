import { Entity } from '../../es6/Entity.js';

export class BaseCollectionEntity extends Entity {
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
}

