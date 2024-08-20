import { Actions, Classes } from '../../hypermedia-constants.js';
import { ContentEntity } from './ContentEntity.js';
import ContentHelperFunctions from './ContentHelperFunctions.js';
import { performSirenAction } from '../../es6/SirenAction.js';

/**
 * ContentScormActivityEntity class representation of a D2L content-scorm-package entity
 */
export class ContentScormActivityEntity extends ContentEntity {

	/**
	 * @returns {string|undefined} Name of the SCORM activity package according to the Content Service
	 */
	contentServiceTitle() {
		return this._entity && this._entity.properties && this._entity.properties.contentServiceScormActivityTitle;
	}

	/**
	 * @returns {Date|undefined} The date and time the SCORM activity was last edited according to the Content Service
	 */
	contentServiceUpdatedAt() {
		return this._entity && this._entity.properties && this._entity.properties.contentServiceScormActivityUpdatedAt;
	}

	/**
	 * @returns {string|null} HTML description of the SCORM activity
	 */
	descriptionRichText() {
		const descriptionSubEntity = ContentHelperFunctions.getDescriptionSubEntity(this._entity);
		if (!descriptionSubEntity) {
			return null;
		}
		return descriptionSubEntity.properties.html || '';
	}

	/**
	 * @returns {string|null} Plaintext description of the SCORM activity
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
	 * @returns {string|undefined} Title of the SCORM activity
	 */
	title() {
		return this._entity && this._entity.properties && this._entity.properties.title;
	}

	/**
	 * @returns {string|undefined} Url of the SCORM activity
	 */
	url() {
		return this._entity && this._entity.properties && this._entity.properties.url;
	}

	/**
	 * @returns {number|undefined} The topicId for the SCORM activity
	 */
	topicId() {
		return this._entity && this._entity.properties && this._entity.properties.topicId;
	}

	/**
	 * @returns {number|undefined} The orgUnitId for the SCORM activity
	 */
	orgUnitId() {
		return this._entity && this._entity.properties && this._entity.properties.orgUnitId;
	}

	/**
	 * Note: This can be removed once LTI topics are migrated
	 * @returns {boolean|undefined} Whether the SCORM activity is launched through LTI
	 */
	isLtiTopic() {
		return this._entity && this._entity.properties && this._entity.properties.isLtiTopic;
	}

	/**
	 * Updates the SCORM activity's description
	 * @param {string} richText Rich text description to set on the SCORM activity
	 */
	async setScormActivityDescription(richText) {
		if (!this._entity) {
			return;
		}
		const action = this._entity.getActionByName(Actions.content.updateDescription);
		if (!action) {
			return;
		}

		const fields = [{ name: 'description', value: richText }];
		return await performSirenAction(this._token, action, fields);
	}

	/**
	 * Updates the SCORM activity to have the given title
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
	 * Updates the SCORM activity to have the given external resource value
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
	 * Checks if content SCORM activity properties passed in match what is currently stored
	 * @param {object} scormActivity Object containing SCORM activity specific properties
	 */
	equals(contentscormActivity) {
		const diffs = [
			[this.title(), contentscormActivity.title],
			[this.descriptionRichText(), contentscormActivity.descriptionRichText],
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
