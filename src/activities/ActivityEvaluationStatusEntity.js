import { Entity } from '../es6/Entity.js';
import { Rels } from '../hypermedia-constants.js';

const supportedActivityTypes = [
	'assignment',
	'topic',
	'quiz',
];

export class ActivityEvaluationStatusEntity extends Entity {
	/**
	 * @return {string|null} The activity type or null if the entity doesn't not have an expected class.
	 */
	getActivityType() {
		if (this._entity) {
			for (const hmClass of supportedActivityTypes) {
				if (this._entity.hasClass(hmClass)) {
					return hmClass;
				}
			}
		}
		return null;
	}

	/**
	 * @returns {int|null} The number of assignments of this activity
	 */
	numAssigned() {
		return this._entity ? Number(this._entity.properties.assigned) : null;
	}

	/**
	 * @returns {int|null} The number of completions of this activity
	 */
	numCompleted() {
		return this._entity ? Number(this._entity.properties.completed) : null;
	}

	/**
	 * @returns {int|null} The number of evaluations of this activity
	 */
	numEvaluated() {
		return this._entity ? Number(this._entity.properties.evaluated) : null;
	}

	/**
	 * @returns {int|null} The number of published evaluations of this activity
	 */
	numPublished() {
		return this._entity ? Number(this._entity.properties.published) : null;
	}

	/**
	 * @returns {int|null} The number of new submissions of this activity
	 */
	numNewSubmissions() {
		return this._entity ? Number(this._entity.properties.newsubmissions) : null;
	}

	/**
	 * @returns {int|null} The number of resubmissions of this activity
	 */
	numResubmissions() {
		return this._entity ? Number(this._entity.properties.resubmissions) : null;
	}

	/**
	 * @returns {string|null} The path to the assessment application, for all assessments
	 */
	assessAllApplication() {
		const entity = this._entity.getSubEntityByRel(Rels.Assessments.assessAllApplication);
		return entity ? entity.properties.path : null;
	}

	/**
	 * @returns {string|null} The path to the assessment application, for new assessments
	 */
	assessNewApplication() {
		const entity = this._entity.getSubEntityByRel(Rels.Assessments.assessNewApplication);
		return entity ? entity.properties.path : null;
	}

	/**
	 * @returns {string|null} The path to the submission application
	 */
	submissionApplication() {
		const entity = this._entity.getSubEntityByRel(Rels.Assessments.submissionApplication);
		return entity ? entity.properties.path : null;
	}
}
