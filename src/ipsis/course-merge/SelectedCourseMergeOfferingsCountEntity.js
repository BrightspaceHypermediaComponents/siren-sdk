/**
 * SelectedCourseMergeOfferingsCountEntity class representation of a selected course merge offerings number as defined in the LMS
 * See: ISirenCourseMergeSerializer.SerializeSelectedCourseOfferingsCountResult
 */
import { Entity } from '../../es6/Entity.js';

export class SelectedCourseMergeOfferingsCountEntity extends Entity {
	getSelectedCount() {
		return this._entity?.properties?.selectedCount;
	}
}
