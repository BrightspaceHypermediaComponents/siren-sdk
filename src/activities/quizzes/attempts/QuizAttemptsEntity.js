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

	_hasAttemptsAllowedChanged(attemptsAllowed) {
		return attemptsAllowed !== this.attemptsAllowed();
	}

	async setAttemptsAllowed(attemptsAllowed) {
		if (!attemptsAllowed || !this._hasAttemptsAllowedChanged(attemptsAllowed)) return;
		if (!this.canUpdateAttemptsAllowed()) {
			return;
		}
		const {action, fields } = this._generateAttemptsAllowedAction(attemptsAllowed);
		if (!action) {
			return;
		}
		await performSirenAction(this._token, action, fields);
	}

	/**
	 * Returns an update attempts action if one exists
	 * @param {number} attemptsAllowed number of attempts allowed
	 */

	_generateAttemptsAllowedAction(attemptsAllowed) {
		let action;
		if (!this.canUpdateAttemptsAllowed()) {
			return;
		}

		if (this._entity) {
			action = this._entity.getActionByName(Actions.quizzes.attempts.updateAttemptsAllowed);
		}

		if (!action) {
			return;
		}

		const fields = [
			{ name: 'attemptsAllowed', value: attemptsAllowed },
		];

		return { action, fields };

	}

}
