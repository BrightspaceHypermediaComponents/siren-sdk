import { AssignmentEntity } from './AssignmentEntity.js';
import { Entity } from '../../es6/Entity.js';
import { Rels } from '../../hypermedia-constants';

/**
 * AssignmentActivityUsageEntity class representation of a d2l AssignmentActivityUsage.
 */
export class AssignmentActivityUsageEntity extends Entity {
	/**
	 * @returns {string} URL of the assignment entity associated with this assignment activity usage
	 */
	assignmentHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.assignment)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.assignment).href;
	}

	onAssignmentChange(onChange) {
		const assignmentHref = this.assignmentHref();
		// _subEntity builds new sub entity and allows this object to track it.
		// So all sub entities are dispose when this object is disposed.
		assignmentHref && this._subEntity(AssignmentEntity, assignmentHref, onChange);
	}

}
