import { Entity } from '../../es6/Entity';
import { Actions, Rels, Classes } from '../../hypermedia-constants';
import { performSirenAction, performSirenActions } from '../../es6/SirenAction';
import { ActivityTypeEntity } from './types/ActivityTypeEntity';

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
	 * @returns {bool} Whether or not the user can edit the syncGradebook property
	 */
	canEditSyncGradebook() {
		const entity = this._entity.getSubEntityByRel(Rels.Quizzes.syncGradebook);
		return entity && entity.hasActionByName(Actions.quizzes.updateSyncGradebook);
	}

	/**
	 * @returns {bool} Is SyncGradebook checked for the quiz entity
	 */
	isSyncGradebookEnabled() {
		const entity = this._entity.getSubEntityByRel(Rels.Quizzes.syncGradebook);
		return entity && entity.hasClass(Classes.quizzes.checked);
	}

	/**
	 * @returns {bool} Is SyncGradebook the default for the quiz entity,
	 * i.e. true if the user never explicitly set SyncGradebook value
	 */
	isSyncGradebookDefault() {
		const entity = this._entity.getSubEntityByRel(Rels.Quizzes.syncGradebook);
		return entity && entity.hasClass(Classes.quizzes.default);
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
		if (!descriptionEntity || !descriptionEntity.properties || !descriptionEntity.properties.html) {
			return;
		}
		return descriptionEntity.properties.html;
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
	 * @returns {bool} Description is displayed for the quiz entity
	 */
	descriptionIsDisplayed() {
		const descriptionEntity = this._getDescriptionEntity();
		return descriptionEntity && descriptionEntity.hasClass(Classes.quizzes.descriptionIsDisplayed);
	}

	/**
	 * @returns {bool} Description is initially empty for the quiz entity
	 */
	originalDescriptionIsEmpty() {
		const descriptionEntity = this._getDescriptionEntity();
		return descriptionEntity
			&& descriptionEntity.properties
			&& !descriptionEntity.properties.text;
	}

	/**
	 * @returns {bool} Introduction is appended to the description for the quiz entity
	 */
	introIsAppendedToDescription() {
		const descriptionEntity = this._getDescriptionEntity();
		return descriptionEntity && descriptionEntity.hasClass(Classes.quizzes.introIsAppendedToDescription);
	}

	/**
	 * @returns {string} Quiz header in plaintext (HTML stripped)
	 */
	headerPlaintext() {
		const headerEntity = this._getHeaderEntity();
		return headerEntity
			&& headerEntity.properties
			&& headerEntity.properties.text;
	}

	/**
	 * @returns {string} Quiz header in HTML
	 */
	headerHtml() {
		const headerEntity = this._getHeaderEntity();
		if (!headerEntity || !headerEntity.properties || !headerEntity.properties.html) {
			return;
		}
		return headerEntity.properties.html;
	}

	/**
	 * @returns {string} Quiz header formatted to be used with a d2l-html-editor
	 */
	headerEditorHtml() {
		const headerEntity = this._getHeaderEntity();
		if (!headerEntity) {
			return;
		}

		const updateHeaderAction = headerEntity.getActionByName(Actions.quizzes.updateHeader);
		return updateHeaderAction
			&& updateHeaderAction.hasFieldByName('header')
			&& updateHeaderAction.getFieldByName('header').value;
	}

	/**
	 * @returns {bool} Whether or not the edit header action is present on the quiz entity
	 */
	canEditHeader() {
		const headerEntity = this._getHeaderEntity();
		return headerEntity
			&& headerEntity.hasActionByName(Actions.quizzes.updateHeader);
	}

	/**
	 * Updates the quiz to have the given header
	 * @param {string} header Header to set on the assignment
	 */
	async setHeader(header) {
		const headerEntity = this.canEditHeader() && this._getHeaderEntity();
		if (!headerEntity) {
			return;
		}

		const action = headerEntity.getActionByName(Actions.quizzes.updateHeader);
		if (!action) {
			return;
		}

		const fields = [{ name: 'header', value: header }];
		await performSirenAction(this._token, action, fields);
	}

	/**
	 * @returns {object} Richtext editor config for the quiz header; for use with d2l-html-editor
	 */
	headerRichTextEditorConfig() {
		const headerEntity = this._getHeaderEntity();
		return headerEntity
			&& headerEntity.getSubEntityByRel(Rels.richTextEditorConfig);
	}

	/**
	 * @returns {bool} Header is displayed for the quiz entity
	 */
	headerIsDisplayed() {
		const headerEntity = this._getHeaderEntity();
		return headerEntity && headerEntity.hasClass(Classes.quizzes.headerIsDisplayed);
	}

	/**
	 * @returns {bool} Header is initially empty for the quiz entity
	 */
	originalHeaderIsEmpty() {
		const headerEntity = this._getHeaderEntity();
		return headerEntity
			&& headerEntity.properties
			&& !headerEntity.properties.text;
	}

	/**
	 * @returns {string} Quiz footer in plaintext (HTML stripped)
	 */
	footerPlaintext() {
		const footerEntity = this._getFooterEntity();
		return footerEntity
			&& footerEntity.properties
			&& footerEntity.properties.text;
	}

	/**
	 * @returns {string} Quiz footer in HTML
	 */
	footerHtml() {
		const footerEntity = this._getFooterEntity();
		if (!footerEntity || !footerEntity.properties || !footerEntity.properties.html) {
			return;
		}
		return footerEntity.properties.html;
	}

	/**
	 * @returns {string} Quiz footer formatted to be used with a d2l-html-editor
	 */
	footerEditorHtml() {
		const footerEntity = this._getFooterEntity();
		if (!footerEntity) {
			return;
		}

		const updateFooterAction = footerEntity.getActionByName(Actions.quizzes.updateFooter);
		return updateFooterAction
			&& updateFooterAction.hasFieldByName('footer')
			&& updateFooterAction.getFieldByName('footer').value;
	}

	/**
	 * @returns {String} Categories endpoint link
	 */
	categoriesHref() {
		if (!this._entity) {
			return;
		}
		const subEntity = this._entity.getSubEntityByRel(Rels.Quizzes.categories);

		return subEntity && subEntity.href;
	}

	/**
	 * @returns {bool} Whether or not the edit footer action is present on the quiz entity
	 */
	canEditFooter() {
		const footerEntity = this._getFooterEntity();
		return footerEntity
			&& footerEntity.hasActionByName(Actions.quizzes.updateFooter);
	}

	/**
	 * Updates the quiz to have the given footer
	 * @param {string} footer Footer to set on the assignment
	 */
	async setFooter(footer) {
		const footerEntity = this.canEditFooter() && this._getFooterEntity();
		if (!footerEntity) {
			return;
		}

		const action = footerEntity.getActionByName(Actions.quizzes.updateFooter);
		if (!action) {
			return;
		}

		const fields = [{ name: 'footer', value: footer }];
		await performSirenAction(this._token, action, fields);
	}

	/**
	 * @returns {object} Richtext editor config for the quiz footer; for use with d2l-html-editor
	 */
	footerRichTextEditorConfig() {
		const footerEntity = this._getFooterEntity();
		return footerEntity
			&& footerEntity.getSubEntityByRel(Rels.richTextEditorConfig);
	}

	/**
	 * @returns {bool} Footer is displayed for the quiz entity
	 */
	footerIsDisplayed() {
		const footerEntity = this._getFooterEntity();
		return footerEntity && footerEntity.hasClass(Classes.quizzes.footerIsDisplayed);
	}

	/**
	 * @returns {bool} Footer is initially empty for the quiz entity
	 */
	originalFooterIsEmpty() {
		const footerEntity = this._getFooterEntity();
		return footerEntity
			&& footerEntity.properties
			&& !footerEntity.properties.text;
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

	/**
	 * @returns {string} Attempts Href of the quiz entity, if present
	*/
	attemptsHref() {
		if (!this._entity || !this._entity.hasSubEntityByRel(Rels.Quizzes.attempts)) {
			return;
		}

		return this._entity.getSubEntityByRel(Rels.Quizzes.attempts).href;
	}

	/**
	 * @returns {string} Ip restrictions Href of the quiz entity, if present
	*/
	ipRestrictionsHref() {
		if (!this._entity || !this._entity.hasSubEntityByRel(Rels.Quizzes.ipRestrictions)) {
			return;
		}
		return this._entity.getSubEntityByRel(Rels.Quizzes.ipRestrictions).href;
	}

	/**
	 * @returns {string} Submission views Href of the quiz entity, if present
	*/
	submissionViewsHref() {
		if (!this._entity || !this._entity.hasSubEntityByRel(Rels.Quizzes.submissionViews)) {
			return;
		}
		return this._entity.getSubEntityByRel(Rels.Quizzes.submissionViews).href;
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
		const updateSyncGradebookAction = this.canEditSyncGradebook() ? this._formatUpdateSyncGradebook(quiz) : null;
		const updateSyncGradebookDefaultAction = this.canEditSyncGradebook() ? this._formatUpdateSyncGradebookDefault(quiz) : null;
		const updateDescriptionAction = this.canEditDescription() ? this._formatUpdateDescriptionAction(quiz) : null;
		const updateHeaderAction = this.canEditHeader() ? this._formatUpdateHeaderAction(quiz) : null;
		const updateFooterAction = this.canEditFooter() ? this._formatUpdateFooterAction(quiz) : null;

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
			updateSyncGradebookAction,
			updateSyncGradebookDefaultAction,
			updateDescriptionAction,
			updateHeaderAction,
			updateFooterAction
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

	_formatUpdateSyncGradebook(quiz) {
		if (!quiz) return;
		if (!this._hasSyncGradebookChanged(quiz.syncGradebook)) return;

		const entity = this._entity.getSubEntityByRel(Rels.Quizzes.syncGradebook);
		if (!entity) return;

		const action = entity.getActionByName(Actions.quizzes.updateSyncGradebook);
		if (!action) return;

		const fields = [
			{ name: 'syncGradebook', value: quiz.syncGradebook },
		];

		return { action, fields };
	}

	_formatUpdateSyncGradebookDefault(quiz) {
		if (!quiz) return;
		if (!this._hasSyncGradebookDefaultChanged(quiz.syncGradebookDefault)) return;

		const entity = this._entity.getSubEntityByRel(Rels.Quizzes.syncGradebook);
		if (!entity) return;

		const action = entity.getActionByName(Actions.quizzes.updateSyncGradebookDefault);
		if (!action) return;

		const fields = [
			{ name: 'syncGradebookDefault', value: quiz.syncGradebookDefault },
		];

		return { action, fields };
	}

	/**
	 * Checks if quiz description has changed and if so returns the appropriate action/fields to update
	 * @param {object} quiz the quiz that's being modified
	 */

	_formatUpdateDescriptionAction(quiz) {
		const { description } = quiz || {};
		const hasDescriptionChanged = this.introIsAppendedToDescription() || this._hasDescriptionChanged(description);

		if (typeof description === 'undefined') return;

		if (!hasDescriptionChanged && this.descriptionIsDisplayed()) return;

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

	/**
	 * Checks if quiz header has changed and if so returns the appropriate action/fields to update
	 * @param {object} quiz the quiz that's being modified
	 */

	_formatUpdateHeaderAction(quiz) {
		const { header } = quiz || {};

		if (typeof header === 'undefined') return;

		if (!this._hasHeaderChanged(header) && this.headerIsDisplayed()) return;

		const headerEntity = this._getHeaderEntity();

		if (!headerEntity) return;

		const action = headerEntity.getActionByName(Actions.quizzes.updateHeader);

		if (!action) {
			return;
		}

		const fields = [
			{ name: 'header', value: header },
		];
		return { action, fields };
	}

	/**
	 * Checks if quiz footer has changed and if so returns the appropriate action/fields to update
	 * @param {object} quiz the quiz that's being modified
	 */

	_formatUpdateFooterAction(quiz) {
		const { footer } = quiz || {};

		if (typeof footer === 'undefined') return;

		if (!this._hasFooterChanged(footer) && this.footerIsDisplayed()) return;

		const footerEntity = this._getFooterEntity();

		if (!footerEntity) return;

		const action = footerEntity.getActionByName(Actions.quizzes.updateFooter);

		if (!action) {
			return;
		}

		const fields = [
			{ name: 'footer', value: footer },
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

	_hasSyncGradebookChanged(syncGradebook) {
		return syncGradebook !== this.isSyncGradebookEnabled();
	}

	_hasSyncGradebookDefaultChanged(syncGradebookDefault) {
		return syncGradebookDefault !== this.isSyncGradebookDefault();
	}

	_hasDescriptionChanged(description) {
		return description !== this.descriptionEditorHtml();
	}

	_hasHeaderChanged(header) {
		return header !== this.headerEditorHtml();
	}

	_hasFooterChanged(footer) {
		return footer !== this.footerEditorHtml();
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
			[this.isSyncGradebookEnabled(), quiz.syncGradebook],
			[this.isSyncGradebookDefault(), quiz.syncGradebookDefault],
			[this.descriptionEditorHtml(), quiz.description],
			[this.headerEditorHtml(), quiz.header],
			[this.footerEditorHtml(), quiz.footer]
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

	_getHeaderEntity() {
		return this._entity
			&& this._entity.hasSubEntityByRel(Rels.Quizzes.header)
			&& this._entity.getSubEntityByRel(Rels.Quizzes.header);
	}

	_getFooterEntity() {
		return this._entity
			&& this._entity.hasSubEntityByRel(Rels.Quizzes.footer)
			&& this._entity.getSubEntityByRel(Rels.Quizzes.footer);
	}

	_canCheckout() {
		return this._entity && this._entity.hasActionByName(Actions.workingCopy.checkout);
	}

	canCheckin() {
		return this._entity && this._entity.hasActionByName(Actions.workingCopy.checkin);
	}

	/**
	 * Checkout quiz working copy
	 */
	async checkout() {
		if (this._canCheckout()) {
			const action = this.getActionByName(Actions.workingCopy.checkout);
			const entity = await performSirenAction(this._token, action);
			if (!entity) return;
			return new QuizEntity(entity, this._token);
		}
	}

	/**
	 * Checkin quiz working copy
	 */
	async checkin() {
		if (this.canCheckin()) {
			const action = this.getActionByName(Actions.workingCopy.checkin);
			let entity;
			try {
				entity = await performSirenAction(this._token, action);
			} catch (e) {
				return Promise.reject(e);
			}
			if (!entity) return;
			return new QuizEntity(entity, this._token);
		}
	}

	async activityTypes() {
		const action = this._entity.getActionByName(Actions.quizzes.getActivityTypes);
		if (!action) {
			return;
		}

		const types = await performSirenAction(this._token, action);
		if (!types || !types.entities) {
			return;
		}

		const items = types.getSubEntitiesByRel('item');
		if (!items || !items.length) {
			return;
		}

		return items.map(item => new ActivityTypeEntity(item));
	}
}
