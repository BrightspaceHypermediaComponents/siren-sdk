import { Entity } from '../es6/Entity.js';

/**
 * Associations class representation of  associations.
 */

export class AssociationCollectionEntity extends Entity {

	getAllAssociations() {
		if (!this._entity) {
			return [];
		}

		return this._entity.getSubEntitiesByRel('item');

	}

}
export const Associations = AssociationCollectionEntity;
