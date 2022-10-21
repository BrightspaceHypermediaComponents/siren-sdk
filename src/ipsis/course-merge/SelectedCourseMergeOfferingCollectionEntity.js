/**
 * SelectedCourseMergeOfferingCollectionEntity class representation of a list of course merge offering as defined in the LMS
 * See: ISirenCourseMergeSerializer.SerializeSelectedCourseOfferingListResult
 */
import { Actions } from '../../hypermedia-constants.js';
import { Entity } from '../../es6/Entity.js';
import { performSirenAction } from '../../es6/SirenAction.js';

export class SelectedCourseMergeOfferingCollectionEntity extends Entity {
	courseMergeOfferings() {
		if (!this._entity) {
			return;
		}
		return this._entity.entities;
	}

	selectedCourseMergeOffering() {
		return this._entity && this._entity.getSubEntitiesByClass('target');
	}

	hasMergeAction() {
		return this._entity.hasActionByName(Actions.ipsis.sisCourseMerge.mergeCourseOfferings);
	}

	getMergeAction() {
		if (!this.hasMergeAction()) {
			return;
		}

		return this._entity.getActionByName(Actions.ipsis.sisCourseMerge.mergeCourseOfferings);
	}

	async merge() {
		const action = this.getMergeAction();
		if (!action) {
			return;
		}

		return await performSirenAction(this._token, action, null, true);
	}
}

