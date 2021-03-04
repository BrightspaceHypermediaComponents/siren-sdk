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
		const action = this._entity && this._entity.getActionByName(Actions.quizzes.updateAttemptsAllowed);
		if (!action) return;
		const field = action.getFieldByName('attemptsAllowed');
		if (!field) return;
		return field.value;
	}

	/**
	 * @returns {bool} can update number of quiz attempts
	 */

	canUpdateAttemptsAllowed() {
		return this._entity.hasActionByName(Actions.quizzes.updateAttemptsAllowed);
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
	 * Checks if quiz attempts has changed and if so returns the appropriate action/fields to update
	 * @param {object} quiz the quiz that's being modified
	 */

	_formatUpdateAttemptsAction(quiz) {
		if (!quiz) return;
		if (!this._hasAttemptsAllowedChanged(quiz.attemptsAllowed)) return;

		return this._generateAttemptsAllowedAction(quiz.attemptsAllowed);
	}

	_hasAttemptsAllowedChanged(attemptsAllowed) {
		return attemptsAllowed !== this.attemptsAllowed();
	}

	async setAttemptsAllowed(attemptsAllowed) {
		if (!this.canUpdateAttemptsAllowed()) {
			return;
		}
		const attemptsAction = this._formatUpdateAttemptsAction({attemptsAllowed: attemptsAllowed});
		if (!attemptsAction) {
			return;
		}
		await performSirenAction(this._token, attemptsAction);
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
			action = this._entity.getActionByName(Actions.quizzes.updateAttemptsAllowed);
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
