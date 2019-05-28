'use strict';

import { Entity } from '../es6/Entity.js';

export class UserActivityUsageEntity extends Entity {
	completionDate() {
		if (!this._entity) {
			return;
		}
		return this._sirenClassProperty(this._entity, 'completion');
	}

	dueDate() {
		if (!this._entity) {
			return;
		}
		return this._sirenClassProperty(this._entity, 'due-date');
	}

	isCompletionDate() {
		return !!this.completionDate();
	}

	date() {
		const date = this.isCompletionDate() ? this.completionDate() : this.dueDate();
		return date;
	}

	isAttended() {
		return this.hasClass('attended');
	}

	_sirenClassProperty(entity, sirenClass) {
		if (!entity.hasSubEntityByClass(sirenClass)) {
			return;
		}
		var subEntity = entity.getSubEntityByClass(sirenClass);

		if (subEntity.hasClass('date')) {
			return subEntity.properties ? subEntity.properties.date : null;
		} else if (subEntity.hasClass('duration')) {
			return subEntity.properties ? subEntity.properties.seconds : null;
		} else if (subEntity.hasClass('completion')) {
			return this._sirenClassProperty(subEntity,  'completion-date');
		}
	}
}
