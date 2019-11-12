'use strict';

import { Entity } from '../../es6/Entity';
import { Actions, Classes } from '../../hypermedia-constants';
import { performSirenAction } from '../../es6/SirenAction';

/**
 * ChecklistEntity class representation of a d2l Checklist.
 */
export class ChecklistEntity extends Entity {
	canAddCategory() {
		return this._entity && this._entity.hasActionByName(/*todo*/);
	}

	addCategory() {
		const action = this.canAddCategory() && this._entity.getActionByName(/*todo*/);
		if (!action) {
			return;
		}
		return performSirenAction(this._token, action);
	}

	categories() {
		return this._entity.getSubEntitiesByClass(/*todo*/).map(entity => entity.href);
	}
}
