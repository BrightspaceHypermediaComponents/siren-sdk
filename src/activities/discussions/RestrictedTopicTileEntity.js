import { Classes } from '../../hypermedia-constants.js';
import { Entity } from '../../es6/Entity.js';

export class RestrictedTopicTileEntity extends Entity {
	isGroupCategory() {
		if (!this._entity) {
			return false;
		}
		return this._entity.hasClass(Classes.discussions.groupCategory);
	}
	isSection() {
		if (!this._entity) {
			return false;
		}
		return this._entity.hasClass(Classes.discussions.section);
	}
	name() {
		if (!this._entity) {
			return false;
		}
		return this._entity.properties?.name;
	}
	groupCount() {
		if (!this._entity) {
			return false;
		}
		return this._entity.properties?.groupCount;
	}
}
