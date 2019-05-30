'use strict';

import { Entity } from '../es6/Entity.js';
import { Classes } from '../hypermedia-constants.js';

/**
 * Collection of {@link ConsortiumTokenEntity}
 * @class
 */
export class ConsortiumTokenCollectionEntity extends Entity {
	/**
	 * @returns array of siren consortium entities, can be used to create {@link ConsortiumTokenEntity}
	 */
	consortiumTokenEntities() {
		return this._entity && this._entity.getSubEntitiesByClass(Classes.consortium.token);

	}
}
