import { Actions } from '../../hypermedia-constants.js';
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
	 * @returns {string} The custom accent colour for the root content-module
	 */
	customAccentColour() {
		return this._entity && this._entity.properties && this._entity.properties.customAccentColour;
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
	 * Updates the module to have the given colour
	 * @param {string} colour Colour to set on the module
	 */
	async setModuleColour(colour) {
		if (!this._entity) {
			return;
		}
		const action = this._entity.getActionByName(Actions.content.updateColour);
		if (!action) {
			return;
		}

		const fields = [{ name: 'colour', value: colour ?? '' }];
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
			[this.customAccentColour(), contentModule.customAccentColour]
		];
		for (const [left, right] of diffs) {
			if (left !== right) {
				return false;
			}
		}
		return true;
	}
}
