'use strict';

import { Entity } from '../../es6/Entity.js';

/**
 * AssignmentEntity class representation of a d2l Assignment.
 */
export class AssignmentEntity extends Entity {
	name() {
		return this._entity && this._entity.properties && this._entity.properties.name;
	}
}

