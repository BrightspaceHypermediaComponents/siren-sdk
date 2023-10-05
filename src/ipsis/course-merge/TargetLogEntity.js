import { Entity } from '../../es6/Entity.js';
import { Rels } from '../../hypermedia-constants.js';

export class TargetLogEntity extends Entity {
	orgUnitId() {
		return this._entity?.properties?.orgUnitId;
	}

	organizationHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.organization)) {
			return;
		}
		return this._entity.getLinkByRel(Rels.organization).href;
	}
}
