import { Entity } from '../../es6/Entity';
import { Actions } from '../../hypermedia-constants';
import { performSirenAction } from '../../es6/SirenAction';

/**
 * QuizEntity class representation of a d2l Quiz.
 */
export class QuizEntity extends Entity {
	/**
	 * @returns {string} Name of the quiz
	 */
	name() {
		return this._entity && this._entity.properties && this._entity.properties.name;
	}

	/**
	 * @returns {bool} Whether or not the edit name action is present on the quiz entity
	 */
	canEditName() {
		return this._entity && this._entity.hasActionByName(Actions.quizzes.updateName);
	}

	/**
	 * Updates the quiz to have the given name
	 * @param {string} name Name to set on the quiz
	 */
	async setName(name) {
		const action = this.canEditName() && this._entity.getActionByName(Actions.quizzes.updateName);
		if (!action) {
			return;
		}

		const fields = [{ name: 'name', value: name }];
		await performSirenAction(this._token, action, fields);
	}

	equals(quiz) {
		const diffs = [
			[this.name(), quiz.name]
		];

		for (const [left, right] of diffs) {
			if (left !== right) {
				return false;
			}
		}
		return true;
	}
}
