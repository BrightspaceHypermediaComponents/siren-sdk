'use strict';
import { Entity } from '../es6/Entity';
import { GradeCandidateEntity } from './GradeCandidateEntity';

/**
 * Entity representation of a collection of grade candidates
 */
export class GradeCandidateCollectionEntity extends Entity {
	/**
	 * @returns {Array} Returns all grade-candidate sub-entities from the grade-candidates collection
	 */
	getGradeCandidateEntities() {
		return this._entity.getSubEntitiesByRel('item').map(entity => new GradeCandidateEntity(entity));
	}
}
