import { Entity } from '../../../es6/Entity';
import { Actions, Classes } from '../../../hypermedia-constants';
import { performSirenAction } from '../../../es6/SirenAction';

/**
 * AttemptsEntity class representation of a d2l Quiz Attempt.
*/

export class QuizAttemptsEntity extends Entity {

	/**
	 * @returns {number} number of quiz attempts allowed
	 */

	attemptsAllowed() {
		if (this._entity && this._entity.properties && this._entity.properties.attempts) {
			return this._entity.properties.attempts;
		}

		return null;
	}

	/**
	 * @returns {object} quiz attempts allowed options
	 */

	attemptsAllowedOptions() {
		const action = this._entity && this._entity.getActionByName(Actions.quizzes.attempts.updateAttemptsAllowed);
		if (!action) return;
		const field = action.getFieldByName('attemptsAllowed');
		if (!field) return;
		return field.value;
	}

	/**
	 * @returns {string} quiz overall grade calculation type
	 */
	overallGradeCalculationType() {
		const entity = this.getOverallGradeCalculationSubEntity();
		if (!entity) return;
		return entity.properties.overallGradeCalculationType;
	}

	/**
	 * @returns {object} quiz overall grade calculation options
	 */
	overallGradeCalculationOptions() {
		const entity = this.getOverallGradeCalculationSubEntity();
		if (!entity) return;
		const action = entity.getActionByName(Actions.quizzes.attempts.updateOverallGradeCalculationType);
		if (!action) return;
		const field = action.getFieldByName('overallGradeCalculationType');
		if (!field) return;
		return field.value;
	}

	/**
	 * @returns {bool} is quiz retake incorrect only
	 */
	isRetakeIncorrectOnly() {
		const entity = this.getRetakeIncorrectOnlySubEntity();
		if (!entity) return;
		return entity.hasClass(Classes.quizzes.attempts.retakeIncorrectOnly) && entity.hasClass(Classes.quizzes.checked);
	}

	/**
	 * @returns {object} an array of quiz attempt conditions sub-entities
	 */
	attemptConditions() {
		const entity = this.getAttemptConditionsSubEntity();
		if (!entity) return;
		const attemptConditions = entity.getSubEntitysByClass(Classes.quizzes.attempts.attemptCondition);
		return attemptConditions;
	}

	/**
	 * @returns {bool} can update number of quiz attempts
	 */

	canUpdateAttemptsAllowed() {
		return this._entity.hasActionByName(Actions.quizzes.attempts.updateAttemptsAllowed);
	}

	/**
	 * @returns {bool} can update number of quiz overall grade calculation type
	 */

	canUpdateOverallGradeCalculation() {
		const entity = this.getOverallGradeCalculationSubEntity();
		if (!entity) return;
		return entity.hasActionByName(Actions.quizzes.attempts.updateOverallGradeCalculationType);
	}

	/**
	 * If RIO flag is off (f16751-retake-incorrect-only), the subentity will not exist
	 * @returns {bool} can quiz update retake incorrect only
	 */

	canUpdateRetakeIncorrectOnly() {
		const entity = this.getRetakeIncorrectOnlySubEntity();
		if (!entity) return;
		return entity.hasActionByName(Actions.quizzes.attempts.updateRetakeIncorrectOnly);
	}

	/**
	 * @returns {bool} can update quiz attempt conditions
	 */

	canUpdateAttemptConditions() {
		const entity = this.getAttemptConditionsSubEntity();
		if (!entity) return;
		const subentity = entity.getSubEntityByClass(Classes.quizzes.attempts.attemptCondition); // gets first matching sub-entity
		if (!subentity) return;
		return subentity.hasActionByName(Actions.quizzes.attempts.updateAttemptCondition);
	}

	/**
	 * @returns {object} quiz overall grade calculation type sub-entity
	 */
	getOverallGradeCalculationSubEntity() {
		return this._entity && this._entity.getSubEntityByClass(Classes.quizzes.attempts.overallGradeCalculationType);
	}

	/**
	 * @returns {object} quiz retake incorrect only sub-entity
	 */
	getRetakeIncorrectOnlySubEntity() {
		return this._entity && this._entity.getSubEntityByClass(Classes.quizzes.attempts.retakeIncorrectOnly);
	}

	/**
	 * @returns {object} quiz attempt conditions sub-entity
	 */
	getAttemptConditionsSubEntity() {
		if (this._entity.hasClass(Classes.quizzes.attempts.attemptConditions) && this._entity.hasClass('collection')) {
			return this._entity && this._entity.getSubEntityByClass(Classes.quizzes.attempts.attemptConditions);
		}

		return null;
	}

	/**
	 * @returns {object} a singular quiz attempt condition sub-entity
	 */
	getAttemptConditionSubEntity(attemptConditionNumber) {
		const entity = this.getAttemptConditionsSubEntity();
		const attemptConditionEntities = entity.getSubEntitiesByClass(Classes.quizzes.attempts.attemptCondition);
		if (!attemptConditionEntities) return;
		attemptConditionEntities.find((entity) => {
			if (!entity.properties || !entity.properties.attempt) return;
			return entity.properties.attempt === attemptConditionNumber;
		});

		return null;
	}

	_hasAttemptsAllowedChanged(attemptsAllowed) {
		return attemptsAllowed !== this.attemptsAllowed();
	}

	_hasOverallGradeCalculationTypeChanged(calculationType) {
		return calculationType !== this.overallGradeCalculationType();
	}

	_hasRetakeIncorrectOnlyChanged(retakeIncorrectOnly) {
		return retakeIncorrectOnly !== this.isRetakeIncorrectOnly();
	}

	_hasAttemptConditionChanged(attemptCondition) {
		const entity = this.getAttemptConditionSubEntity;
		if (!entity) return false;
		const original = entity.getAttemptCondition(attemptCondition.attempt);
		if (!original) return false;
		if (original.properties.min !== attemptCondition.min || original.properties.max !== attemptCondition.max) {
			return true;
		}
		return false;
	}

	/**
	 * Returns an update attempts action if one exists
	 * @param {number} attemptsAllowed number of attempts allowed
	 */

	_generateAttemptsAllowedAction(attemptsAllowed) {
		if (!this._entity) return;
		const action = this._entity.getActionByName(Actions.quizzes.attempts.updateAttemptsAllowed);
		if (!action) return;
		const fields = [
			{ name: 'attemptsAllowed', value: attemptsAllowed },
		];

		return { action, fields };
	}

	/**
	 * Returns an update overall grade calculation type action if one exists
	 * @param {string} calculationType the overall grade calculation type
	 */

	_generateOverallGradeCalculationTypeAction(calculationType) {
		const entity = this.getOverallGradeCalculationSubEntity();
		if (!entity) return;
		const action = entity.getActionByName(Actions.quizzes.attempts.updateOverallGradeCalculationType);
		if (!action) return;
		const fields = [
			{ name: 'overallGradeCalculationType', value: calculationType },
		];

		return { action, fields };
	}

	/**
	 * Returns an update retake incorrect only action if one exists
	 * @param {bool} retakeIncorrectOnly is quiz retake incorrect only
	 */

	_generateRetakeIncorrectOnlyAction(retakeIncorrectOnly) {
		const entity = this.getRetakeIncorrectOnlySubEntity();
		if (!entity) return;
		const action = entity.getActionByName(Actions.quizzes.attempts.updateRetakeIncorrectOnly);
		if (!action) return;
		const fields = [
			{ name: 'retakeIncorrectOnly', value: retakeIncorrectOnly },
		];

		return { action, fields };
	}

	/**
	 * Returns an update attempt condition action if one exists
	 * @param {object} attemptCondition the attempt condition {attempt: num, min: num, max: num}
	 */

	_generateAttemptConditionAction(attemptCondition) {
		const entity = this.getAttemptConditionSubEntity(attemptCondition);
		if (!entity) return;
		const action = entity.getActionByName(Actions.quizzes.attempts.updateAttemptCondition);
		if (!action) return;
		const fields = [
			{
				'attempt': attemptCondition.properties.attempt,
				'min': attemptCondition.properties.min,
				'max': attemptCondition.properties.max,
			},
		];

		return { action, fields };
	}

	async setAttemptsAllowed(attemptsAllowed) {
		if (!attemptsAllowed || !this._hasAttemptsAllowedChanged(attemptsAllowed)) return;
		if (!this.canUpdateAttemptsAllowed()) return;
		const {action, fields} = this._generateAttemptsAllowedAction(attemptsAllowed) || {};
		if (!action) return;
		const returnedEntity = await performSirenAction(this._token, action, fields);
		if (!returnedEntity) return;
		return new QuizAttemptsEntity(returnedEntity);
	}

	async setOverallGradeCalculationType(calculationType) {
		if (!calculationType || !this._hasOverallGradeCalculationTypeChanged(calculationType)) return;
		if (!this.canUpdateOverallGradeCalculation()) return;
		const {action, fields} = this._generateOverallGradeCalculationTypeAction(calculationType) || {};
		if (!action) return;
		const returnedEntity = await performSirenAction(this._token, action, fields);
		if (!returnedEntity) return;
		return new QuizAttemptsEntity(returnedEntity);
	}

	async setRetakeIncorrectOnly(retakeIncorrectOnly) {
		if (retakeIncorrectOnly === undefined || !this._hasRetakeIncorrectOnlyChanged(retakeIncorrectOnly)) return;
		if (!this.canUpdateRetakeIncorrectOnly()) return;
		const {action, fields} = this._generateRetakeIncorrectOnlyAction(retakeIncorrectOnly) || {};
		if (!action) return;
		const returnedEntity = await performSirenAction(this._token, action, fields);
		if (!returnedEntity) return;
		return new QuizAttemptsEntity(returnedEntity);
	}

	async setAttemptCondition(attemptCondition) {
		if (!attemptCondition || !this._hasAttemptConditionChanged(attemptCondition)) return;
		if (!this.canUpdateAttemptConditions()) return;
		const {action, fields} = this._generateAttemptConditionAction(attemptCondition) || {};
		if (!action) return;
		const returnedEntity = await performSirenAction(this._token, action, fields);
		if (!returnedEntity) return;
		return new QuizAttemptsEntity(returnedEntity);
	}
}
