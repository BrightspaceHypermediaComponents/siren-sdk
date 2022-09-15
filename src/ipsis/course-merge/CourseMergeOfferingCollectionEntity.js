/**
 * CourseMergeOfferingCollectionEntity class representation of a list of course merge offering as defined in the LMS
 * See: ISirenCourseMergeSerializer.SerializeCourseOfferingListResult
 */
import { Actions, Rels } from '../../hypermedia-constants.js';
import { Entity } from '../../es6/Entity.js';

export class CourseMergeOfferingCollectionEntity extends Entity {

	getCurrentOfferings() {
		if (!this._entity) {
			return;
		}
		return this._entity.entities;
	}

	courseMergeOfferings() {
		if (!this.offerings) {
			this.offerings = this._entity.entities.map((entity) => ({
				href: entity.href,
				hidden: false
			}));
		}
		return this.offerings;
	}

	_removeDuplicatesAndAddNewEntities(newEntities) {
		// Remove to be duplicated entities - todo: performance concern?
		for (let newEntity of newEntities) {
			this.offerings = this.offerings.filter((existingEntity) => existingEntity.href !== newEntity.href);
		}

		// Add new entities
		this.offerings = this.offerings.concat(newEntities.map((entity) => ({
			href: entity.href,
			hidden: false
		})));
	}

	prependCourseMergeOfferings(previousCourseMergeOfferingCollectionEntity) {
		this.offerings = previousCourseMergeOfferingCollectionEntity.courseMergeOfferings();
		this._removeDuplicatesAndAddNewEntities(this._entity.entities);
	}

	updateEntity(entity) {
		// Hide old entities
		for (let oldEntity of this.offerings) {
			oldEntity.hidden = true;
		}

		this._removeDuplicatesAndAddNewEntities(entity.entities);


		this._entity = entity;
	}

	userOwnedByMultipleSourceSystems() {
		return this._entity?.properties?.userOwnedByMultipleSourceSystems;
	}

	canMergeCourses() {
		return this._entity?.properties?.canMergeCourses;
	}

	selectedCount() {
		return this._entity?.properties?.selectedCount;
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

	hasSearchAction() {
		return this._entity.hasActionByName(Actions.ipsis.sisCourseMerge.searchCourseOfferings);
	}

	getSearchAction() {
		if (!this.hasSearchAction()) {
			return;
		}

		return this._entity.getActionByName(Actions.ipsis.sisCourseMerge.searchCourseOfferings);
	}

}

