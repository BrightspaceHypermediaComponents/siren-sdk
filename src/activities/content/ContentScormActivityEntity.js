import { Actions, Classes } from '../../hypermedia-constants.js';
import { ContentEntity } from './ContentEntity.js';
import { performSirenAction } from '../../es6/SirenAction.js';

/**
 * ContentscormActivityEntity class representation of a d2l content-scorm-package entity.
 */
export class ContentScormActivityEntity extends ContentEntity {

	/**
	 * @returns {string|undefined} Name of the Scorm actvity package according to the content service
	 */
	contentServiceTitle() {
		return this._entity && this._entity.properties && this._entity.properties.contentServiceScormActivityTitle;
	}

	/**
	 * @returns {Date|undefined} The date and time the scorm activity was last edited according to the content service
	 */
	contentServiceUpdatedAt() {
		return this._entity && this._entity.properties && this._entity.properties.contentServiceScormActivityUpdatedAt;
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
	 * @returns {string|undefined} Title of the Scorm actvity
	 */
	title() {
		return this._entity && this._entity.properties && this._entity.properties.title;
	}

	/**
	 * @returns {string|undefined} Url of the scorm activity
	 */
	url() {
		return this._entity && this._entity.properties && this._entity.properties.url;
	}

	/**
	 * Updates the SCORM activty to have the given title
	 * @param {string} title Title to set on the SCORM activity
	 */
	async setScormActivityTitle(title) {
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
	 * Updates the Scorm Activity to have the given external resource value
	 * @param {boolean} isExternalResource boolean value that represents external resource status
	 */
	async setScormActivityExternalResource(isExternalResource) {
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
	 * Deletes the SCORM activity
	 */
	async deleteScormActivity() {
		if (!this._entity) {
			return;
		}

		const action = this._entity.getActionByName(Actions.webLink.deleteScormActivity);
		if (!action) {
			return;
		}

		await performSirenAction(this._token, action);
		this.dispose();
	}

	/**
	 * Checks if content scorm activty properties passed in match what is currently stored
	 * @param {object} scormActivity Object containing scorm activty specific properties
	 */
	equals(contentscormActivity) {
		const diffs = [
			[this.title(), contentscormActivity.title],
			[this.isExternalResource(), contentscormActivity.isExternalResource]
		];
		for (const [left, right] of diffs) {
			if (left !== right) {
				return false;
			}
		}
		return true;
	}
}
