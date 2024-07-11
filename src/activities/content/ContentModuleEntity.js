import { Actions, Rels } from '../../hypermedia-constants.js';
import ContentHelperFunctions from './ContentHelperFunctions.js';
import { Entity } from '../../es6/Entity.js';
import { performSirenAction } from '../../es6/SirenAction.js';

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
			[this.customAccentColor(), contentModule.customAccentColor]
		];
		for (const [left, right] of diffs) {
			if (left !== right) {
				return false;
			}
		}
		return true;
	}
}
