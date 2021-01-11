import { Entity } from '../../es6/Entity';
import { Actions, Classes } from '../../hypermedia-constants';
import { performSirenAction } from '../../es6/SirenAction';
import ContentHelperFunctions from './ContentHelperFunctions.js';

/**
 * ContentWebLinkEntity class representation of a d2l content-weblink entity.
 */
export class ContentWebLinkEntity extends Entity {

	/**
	 * @returns {string|null} Description html of the content-weblink item
	 */
	descriptionRichText() {
		const descriptionSubEntity = ContentHelperFunctions.getDescriptionSubEntity(this._entity);
		if (!descriptionSubEntity) {
			return null;
		}
		return descriptionSubEntity.properties.html || '';
	}

	/**
	 * @returns {string|null} Description text of the content-weblink item
	 */
	descriptionText() {
		const descriptionSubEntity = ContentHelperFunctions.getDescriptionSubEntity(this._entity);
		if (!descriptionSubEntity) {
			return null;
		}
		return descriptionSubEntity.properties.text || '';
	}

	/**
	 * @returns {boolean} external resource value (i.e. open in new tab or not)
	 */
	isExternalResource() {
		if (!this._entity) {
			return false;
		}
		return this._entity.hasClass(Classes.webLink.externalResource);
	}

	/**
	 * @returns {string} Title of the content-weblink item
	 */
	title() {
		return this._entity && this._entity.properties && this._entity.properties.title;
	}

	/**
	 * @returns {string} Url of the content-weblink item
	 */
	url() {
		return this._entity && this._entity.properties && this._entity.properties.url;
	}

	/**
	 * Updates the web link to have the given description
	 * @param {string} richText rich text description to set on the web link
	 */
	async setWebLinkDescription(richText) {
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
	 * Updates the web link to have the given title
	 * @param {string} title Title to set on the web link
	 */
	async setWebLinkTitle(title) {
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
	 * Updates the web link to have the given url
	 * @param {string} url Url to set on the web link
	 */
	async setWebLinkUrl(url) {
		if (!this._entity) {
			return;
		}
		const action = this._entity.getActionByName(Actions.webLink.updateUrl);
		if (!action) {
			return;
		}

		const fields = [{ name: 'url', value: url }];
		await performSirenAction(this._token, action, fields);
	}

	/**
	 * Updates the web link to have the given external resource value
	 * @param {boolean} isExternalResource boolean value that represents external resource status
	 */
	async setWebLinkExternalResource(isExternalResource) {
		if (!this._entity) {
			return;
		}
		const action = this._entity.getActionByName(Actions.webLink.updateExternalResource);
		if (!action) {
			return;
		}

		const fields = [{ name: 'isExternalResource', value: isExternalResource }];
		await performSirenAction(this._token, action, fields);
	}

	/**
	 * Deletes the web link
	 */
	async deleteWebLink() {
		if (!this._entity) {
			return;
		}
		const action = this._entity.getActionByName(Actions.webLink.deleteWeblink);
		if (!action) {
			return;
		}

		await performSirenAction(this._token, action);
		this.dispose();
	}

	/**
	 * Checks if content web link properties passed in match what is currently stored
	 * @param {object} contentWebLink Object containing web link specific properties
	 */
	equals(contentWebLink) {
		const diffs = [
			[this.title(), contentWebLink.title],
			[this.url(), contentWebLink.url],
			[this.isExternalResource(), contentWebLink.isExternalResource]
		];
		for (const [left, right] of diffs) {
			if (left !== right) {
				return false;
			}
		}
		return true;
	}
}
