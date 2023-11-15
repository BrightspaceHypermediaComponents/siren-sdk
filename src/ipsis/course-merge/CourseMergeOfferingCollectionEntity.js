/**
 * CourseMergeOfferingCollectionEntity class representation of a list of course merge offering as defined in the LMS
 * See: ISirenCourseMergeSerializer.SerializeCourseOfferingListResult
 */
import { Actions, Rels } from '../../hypermedia-constants.js';
import { CourseMergeOfferingBaseCollectionEntity } from './CourseMergeOfferingBaseCollectionEntity.js';

export class CourseMergeOfferingCollectionEntity extends CourseMergeOfferingBaseCollectionEntity {
	userOwnedByMultipleSourceSystems() {
		return this._entity?.properties?.userOwnedByMultipleSourceSystems;
	}

	canMergeCourses() {
		return this._entity?.properties?.canMergeCourses;
	}

	isFiltered() {
		return this._entity?.properties?.isFiltered;
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
		if (!this.hasSelectedCourseMergeOfferingsHref ()) {
			return;
		}

		return this._entity.getLinkByRel(Rels.ipsis.sisCourseMerge.selectedCourseMergeOfferings).href;
	}

	hasSelectedCourseMergeOfferingsHref() {
		return this._entity.hasLinkByRel(Rels.ipsis.sisCourseMerge.selectedCourseMergeOfferings);
	}

	selectedCourseMergeOfferingsCountHref() {
		if (!this.hasSelectedCourseMergeOfferingsCountHref()) {
			return;
		}

		return this._entity.getLinkByRel(Rels.ipsis.sisCourseMerge.selectedCourseMergeOfferingsCount).href;
	}

	hasSelectedCourseMergeOfferingsCountHref() {
		return this._entity.hasLinkByRel(Rels.ipsis.sisCourseMerge.selectedCourseMergeOfferingsCount);
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

