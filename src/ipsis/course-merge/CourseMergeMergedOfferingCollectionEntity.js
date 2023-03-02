/**
 * CourseMergeMergedOfferingCollectionEntity class representation of a list of course merge merged offerings as defined in the LMS
 * See: ISirenCourseMergeSerializer.SerializeMergedCoursesListResult
 */
import { Actions, Classes, Rels } from '../../hypermedia-constants.js';
import { BaseCollectionEntity } from './BaseCollectionEntity.js';
import { performSirenAction } from '../../es6/SirenAction.js';

export class CourseMergeMergedOfferingCollectionEntity extends BaseCollectionEntity {
	originalSourceCourseMergeOfferings() {
		return this.courseMergeOfferings()?.filter(course => !course.class.includes(Classes.ipsis.sisCourseMerge.originalTarget));
	}

	originalTargetCourseMergeOffering() {
		return this._entity?.getSubEntitiesByClass(Classes.ipsis.sisCourseMerge.originalTarget)?.[0];
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

	selectedCount() {
		return this._entity?.properties?.selectedCount;
	}

	unmerge() {
		const action = this.getUnmergeAction();
		if (!action) {
			return;
		}

		return performSirenAction(this._token, action, null, true);
	}
}

