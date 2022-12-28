import { Classes } from '../../hypermedia-constants.js';
import { Entity } from '../../es6/Entity.js';

export class RestrictedTopicTileEntity extends Entity {
	isGroupCategory() {
		if (!this._entity) {
			return false;
		}
		return this._entity.hasClass(Classes.discussions.groupCategory);
	}
	isAllGroups() {
		if (!this._entity) {
			return false;
		}
		return this._entity.hasClass(Classes.discussions.allGroups);
	}
	isSection() {
		if (!this._entity) {
			return false;
		}
		return this._entity.hasClass(Classes.discussions.section);
	}
	isAllSections() {
		if (!this._entity) {
			return false;
		}
		return this._entity.hasClass(Classes.discussions.allSections);
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
