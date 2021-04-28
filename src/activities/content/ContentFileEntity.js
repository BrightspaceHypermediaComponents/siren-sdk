import { Actions, Rels, Classes } from '../../hypermedia-constants.js';
import { performSirenAction } from '../../es6/SirenAction.js';
import ContentHelperFunctions from './ContentHelperFunctions.js';
import { ContentWorkingCopyEntity } from './ContentWorkingCopyEntity.js';

export const FILE_TYPES = {
	html: 'html',
};

/**
 * ContentFileEntity class representation of a d2l content-file entity.
 */
export class ContentFileEntity extends ContentWorkingCopyEntity {

	/**
	 * @returns {string|null} Description html of the content-file item
	 */
	descriptionRichText() {
		const descriptionSubEntity = ContentHelperFunctions.getDescriptionSubEntity(this._entity);
		if (!descriptionSubEntity) {
			return null;
		}
		return descriptionSubEntity.properties.html || '';
	}

	/**
	 * @returns {string|null} Description text of the content-file item
	 */
	descriptionText() {
		const descriptionSubEntity = ContentHelperFunctions.getDescriptionSubEntity(this._entity);
		if (!descriptionSubEntity) {
			return null;
		}
		return descriptionSubEntity.properties.text || '';
	}

	/**
	 * @returns {string|undefined} Title of the content-file item
	 */
	title() {
		return this._entity && this._entity.properties && this._entity.properties.title;
	}

	/**
	 * Updates the file to have the given description
	 * @param {string} richText rich text description to set on the file
	 */
	async setFileDescription(richText) {
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
	 * Updates the file to have the given title
	 * @param {string} title Title to set on the file
	 */
	async setFileTitle(title) {
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
	 * Deletes the file
	 */
	async deleteFile() {
		if (!this._entity) {
			return;
		}
		const action = this._entity.getActionByName(Actions.files.deleteFile);
		if (!action) {
			return;
		}

		await performSirenAction(this._token, action);
		this.dispose();
	}

	/**
	 * Checks if content file properties passed in match what is currently stored
	 * @param {object} contentFile Object containing file specific properties
	 */
	equals(contentFile) {
		const diffs = [
			[this.title(), contentFile.title],
			[this.getFileHref(), contentFile.fileHref]
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

	/**
	 * @returns {string|null} Returns the File type
	 */
	getFileType() {
		if (!this._entity && !this._entity.hasLinkByClass(Classes.files.file)) {
			return null;
		} else if (this._entity.hasLinkByClass(Classes.files.html)) {
			return FILE_TYPES.html;
		}

		return null;
	}
}
