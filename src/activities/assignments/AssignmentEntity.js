import { Actions, Classes, Rels } from '../../hypermedia-constants.js';
import { performSirenAction, performSirenActions } from '../../es6/SirenAction.js';
import { Entity } from '../../es6/Entity.js';

const HUMAN_GENERATED = 0;
const AI_INSPIRED = 3;

const actions = {
	delete: 'delete-folder',
	cancel: 'cancel-folder'
};

/**
 * AssignmentEntity class representation of a d2l Assignment.
 */
export class AssignmentEntity extends Entity {
	/**
	 * @returns {string} Name of the assignment
	 */
	name() {
		return this._entity && this._entity.properties && this._entity.properties.name;
	}

	recommendAlignmentsEndpoint() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.Assignments.recommendAlignments)) {
			return;
		}
		return this._entity.getLinkByRel(Rels.Assignments.recommendAlignments).href;
	}

	outcomesTerm() {
		if (!this._entity || !this._entity.properties) {
			return;
		}
		return this._entity.properties['outcomes-term'];
	}

	/**
	 * @returns {bool} Whether or not the edit name action is present on the assignment entity
	 */
	canEditName() {
		return this._entity && this._entity.hasActionByName(Actions.assignments.updateName);
	}

	/**
	 * Updates the assignment to have the given name
	 * @param {string} name Name to set on the assignment
	 */
	_formatNameAction(name) {
		if (!name || !this._hasNameChanged(name)) {
			return;
		}

		const action = this.canEditName() && this._entity.getActionByName(Actions.assignments.updateName);
		if (!action) {
			return;
		}

		const fields = [{ name: 'name', value: name }];
		return { action, fields };
	}
	_getInstructionsEntity() {
		return this._entity
			&& this._entity.hasSubEntityByRel(Rels.Assignments.instructions)
			&& this._entity.getSubEntityByRel(Rels.Assignments.instructions);
	}

	/**
	 * @returns {string} Assignment instructions in plaintext (HTML stripped)
	 */
	instructionsPlaintext() {
		const instructionsEntity = this._getInstructionsEntity();
		return instructionsEntity
			&& instructionsEntity.properties
			&& instructionsEntity.properties.text;
	}

	/**
	 * @returns {string} Assignment instructions in HTML
	 */
	instructionsHtml() {
		const instructionsEntity = this._getInstructionsEntity();
		return instructionsEntity
			&& instructionsEntity.properties
			&& instructionsEntity.properties.html;
	}

	/**
	 * @returns {string} Assignment instructions formatted to be used with a d2l-html-editor
	 */
	instructionsEditorHtml() {
		const instructionsEntity = this._getInstructionsEntity();
		if (!instructionsEntity) {
			return;
		}

		const updateInstructionsAction = instructionsEntity.getActionByName(Actions.assignments.updateInstructions);
		return updateInstructionsAction
			&& updateInstructionsAction.hasFieldByName('instructions')
			&& updateInstructionsAction.getFieldByName('instructions').value;
	}

	/**
	 * @returns {bool} Whether or not the edit instructions action is present on the assignment entity
	 */
	canEditInstructions() {
		const instructionsEntity = this._getInstructionsEntity();
		return instructionsEntity
			&& instructionsEntity.hasActionByName(Actions.assignments.updateInstructions);
	}

	/**
	 * Updates the assignment to have the given instructions
	 * @param {string} instructions Instructions to set on the assignment
	 */
	_formatInstructionsAction(instructions) {
		const instructionsEntity = this.canEditInstructions() && this._getInstructionsEntity();
		if (!instructionsEntity || instructions === undefined || !this._hasInstructionsChanged(instructions)) {
			return;
		}

		const action = instructionsEntity.getActionByName(Actions.assignments.updateInstructions);
		if (!action) {
			return;
		}

		const fields = [{ name: 'instructions', value: instructions }];
		return { action, fields };
	}

	/**
	 * @returns {string} URL for activity usage associated with the assignment
	 */
	activityUsageHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.Activities.activityUsage)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.Activities.activityUsage).href;
	}

	/**
	 * @returns {bool} Whether the turnitin dialog opener sub entity is present.
	 */
	canEditTurnitin() {

		if (!this._entity) {
			return false;
		}

		return this._entity.hasSubEntityByRel(Rels.Assignments.turnitinDialogOpener);
	}

	/**
	 * @returns {string} Url of the legacy turnitin dialog.
	 */
	editTurnitinUrl() {

		const entity = this._entity.getSubEntityByRel(Rels.Assignments.turnitinDialogOpener);
		return entity ? entity.properties.url : undefined;
	}

	/** @returns {bool} Whether originality check is enabled */
	isOriginalityCheckEnabled() {

		const entity = this._entity.getSubEntityByRel(Rels.Assignments.turnitinDialogOpener);
		return entity ? Boolean(entity.properties.isOriginalityCheckEnabled) : false;
	}

	/** @returns {bool} Whether grade mark is enabled */
	isGradeMarkEnabled() {

		const entity = this._entity.getSubEntityByRel(Rels.Assignments.turnitinDialogOpener);
		return entity ? Boolean(entity.properties.isGradeMarkEnabled) : false;
	}

	/**
	 * @returns {bool} Whether or not the edit default scoring rubric action is present on the assignment entity
	 */
	canEditDefaultScoringRubric() {
		return this._entity && this._entity.hasActionByName(Actions.assignments.updateDefaultScoringRubric);
	}

	/**
	 * @returns {Array} The list of associated rubrics
	 */
	getRubrics() {
		if (!this._entity) {
			return [];
		}

		return this._entity.getLinksByRel(Rels.rubric);
	}

	/**
	 * @returns {string} The default scoring rubric ID
	 */
	getDefaultScoringRubric() {
		if (!this._entity) {
			return null;
		}

		const defaultScoringRubricId = this._entity.properties.defaultScoringRubricId;

		if (!defaultScoringRubricId) {
			return null;
		}

		return String(defaultScoringRubricId);
	}

	/**
	 * @returns {string} Name of the selected group category for the assignment type
	 */
	getAssignmentTypeSelectedGroupCategoryName() {
		if (!this._entity) {
			return null;
		}
		const subEntity = this._entity.getSubEntityByRel(Rels.Assignments.folderType);
		if (!subEntity || !subEntity.properties || !subEntity.properties.groupName) {
			return null;
		}
		return subEntity.properties.groupName;
	}

	getAssignmentTypeSelectedTargetDropboxId() {
		if (!this._entity) {
			return null;
		}
		const subEntity = this._entity.getSubEntityByRel(Rels.Assignments.folderType);
		if (!subEntity || !subEntity.properties || !subEntity.properties.targetDropboxId) {
			return null;
		}
		return subEntity.properties.targetDropboxId;
	}

	getPromptHeaders() {
		if (!this._entity) {
			return null;
		}
		const promptHeaders = this._entity.properties.prompts;
		return promptHeaders ? promptHeaders : null;
	}

	/**
	 * @returns {bool} If the assignment type cannot be changed
	 */
	isAssignmentTypeReadOnly() {
		if (!this._entity) {
			return false;
		}

		const subEntity = this._entity.getSubEntityByRel(Rels.Assignments.folderType);
		if (!subEntity) {
			return false;
		}
		return !subEntity.hasActionByName(Actions.assignments.updateFolderType);
	}

	/**
	 * @returns {bool} If the assignment has submissions
	 */
	assignmentHasSubmissions() {
		if (!this._entity) {
			return false;
		}

		const subEntity = this._entity.getSubEntityByRel(Rels.Assignments.folderType);
		if (!subEntity) {
			return false;
		}

		return subEntity.hasClass(Classes.assignments.assignmentType.hasSubmissions);
	}

	/**
	 * @returns {bool} If the assignment type "group assignment" can be set
	 */
	isGroupAssignmentTypeDisabled() {
		if (!this._entity) {
			return false;
		}
		const subEntity = this._entity.getSubEntityByRel(Rels.Assignments.folderType);
		if (!subEntity) {
			return false;
		}
		return subEntity.hasClass(Classes.assignments.assignmentType.noGroupType);
	}

	/**
	 * @returns {string} The additional information related to the assignment type
	 */
	getAssignmentTypeInformationText() {
		if (!this._entity) {
			return null;
		}
		const subEntity = this._entity.getSubEntityByRel(Rels.Assignments.folderType);
		if (!subEntity || !subEntity.properties || !subEntity.properties.informationText) {
			return null;
		}
		return subEntity.properties.informationText;
	}

	isAiInspired() {
		return this._entity && this._entity.hasClass(Classes.assignments.aiInspired);
	}

	promptHeaders() {
		if (!this._entity) {
			return null;
		}
		const subEntity = this._entity.getSubEntityByRel(Rels.Assignments.promptHeaders);
		return subEntity?.properties?.prompts ?? null;
	}

	/**
	 * @returns {String} The assignmentType of the assignment
	 */
	getAssignmentType() {
		if (!this._entity) {
			return;
		}
		const subEntity = this._entity.getSubEntityByRel(Rels.Assignments.folderType);
		if (!subEntity) {
			return;
		}
		if (subEntity.hasClass(Classes.assignments.assignmentType.individual)) {
			return Classes.assignments.assignmentType.individual;
		} else if (subEntity.hasClass(Classes.assignments.assignmentType.group)) {
			return Classes.assignments.assignmentType.group;
		} else if (subEntity.hasClass(Classes.assignments.assignmentType.peerReview)) {
			return Classes.assignments.assignmentType.peerReview;
		} else {
			return;
		}
	}

	/**
	 * @returns {Array} The list of group categories for group assignment type
	 */
	getAssignmentTypeGroupCategoryOptions() {
		if (!this._entity) {
			return [];
		}
		const subEntity = this._entity.getSubEntityByRel(Rels.Assignments.folderType);
		if (!subEntity) {
			return [];
		}
		const action = subEntity.getActionByName(Actions.assignments.updateGroupType);
		if (!action || !action.hasFieldByName('groupTypeId')) {
			return [];
		}
		return action.getFieldByName('groupTypeId').value;
	}

	/**
	 * @returns {String} The groups homepage link
	 */
	getGroupsHomepageLink() {
		if (!this._entity) {
			return null;
		}
		const subEntity = this._entity.getSubEntityByRel(Rels.Assignments.folderType);
		if (!subEntity) {
			return null;
		}
		const groupHomepageSubEntity = subEntity.getSubEntityByRel(Rels.Assignments.groupsHomepage);
		if (!groupHomepageSubEntity || !groupHomepageSubEntity.properties || !groupHomepageSubEntity.properties.url) {
			return null;
		}
		return groupHomepageSubEntity.properties.url;
	}

	/**
	 * @returns {String} Categories endpoint link
	 */
	getCategoriesLink() {
		if (!this._entity) {
			return;
		}
		const subEntity = this._entity.getSubEntityByRel(Rels.Assignments.categories);

		return subEntity && subEntity.href;
	}

	getFolderListLink() {
		if (!this._entity) {
			return;
		}
		const link = this._entity.getLinkByRel(Rels.Assignments.folderList);

		return link && link.href;
	}

	/**
	 * @returns {String} Organization endpoint link
	 */
	getOrganizationHref() {
		if (!this._entity && !this._entity.hasLinkByRel(Rels.organization)) {
			return;
		}
		const organizationHref = this._entity.getLinkByRel(Rels.organization);
		return organizationHref && organizationHref.href;
	}

	_getReadOnlySubmissionTypeOptions() {
		if (!this._entity) {
			return [];
		}

		const currentSubmissionType = this._entity.properties.submissionType;
		return currentSubmissionType ? [currentSubmissionType] : [];
	}

	_getReadOnlyAllowableFileTypeOptions() {
		if (!this._entity) {
			return [];
		}

		const currentAllowableFileType = this._entity.properties.allowableFileType;
		return currentAllowableFileType ? [currentAllowableFileType] : [];
	}

	/**
	 * @returns {object} Submission type of the assignment (including type value and type title)
	 */
	submissionType() {
		if (!this._entity || !this._entity.properties) {
			return;
		}

		return this._entity.properties.submissionType;
	}

	/**
	 * @returns {object} Allowable filetype of the assignment (including type value and type title)
	 */
	allowableFileType() {
		if (!this._entity || !this._entity.properties) {
			return;
		}
		return this._entity.properties.allowableFileType;
	}

	allowableFileTypeValue() {
		if (!this._entity) {
			return;
		}

		const allowableFileType = this.allowableFileType();
		if (allowableFileType) {
			return String(allowableFileType.value);
		}
		return String(undefined);
	}

	/**
	 * @returns {object} Custom allowablefile types of the assignment
	 */
	customAllowableFileTypes() {
		if (!this._entity || !this._entity.properties) {
			return;
		}
		return this._entity.properties.customAllowableFileTypes ? this._entity.properties.customAllowableFileTypes : '';
	}

	/**
	 * @returns {Array} Set of submission type options for this assignment
	 */
	submissionTypeOptions() {
		if (!this._entity) {
			return [];
		}

		const action = this._entity.getActionByName(Actions.assignments.updateSubmissionType);
		if (!action) {
			return this._getReadOnlySubmissionTypeOptions();
		}

		if (!action.hasFieldByName('submissionType')) {
			return this._getReadOnlySubmissionTypeOptions();
		}

		return action.getFieldByName('submissionType').value;
	}

	/**
	 * @returns {Array} Set of allowable filetype options for this assignment
	 */
	allowableFileTypeOptions() {
		if (!this._entity) {
			return [];
		}

		const action = this._entity.getActionByName(Actions.assignments.updateAllowableFileType);
		if (!action) {
			return this._getReadOnlyAllowableFileTypeOptions();
		}

		if (!action.hasFieldByName('allowableFileType')) {
			return this._getReadOnlyAllowableFileTypeOptions();
		}

		return action.getFieldByName('allowableFileType').value;
	}

	/**
	 * @returns {bool} Whether or not the edit submission type action is present on the assignment entity
	 */
	canEditSubmissionType() {
		return this._entity && this._entity.hasActionByName(Actions.assignments.updateSubmissionType);
	}

	/**
	 * @returns {bool} Whether or not the edit allowable filetypes action is present on the assignment entity
	 */
	canEditAllowableFileType() {
		return this._entity && this._entity.hasActionByName(Actions.assignments.updateAllowableFileType);
	}

	canEditCustomAllowableFileTypes() {
		return this._entity && this._entity.hasActionByName(Actions.assignments.updateCustomAllowableFileType);
	}

	/**
	 * @summary Formats action and fields if assignment has been ai inspired
	 * @param {object} isAiInspired whether this assignment has been ai inspired
	 * @returns {object} action and fields for updating isAiInspired
	 */
	_formatUpdateAiInspiredAction(isAiInspired) {
		if (typeof isAiInspired === 'undefined') return;
		if (!this._hasAiInspiredChanged(isAiInspired)) return;

		const action = this._entity.getActionByName(Actions.assignments.updateName);
		if (!action) {
			return;
		}
		const fields = [
			{ name: 'aiHumanOrigin', value: isAiInspired ? AI_INSPIRED : HUMAN_GENERATED },
		];

		return { action, fields };
	}

	_formatUpdatePromptHeadersAction(promptHeaders) {
		if (typeof promptHeaders === 'undefined' || !Array.isArray(promptHeaders)) return;
		if (!this._hasPromptHeadersChanged(promptHeaders)) return;

		const action = this._entity.getActionByName(Actions.assignments.updatePromptHeaders);
		if (!action) {
			return;
		}
		const fields = [
			{ name: 'promptHeaders', value: JSON.stringify(promptHeaders) },
		];

		return { action, fields };
	}

	/**
	 * Sets the submission type of the assignment
	 * @param {number} submissionType Submission type - see SUBMISSIONTYPE_T under https://docs.valence.desire2learn.com/res/dropbox.html#attributes for more info
	 */
	_formatSubmissionsTypeAction(submissionType) {
		if (!submissionType || !this._hasSubmissionsTypeChanged(submissionType)) {
			return;
		}
		submissionType = Number(submissionType);

		const action = this.canEditSubmissionType() && this._entity.getActionByName(Actions.assignments.updateSubmissionType);
		if (!action) {
			return;
		}

		const fields = [
			{ name: 'submissionType', value: submissionType },
		];
		return { action, fields };
	}

	/**
	 * Sets the group/individual status for an assignment
	 * @param {String} assignmentType Allowable filetype option see https://docs.valence.desire2learn.com/res/dropbox.html#term-DROPBOXTYPE_T
	 * @param {Number} groupTypeId Group id
	 */
	_formatAssignmentTypeAction(assignmentType, groupTypeId, targetDropboxId) {
		if (!this._entity || assignmentType === undefined || this.isAssignmentTypeReadOnly()) {
			return;
		}

		const subEntity = this._entity.getSubEntityByRel(Rels.Assignments.folderType);
		if (!subEntity) {
			return;
		}

		const fields = [];
		let action;

		switch (assignmentType) {
			case Classes.assignments.assignmentType.individual:
				action = subEntity.getActionByName(Actions.assignments.updateFolderType);
				fields.push({ name: 'groupTypeId', value: null });
				fields.push({ name: 'folderType', value: 2 });
				fields.push({ name: 'targetDropboxId', value: null });
				break;

			case Classes.assignments.assignmentType.group:
				if (!this.isGroupAssignmentTypeDisabled()) {
					action = subEntity.getActionByName(Actions.assignments.updateFolderType);
					fields.push({ name: 'groupTypeId', value: groupTypeId });
					fields.push({ name: 'folderType', value: 1 });
					fields.push({ name: 'targetDropboxId', value: null });
				}
				break;
			case Classes.assignments.assignmentType.peerReview:
				action = subEntity.getActionByName(Actions.assignments.updateFolderType);
				fields.push({ name: 'groupTypeId', value: null });
				fields.push({ name: 'folderType', value: 3 });
				fields.push({ name: 'targetDropboxId', value: targetDropboxId });
				break;
			default:
				// Handle invalid or unsupported AssignmentType
				return;
		}

		if (!action || fields.length < 1) {
			return;
		}

		return { action, fields };
	}

	/**
	 * Sets the allowable filetypes of the assignment
	 * @param {number} allowableFileType Allowable filetype option
	 */
	_formatAllowableFileTypeAction(allowableFileType) {
		if (allowableFileType === undefined || !this._hasAllowableFileTypeChanged(allowableFileType)) {
			return;
		}

		const action = this.canEditAllowableFileType() && this._entity.getActionByName(Actions.assignments.updateAllowableFileType);
		if (!action) {
			return;
		}

		const fields = [
			{ name: 'allowableFileType', value: allowableFileType }
		];
		return { fields, action };
	}

	/**
	 * Sets the custom allowable filetypes of the assignment
	 * @param {string} customAllowableFileTypes Allowable filetype option
	 */
	_formatCustomAllowableFileTypeAction(allowableFileType, customAllowableFileTypes) {
		const allowableFileTypeCustomValue = '5';

		if (customAllowableFileTypes === undefined || allowableFileType !== allowableFileTypeCustomValue || !this.canEditCustomAllowableFileTypes()) {
			return;
		}

		const action = this._entity.getActionByName(Actions.assignments.updateCustomAllowableFileType);
		if (!action) {
			return;
		}

		const fields = [
			{ name: 'customAllowableFileTypes', value: String(customAllowableFileTypes) }
		];

		return { fields, action };
	}

	/**
	 * @returns {object} Completion type of the assignment (including type value and type title)
	 */
	completionType() {
		if (!this._entity || !this._entity.properties) {
			return;
		}

		return this._entity.properties.completionType;
	}

	completionTypeValue() {
		if (!this._entity) {
			return;
		}

		const completionType = this.completionType();
		if (completionType) {
			return String(completionType.value);
		}
		return String(0);
	}

	/**
	 * @returns {Array} Set of all possible completion type options
	 */
	allCompletionTypeOptions() {
		if (!this.canEditCompletionType()) {
			return [];
		}

		const action = this._entity.getActionByName(Actions.assignments.updateCompletionType);
		if (!action.hasFieldByName('completionType')) {
			return [];
		}

		return action.getFieldByName('completionType').value;
	}

	/**
	 * @returns {bool} Whether or not the edit completion type action is present on the assignment entity
	 */
	canEditCompletionType() {
		return this._entity && this._entity.hasActionByName(Actions.assignments.updateCompletionType);
	}

	/**
	 * Sets the completion type of the assignment
	 * @param {number} submissionType Submission type - see COMPLETIONTYPE_T under https://docs.valence.desire2learn.com/res/dropbox.html#attributes for more info
	 */
	_formatCompletionTypeAction(completionType) {
		if (!completionType || !this._hasCompletionTypeChanged(completionType)) {
			return;
		}

		const action = this.canEditCompletionType() && this._entity.getActionByName(Actions.assignments.updateCompletionType);
		if (!action) {
			return;
		}

		const fields = [
			{ name: 'completionType', value: Number(completionType) }
		];
		return { action, fields };
	}

	_submissionsRuleField() {
		const subEntity = this._entity && this._entity.getSubEntityByRel(Rels.Assignments.submissionsRule);

		if (!subEntity || !subEntity.properties || subEntity.hasClass(Classes.assignments.inactive)) {
			return;
		}

		return subEntity.properties.rule;
	}

	submissionsRule() {
		const field = this._submissionsRuleField();
		return field && field.value;
	}

	canEditSubmissionsRule() {
		const subEntity = this._entity && this._entity.getSubEntityByRel(Rels.Assignments.submissionsRule);
		return subEntity && subEntity.hasActionByName(Actions.assignments.updateSubmissionsRule);
	}

	_formatSubmissionsRuleAction(submissionsRule) {
		if (submissionsRule === undefined || !this._hasSubmissionsRuleChanged(submissionsRule)) {
			return;
		}

		const subEntity = this._entity && this._entity.getSubEntityByRel(Rels.Assignments.submissionsRule);
		const action = this.canEditSubmissionsRule() && subEntity && subEntity.getActionByName(Actions.assignments.updateSubmissionsRule);
		if (!action) {
			return;
		}

		const fields = [
			{ name: 'submissionsRule', value: submissionsRule }
		];

		return { action, fields };
	}

	getSubmissionsRuleOptions() {
		if (!this._entity) {
			return [];
		}

		// readOnly
		if (!this.canEditSubmissionsRule()) {
			return this._submissionsRuleField() ? [this._submissionsRuleField()] : [];
		}

		const subEntity = this._entity && this._entity.getSubEntityByRel(Rels.Assignments.submissionsRule);
		const action = this.canEditSubmissionsRule() && subEntity && subEntity.getActionByName(Actions.assignments.updateSubmissionsRule);
		return action.getFieldByName('submissionsRule').value;
	}

	filesSubmissionLimit() {
		const subEntity = this._entity && this._entity.getSubEntityByRel(Rels.Assignments.filesSubmissionLimit);

		if (!subEntity || !subEntity.properties || subEntity.hasClass(Classes.assignments.inactive)) {
			return;
		}

		return subEntity.properties.limit;
	}

	canEditFilesSubmissionLimit() {
		const subEntity = this._entity && this._entity.getSubEntityByRel(Rels.Assignments.filesSubmissionLimit);
		return subEntity && subEntity.hasActionByName(Actions.assignments.updateFilesSubmissionLimit);
	}

	_formatFileSubmissionLimitAction(filesSubmissionLimit) {
		if (filesSubmissionLimit === undefined || !this._hasFileSubmissionLimitChanged(filesSubmissionLimit)) {
			return;
		}
		const subEntity = this._entity && this._entity.getSubEntityByRel(Rels.Assignments.filesSubmissionLimit);
		const action = this.canEditFilesSubmissionLimit() && subEntity && subEntity.getActionByName(Actions.assignments.updateFilesSubmissionLimit);
		if (!action) {
			return;
		}

		const fields = [
			{ name: 'filesSubmissionLimit', value: filesSubmissionLimit }
		];

		return { fields, action };
	}

	/**
	 * @returns {bool} Whether or not the show allow text submission is present on the assignment entity
	 */
	showAllowTextSubmission() {
		return this._entity && this._entity.properties && this._entity.properties.showAllowTextSubmission;
	}

	allowTextSubmission() {
		return this._entity && this._entity.properties && this._entity.properties.allowTextSubmission;
	}

	canEditAllowTextSubmission() {
		this._entity && this._entity.hasActionByName(Actions.assignments.updateAllowTextSubmission);
	}

	_formatUpdateAllowTextSubmissionAction(allowTextSubmission) {
		if (allowTextSubmission === undefined || !this._hasAllowTextSubmissionChanged(allowTextSubmission)) {
			return;
		}

		const action = this.canEditAllowTextSubmission && this._entity.getActionByName(Actions.assignments.updateAllowTextSubmission);
		if (!action) {
			return;
		}

		const fields = [
			{ name: 'allowTextSubmission', value: allowTextSubmission }
		];

		return { fields, action };

	}

	notificationEmail() {
		const subEntity = this._entity && this._entity.getSubEntityByRel(Rels.Assignments.notificationEmail);
		if (!subEntity || !subEntity.properties) {
			return;
		}
		const props = subEntity.properties;
		return props && props.email;
	}

	canEditNotificationEmail() {
		const subEntity = this._entity && this._entity.getSubEntityByRel(Rels.Assignments.notificationEmail);
		return subEntity && subEntity.hasActionByName(Actions.assignments.updateNotificationEmail);
	}

	/**
	 * @param {string} notificationEmail The email to set for notifications
	 */
	_formatUpdateNotificationEmailAction(notificationEmail) {
		if (notificationEmail === undefined || !this._hasNotificationEmailChanged(notificationEmail) || !this.canEditNotificationEmail()) {
			return;
		}
		const subEntity = this._entity && this._entity.getSubEntityByRel(Rels.Assignments.notificationEmail);
		const action = subEntity && subEntity.getActionByName(Actions.assignments.updateNotificationEmail);
		if (!action) {
			return;
		}
		const fields = [
			{ name: 'notificationEmail', value: notificationEmail }
		];
		return { action, fields };
	}

	/**
	 * @returns {bool} Whether or not annotations are enabled for the assignment entity
	 */
	getAvailableAnnotationTools() {
		const annotationsEntity = this._entity.getSubEntityByRel(Rels.Assignments.annotations);
		return annotationsEntity && annotationsEntity.hasClass(Classes.assignments.annotationEnabled);
	}

	/** @returns {bool} Whether anonymous marking is available */
	isAnonymousMarkingAvailable() {
		if (!this._entity) return false;
		const subEntity = this._entity.getSubEntityByRel(Rels.Assignments.anonymousMarking);
		return !!subEntity;
	}

	/** @returns {bool} Whether anonymous marking is enabled */
	isAnonymousMarkingEnabled() {
		if (!this._entity) return false;
		const subEntity = this._entity.getSubEntityByRel(Rels.Assignments.anonymousMarking);
		if (!subEntity) return false;
		return subEntity.hasClass('checked');
	}

	/** @returns {bool} Whether anonymous marking can be edited */
	canEditAnonymousMarking() {
		if (!this._entity) return false;
		const subEntity = this._entity.getSubEntityByRel(Rels.Assignments.anonymousMarking);
		if (!subEntity) return false;
		return subEntity.hasActionByName(Actions.assignments.anonymousMarking.updateAnonymousMarking);
	}

	/** @returns {string} Help text when anonymous marking cannot be edited */
	getAnonymousMarkingHelpText() {
		if (!this._entity) return null;
		const subEntity = this._entity.getSubEntityByRel(Rels.Assignments.anonymousMarking);
		if (!subEntity) return null;
		return subEntity.title || null;
	}

	/**
	 * Sets anonymous marking
	 * @param {bool} isAnonymous Whether anonymous marking is enabled
	 */
	_formatAnonymousMarkingAction(isAnonymous) {
		if (!this._entity || isAnonymous === undefined || !this._hasAnonymousMarkingChanged(isAnonymous)) return;
		const subEntity = this._entity.getSubEntityByRel(Rels.Assignments.anonymousMarking);
		if (!subEntity) return;
		const action = subEntity.getActionByName(Actions.assignments.anonymousMarking.updateAnonymousMarking);
		if (!action) return;
		const fields = [{ name: 'isAnonymous', value: isAnonymous }];

		return { fields, action };
	}

	/**
	 * Sets default scoring rubric
	 * @param {Number} defaultScoringRubricId Sets default scoring rubric
	 */
	_formatDefaultScoringRubricAction(defaultScoringRubricId) {
		if (defaultScoringRubricId === undefined || !this._hasDefaultScoringRubricChanged(defaultScoringRubricId) || !this.canEditDefaultScoringRubric()) {
			return;
		}

		const action = this._entity.getActionByName(Actions.assignments.updateDefaultScoringRubric);
		if (!action) {
			return;
		}
		const fields = [
			{ name: 'defaultScoringRubricId', value: defaultScoringRubricId }
		];
		return { action, fields };
	}

	/**
	 * @returns {bool} Whether or not the user can see and set annotation availability for the assignment entity
	 */
	canEditAnnotations() {
		const annotationsEntity = this._entity.getSubEntityByRel(Rels.Assignments.annotations);
		return annotationsEntity && annotationsEntity.hasActionByName(Actions.assignments.updateAnnotationToolsAvailability);
	}

	/**
	 * Set the status of whether annotation tools are available or not for the assignment entity
	 * @param {bool} isAvailable Annotation availability - this is the value that the annotation availability of the assignment will be set to
	 */
	_formatAnnotationsAction(isAvailable) {
		if (isAvailable === undefined || !this._hasAnnotationsChanged(isAvailable) || !this.canEditAnnotations()) {
			return;
		}

		const annotationsEntity = this._entity.getSubEntityByRel(Rels.Assignments.annotations);

		const action = annotationsEntity && annotationsEntity.getActionByName(Actions.assignments.updateAnnotationToolsAvailability);
		if (!action) {
			return;
		}

		const fields = [
			{ name: 'annotationToolsAvailability', value: Boolean(isAvailable) }
		];

		return { fields, action };
	}

	/**
	 * @returns {string} URL of the assignment's attachments collection
	 */
	attachmentsCollectionHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.Assignments.attachments)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.Assignments.attachments).href;
	}

	/**
	 * @returns {string} URL of the assignment's asset processor deep links collection
	 */
	assetProcessorDeepLinksCollectionHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.LTI.assetProcessorDeepLinks)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.LTI.assetProcessorDeepLinks).href;
	}

	/**
	 * @returns {string} URL of the assignment's asset processor attached processors collection
	 */
	assetProcessorAttachedProcessorsCollectionHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.LTI.assetProcessorAttachedProcessors)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.LTI.assetProcessorAttachedProcessors).href;
	}

	canSave() {
		return this._entity && this._entity.hasActionByName(Actions.assignments.update);
	}

	async save(assignment) {
		if (assignment === undefined) {
			return;
		}

		const updateNameAction = this._formatNameAction(assignment.name);
		const updateInstructionsAction = this._formatInstructionsAction(assignment.instructions);
		const updateAnonymousMarkingAction = this._formatAnonymousMarkingAction(assignment.isAnonymous);
		const updateAnnotationsAction = this._formatAnnotationsAction(assignment.annotationToolsAvailable);
		const updateSubmissionTypeAction = this._formatSubmissionsTypeAction(assignment.submissionType);
		const updateAllowableFileTypeAction = this._formatAllowableFileTypeAction(assignment.allowableFileType);
		const updateCustomAllowableFileTypeAction = this._formatCustomAllowableFileTypeAction(assignment.allowableFileType, assignment.customAllowableFileTypes);
		const updateFileSubmissionLimitAction = this._formatFileSubmissionLimitAction(assignment.filesSubmissionLimit);
		const updateSubmissionRuleAction = this._formatSubmissionsRuleAction(assignment.submissionsRule);
		const updateCompletionTypeAction = this._formatCompletionTypeAction(assignment.completionType);
		const updateformatAssignmentTypeAction = this._formatAssignmentTypeAction(assignment.assignmentType, assignment.groupTypeId, assignment.targetDropboxId);
		const updateDefaultScoringRubricAction = this._formatDefaultScoringRubricAction(assignment.defaultScoringRubricId);
		const updateNotificationEmailAction = this._formatUpdateNotificationEmailAction(assignment.notificationEmail);
		const updateAllowTextSubmissionAction = this._formatUpdateAllowTextSubmissionAction(assignment.allowTextSubmission);
		const updateIsAiInspiredAction = this._formatUpdateAiInspiredAction(assignment.isAiInspired);
		const updatePromptHeaders = this._formatUpdatePromptHeadersAction(assignment.promptHeaders);
		const sirenActions = [
			updateNameAction,
			updateInstructionsAction,
			updateAnonymousMarkingAction,
			updateAnnotationsAction,
			updateSubmissionTypeAction,
			updateAllowableFileTypeAction,
			updateCustomAllowableFileTypeAction,
			updateFileSubmissionLimitAction,
			updateSubmissionRuleAction,
			updateCompletionTypeAction,
			updateformatAssignmentTypeAction,
			updateDefaultScoringRubricAction,
			updateNotificationEmailAction,
			updateAllowTextSubmissionAction,
			updateIsAiInspiredAction,
			updatePromptHeaders
		];

		await performSirenActions(this._token, sirenActions);
	}

	equals(assignment) {
		const diffs = [
			[this.name(), assignment.name],
			[this.instructionsEditorHtml(), assignment.instructions],
			[this.submissionType() && String(this.submissionType().value), assignment.submissionType],
			[this.getAvailableAnnotationTools(), assignment.annotationToolsAvailable],
			[this.getAssignmentType(), assignment.assignmentType],
			[this.getDefaultScoringRubric(), assignment.defaultScoringRubricId]
		];
		if (assignment.hasOwnProperty('isAnonymous')) {
			diffs.push([this.isAnonymousMarkingEnabled(), assignment.isAnonymous]);
		}
		if (assignment.hasOwnProperty('completionType')) {
			diffs.push([this.completionTypeValue(), assignment.completionType]);
		}
		if (assignment.hasOwnProperty('filesSubmissionLimit')) {
			diffs.push([this.filesSubmissionLimit(), assignment.filesSubmissionLimit]);
		}
		if (assignment.hasOwnProperty('submissionsRule')) {
			diffs.push([this.submissionsRule(), assignment.submissionsRule]);
		}
		if (assignment.hasOwnProperty('notificationEmail')) {
			diffs.push([this.notificationEmail(), assignment.notificationEmail]);
		}
		if (assignment.hasOwnProperty('customAllowableFileTypes')) {
			diffs.push([this.customAllowableFileTypes(), assignment.customAllowableFileTypes]);
		}
		if (assignment.hasOwnProperty('allowTextSubmission')) {
			diffs.push([this.allowTextSubmission(), assignment.allowTextSubmission]);
		}
		if (assignment.hasOwnProperty('allowableFileType')) {
			diffs.push([this.allowableFileTypeValue(), assignment.allowableFileType]);
		}

		for (const [left, right] of diffs) {
			if (left !== right) {
				return false;
			}
		}

		if (!this.isAssignmentTypeReadOnly() && assignment.assignmentType === Classes.assignments.assignmentType.group && !this.isGroupAssignmentTypeDisabled()) {
			const selected = this.getAssignmentTypeGroupCategoryOptions().find(x => x.selected);
			if (String(selected && selected.value) !== assignment.groupTypeId) {
				return false;
			}
		}

		return true;
	}

	canDelete() {
		return this._entity.hasActionByName(actions.delete);
	}

	async delete() {
		const action = this.canDelete() && this._entity.getActionByName(actions.delete);
		if (!action) {
			return;
		}

		await performSirenAction(this._token, action).then(() => {
			this.dispose();
		});
	}

	canCancelCreate() {
		return this._entity.hasActionByName(actions.cancel);
	}

	async cancelCreate() {
		const action = this.canCancelCreate() && this._entity.getActionByName(actions.cancel);
		if (!action) {
			return;
		}

		await performSirenAction(this._token, action).then(() => {
			this.dispose();
		});
	}

	_hasNameChanged(name) {
		return name !== this.name();
	}

	_hasAiInspiredChanged(aiInspired) {
		return aiInspired !== this.isAiInspired();
	}

	_hasPromptHeadersChanged(promptHeaders) {
		// If there are any entities which are not 'unedited', then the prompt headers have changed
		return promptHeaders.some(x => x.state !== 'unedited');
	}

	_hasInstructionsChanged(instructions) {
		return instructions !== this.instructionsHtml();
	}

	_hasAnonymousMarkingChanged(anonymousMarking) {
		return anonymousMarking !== this.isAnonymousMarkingEnabled();
	}

	_hasAnnotationsChanged(annotationToolsAvailable) {
		return annotationToolsAvailable !== this.getAvailableAnnotationTools();
	}

	_hasSubmissionsTypeChanged(submissionType) {
		return !this.submissionType() || submissionType !== String(this.submissionType().value);
	}

	_hasAllowableFileTypeChanged(allowableFileType) {
		return allowableFileType !== this.allowableFileTypeValue();
	}

	_hasFileSubmissionLimitChanged(filesSubmissionLimit) {
		return filesSubmissionLimit !== this.filesSubmissionLimit();
	}

	_hasAllowTextSubmissionChanged(allowTextSubmission) {
		return allowTextSubmission !== this.allowTextSubmission();
	}

	_hasSubmissionsRuleChanged(submissionsRule) {
		return submissionsRule !== this.submissionsRule();
	}

	_hasCompletionTypeChanged(completionType) {
		return completionType !== this.completionTypeValue();
	}

	_hasDefaultScoringRubricChanged(defaultScoringRubricId) {
		return defaultScoringRubricId !== this.getDefaultScoringRubric();
	}

	_hasNotificationEmailChanged(notificationEmail) {
		return notificationEmail !== this.notificationEmail();
	}
}
