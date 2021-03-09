import { Entity } from '../../es6/Entity';
import { Actions } from '../../hypermedia-constants';
import { performSirenAction } from '../../es6/SirenAction';
import ContentHelperFunctions from './ContentHelperFunctions.js';

/**
 * ContentHtmlFileEntity class representation of a d2l content-htmlFile entity.
 */
export class ContentHtmlFileEntity extends Entity {

	/**
	 * @returns {string|null} Description html of the content-htmlFile item
	 */
	descriptionRichText() {
		const descriptionSubEntity = ContentHelperFunctions.getDescriptionSubEntity(this._entity);
		if (!descriptionSubEntity) {
			return null;
		}
		return descriptionSubEntity.properties.html || '';
	}

	/**
	 * @returns {string|null} Description text of the content-htmlFile item
	 */
	descriptionText() {
		const descriptionSubEntity = ContentHelperFunctions.getDescriptionSubEntity(this._entity);
		if (!descriptionSubEntity) {
			return null;
		}
		return descriptionSubEntity.properties.text || '';
	}

	/**
	 * @returns {string} Title of the content-htmlFile item
	 */
	title() {
		return this._entity && this._entity.properties && this._entity.properties.title;
	}

	/**
	 * Updates the html file to have the given description
	 * @param {string} richText rich text description to set on the html file
	 */
	async setHtmlFileDescription(richText) {
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
	 * Updates the html file to have the given title
	 * @param {string} title Title to set on the html file
	 */
	async setHtmlFileTitle(title) {
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
	 * Deletes the html file
	 */
	async deleteHtmlFile() {
		if (!this._entity) {
			return;
		}
		const action = this._entity.getActionByName(Actions.htmlFile.deleteHtmlFile);
		if (!action) {
			return;
		}

		await performSirenAction(this._token, action);
		this.dispose();
	}

	/**
	 * Checks if content html file properties passed in match what is currently stored
	 * @param {object} contentHtmlFile Object containing html file specific properties
	 */
	equals(contentHtmlFile) {
		const diffs = [
			[this.title(), contentHtmlFile.title],
		];
		for (const [left, right] of diffs) {
			if (left !== right) {
				return false;
			}
		}
		return true;
	}
}
