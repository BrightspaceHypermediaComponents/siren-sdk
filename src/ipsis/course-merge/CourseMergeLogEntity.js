import { Entity } from '../../es6/Entity.js';
import { Rels } from '../../hypermedia-constants.js';

export class CourseMergeLogEntity extends Entity {
	orgUnitId() {
		return this._entity?.properties?.orgUnitId;
	}

	status() {
		return this._entity?.properties?.status;
	}

	organizationHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.organization)) {
			return;
		}
		return this._entity.getLinkByRel(Rels.organization).href;
	}

	courseMergeOfferingHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.ipsis.sisCourseMerge.courseMergeOffering)) {
			return;
		}
		return this._entity.getLinkByRel(Rels.ipsis.sisCourseMerge.courseMergeOffering).href;
	}
}
