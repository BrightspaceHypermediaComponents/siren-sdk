import { Entity } from '../es6/Entity.js';
import { Actions, Classes, Rels } from '../hypermedia-constants';
import { performSirenAction } from '../es6/SirenAction';

/**
 * Association class representation of an association.
 */
export class AssociationEntity extends Entity {

	/**
	 * @returns {string} Returns the rubric href of the association
	 */
	getRubricLink() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.Rubrics.rubric)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.Rubrics.rubric).href;

	}

	/**
	 * @returns {bool} Returns whether or not the association is a single-association
	 */
	isSingleAssociation() {
		if (!this._entity) {
			return false;
		}

		return this._entity.hasClass(Classes.associations.singleAssociation);
	}

	canDeleteAssociation() {
		if (!this._entity) {
			return false;
		}

		return this._entity.hasActionByName(Actions.associations.deleteAssociation);
	}

	/**
	 * Deletes the association
	 */
	async deleteAssociation({ defer = false } = {}) {
		const actionName = defer ? Actions.associations.deleteAssociationDeferred : Actions.associations.deleteAssociation;
		if (!this._entity || !this._entity.hasActionByName(actionName)) {
			return;
		}

		const action = this._entity.getActionByName(actionName);
		await performSirenAction(this._token, action);
	}

	/**
	 * Create the association
	 */
	async createAssociation({ defer = false } = {}) {
		const actionName = defer ? Actions.associations.createAssociationDeferred : Actions.associations.createAssociation;
		if (!this._entity || !this._entity.hasActionByName(actionName)) {
			return;
		}

		const action = this._entity.getActionByName(actionName);
		await performSirenAction(this._token, action);
	}

}
export const Association = AssociationEntity;
