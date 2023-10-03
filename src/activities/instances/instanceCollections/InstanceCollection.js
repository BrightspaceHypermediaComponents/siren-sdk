import { Classes } from '../../../hypermedia-constants.js';
import { Entity } from '../../../es6/Entity.js';

export class InstanceCollectionEntity extends Entity {
	collectedObjects() {
		return this._entity && this._entity.entities && this._entity.getSubEntitiesByClass(Classes.activities.collectedObject);
	}
	collectedInstanceCollections() {
		return this._entity && this._entity.entities && this._entity.getSubEntitiesByClass(Classes.activities.instanceCollection);
	}
	instanceCollectionHref() {
		if (!this._entity || !this._entity.hasLinkByRel('self')) {
			return;
		}

		return this._entity.getLinkByRel('self').href;
	}
}
