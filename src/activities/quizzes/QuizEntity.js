import { Entity } from '../../es6/Entity';
import { Actions, Rels, Classes } from '../../hypermedia-constants';
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
	/**
	 * @returns {bool} Whether or not the user can set hints availability for the quiz entity
	 */
	canEditHints() {
		const hintsEntity = this._entity.getSubEntityByRel(Rels.Quizzes.hints);
		return hintsEntity && hintsEntity.hasActionByName(Actions.quizzes.updateHints);
	}

	/**
	 * Set the status of whether annotation tools are available or not for the assignment entity
	 * @param {bool} isAvailable Annotation availability - this is the value that the annotation availability of the assignment will be set to
	 */
	async setHintsEnabled(isEnabled) {
		isEnabled = Boolean(isEnabled);

		const hintsEntity = this._entity.getSubEntityByRel(Rels.Quizzes.hints);
		const action = this.canEditHints() && hintsEntity && hintsEntity.getActionByName(Actions.quizzes.updateHints);

		if (!action) {
			return;
		}
		const fields = [
			{ name: 'allowHints', value: isEnabled }
		];
		await performSirenAction(this._token, action, fields);
	}

	/**
 * @returns {bool} Whether or not hints are enabled for the quiz entity
 */
	getHintsToolEnabled() {
		const hintsEntity = this._entity.getSubEntityByRel(Rels.Quizzes.hints);
		return hintsEntity && hintsEntity.hasClass(Classes.quizzes.hintsEnabled);
	}

	equals(quiz) {
		const diffs = [
			[this.name(), quiz.name],
			[this.canEditHints(), quiz.allowHints]
		];

		for (const [left, right] of diffs) {
			if (left !== right) {
				return false;
			}
		}
		return true;
	}
}
