import { Classes } from '../../hypermedia-constants.js';
import { Entity } from '../../es6/Entity.js';
import { NamedEntity } from './NamedEntity.js';
import { performSirenAction } from '../../es6/SirenAction.js';

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
	async getName() {
		if (!this._entity) {
			return null;
		}

		const action = this.nameHref();

		const fields = [];
		const returnedEntity = await performSirenAction(this._token, action, fields, false, true);
		if (!returnedEntity) return;

		return new NamedEntity(returnedEntity);
	}
}
