import { Actions, Classes } from '../hypermedia-constants.js';
import { Entity } from '../es6/Entity.js';
import { performSirenAction } from '../es6/SirenAction.js';
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

	canCreatePotentialAssociation() {
		if (!this._entity) {
			return false;
		}

		return this._entity.hasActionByName(Actions.associations.createPotentialAssociation);
	}

	canCreateAssociation() {
		if (!this._entity) {
			return false;
		}

		return this._entity.hasActionByName(Actions.associations.createAssociation);
	}

	async createPotentialAssociation() {
		if (!this._entity || !this._entity.hasActionByName(Actions.associations.createPotentialAssociation)) {
			return;
		}

		const fields = [
			{ name: 'type', value: 'rubrics' }
		];

		const action = this._entity.getActionByName(Actions.associations.createPotentialAssociation);

		return await performSirenAction(this._token, action, fields);
	}

}
export const Associations = AssociationCollectionEntity;
