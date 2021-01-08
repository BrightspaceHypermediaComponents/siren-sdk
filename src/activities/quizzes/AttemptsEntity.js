import { Entity } from '../../es6/Entity';
import { Actions } from '../../hypermedia-constants';
import { performSirenAction } from '../../es6/SirenAction';

/**
 * AttemptsEntity class representation of a d2l Quiz Attempt.
*/

export class AttemptsEntity extends Entity {

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
	 * @returns {bool} can update number of quiz attempts
	 */

	canUpdateAttemptsAllowed() {
		return this._entity.hasActionByName(Actions.quizzes.updateAttemptsAllowed);
	}

	/**
	 * Checks if quiz attempts has changed and if so returns the appropriate action/fields to update
	 * @param {object} quiz the quiz that's being modified
	 */

	_formatUpdateAttemptsAction(quiz) {
		if (!quiz) return;
		if (!this._hasAttemptsAllowedChanged(quiz.attemptsAllowed)) return;

		const attemptsAction = this._generateAttemptsAllowedAction(quiz.attemptsAllowed);

		return attemptsAction;
	}

	_hasAttemptsAllowedChanged(attemptsAllowed) {
		return attemptsAllowed !== this.attemptsAllowed();
	}

	async updateAttempts(attemptsAllowed) {
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
