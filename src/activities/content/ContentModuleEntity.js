import { Entity } from '../../es6/Entity';
import { Actions, Classes } from '../../hypermedia-constants';
import { performSirenAction } from '../../es6/SirenAction';

/**
 * ContentModuleEntity class representation of a d2l content-module entity.
 */
export class ContentModuleEntity extends Entity {

	/**
	 * @returns {string} Description html of the content-module item
	 */
	descriptionRichText() {
		if (!this._entity) {
			return null;
		}
		const subEntity = this._entity.getSubEntitiesByClass(Classes.content.description)[0];
		if (!subEntity || !subEntity.properties) {
			return null;
		}
		return subEntity.properties.html || '';
	}

	/**
	 * @returns {string} Description text of the content-module item
	 */
	descriptionText() {
		if (!this._entity) {
			return null;
		}
		const subEntity = this._entity.getSubEntitiesByClass(Classes.content.description)[0];
		if (!subEntity || !subEntity.properties) {
			return null;
		}
		return subEntity.properties.text || '';
	}

	/**
	 * @returns {string} Title of the content-module item
	 */
	title() {
		return this._entity && this._entity.properties && this._entity.properties.title;
	}

	/**
	 * Updates the module to have the given description
	 * @param {string} title rich text description to set on the module
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
	 * Deletes the module
	 */
	async deleteModule() {
		if (!this._entity) {
			return;
		}
		const action = this._entity.getActionByName(Actions.content.deleteModule);
		if (!action) {
			return;
		}

		await performSirenAction(this._token, action).then(() => {
			this.dispose();
		});
	}

	/**
	 * Checks if content module properties passed in match what is currently stored
	 * @param {object} contentModule Object containing module specific properties
	 */
	equals(contentModule) {
		const diffs = [
			[this.title(), contentModule.title],
			[this.descriptionRichText(), contentModule.descriptionRichText]
		];
		for (const [left, right] of diffs) {
			if (left !== right) {
				return false;
			}
		}
		return true;
	}
}
