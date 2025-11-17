import { Actions, Classes } from '../../hypermedia-constants.js';
import { Entity } from '../../es6/Entity.js';
import { performSirenAction } from '../../es6/SirenAction.js';

/**
 * ContentRemixEntity class representation of a d2l content-remix entity.
 */
export class ContentRemixEntity extends Entity {

	/**
	 * Get the characterLimit from the underlying entity
	 */
	get characterLimit() {
		return this._entity?.properties?.characterLimit || null;
	}

	get remixedHtmlContent() {
		return this._entity?.properties?.remixedHtmlContent || null;
	}

	get properties() {
		return { ...this._entity?.properties };
	}

	get actions() {
		return this._entity?.actions;
	}

	/**
	 * @summary Performs content remix action
	 * @param {object} remixParams Parameters for content remix
	 * @param {AbortSignal} abortSignal Optional abort signal for cancelling the request
	 */
	async performContentRemix(remixParams, abortSignal = null) {
		if (!remixParams) return;
		if (!this.canPerformContentRemix()) return;

		const sirenAction = this._formatContentRemixAction(remixParams);
		if (!sirenAction) return;

		const { action, fields } = sirenAction;

		return await performSirenAction(this._token, action, fields, false, false, abortSignal);
	}

	/**
	 * @summary Checks if content remix action can be performed
	 * @returns {bool}
	 */
	canPerformContentRemix() {
		return this._entity && this._entity.hasActionByName(Actions.content.contentRemix);
	}

	/**
	 * @summary Checks if content remix is enabled
	 * @returns {bool} true if content remix is enabled
	 */
	isContentRemixEnabled() {
		return this._entity && this._entity.hasClass(Classes.content.remixPage);
	}

	/**
	 * @summary Formats the content remix action with parameters
	 * @param {object} remixParams Parameters for content remix
	 * @returns {object|null}
	 */
	_formatContentRemixAction(remixParams) {
		const action = this._entity.getActionByName(Actions.content.contentRemix);
		if (!action) return null;

		const fields = [];

		if (remixParams.originalHtmlContent !== null && remixParams.originalHtmlContent !== undefined) {
			fields.push({ name: 'originalHtmlContent', value: remixParams.originalHtmlContent });
		}
		if (remixParams.textComplexity !== null && remixParams.textComplexity !== undefined) {
			fields.push({ name: 'textComplexity', value: remixParams.textComplexity });
		}
		if (remixParams.customInstructions !== null && remixParams.customInstructions !== undefined) {
			fields.push({ name: 'customInstructions', value: remixParams.customInstructions });
		}
		if (remixParams.detectedLang !== null && remixParams.detectedLang !== undefined) {
			fields.push({ name: 'detectedLang', value: remixParams.detectedLang });
		}
		if (remixParams.sessionId !== null && remixParams.sessionId !== undefined) {
			fields.push({ name: 'sessionId', value: remixParams.sessionId });
		}
		if (remixParams.generationId !== null && remixParams.generationId !== undefined) {
			fields.push({ name: 'generationId', value: remixParams.generationId });
		}
		if (remixParams.iterationNumber !== null && remixParams.iterationNumber !== undefined) {
			fields.push({ name: 'iterationNumber', value: remixParams.iterationNumber });
		}
		if (remixParams.sourceIndex !== null && remixParams.sourceIndex !== undefined) {
			fields.push({ name: 'sourceIndex', value: remixParams.sourceIndex });
		}
		if (remixParams.topicId !== null && remixParams.topicId !== undefined) {
			fields.push({ name: 'topicId', value: remixParams.topicId });
		}

		return { action, fields };
	}
}
