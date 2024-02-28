import { Actions, Rels } from '../../hypermedia-constants.js';
import { ContentFileEntity } from './ContentFileEntity.js';
import ContentHelperFunctions from './ContentHelperFunctions.js';
import { performSirenAction } from '../../es6/SirenAction.js';

/**
 *  ContentHtmlFileEntity class representation of a d2l html content-file entity.
 */
export class ContentHtmlFileEntity extends ContentFileEntity {
	/**
	 * @returns {string|undefined} Default font-size for the html editor
	 */
	fontSize() {
		return this._entity && this._entity.properties && this._entity.properties.contentFontSize;
	}

	/**
	 * @returns {string|undefined} Default font-face for the html editor.
	 */
	fontFace() {
		return this._entity && this._entity.properties && this._entity.properties.contentFontFace;
	}

	/**
	 * @returns {string|null} html templates href
	 */
	getHtmlTemplatesHref() {
		return ContentHelperFunctions.getHrefFromRel(Rels.Content.htmlTemplates, this._entity);
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
}
