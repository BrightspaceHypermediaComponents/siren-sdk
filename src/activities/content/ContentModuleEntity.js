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
	descriptionHtml() {
		if (!this._entity) {
			return null;
		}
		const subEntity = this._entity.getSubEntitiesByClass(Classes.content.description);
		if (!subEntity || !subEntity.properties || !subEntity.properties.html) {
			return null;
		}
		return subEntity.properties.html;
	}

	/**
	 * @returns {string} Description text of the content-module item
	 */
	descriptionText() {
		if (!this._entity) {
			return null;
		}
		const subEntity = this._entity.getSubEntitiesByClass(Classes.content.description);
		if (!subEntity || !subEntity.properties || !subEntity.properties.text) {
			return null;
		}
		return subEntity.properties.text;
	}

	/**
	 * @returns {string} Title of the content-module item
	 */
	title() {
		return this._entity && this._entity.properties && this._entity.properties.title;
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
}
