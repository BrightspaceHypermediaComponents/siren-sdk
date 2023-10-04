import { Entity } from '../../../es6/Entity.js';

export class CollectedObjectEntity extends Entity {
	sortOrder() {
		return this._entity?.properties?.SortOrder;
	}
	completionType() {
		return this._entity?.properties?.Completion;
	}
	collectedObjectHref() {
		return this._entity?.getLinkByRel('self')?.href;
	}
}
