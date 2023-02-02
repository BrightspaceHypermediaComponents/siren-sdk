import { Entity } from '../../es6/Entity.js';
import { RestrictedTopicEntity } from './RestrictedTopicEntity.js';

export class RestrictedTopicCollectionEntity extends Entity {
	getRestrictedTopics() {
		if (!this._entity) return [];

		return (this._entity.getSubEntitiesByRel('item') || []).map(subEntity => {
			return new RestrictedTopicEntity(subEntity);
		});
	}
}
