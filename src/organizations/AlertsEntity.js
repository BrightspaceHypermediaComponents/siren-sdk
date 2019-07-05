'use strict';

import { Entity } from '../es6/Entity.js';

/**
 * AlertsEntity class representation of a d2l notification alerts.
 */
export class AlertsEntity extends Entity {

	hasUnread() {
		return this._entity && this._entity.properties && this._entity.properties.hasUnread;
	}
}
