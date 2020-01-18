import { Entity } from '../es6/Entity.js';
import { Classes } from '../hypermedia-constants.js';
import { ConsortiumTokenEntity } from './ConsortiumTokenEntity.js';

/**
 * Collection of {@link ConsortiumTokenEntity}
 * @hideconstructor
 * @extends Entity
 */
export class ConsortiumTokenCollectionEntity extends Entity {
	/**
	 *
	 * @param {function} onChange callback to call whenever a {@link ConsortiumTokenEntity} has been updated
	 */
	consortiumTokenEntities(onChange) {
		const tokenEntities = this._consortiumTokenEntities() || [];
		for (const entity of tokenEntities) {
			this._subEntity(ConsortiumTokenEntity, entity, onChange);
		}
	}
	/**
	 * @returns array of siren consortium entities, can be used to create {@link ConsortiumTokenEntity}
	 */
	_consortiumTokenEntities() {
		return this._entity && this._entity.getSubEntitiesByClass(Classes.consortium.token);
	}
}
