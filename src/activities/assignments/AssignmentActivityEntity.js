'use strict';

import { Entity } from '../../es6/Entity.js';

/**
 * AssignmentActivityEntity class representation of a d2l AssignmentActivity.
 */
export class AssignmentActivityEntity extends Entity {
	name() {
		return this._entity && this._entity.properties && this._entity.properties.name;
	}
}

