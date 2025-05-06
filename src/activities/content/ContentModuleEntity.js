import { Actions, Classes, Rels } from '../../hypermedia-constants.js';
import ContentHelperFunctions from './ContentHelperFunctions.js';
import { Entity } from '../../es6/Entity.js';
import { performSirenAction } from '../../es6/SirenAction.js';
const HUMAN_GENERATED = 0;
const AI_INSPIRED = 3;

/**
 * ContentModuleEntity class representation of a d2l content-module entity.
 */
export class ContentModuleEntity extends Entity {

	/**
	 * @returns {string|null} Description html of the content-module item
	 */
	descriptionRichText() {
		const descriptionSubEntity = ContentHelperFunctions.getDescriptionSubEntity(this._entity);
		if (!descriptionSubEntity) {
			return null;
		}
		return descriptionSubEntity.properties.html || '';
	}

	/**
	 * @returns {string|null} Raw description html of the content-module item
	 */
	rawDescriptionRichText() {
		const rawDescriptionSubEntity = ContentHelperFunctions.getRawDescriptionSubEntity(this._entity);
		if (!rawDescriptionSubEntity) {
			return null;
		}
		return rawDescriptionSubEntity.properties.html || '';
	}

	/**
	 * @returns {string|null} Description text of the content-module item
	 */
	descriptionText() {
		const descriptionSubEntity = ContentHelperFunctions.getDescriptionSubEntity(this._entity);
		if (!descriptionSubEntity) {
			return null;
		}
		return descriptionSubEntity.properties.text || '';
	}

	isAiInspired() {
		return this._entity && this._entity.hasClass(Classes.content.aiInspired);
	}

	aiHumanOrigin() {
		return this._entity && this._entity.properties && this._entity.properties.aiHumanOrigin;
	}

	/**
 	* @summary Updates the module to have the given aiHumanOrigin
 	* @param {number} aiHumanOrigin to set on the module
 	*/
	async setAiHumanOrigin(aiHumanOrigin) {
		const action = this._entity.getActionByName(Actions.content.updateAiOrigin);
		if (!this._entity || !action) return;
		const fields = [{ name: 'aiHumanOrigin', value: aiHumanOrigin }];
		await performSirenAction(this._token, action, fields);
	}

	/**
	 * @returns {string|undefined} Title of the content-module item
	 */
	title() {
		return this._entity && this._entity.properties && this._entity.properties.title;
	}

	/**
	 * @returns {number|undefined} Depth of the content-module item
	 */
	depth() {
		return this._entity && this._entity.properties && this._entity.properties.depth;
	}

	/**
	 * @returns {string} The custom accent color for the root content-module
	 */
	customAccentColor() {
		return this._entity && this._entity.properties && this._entity.properties.customAccentColor;
	}

	/**
	 * @summary Set AiInspired property if summary has been ai inspired
	 * @param {object} isAiInspired the status of the module summary that's being modified
	 */
	async setIsAiInspired(isAiInspired) {
		const action = this._entity.getActionByName(Actions.content.updateAiOrigin);
		if (!this._entity || !action || isAiInspired === this.isAiInspired()) return;
		const fields = [{ name: 'aiHumanOrigin', value: isAiInspired ? AI_INSPIRED : HUMAN_GENERATED }];
		await performSirenAction(this._token, action, fields);
	}

	/**
	 * @returns {string} The orgUnitId of the content-module (read-only)
	 */

	orgUnitId() {
		return this._entity && this._entity.properties && this._entity.properties.orgUnitId;
	}

	/**
	 * @returns {string} The moduleId of the content-module (read-only)
	 */
	moduleId() {
		return this._entity && this._entity.properties && this._entity.properties.moduleId;
	}

	/**
	 * @returns {string} Returns the endpoint for generating a summary for the module
	 */
	generateSummaryEndpoint() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.Content.Modules.generateSummary)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.Content.Modules.generateSummary).href;
	}

	/**
	 * @returns {string} Returns the endpoint for lores for the module
	 */
	loresEndpoint() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.Content.Modules.loresEndpoint)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.Content.Modules.loresEndpoint).href;
	}

	/**
	 * Updates the module to have the given description
	 * @param {string} richText description to set on the module
	 */
	async setModuleDescription(richText) {
		if (!this._entity) {
			return;
		}
		const action = this._entity.getActionByName(Actions.content.updateDescription);
		if (!action) {
			return;
		}

		const fields = [{ name: 'description', value: richText }];
		await performSirenAction(this._token, action, fields);
	}

	/**
	 * Updates the module to have the given title
	 * @param {string} title Title to set on the module
	 */
	async setModuleTitle(title) {
		if (!this._entity) {
			return;
		}
		const action = this._entity.getActionByName(Actions.content.updateTitle);
		if (!action) {
			return;
		}

		const fields = [{ name: 'title', value: title }];
		await performSirenAction(this._token, action, fields);
	}

	async saveObjectToCreateSpace(moduleId) {
		if (!this._entity) {
			return;
		}
		const action = this._entity.getActionByName(Actions.content.saveObjectToCreateSpace);
		if (!action) {
			return;
		}

		const fields = [{ name: 'toolObjectId', value: moduleId }];
		await performSirenAction(this._token, action, fields);
	}

	/**
	 * Updates the module to have the given color
	 * @param {string} color Color to set on the module
	 */
	async setModuleColor(color) {
		if (!this._entity) {
			return;
		}
		const action = this._entity.getActionByName(Actions.content.updateColor);
		if (!action) {
			return;
		}

		const fields = [{ name: 'color', value: color ?? '' }];
		await performSirenAction(this._token, action, fields);
	}

	/**
	 * Deletes the module
	 */
	async deleteModule() {
		if (!this._entity) {
			return;
		}
		const action = this._entity.getActionByName(Actions.module.deleteModule);
		if (!action) {
			return;
		}

		await performSirenAction(this._token, action);
		this.dispose();
	}

	/**
	 * Checks if content module properties passed in match what is currently stored
	 * @param {object} contentModule Object containing module specific properties
	 */
	equals(contentModule) {
		const diffs = [
			[this.title(), contentModule.title],
			[this.depth(), contentModule.depth],
			[this.descriptionRichText(), contentModule.descriptionRichText],
			[this.rawDescriptionRichText(), contentModule.rawDescriptionRichText],
			[this.customAccentColor(), contentModule.customAccentColor],
			[this.aiHumanOrigin(), contentModule.aiHumanOrigin]
		];
		for (const [left, right] of diffs) {
			if (left !== right) {
				return false;
			}
		}
		return true;
	}
}
