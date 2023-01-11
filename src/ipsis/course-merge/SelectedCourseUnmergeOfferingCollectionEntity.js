import { Actions } from '../../hypermedia-constants.js';
import { Entity } from '../../es6/Entity.js';
import { performSirenAction } from '../../es6/SirenAction.js';

export class SelectedCourseUnmergeOfferingCollectionEntity extends Entity {

	hasUnmergeAction() {
		return this._entity.hasActionByName(Actions.ipsis.sisCourseMerge.unmergeCourseOfferings);
	}

	getUnmergeAction() {
		if (!this.hasUnmergeAction()) {
			return;
		}

		return this._entity.getActionByName(Actions.ipsis.sisCourseMerge.unmergeCourseOfferings);
	}

	async unmerge() {
		const action = this.getUnmergeAction();
		if (!action) {
			return;
		}

		return await performSirenAction(this._token, action, null, true);
	}
}

