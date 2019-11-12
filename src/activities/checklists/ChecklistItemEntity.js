'use strict';

import { Entity } from '../../es6/Entity';
import { Actions } from '../../hypermedia-constants';
import { performSirenAction } from '../../es6/SirenAction';

/**
 * ChecklistItemEntity class representation of a d2l Checklist Item.
 */
export class ChecklistItemEntity extends Entity {
	canDelete() {
		return this._entity && this._entity.hasActionByName(/*todo*/);
	}

	async delete() {
		const action = this.canDelete() && this._entity.getActionByName(/*todo*/);
		if (!action) {
			return;
		}
		await performSirenAction(this._token, action);
	}

	name() {
		return this._entity && this._entity.properties && this._entity.properties.name;
	}
}
