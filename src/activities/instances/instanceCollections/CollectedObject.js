import { Entity } from '../../../es6/Entity.js';

export class CollectedObjectEntity extends Entity {
	sortOrder() {
		if (!this._entity) {
			return false;
		}
		return this._entity.properties?.SortOrder;
	}
	completionType() {
		if (!this._entity) {
			return false;
		}
		return this._entity.properties?.Completion;
	}
	collectedObjectHref() {
		if (!this._entity || !this._entity.hasLinkByRel('self')) {
			return;
		}
		return this._entity.getLinkByRel('self').href;
	}
}
