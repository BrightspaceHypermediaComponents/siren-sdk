import { Actions, Rels } from '../../hypermedia-constants.js';
import { performSirenAction } from '../../es6/SirenAction.js';
import ContentHelperFunctions from './ContentHelperFunctions.js';
import { ContentWorkingCopyEntity } from './ContentWorkingCopyEntity.js';

/**
 * ContentHtmlFileEntity class representation of a d2l content-htmlFile entity.
 */
export class ContentHtmlFileEntity extends ContentWorkingCopyEntity {

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
	 * @returns {string|undefined} Title of the content-htmlFile item
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
	 * Updates the html file content with the given html
	 * @param {html} html to set on the html file
	 */
	async setHtmlFileHtmlContent(html) {
		if (!this._entity) {
			return;
		}
		const action = this._entity.getActionByName(Actions.htmlFile.updateHtmlContent);
		if (!action) {
			return;
		}

		const fields = [{ name: 'htmlContent', value: html }];
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
			[this.getFileHref(), contentHtmlFile.fileHref]
		];
		for (const [left, right] of diffs) {
			if (left !== right) {
				return false;
			}
		}
		return true;
	}

	/**
	* @returns {string|undefined} Returns URL of the files home API
	*/
	getFileHref() {
		return ContentHelperFunctions.getHrefFromRel(Rels.Files.file, this._entity);
	}
}
