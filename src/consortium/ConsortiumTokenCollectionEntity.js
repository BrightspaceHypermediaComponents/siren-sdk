'use strict';

import { Entity } from '../es6/Entity.js';
import { Classes } from '../hypermedia-constants.js';
import { entityFactory } from '../es6/EntityFactory.js';
import { ConsortiumTokenEntity } from './ConsortiumTokenEntity.js';
/**
 * Collection of {@link ConsortiumTokenEntity}
 * @class
 */
export class ConsortiumTokenCollectionEntity extends Entity {
	/**
	 * @returns array of {@link ConsortiumTokenEntity}
	 */
	consortiumTokenEntities(onChange) {
		const entities = (this._entity && this._entity.getSubEntitiesByClass(Classes.consortium.token)) || [];
		return entities.map((entity) => {
			this._subEntityByEntity(ConsortiumTokenEntity, entity, onChange);
		});
	}
}
