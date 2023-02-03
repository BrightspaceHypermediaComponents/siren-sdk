import { Actions, Rels } from '../../hypermedia-constants.js';
import { Entity } from '../../es6/Entity.js';
import { getEntityUrl } from '../../es6/SirenAction.js';

export class CourseMergeRootEntity extends Entity {
	courseMergeOfferingsListHref() {
		if (!this._entity?.hasLinkByRel(Rels.ipsis.sisCourseMerge.courseMergeOfferings)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.ipsis.sisCourseMerge.courseMergeOfferings).href;
	}

	getCourseMergeMergedOfferingAction() {
		if (!this._entity.hasActionByName(Actions.ipsis.sisCourseMerge.mergedCourseOffering)) {
			return;
		}

		return this._entity.getActionByName(Actions.ipsis.sisCourseMerge.mergedCourseOffering);
	}

	courseMergeMergedOfferingHref(orgUnitId) {
		const action = this.getCourseMergeMergedOfferingAction();
		if (!action) {
			return;
		}

		return getEntityUrl(action, [{ name: 'orgUnitId', value: orgUnitId }]);
	}
}
