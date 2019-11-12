'use strict';

import { Entity } from '../../es6/Entity';
import { Actions, Classes } from '../../hypermedia-constants';
import { performSirenAction } from '../../es6/SirenAction';

/**
 * ChecklistCategoryEntity class representation of a d2l Checklist Category.
 */
export class ChecklistCategoryEntity extends Entity {
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

	canAddItem() {
		return this._entity && this._entity.hasActionByName(/*todo*/);
	}

	addItem() {
		const action = this.canAddItem() && this._entity.getActionByName(/*todo*/);
		if (!action) {
			return;
		}
		return performSirenAction(this._token, action);
	}

	items() {
		return this._entity.getSubEntitiesByClass(/*todo*/).map(entity => entity.href);
	}
}
