import { Actions } from '../hypermedia-constants.js';
import { Entity } from '../es6/Entity.js';
import { performSirenAction } from '../es6/SirenAction.js';

/**
 * Entity representation of a collection of alignments
 */
export class AlignmentsCollectionEntity extends Entity {

	getAlignments() {
		return (this._entity && this._entity.getSubEntitiesByRel('item')) || [];
	}

	canUpdateAlignments() {
		return this._entity && this._entity.hasActionByName(Actions.alignments.startUpdateAlignments);
	}

	hasSubmitAction() {
		return this._entity && this._entity.hasActionByName(Actions.alignments.submit);
	}

	save() {
		const submitAction = this._entity.getActionByName(Actions.alignments.submit);
		return submitAction && performSirenAction(this._token, submitAction);
	}
}
