import { BaseCollectionEntity } from './BaseCollectionEntity.js';

export class CourseMergeOfferingBaseCollectionEntity extends BaseCollectionEntity {

    courseMergeOfferings() {
		if (!this._entity) {
			return;
		}
		return this._entity.entities;
	}

    loadMorePageSize() {
		const pageSize = 20;
		const totalCount = this.totalCount() ?? 0;
		const courseMergeOfferingsLength = this.courseMergeOfferings()?.length ?? 0;
		// if pageSize is larger than the number remaining items, return the number of remaining items to be loaded
		if (totalCount < courseMergeOfferingsLength + pageSize) {
			return totalCount - courseMergeOfferingsLength;
		}
		return pageSize;
	}

	
}
