import { Entity } from '../../es6/Entity.js';
import { Rels } from '../../hypermedia-constants.js';

export class CourseMergeRootEntity extends Entity {
	courseMergeOfferingsListHref() {
		if (!this._entity?.hasLinkByRel(Rels.ipsis.sisCourseMerge.courseMergeOfferings)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.ipsis.sisCourseMerge.courseMergeOfferings).href;
	}
}
