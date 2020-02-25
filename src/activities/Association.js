import { Entity } from '../es6/Entity.js';
import { Actions, Rels } from '../hypermedia-constants';
import { performSirenAction } from '../es6/SirenAction';

/**
 * Association class representation of an association.
 */

export class Association extends Entity {

	getRubricLink() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.Rubrics.rubric)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.Rubrics.rubric).href;

	}

	async deleteAssociation(){
		if (!this._entity || !this._entity.hasActionByName(Actions.associations.deleteAssociation)) {
			return;
		}

		const action = this._entity.getActionByName(Actions.associations.deleteAssociation);
		await performSirenAction(this._token, action);
	}

}
