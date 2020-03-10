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

	/**
	 * Deletes the association
	 */
	async deleteAssociation() {
		if (!this._entity || !this._entity.hasActionByName(Actions.associations.deleteAssociation)) {
			return;
		}

		const action = this._entity.getActionByName(Actions.associations.deleteAssociation);
		await performSirenAction(this._token, action);
	}

	/**
	 * Create the association
	 */
	async createAssociation() {
		if (!this._entity || !this._entity.hasActionByName(Actions.associations.createAssociation)) {
			return;
		}

		const action = this._entity.getActionByName(Actions.associations.createAssociation);
		await performSirenAction(this._token, action);
	}

}
export const Association = AssociationEntity;
