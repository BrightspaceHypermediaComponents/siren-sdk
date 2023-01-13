/**
 * CourseMergeMergedOfferingCollectionEntity class representation of a list of course merge merged offerings as defined in the LMS
 * See: ISirenCourseMergeSerializer.SerializeMergedCoursesListResult
 */
import { Actions, Classes } from '../../hypermedia-constants.js';
import { Entity } from '../../es6/Entity.js';
import { performSirenAction } from '../../es6/SirenAction.js';

export class CourseMergeMergedOfferingCollectionEntity extends Entity {
	originalSourceCourseMergeOfferings() {
		return this._entity?.entities?.filter(course => !course.class.includes(Classes.ipsis.originalTarget));
	}

	originalTargetCourseMergeOffering() {
		return this._entity?.getSubEntitiesByClass(Classes.ipsis.originalTarget)?.[0];
	}

	userOwnedByMultipleSourceSystems() {
		return this._entity?.properties?.userOwnedByMultipleSourceSystems;
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

