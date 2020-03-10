import { Classes } from '../hypermedia-constants';
import { Entity } from '../es6/Entity.js';

/**
 * Associations class representation of  associations.
 */

export class AssociationCollectionEntity extends Entity {

	getSingleAssocationHrefs() {
		if (!this._entity) {
			return [];
		}

		const singleAssociations = this._entity.getSubEntitiesByClass(
			Classes.associations.singleAssociation
		);
		const singleAssociationsHrefs = singleAssociations.map(
			a => a.getLinkByRel('self').href
		);

		return singleAssociationsHrefs;

	}

	getAllAssociations() {
		if (!this._entity) {
			return [];
		}

		const associations = this._entity.getSubEntitiesByRel('item');

		return associations.filter(
			a => a.hasClass(Classes.associations.singleAssociation)
			|| a.hasClass(Classes.associations.potentialAssociation)
		);

	}

}
export const Associations = AssociationCollectionEntity;
