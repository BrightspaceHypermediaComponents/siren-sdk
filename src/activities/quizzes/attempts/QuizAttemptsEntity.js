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
	 * @returns {bool} can update retake incorrect only
	 */

	canUpdateRetakeIncorrectOnly() {
		const entity = this.getRetakeIncorrectOnlySubEntity();
		if (!entity) return;
		return entity.hasActionByName(Actions.quizzes.attempts.updateRetakeIncorrectOnly);
	}

	/**
	 * @returns {object} quiz overall grade calculation type sub-entity
	 */
	getOverallGradeCalculationSubEntity() {
		return this._entity && this._entity.getSubEntityByClass(Classes.quizzes.attempts.overallGradeCalculationType);
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
	 * @returns {object} quiz retake incorrect only sub-entity
	 */
	getRetakeIncorrectOnlySubEntity() {
		return this._entity && this._entity.getSubEntityByClass(Classes.quizzes.attempts.retakeIncorrectOnly);
	}

	/**
	 * @returns {bool} is quiz retake incorrect only
	 */
	isRetakeIncorrectOnly() {
		const entity = this.getRetakeIncorrectOnlySubEntity();
		if (!entity) return;
		return entity.hasClass(Classes.quizzes.attempts.retakeIncorrectOnly) && entity.hasClass(Classes.quizzes.checked);
	}

	_hasAttemptsAllowedChanged(attemptsAllowed) {
		return attemptsAllowed !== this.attemptsAllowed();
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

	async setAttemptsAllowed(attemptsAllowed) {
		if (!attemptsAllowed || !this._hasAttemptsAllowedChanged(attemptsAllowed)) return;
		if (!this.canUpdateAttemptsAllowed()) return;
		const {action, fields} = this._generateAttemptsAllowedAction(attemptsAllowed) || {};
		if (!action) return;
		const returnedEntity = await performSirenAction(this._token, action, fields);
		if (!returnedEntity) return;
		return new QuizAttemptsEntity(returnedEntity);
	}

	_hasOverallGradeCalculationTypeChanged(calculationType) {
		return calculationType !== this.overallGradeCalculationType();
	}

	/**
	 * Returns an update overall grade calculation type action if one exists
	 * @param {string} calculationType the overall grade calculation type
	 */

	_generateOverallGradeCalculationTypeAction(calculationType) {
		if (!this._entity) return;
		const action = this._entity.getActionByName(Actions.quizzes.attempts.updateOverallGradeCalculationType);
		if (!action) return;
		const fields = [
			{ name: 'overallGradeCalculationType', value: calculationType },
		];

		return { action, fields };

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

	_hasRetakeIncorrectOnlyChanged(retakeIncorrectOnly) {
		return retakeIncorrectOnly !== this.isRetakeIncorrectOnly();
	}

	/**
	 * Returns an update retake incorrect only action if one exists
	 * @param {bool} retakeIncorrectOnly is quiz retake incorrect only
	 */

	_generateRetakeIncorrectOnlyAction(retakeIncorrectOnly) {
		if (!this._entity) return;
		const action = this._entity.getActionByName(Actions.quizzes.attempts.updateRetakeIncorrectOnly);
		if (!action) return;
		const fields = [
			{ name: 'retakeIncorrectOnly', value: retakeIncorrectOnly },
		];

		return { action, fields };

	}

	async setRetakeIncorrectOnly(retakeIncorrectOnly) {
		if (!retakeIncorrectOnly || !this._hasRetakeIncorrectOnlyChanged(retakeIncorrectOnly)) return;
		if (!this.canUpdateRetakeIncorrectOnly()) return;
		const {action, fields} = this._generateRetakeIncorrectOnlyAction(retakeIncorrectOnly) || {};
		if (!action) return;
		const returnedEntity = await performSirenAction(this._token, action, fields);
		if (!returnedEntity) return;
		return new QuizAttemptsEntity(returnedEntity);
	}
}
