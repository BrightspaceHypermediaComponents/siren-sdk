import { Classes } from '../hypermedia-constants';
import { Entity } from '../es6/Entity.js';

/**
 * Associations class representation of  associations.
 */

export class AssociationCollectionEntity extends Entity {

	getAllAssociations() {
		if (!this._entity) {
			return [];
		}

		let associations = this._entity.getSubEntitiesByRel('item');

		return associations.filter(
			a => a.hasClass(Classes.associations.singleAssociation)
			|| a.hasClass(Classes.associations.potentialAssociation)
		);

	}

}
export const Associations = AssociationCollectionEntity;
