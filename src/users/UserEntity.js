import { Entity } from '../es6/Entity.js';
import { Rels, Actions } from '../hypermedia-constants';

export class UserEntity extends Entity {
	_getName(rel) {
		if (!this._entity.hasSubEntityByRel(rel)) {
			return '';
		}
		return this._entity.getSubEntityByRel(rel).properties.name;
	}

	hasDisplayName() {
		return this._entity.hasSubEntityByRel(Rels.displayName);
	}

	getDisplayName() {
		return this._getName(Rels.displayName);
	}

	hasFirstName() {
		return this._entity.hasSubEntityByRel(Rels.firstName);
	}

	getFirstName() {
		return this._getName(Rels.firstName);
	}

	hasLastName() {
		return this._entity.hasSubEntityByRel(Rels.lastName);
	}

	getLastName() {
		return this._getName(Rels.lastName);
	}
}
