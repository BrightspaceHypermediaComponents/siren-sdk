/**
 * CourseMergeOfferingCollectionEntity class representation of a list of course merge offering as defined in the LMS
 * See: ISirenCourseMergeSerializer.SerializeCourseOfferingListResult
 */
import { Actions, Rels } from '../../hypermedia-constants.js';
import { BaseCollectionEntity } from './BaseCollectionEntity.js';

export class CourseMergeOfferingCollectionEntity extends BaseCollectionEntity {
	courseMergeOfferings() {
		if (!this._entity) {
			return;
		}
		return allEntities ?? this._entity.entities;
	}

	prependCourseMergeOfferings(previousCourseMergeOfferingCollectionEntity) {
		this.allEntities = previousCourseMergeOfferingCollectionEntity.courseMergeOfferings().concat(this._entity.entities);
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

	filtersHref() {
		if (!this._entity.hasLinkByRel(Rels.filters)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.filters).href;
	}

	selectedCourseMergeOfferingsHref() {
		if (!this._entity.hasLinkByRel(Rels.ipsis.sisCourseMerge.selectedCourseMergeOfferings)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.ipsis.sisCourseMerge.selectedCourseMergeOfferings).href;
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
		this.allEntities = null;
	}
}

