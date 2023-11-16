import { BaseCollectionEntity } from './BaseCollectionEntity.js';

export class CourseMergeOfferingBaseCollectionEntity extends BaseCollectionEntity {

	courseMergeOfferings() {
		if (!this._entity) {
			return;
		}
		return this._entity.entities;
	}

	loadMorePageSize() {
		return super.loadMorePageSize(this.courseMergeOfferings);
	}

}
