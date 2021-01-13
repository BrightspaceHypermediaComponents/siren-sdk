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
	 * @returns {string} quiz preview href
	*/

	previewHref() {
		if (!this._entity) {
			return;
		}

		if (this._entity.hasLinkByRel(Rels.IANA.preview)) {
			return this._entity.getLinkByRel(Rels.IANA.preview).href;
		}
	}

	/**
	 * @returns {bool} Whether or not the user can preview a quiz
	*/

	canPreviewQuiz() {
		if (!this._entity) {
			return false;
		}

		return this._entity.hasLinkByRel(Rels.IANA.preview);
	}

	/**
	 * @returns {string} quiz password
	 */

	password() {
		const entity = this._entity.getSubEntityByRel(Rels.Quizzes.password);
		if (entity && entity.properties && entity.properties.password) {
			return entity.properties.password;
		}

		return '';
	}

	/**
	 * @returns {bool} Whether or not the user can edit the Shuffle quiz entity property
	 */
	canEditShuffle() {
		const entity = this._entity.getSubEntityByRel(Rels.Quizzes.shuffle);
		return entity && entity.hasActionByName(Actions.quizzes.updateShuffle);
	}

	/**
	 * @returns {bool} Is Shuffle checked for the quiz entity
	 */
	isShuffleEnabled() {
		const entity = this._entity.getSubEntityByRel(Rels.Quizzes.shuffle);
		return entity && entity.hasClass(Classes.quizzes.checked);
	}

	/**
	 * @returns {bool} Whether or not the user can set a password for a quiz entity
	 */
	canEditPassword() {
		const passwordEntity = this._entity.getSubEntityByRel(Rels.Quizzes.password);
		return passwordEntity && passwordEntity.hasActionByName(Actions.quizzes.updatePassword);
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

	/**
	 * @returns {bool} Whether or not the user can edit the Disable Pager and Alerts quiz entity property
	 */
	canEditDisablePagerAndAlerts() {
		const entity = this._entity.getSubEntityByRel(Rels.Quizzes.disablePagerAndAlerts);
		return entity && entity.hasActionByName(Actions.quizzes.updateDisablePagerAndAlerts);
	}

	/**
	 * @returns {bool} Is Disable Pager and Alerts checked for the quiz entity
	 */
	isDisablePagerAndAlertsEnabled() {
		const entity = this._entity.getSubEntityByRel(Rels.Quizzes.disablePagerAndAlerts);
		return entity && entity.hasClass(Classes.quizzes.checked);
	}

	/**
	 * @returns {bool} Whether or not the user can edit the Notification Email property
	 */
	canEditNotificationEmail() {
		const entity = this._entity.getSubEntityByRel(Rels.Quizzes.notificationEmail);
		return entity && entity.hasActionByName(Actions.quizzes.updateNotificationEmail);
	}

	/**
	 * @returns {bool} Notification Email of the quiz entity
	 */
	notificationEmail() {
		const entity = this._entity.getSubEntityByRel(Rels.Quizzes.notificationEmail);
		if (!entity || !entity.properties) {
			return;
		}
		const props = entity.properties;
		return props && props.email;
	}

	/**
	 * @returns {bool} Whether or not the user can edit the preventMovingBackwards property
	 */
	canEditPreventMovingBackwards() {
		const entity = this._entity.getSubEntityByRel(Rels.Quizzes.preventMovingBackwards);
		return entity && entity.hasActionByName(Actions.quizzes.updatePreventMovingBackwards);
	}

	/**
	 * @returns {bool} Is prevent moving backwards checked for the quiz entity
	 */
	isPreventMovingBackwardsEnabled() {
		const entity = this._entity.getSubEntityByRel(Rels.Quizzes.preventMovingBackwards);
		return entity && entity.hasClass(Classes.quizzes.checked);
	}

	/**
	 * @returns {bool} Whether or not the user can edit the autoSetGraded property
	 */
	canEditAutoSetGraded() {
		const entity = this._entity.getSubEntityByRel(Rels.Quizzes.autoSetGraded);
		return entity && entity.hasActionByName(Actions.quizzes.updateAutoSetGraded);
	}

	/**
	 * @returns {bool} Is AutoSetGraded checked for the quiz entity
	 */
	isAutoSetGradedEnabled() {
		const entity = this._entity.getSubEntityByRel(Rels.Quizzes.autoSetGraded);
		return entity && entity.hasClass(Classes.quizzes.checked);
	}

	/**
	 * @returns {string} Quiz discription in plaintext (HTML stripped)
	 */
	descriptionPlaintext() {
		const descriptionEntity = this._getDescriptionEntity();
		return descriptionEntity
			&& descriptionEntity.properties
			&& descriptionEntity.properties.text;
	}

	/**
	 * @returns {string} Quiz description in HTML
	 */
	descriptionHtml() {
		const descriptionEntity = this._getDescriptionEntity();
		return descriptionEntity
			&& descriptionEntity.properties
			&& descriptionEntity.properties.html;
	}

	/**
	 * @returns {string} Quiz description formatted to be used with a d2l-html-editor
	 */
	descriptionEditorHtml() {
		const descriptionEntity = this._getDescriptionEntity();
		if (!descriptionEntity) {
			return;
		}

		const updateDescriptionAction = descriptionEntity.getActionByName(Actions.quizzes.updateDescription);
		return updateDescriptionAction
			&& updateDescriptionAction.hasFieldByName('description')
			&& updateDescriptionAction.getFieldByName('description').value;
	}

	/**
	 * @returns {bool} Whether or not the edit description action is present on the quiz entity
	 */
	canEditDescription() {
		const descriptionEntity = this._getDescriptionEntity();
		return descriptionEntity
			&& descriptionEntity.hasActionByName(Actions.quizzes.updateDescription);
	}

	/**
	 * Updates the quiz to have the given description
	 * @param {string} description Description to set on the assignment
	 */
	async setDescription(description) {
		const descriptionEntity = this.canEditDescription() && this._getDescriptionEntity();
		if (!descriptionEntity) {
			return;
		}

		const action = descriptionEntity.getActionByName(Actions.quizzes.updateDescription);
		if (!action) {
			return;
		}

		const fields = [{ name: 'description', value: description }];
		await performSirenAction(this._token, action, fields);
	}

	/**
	 * @returns {object} Richtext editor config for the quiz description; for use with d2l-html-editor
	 */
	descriptionRichTextEditorConfig() {
		const descriptionEntity = this._getDescriptionEntity();
		return descriptionEntity
			&& descriptionEntity.getSubEntityByRel(Rels.richTextEditorConfig);
	}

	/**
	 * @returns {string} Timing Href of the quiz entity, if present
	*/
	timingHref() {
		if (!this._entity || !this._entity.hasSubEntityByRel(Rels.Quizzes.timing)) {
			return;
		}

		return this._entity.getSubEntityByRel(Rels.Quizzes.timing).href;
	}

	async save(quiz) {
		if (!quiz) return;
		const updateNameAction = this.canEditName() ? this._formatUpdateNameAction(quiz) : null;
		const updateShuffleAction = this.canEditShuffle() ? this._formatShuffleAction(quiz) : null;
		const updateHintsAction = this.canEditHints() ? this._formatUpdateHintsAction(quiz) : null;
		const updateDisableRightClickAction = this.canEditDisableRightClick() ? this._formatUpdateDisableRightClickAction(quiz) : null;
		const updateDisablePagerAndAlerts = this.canEditDisablePagerAndAlerts() ? this._formatUpdateDisablePagerAndAlerts(quiz) : null;
		const updatePasswordAction = this.canEditPassword() ? this._formatUpdatePasswordAction(quiz) : null;
		const updateNotificationEmail = this.canEditNotificationEmail() ? this._formatNotificationEmailAction(quiz) : null;
		const updatePreventMovingBackwards = this.canEditPreventMovingBackwards() ? this._formatUpdatePreventMovingBackwards(quiz) : null;
		const updateAutoSetGradedAction = this.canEditAutoSetGraded() ? this._formatUpdateAutoSetGraded(quiz) : null;
		const updateDescriptionAction = this.canEditDescription() ? this._formatUpdateDescriptionAction(quiz) : null;

		const sirenActions = [
			updateNameAction,
			updateShuffleAction,
			updateHintsAction,
			updateDisableRightClickAction,
			updateDisablePagerAndAlerts,
			updatePasswordAction,
			updateNotificationEmail,
			updatePreventMovingBackwards,
			updateAutoSetGradedAction,
			updateDescriptionAction
		];
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
	 * Checks if quiz shuffle (questions) has changed and if so returns the appropriate action/fields to update
	 * @param {object} quiz the quiz that's being modified
	 */

	_formatShuffleAction(quiz) {
		if (!quiz) return;
		if (!this._hasShuffleChanged(quiz.shuffle)) return;

		const entity = this._entity.getSubEntityByRel(Rels.Quizzes.shuffle);
		if (!entity) return;

		const action = entity.getActionByName(Actions.quizzes.updateShuffle);
		if (!action) return;

		const fields = [
			{ name: 'shuffle', value: quiz.shuffle },
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

	/**
	 * Checks if quiz disable pager and alerts has changed and if so returns the appropriate action/fields to update
	 * @param {object} quiz the quiz that's being modified
	 */

	_formatUpdateDisablePagerAndAlerts(quiz) {
		if (!quiz) return;
		if (!this._hasDisablePagerAndAlertsChanged(quiz.disablePagerAndAlerts)) return;

		const entity = this._entity.getSubEntityByRel(Rels.Quizzes.disablePagerAndAlerts);
		if (!entity) return;

		const action = entity.getActionByName(Actions.quizzes.updateDisablePagerAndAlerts);
		if (!action) return;

		const fields = [
			{ name: 'disablePagerAndAlerts', value: quiz.disablePagerAndAlerts },
		];

		return { action, fields };
	}

	/**
	 * Checks if quiz password has changed and if so returns the appropriate action/fields to update
	 * @param {object} quiz the quiz that's being modified
	*/

	_formatUpdatePasswordAction(quiz) {
		if (!quiz) return;
		if (!this._hasPasswordChanged(quiz.password)) return;

		const entity = this._entity.getSubEntityByRel(Rels.Quizzes.password);
		if (!entity) return;

		const action = entity.getActionByName(Actions.quizzes.updatePassword);
		if (!action) return;

		const fields = [
			{ name: 'password', value: quiz.password },
		];

		return { action, fields };
	}

	/**
	 * Checks if notification email has changed and if so returns the appropriate action/fields to update
	 * @param {object} quiz the quiz that's being modified
	*/
	_formatNotificationEmailAction(quiz) {
		if (!quiz) return;
		if (!this._hasNotificationEmailChanged(quiz.notificationEmail)) return;

		const entity = this._entity.getSubEntityByRel(Rels.Quizzes.notificationEmail);
		if (!entity) return;

		const action = entity.getActionByName(Actions.quizzes.updateNotificationEmail);
		if (!action) return;

		const fields = [
			{ name: 'notificationEmail', value: quiz.notificationEmail },
		];

		return { action, fields };
	}

	/**
	 * Checks if quiz prevent moving backwards has changed and if so returns the appropriate action/fields to update
	 * @param {object} quiz the quiz that's being modified
	 */

	_formatUpdatePreventMovingBackwards(quiz) {
		if (!quiz) return;
		if (!this._hasPreventMovingBackwardsChanged(quiz.preventMovingBackwards)) return;

		const entity = this._entity.getSubEntityByRel(Rels.Quizzes.preventMovingBackwards);
		if (!entity) return;

		const action = entity.getActionByName(Actions.quizzes.updatePreventMovingBackwards);
		if (!action) return;

		const fields = [
			{ name: 'preventMovingBackwards', value: quiz.preventMovingBackwards },
		];

		return { action, fields };
	}

	_formatUpdateAutoSetGraded(quiz) {
		if (!quiz) return;
		if (!this._hasAutoSetGradedChanged(quiz.autoSetGraded)) return;

		const entity = this._entity.getSubEntityByRel(Rels.Quizzes.autoSetGraded);
		if (!entity) return;

		const action = entity.getActionByName(Actions.quizzes.updateAutoSetGraded);
		if (!action) return;

		const fields = [
			{ name: 'autoSetGraded', value: quiz.autoSetGraded },
		];

		return { action, fields };
	}

	/**
	 * Checks if quiz description has changed and if so returns the appropriate action/fields to update
	 * @param {object} quiz the quiz that's being modified
	 */

	_formatUpdateDescriptionAction(quiz) {
		const { description } = quiz || {};

		if (!description) return;
		if (!this._hasDescriptionChanged(description)) return;

		const descriptionEntity = this._getDescriptionEntity();

		if (!descriptionEntity) return;

		const action = descriptionEntity.getActionByName(Actions.quizzes.updateDescription);

		if (!action) {
			return;
		}

		const fields = [
			{ name: 'description', value: description },
		];
		return { action, fields };
	}

	_hasHintsChanged(allowHints) {
		return allowHints !== this.getHintsToolEnabled();
	}

	_hasNameChanged(name) {
		return name !== this.name();
	}

	_hasShuffleChanged(shuffle) {
		return shuffle !== this.isShuffleEnabled();
	}

	_hasDisableRightClickChanged(disableRightClick) {
		return disableRightClick !== this.isDisableRightClickEnabled();
	}

	_hasDisablePagerAndAlertsChanged(disablePagerAndAlerts) {
		return disablePagerAndAlerts !== this.isDisablePagerAndAlertsEnabled();
	}

	_hasPasswordChanged(password) {
		return password !== this.password();
	}

	_hasNotificationEmailChanged(notificationEmail) {
		return notificationEmail !== this.notificationEmail();
	}

	_hasPreventMovingBackwardsChanged(preventMovingBackwards) {
		return preventMovingBackwards !== this.isPreventMovingBackwardsEnabled();
	}

	_hasAutoSetGradedChanged(autoSetGraded) {
		return autoSetGraded !== this.isAutoSetGradedEnabled();
	}

	_hasDescriptionChanged(description) {
		return description !== this.descriptionEditorHtml();
	}

	equals(quiz) {
		const diffs = [
			[this.name(), quiz.name],
			[this.isShuffleEnabled(), quiz.shuffle],
			[this.getHintsToolEnabled(), quiz.allowHints],
			[this.isDisableRightClickEnabled(), quiz.disableRightClick],
			[this.isDisablePagerAndAlertsEnabled(), quiz.disablePagerAndAlerts],
			[this.password(), quiz.password],
			[this.notificationEmail(), quiz.notificationEmail],
			[this.isPreventMovingBackwardsEnabled(), quiz.preventMovingBackwards],
			[this.isAutoSetGradedEnabled(), quiz.autoSetGraded],
			[this.descriptionEditorHtml(), quiz.description]
		];

		for (const [left, right] of diffs) {
			if (left !== right) {
				return false;
			}
		}
		return true;
	}

	canDelete() {
		return this._entity.hasActionByName(Actions.quizzes.delete);
	}

	async delete() {
		const action = this.canDelete() && this._entity.getActionByName(Actions.quizzes.delete);
		if (!action) {
			return;
		}

		await performSirenAction(this._token, action).then(() => {
			this.dispose();
		});
	}

	attemptsLink() {
		return this._entity.getSubEntityByRel(Rels.Quizzes.attempts);
	}

	_getDescriptionEntity() {
		return this._entity
			&& this._entity.hasSubEntityByRel(Rels.Quizzes.description)
			&& this._entity.getSubEntityByRel(Rels.Quizzes.description);
	}

	_canCheckout() {
		return this._entity && this._entity.hasActionByName(Actions.workingCopy.checkout);
	}

	_canFork() {
		return this._entity && this._entity.hasActionByName(Actions.workingCopy.fork);
	}

	_canMerge() {
		return this._entity && this._entity.hasActionByName(Actions.workingCopy.merge);
	}

	_canCheckin() {
		return this._entity && this._entity.hasActionByName(Actions.workingCopy.checkin);
	}

	/**
	 * Checkout quiz working copy
	 */
	async checkout() {
		if (this._canCheckout()) {
			const action = this.getActionByName(Actions.workingCopy.checkout);

			// This fields is a workaround for an issue where query parameters are not added properly: https://github.com/Brightspace/polymer-siren-behaviors/issues/42
			const fields = [];
			await performSirenAction(this._token, action, fields);
		}
	}

	/**
	 * Fork quiz working copy
	 */
	async fork() {
		if (this._canFork()) {
			const action = this.getActionByName(Actions.workingCopy.fork);
			await performSirenAction(this._token, action);
		}
	}

	/**
	 * Merge quiz working copy
	 */
	async merge() {
		if (this._canMerge()) {
			const action = this.getActionByName(Actions.workingCopy.merge);
			await performSirenAction(this._token, action);
		}
	}

	/**
	 * Checkin quiz working copy
	 */
	async checkin() {
		if (this._canCheckin()) {
			const action = this.getActionByName(Actions.workingCopy.checkin);
			await performSirenAction(this._token, action);
		}
	}
}
