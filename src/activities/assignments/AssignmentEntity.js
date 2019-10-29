'use strict';

import { Entity } from '../../es6/Entity';
import { Actions, Rels } from '../../hypermedia-constants';
import { performSirenAction } from '../../es6/SirenAction';

/**
 * AssignmentEntity class representation of a d2l Assignment.
 */
export class AssignmentEntity extends Entity {
	name() {
		return this._entity && this._entity.properties && this._entity.properties.name;
	}

	canEditName() {
		return this._entity && this._entity.hasActionByName(Actions.assignments.updateName);
	}

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

	instructionsPlaintext() {
		const instructionsEntity = this._getInstructionsEntity();
		return instructionsEntity
			&& instructionsEntity.properties
			&& instructionsEntity.properties.text;
	}

	instructionsHtml() {
		const instructionsEntity = this._getInstructionsEntity();
		return instructionsEntity
			&& instructionsEntity.properties
			&& instructionsEntity.properties.html;
	}

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

	canEditInstructions() {
		const instructionsEntity = this._getInstructionsEntity();
		return instructionsEntity
			&& instructionsEntity.hasActionByName(Actions.assignments.updateInstructions);
	}

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

	getRichTextEditorConfig() {
		const instructionsEntity = this._getInstructionsEntity();
		return instructionsEntity
			&& instructionsEntity.getSubEntityByRel(Rels.richTextEditorConfig);
	}

	activityUsageHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.Activities.activityUsage)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.Activities.activityUsage).href;
	}

	submissionType() {
		if (!this._entity || !this._entity.properties) {
			return;
		}

		return this._entity.properties.submissionType;
	}

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

	canEditSubmissionType() {
		return this._entity && this._entity.hasActionByName(Actions.assignments.updateSubmissionType);
	}

	async setSubmissionType(submissionType, completionType) {
		submissionType = Number(submissionType);
		completionType = Number(completionType);

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

		const validCompletionTypes = fieldValue.completionTypes;
		if (validCompletionTypes !== null && validCompletionTypes.indexOf(completionType) === -1) {
			throw new Error(`Invalid completionType ${completionType} for submissionType ${submissionType}`);
		}

		const fields = [
			{ name: 'submissionType', value: submissionType },
			{ name: 'completionType', value: completionType }
		];
		await performSirenAction(this._token, action, fields);
	}
}
