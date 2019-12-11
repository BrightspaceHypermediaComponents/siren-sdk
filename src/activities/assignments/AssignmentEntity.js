'use strict';

import { Entity } from '../../es6/Entity';
import { Actions, Rels, Classes } from '../../hypermedia-constants';
import { performSirenAction } from '../../es6/SirenAction';

/**
 * AssignmentEntity class representation of a d2l Assignment.
 */
export class AssignmentEntity extends Entity {

	async save(assignment) {

		if (!this._isDetailsDirty(assignment)) {
			await this.saveDetails(assignment);
		}

		if (assignment.annotationToolsAvalable !== this.getAvailableAnnotationTools()) {
			this.setAnnotationToolsAvailability(assignment.annotationToolsAvailable);
		}
	}

	async saveDetails(assignment) {

		// TODO - Just hacking the name action here - for optimal update maybe we should bring the existing
		// PATCH/PUT action that allows for updating multiple fields up to date
		const action = this.canEditName() && this._entity.getActionByName(Actions.assignments.updateName);
		if (!action) {
			return;
		}

		const fields = [
			{ name: 'name', value: assignment.name },
			{ name: 'instructions', value: assignment.instructions },
			{ name: 'submissionType', value: Number(assignment.submissionType) },
			{ name: 'completionType', value: Number(assignment.completionType) },
		];
		await performSirenAction(this._token, action, fields);
	}

	_isDetailsDirty(assignment) {
		return assignment.name !== this.name() ||
			assignment.instructions !== this.instructionsEditorHtml() ||
			Number(assignment.submissionType) !== this.submissionType() ||
			Number(assignment.completionTpe) !== this.completionType();
	}

	/**
	 * @returns {string} Name of the assignment
	 */
	name() {
		return this._entity && this._entity.properties && this._entity.properties.name;
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
	async setName(name) {
		const action = this.canEditName() && this._entity.getActionByName(Actions.assignments.updateName);
		if (!action) {
			return;
		}

		const fields = [{ name: 'name', value: name }];
		await performSirenAction(this._token, action, fields);
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
	async setInstructions(instructions) {
		const instructionsEntity = this.canEditInstructions() && this._getInstructionsEntity();
		if (!instructionsEntity) {
			return;
		}

		const action = instructionsEntity.getActionByName(Actions.assignments.updateInstructions);
		if (!action) {
			return;
		}

		const fields = [{ name: 'instructions', value: instructions }];
		await performSirenAction(this._token, action, fields);
	}

	/**
	 * @returns {object} Richtext editor config for the assignment instructions; for use with d2l-html-editor
	 */
	instructionsRichTextEditorConfig() {
		const instructionsEntity = this._getInstructionsEntity();
		return instructionsEntity
			&& instructionsEntity.getSubEntityByRel(Rels.richTextEditorConfig);
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
	 * @returns {object} Submission type of the assignment (including type value and type title)
	 */
	submissionType() {
		if (!this._entity || !this._entity.properties) {
			return;
		}

		return this._entity.properties.submissionType;
	}

	/**
	 * @returns {Array} Set of submission type options for this assignment
	 */
	submissionTypeOptions() {
		if (!this.canEditSubmissionType()) {
			return [];
		}

		const action = this._entity.getActionByName(Actions.assignments.updateSubmissionType);
		if (!action.hasFieldByName('submissionType')) {
			return [];
		}

		return action.getFieldByName('submissionType').value;
	}

	/**
	 * @returns {bool} Whether or not the edit submission type action is present on the assignment entity
	 */
	canEditSubmissionType() {
		return this._entity && this._entity.hasActionByName(Actions.assignments.updateSubmissionType);
	}

	/**
	 * Sets the submission type of the assignment
	 * @param {number} submissionType Submission type - see SUBMISSIONTYPE_T under https://docs.valence.desire2learn.com/res/dropbox.html#attributes for more info
	 */
	async setSubmissionType(submissionType) {
		submissionType = Number(submissionType);

		const action = this.canEditSubmissionType() && this._entity.getActionByName(Actions.assignments.updateSubmissionType);
		if (!action) {
			return;
		}

		const fieldValue = action.getFieldByName('submissionType').value.find(v => {
			return v.value === submissionType;
		});
		if (!fieldValue) {
			return;
		}

		let completionType = 0;
		const validCompletionTypes = fieldValue.completionTypes;
		if (validCompletionTypes !== null) {
			completionType = validCompletionTypes[0]; // Use first option as default
		}

		const fields = [
			{ name: 'submissionType', value: submissionType },
			{ name: 'completionType', value: completionType }
		];
		await performSirenAction(this._token, action, fields);
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

	/**
	 * @returns {Array} Set of completion type options for this assignment
	 */
	completionTypeOptions() {
		return this.validCompletionTypeOptions(this.submissionType().value);
	}

	/**
	 * @returns {Array} Set of completion type options for the submissionType
	 */
	validCompletionTypeOptions(submissionType) {

		submissionType = Number(submissionType);

		if (!this.canEditCompletionType()) {
			return [];
		}

		const action = this._entity.getActionByName(Actions.assignments.updateCompletionType);
		if (!action.hasFieldByName('completionType')) {
			return [];
		}

		const validCompletionTypes = this.validCompletionTypes(submissionType)

		return action.getFieldByName('completionType').value.filter(option => {
			return validCompletionTypes.indexOf(option.value) > -1;
		});
	}

	validCompletionTypes(submissionType) {
		submissionType = Number(submissionType);
		const validCompletionTypes = this.submissionTypeOptions()
			.find(option => option.value === submissionType)
			.completionTypes;
		if (validCompletionTypes === null) {
			return [];
		}
		return validCompletionTypes;
	}

	ensureValidCompletionType(submissionType, completionType) {
		submissionType = Number(submissionType);
		completionType = Number(completionType);

		const validCompletionTypes = this.validCompletionTypes(submissionType);

		if (validCompletionTypes.indexOf(completionType) === -1) {
			return validCompletionTypes.length > 0 ? validCompletionTypes[0] : '';
		}
		return completionType;
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
	async setCompletionType(completionType) {
		completionType = Number(completionType);

		const action = this.canEditCompletionType() && this._entity.getActionByName(Actions.assignments.updateCompletionType);
		if (!action) {
			return;
		}

		const fieldValue = action.getFieldByName('completionType').value.find(v => {
			return v.value === completionType;
		});
		if (!fieldValue) {
			return;
		}

		const fields = [
			{ name: 'completionType', value: completionType }
		];
		await performSirenAction(this._token, action, fields);
	}

	/**
	 * @returns {bool} Whether or not annotations are enabled for the assignment entity
	 */
	getAvailableAnnotationTools() {
		const annotationsEntity = this._entity.getSubEntityByRel(Rels.Assignments.annotations);
		return annotationsEntity && annotationsEntity.hasClass(Classes.assignments.annotationEnabled);
	}

	/**
	 * @returns {bool} Whether or not the user can see and set annotation availability for the assignment entity
	 */
	canSeeAnnotations() {
		const annotationsEntity = this._entity.getSubEntityByRel(Rels.Assignments.annotations);
		return annotationsEntity && annotationsEntity.hasActionByName(Actions.assignments.updateAnnotationToolsAvailability);
	}

	/**
	 * Set the status of whether annotation tools are available or not for the assignment entity
	 * @param {bool} isAvailable Annotation availability - this is the value that the annotation availability of the assignment will be set to
	 */
	async setAnnotationToolsAvailability(isAvailable) {
		isAvailable = Boolean(isAvailable);

		const annotationsEntity = this._entity.getSubEntityByRel(Rels.Assignments.annotations);

		const action = this.canSeeAnnotations() && annotationsEntity && annotationsEntity.getActionByName(Actions.assignments.updateAnnotationToolsAvailability);
		if (!action) {
			return;
		}

		const fields = [
			{ name: 'annotationToolsAvailability', value: isAvailable }
		];
		await performSirenAction(this._token, action, fields);
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
}
