import { Actions, Classes } from '../../hypermedia-constants';
import { performSirenAction } from '../../es6/SirenAction';
import { ContentEntity } from './ContentEntity';

/**
 * ContentscormActivityEntity class representation of a d2l content-scorm-package entity.
 */
export class ContentImportedScormActivityEntity extends ContentEntity {

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
	 * @returns {boolean} Whether or not the Push-Scores-to-Grades checkbox is enabled
	 */
	isGradeSyncCheckboxFeatureEnabled() {
		return this._entity && this._entity.properties && this._entity.properties.isGradeSyncCheckboxFeatureEnabled;
	}

	/**
	 * @returns {string|undefined} The url to embed the scorm activity
	 */
	embedUrl() {
		return this._entity && this._entity.hasLinkByRel('alternate') && this._entity.getLinkByRel('alternate').href;
	}

	/**
	 * Updates the SCORM activty to have the given title
	 * @param {string} title Title to set on the SCORM activity
	 */
	async setImportedScormActivityTitle(title) {
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
	 * Updates the imported Scorm Activity to have the given external resource value
	 * @param {boolean} isExternalResource boolean value that represents external resource status
	 */
	async setImportedScormActivityExternalResource(isExternalResource) {
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
	 * Deletes the imported SCORM activity
	 */
	async deleteImportedScormActivity() {
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
	 * @param {object} contentImportedScormActivity Object containing imported scorm activty specific properties
	 */
	equals(contentImportedScormActivity) {
		const diffs = [
			[this.title(), contentImportedScormActivity.title],
			[this.isExternalResource(), contentImportedScormActivity.isExternalResource]
		];
		for (const [left, right] of diffs) {
			if (left !== right) {
				return false;
			}
		}
		return true;
	}
}
