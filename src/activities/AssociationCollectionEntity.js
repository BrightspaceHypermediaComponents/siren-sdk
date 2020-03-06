import { Entity } from '../es6/Entity.js';
import { Classes } from '../hypermedia-constants';

/**
 * Associations class representation of  associations.
 */

export class AssociationCollectionEntity extends Entity {

	getAllAssociations() {
		if (!this._entity) {
			return [];
		}

		const associations = this._entity.getSubEntitiesByClass(
			Classes.associations.singleAssociation
		);

		const potentialAssociations = this._entity.getSubEntitiesByClass(
			Classes.associations.potentialAssociation
		);

		potentialAssociations.forEach(potential => associations.push(potential));

		return associations;
	}

}
