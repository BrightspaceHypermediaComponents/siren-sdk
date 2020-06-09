import { Actions } from '../hypermedia-constants';
import { Entity } from '../es6/Entity';
import { performSirenAction } from '../es6/SirenAction';

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

	save() {
		const submitAction = this._entity.getActionByName(Actions.alignments.submit);
		return submitAction && performSirenAction(this._token, submitAction);
	}
}
