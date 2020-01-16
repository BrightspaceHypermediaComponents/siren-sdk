'use strict';
import { Entity } from '../es6/Entity';

/**
 * Entity representation of a collection of grade candidates
 */
export class GradeCandidateCollectionEntity extends Entity {
	/**
	 * @returns {Array} Returns all grade-candidate sub-entities from the grade-candidates collection
	 */
	getGradeCandidateEntities() {
		return this._entity.getSubEntitiesByRel('item');
	}
}
