'use strict';

import { ChecklistEntity } from './ChecklistEntity.js';
import { Entity } from '../../es6/Entity.js';
import { Rels } from '../../hypermedia-constants';

/**
 * ChecklistActivityUsageEntity class representation of a d2l ChecklistActivityUsage.
 */
export class ChecklistActivityUsageEntity extends Entity {
	checklistHref() {
		if (!this._entity || !this._entity.hasLinkByRel(/*todo*/)) {
			return;
		}

		return this._entity.getLinkByRel(/*todo*/).href;
	}

	onChecklistChange(onChange) {
		const checklistHref = this.checklistHref();
		checklistHref && this._subEntity(ChecklistEntity, checklistHref, onChange);
	}
}
