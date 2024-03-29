import { Entity } from '../es6/Entity.js';

/**
 * Entity representation of a collection of grade candidates
 */
export class GradeCandidateCollectionEntity extends Entity {
	/**
	 * @returns {Array} Returns all grade-candidate and category sub-entities
	 */
	getGradeCandidates() {
		return (this._entity && this._entity.getSubEntitiesByRel('item')) || [];
	}
}
