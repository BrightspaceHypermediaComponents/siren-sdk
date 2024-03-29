import { Actions } from '../hypermedia-constants.js';
import { Entity } from '../es6/Entity.js';

/**
 * Entity representation of hierarchical alignments
 */
export class AlignmentsHierarchicalEntity extends Entity {

	canUpdateAlignments() {
		return this._entity && this._entity.hasActionByName(Actions.alignments.saveAlignments);
	}
}
