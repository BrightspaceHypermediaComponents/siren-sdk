import { Entity } from '../../es6/Entity';
import { Actions, Rels, Classes } from '../../hypermedia-constants';
import { performSirenAction, performSirenActions } from '../../es6/SirenAction';

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
	 * @returns {bool} Whether or not hints are allowed for the quiz entity
	 */
	getHintsToolEnabled() {
		const hintsEntity = this._entity.getSubEntityByRel(Rels.Quizzes.hints);
		return hintsEntity && hintsEntity.hasClass(Classes.quizzes.checked);
	}

	/**
	 * @returns {bool} Whether or not the user can edit the Disable Right Click quiz entity property
	 */
	canEditDisableRightClick() {
		const entity = this._entity.getSubEntityByRel(Rels.Quizzes.disableRightClick);
		return entity && entity.hasActionByName(Actions.quizzes.updateDisableRightClick);
	}

	/**
	 * @returns {bool} Is Disable Right Click checked for the quiz entity
	 */
	isDisableRightClickEnabled() {
		const entity = this._entity.getSubEntityByRel(Rels.Quizzes.disableRightClick);
		return entity && entity.hasClass(Classes.quizzes.checked);
	}

	async save(quiz) {
		if (!quiz) return;
		const updateNameAction = this.canEditName() ? this._formatUpdateNameAction(quiz) : null;
		const updateHintsAction = this.canEditHints() ? this._formatUpdateHintsAction(quiz) : null;
		const updateDisableRightClickAction = this.canEditDisableRightClick() ? this._formatUpdateDisableRightClickAction(quiz) : null;

		const sirenActions = [updateNameAction, updateHintsAction, updateDisableRightClickAction];

		await performSirenActions(this._token, sirenActions);
	}

	/**
	 * Checks if quiz hints has changed and if so returns the appropriate action/fields to update
	 * @param {object} quiz the quiz that's being modified
	 */

	_formatUpdateHintsAction(quiz) {
		if (!quiz) return;
		if (!this._hasHintsChanged(quiz.allowHints)) return;

		const hintsAction = this._generateHintsAction(quiz.allowHints);

		return hintsAction;
	}

	/**
	 * Returns an update hints action if one exists
	 * @param {bool} allowHints Whether or not the quiz has allowed hints
	 */

	_generateHintsAction(allowHints) {
		let action;
		const hintsEntity = this._entity.getSubEntityByRel(Rels.Quizzes.hints);

		if (hintsEntity) {
			action = hintsEntity.getActionByName(Actions.quizzes.updateHints);
		}

		if (!action) {
			return;
		}

		const fields = [
			{ name: 'allowHints', value: allowHints },
		];

		return { action, fields };

	}

	/**
	 * Checks if quiz name has changed and if so returns the appropriate action/fields to update
	 * @param {object} quiz the quiz that's being modified
	 */

	_formatUpdateNameAction(quiz) {
		const { name } = quiz || {};

		if (!name) return;
		if (!this._hasNameChanged(name)) return;

		const action = this._entity.getActionByName(Actions.quizzes.updateName);

		if (!action) {
			return;
		}

		const fields = [
			{ name: 'name', value: name },
		];

		return { action, fields };
	}

	/**
	 * Checks if quiz disable right click has changed and if so returns the appropriate action/fields to update
	 * @param {object} quiz the quiz that's being modified
	 */

	_formatUpdateDisableRightClickAction(quiz) {
		if (!quiz) return;
		if (!this._hasDisableRightClickChanged(quiz.disableRightClick)) return;

		const entity = this._entity.getSubEntityByRel(Rels.Quizzes.disableRightClick);
		if (!entity) return;

		const action = entity.getActionByName(Actions.quizzes.updateDisableRightClick);
		if (!action) return;

		const fields = [
			{ name: 'disableRightClick', value: quiz.disableRightClick },
		];

		return { action, fields };
	}

	_hasHintsChanged(allowHints) {
		return allowHints !== this.getHintsToolEnabled();
	}

	_hasNameChanged(name) {
		return name !== this.name();
	}

	_hasDisableRightClickChanged(disableRightClick) {
		return disableRightClick !== this.isDisableRightClickEnabled();
	}

	equals(quiz) {
		const diffs = [
			[this.name(), quiz.name],
			[this.getHintsToolEnabled(), quiz.allowHints],
			[this.isDisableRightClickEnabled(), quiz.disableRightClick]
		];

		for (const [left, right] of diffs) {
			if (left !== right) {
				return false;
			}
		}
		return true;
	}
}
