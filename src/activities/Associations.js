import { Entity } from '../es6/Entity.js';
import { Classes } from '../hypermedia-constants';

/**
 * Associations class representation of  associations.
 */

export class Associations extends Entity {

	getSingleAssocationHrefs() {
		if (!this._entity) {
			return [];
		}

		const singleAssociations = this._entity.getSubEntitiesByClass(Classes.associations.singleAssociation);
		const singleAssociationsHrefs = [];
		singleAssociations.forEach(a => {
			singleAssociationsHrefs.push(a.getLinkByRel('self').href);
		});

		return singleAssociationsHrefs;

	}

}
