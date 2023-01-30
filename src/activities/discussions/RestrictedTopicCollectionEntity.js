import { Classes } from '../../hypermedia-constants.js';
import { Entity } from '../../es6/Entity.js';
import { GroupEntity } from './GroupEntity.js';

export class RestrictedTopicCollectionEntity extends Entity {
	isSelected() {
		if (!this._entity) {
			return false;
		}
		return this._entity.hasClass(Classes.discussions.selected);
	}
	hasParentId() {
		if (!this._entity) {
			return false;
		}
		return typeof this._entity.properties?.parent !== 'undefined';
	}
	parentId() {
		if (!this._entity || !this.hasParentId()) {
			return null;
		}
		return this._entity.properties?.parent;
	}
	id() {
		if (!this._entity) {
			return null;
		}
		return this._entity.properties?.id;
	}
	nameHref() {
		return this._entity && this._entity.entities && this._entity.entities[0] && this._entity.entities[0].href;
	}
	onGroupChange(onChange) {
		if (!this._entity) return;

		const href = this.nameHref();
		if (!href) return;

		this._subEntity(GroupEntity, href, onChange);
	}
}
