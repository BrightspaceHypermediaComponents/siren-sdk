import { Entity } from '../../es6/Entity';
import { Actions, Rels, Classes } from '../../hypermedia-constants';
import { performSirenAction } from '../../es6/SirenAction';

const actions = {
	delete: 'delete-folder'
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
		return subEntity.hasClass(Classes.assignments.assignmentType.readOnly);
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

	/**
	 * @returns {bool} If the assignment type is set to individual assignment
	 */
	isIndividualAssignmentType() {
		if (!this._entity) {
			return false;
		}
		const subEntity = this._entity.getSubEntityByRel(Rels.Assignments.folderType);
		if (!subEntity) {
			return false;
		}
		return subEntity.hasClass(Classes.assignments.assignmentType.individual);
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
		const action = subEntity.getActionByName(Actions.assignments.setToGroup);
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
	 * Sets the assignment type to group using a default group category
	 */
	async setToGroupAssignmentType() {
		if (!this._entity) {
			return;
		}
		const subEntity = this._entity.getSubEntityByRel(Rels.Assignments.folderType);
		if (!subEntity) {
			return;
		}
		const action = subEntity.getActionByName(Actions.assignments.setToGroup);
		if (!action) {
			return;
		}

		const defaultGroupTypeId = action.fields[0].value[0].value;

		const fields = [
			{ name: 'groupTypeId', value: defaultGroupTypeId },
			{ name: 'folderType', value: 1 }
		];
		await performSirenAction(this._token, action, fields);
	}

	/**
	 * Sets the assignment type to group with a specific group
	 * @param {number} groupTypeId id of the group category
	 */
	async setAssignmentTypeGroupCategory(groupTypeId) {
		if (!this._entity) {
			return;
		}
		const subEntity = this._entity.getSubEntityByRel(Rels.Assignments.folderType);
		if (!subEntity) {
			return;
		}
		const action = subEntity.getActionByName(Actions.assignments.setToGroup);
		if (!action) {
			return;
		}

		const fields = [
			{ name: 'groupTypeId', value: groupTypeId },
			{ name: 'folderType', value: 1 }
		];
		await performSirenAction(this._token, action, fields);
	}

	/**
	 * Sets the assignment type to individual
	 */
	async setToIndividualAssignmentType() {
		if (!this._entity) {
			return;
		}
		const subEntity = this._entity.getSubEntityByRel(Rels.Assignments.folderType);
		if (!subEntity) {
			return;
		}
		const action = subEntity.getActionByName(Actions.assignments.setToIndividual);
		if (!action) {
			return;
		}

		const fields = action.fields;
		await performSirenAction(this._token, action, fields);
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
		if (!this.canEditCompletionType()) {
			return [];
		}

		const action = this._entity.getActionByName(Actions.assignments.updateCompletionType);
		if (!action.hasFieldByName('completionType')) {
			return [];
		}

		const validCompletionTypes = this.submissionTypeOptions()
			.find(option => option.value === this.submissionType().value)
			.completionTypes;
		if (validCompletionTypes === null) {
			return [];
		}

		return action.getFieldByName('completionType').value.filter(option => {
			return validCompletionTypes.indexOf(option.value) > -1;
		});
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
	async setAnonymousMarking(isAnonymous) {
		if (!this._entity) return;
		const subEntity = this._entity.getSubEntityByRel(Rels.Assignments.anonymousMarking);
		if (!subEntity) return;
		const action = subEntity.getActionByName(Actions.assignments.anonymousMarking.updateAnonymousMarking);
		if (!action) return;
		const fields = [ { name: 'isAnonymous', value: isAnonymous } ];
		await performSirenAction(this._token, action, fields);
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

	canSave() {
		return this._entity && this._entity.hasActionByName(Actions.assignments.update);
	}

	async save(assignment) {
		const action = this.canSave() && this._entity.getActionByName(Actions.assignments.update);
		if (!action) {
			return;
		}

		// TODO - Need to force PATCH on this API now. The backend just delegates the PATCH call to the PUT
		// implementation with the correct semantics for unprovided fields
		action.method = 'PATCH';

		const fields = [];

		if (typeof assignment.name !== 'undefined' && assignment.name !== this.name() && this.canEditName()) {
			fields.push({ name: 'name', value: assignment.name });
		}

		if (typeof assignment.instructions !== 'undefined' &&
				assignment.instructions !== this.instructionsEditorHtml() &&
				this.canEditInstructions()) {
			fields.push({ name: 'instructions', value: assignment.instructions });
		}

		if (typeof assignment.submissionType !== 'undefined' &&
				assignment.submissionType !== this.submissionType() &&
				this.canEditSubmissionType()) {
			fields.push({ name: 'submissionType', value: assignment.submissionType });
		}

		if (typeof assignment.completionType !== 'undefined' &&
				assignment.completionType !== this.completionType() &&
				this.canEditCompletionType()) {
			fields.push({ name: 'completionType', value: assignment.completionType });
		}

		if (typeof assignment.isIndividualAssignmentType !== 'undefined' &&
				assignment.isIndividualAssignmentType !== this.isIndividualAssignmentType()) {
			if (!assignment.isIndividualAssignmentType && !this.isGroupAssignmentTypeDisabled()) {
				fields.push({ name: 'groupTypeId', value: assignment.groupTypeId });
				fields.push({ name: 'folderType', value: 1 });
			} else {
				fields.push({ name: 'groupTypeId', value: null });
				fields.push({ name: 'folderType', value: 2 });
			}
		}

		if (fields.length > 0) {
			await performSirenAction(this._token, action, fields);
		}
	}

	equals(assignment) {
		const diffs = [
			[this.name(), assignment.name],
			[this.instructionsEditorHtml(), assignment.instructions],
			[this.submissionType() && String(this.submissionType().value), assignment.submissionType],
			[this.completionType() && this.completionType().value, assignment.completionType]
		];
		for (const [left, right] of diffs) {
			if (left !== right) {
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
}
