/**
 * CourseMergeMergedOfferingCollectionEntity class representation of a list of course merge merged offerings as defined in the LMS
 * See: ISirenCourseMergeSerializer.SerializeMergedCoursesListResult
 */
import { Actions, Classes, Rels } from '../../hypermedia-constants.js';
import { Entity } from '../../es6/Entity.js';
import { performSirenAction } from '../../es6/SirenAction.js';

export class CourseMergeMergedOfferingCollectionEntity extends Entity {
	originalSourceCourseMergeOfferings() {
		return this._entity?.entities?.filter(course => !course.class.includes(Classes.ipsis.sisCourseMerge.originalTarget));
	}

	originalTargetCourseMergeOffering() {
		return this._entity?.getSubEntitiesByClass(Classes.ipsis.sisCourseMerge.originalTarget)?.[0];
	}

	prependOriginalSourceCourseMergeOfferings(previousCourseMergeMergedOfferingCollectionEntity) {
		this._entity.entities.unshift(...previousCourseMergeMergedOfferingCollectionEntity.originalSourceCourseMergeOfferings());
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
		const pageSize = this.pageSize();
		const totalCount = this.totalCount() ?? 0;
		const courseMergeOfferingsLength = this._entity?.entities?.length ?? 0;
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

	userOwnedByMultipleSourceSystems() {
		return this._entity?.properties?.userOwnedByMultipleSourceSystems;
	}

	canUnmergeCourses() {
		return this._entity?.properties?.canUnmergeCourses;
	}

	courseMergeOfferingsHref() {
		if (!this._entity?.hasLinkByRel(Rels.ipsis.sisCourseMerge.courseMergeOfferings)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.ipsis.sisCourseMerge.courseMergeOfferings).href;
	}

	hasUnmergeAction() {
		return this._entity?.hasActionByName(Actions.ipsis.sisCourseMerge.unmergeCourseOfferings);
	}

	getUnmergeAction() {
		if (!this.hasUnmergeAction()) {
			return;
		}

		return this._entity.getActionByName(Actions.ipsis.sisCourseMerge.unmergeCourseOfferings);
	}

	unmerge() {
		const action = this.getUnmergeAction();
		if (!action) {
			return;
		}

		return performSirenAction(this._token, action, null, true);
	}
}

