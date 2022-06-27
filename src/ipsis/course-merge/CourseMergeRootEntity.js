import { CourseMergeOfferingListEntity } from './CourseMergeOfferingListEntity.js';
import { Entity } from '../../es6/Entity.js';
import { entityFactory } from '../../es6/EntityFactory.js';
import { Rels } from '../../hypermedia-constants.js';

export class CourseMergeRootEntity extends Entity {
	courseMergeOfferingsList(onChange) {
		const href = this._courseMergeOfferingsHref();
		if (!href) {
			return;
		}
		entityFactory(CourseMergeOfferingListEntity, href, this._token, onChange, null);
	}

	_courseMergeOfferingsHref() {
		if (!this._entity?.hasLinkByRel(Rels.IPSIS.SISCourseMerge.courseMergeOfferings)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.IPSIS.SISCourseMerge.courseMergeOfferings).href;
	}
}
