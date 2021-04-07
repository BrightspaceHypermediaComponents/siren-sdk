import { Entity } from '../../es6/Entity';
import { Actions, Classes } from '../../hypermedia-constants';
import { performSirenAction } from '../../es6/SirenAction';
import ContentHelperFunctions from './ContentHelperFunctions.js';

/**
 * ContentLTILinkEntity class representation of a d2l content-ltilink entity.
 */
export class ContentLTILinkEntity extends Entity {

	/**
	 * @returns {string|null} Description html of the content-ltilink item
	 */
	descriptionRichText() {
		const descriptionSubEntity = ContentHelperFunctions.getDescriptionSubEntity(this._entity);
		if (!descriptionSubEntity) {
			return null;
		}
		return descriptionSubEntity.properties.html || '';
	}

	/**
	 * @returns {string|null} Description text of the content-ltilink item
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
	 * @returns {string|undefined} Title of the content-ltilink item
	 */
	title() {
		return this._entity && this._entity.properties && this._entity.properties.title;
	}

	/**
	 * @returns {string|undefined} Url of the content-ltilink item
	 */
	url() {
		return this._entity && this._entity.properties && this._entity.properties.url;
	}

	/**
	 * Updates the LTI link to have the given description
	 * @param {string} richText rich text description to set on the LTI link
	 */
	async setLTILinkDescription(richText) {
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
	 * Updates the LTI link to have the given title
	 * @param {string} title Title to set on the LTI link
	 */
	async setLTILinkTitle(title) {
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
	 * Updates the LTI link to have the given external resource value
	 * @param {boolean} isExternalResource boolean value that represents external resource status
	 */
	async setLTILinkExternalResource(isExternalResource) {
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
	 * Deletes the LTI link
	 */
	async deleteLTILink() {
		if (!this._entity) {
			return;
		}
		const action = this._entity.getActionByName(Actions.webLink.deleteLTIlink);
		if (!action) {
			return;
		}

		await performSirenAction(this._token, action);
		this.dispose();
	}

	/**
	 * Checks if content LTI link properties passed in match what is currently stored
	 * @param {object} contentLTILink Object containing LTI link specific properties
	 */
	equals(contentLTILink) {
		const diffs = [
			[this.title(), contentLTILink.title],
			[this.url(), contentLTILink.url],
			[this.isExternalResource(), contentLTILink.isExternalResource]
		];
		for (const [left, right] of diffs) {
			if (left !== right) {
				return false;
			}
		}
		return true;
	}
}
