import { Actions, Classes } from '../../hypermedia-constants.js';
import { ContentEntity } from './ContentEntity.js';
import { performSirenAction } from '../../es6/SirenAction.js';
/**
 * ContentlorActivityEntity class representation of a d2l content-lor-package entity.
 */
export class ContentLorActivityEntity extends ContentEntity {

	/**
	 * @returns {string|undefined} Title of the Lor actvity
	 */
	title() {
		return this._entity && this._entity.properties && this._entity.properties.title;
	}

	/**
	 * @returns {string|undefined} The url to view the LOR object
	 */
	url() {
		return this._entity && this._entity.properties && this._entity.properties.url;
	}

	/**
	 * @returns {string|undefined} The url to embed the LOR object
	 */
	embedUrl() {
		return this._entity.hasLinkByRel('alternate') && this._entity.getLinkByRel('alternate').href;
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
	 * @returns {boolean} Whether or not the LOR object can be embedded or not (in iframe for previewing)
	 */
	canEmbed() {
		return this._entity && this._entity.properties && this._entity.properties.canEmbed;
	}

	/**
	 * @returns {string|undefined} The name of the LOR document
	 */
	documentName() {
		return this._entity && this._entity.properties && this._entity.properties.documentName;
	}

	/**
	 * @returns {number|undefined} The version of the LOR document
	 */
	version() {
		return this._entity && this._entity.properties && this._entity.properties.version;
	}

	/**
	 * @returns {date|undefined} The date the LOR document was last edited
	 */
	lastModified() {
		return this._entity && this._entity.properties && this._entity.properties.lastModified;
	}

	/**
	 * @returns {string|undefined} The type of document the LOR object is
	 */
	documentType() {
		return this._entity && this._entity.properties && this._entity.properties.documentType;
	}

	/**
	 * @returns {string|undefined} The name of the repository the LOR belongs to
	 */
	repositoryName() {
		return this._entity && this._entity.properties && this._entity.properties.repositoryName;
	}

	/**
	 * @returns {boolean} Whether this LOR activity is a scorm topic
	 */
	isScormTopic() {
		return this._entity && this._entity.properties && this._entity.properties.isScormTopic;
	}

	/**
	 * This was added to address LOR objects that are in a course but belong to a LOR on another instance.
	 * This means the LOR info will not be able to be found by the serializer, and the page needs to handle
	 * all the missing info.
	 * @returns {boolean} Whether or not the LOR object was found
	 */
	hasLorInfo() {
		return this._entity && this._entity.properties && this._entity.properties.hasLorInfo;
	}

	/**
	 * Updates the LOR activty to have the given title
	 * @param {string} title Title to set on the LOR activity
	 */
	async setLorActivityTitle(title) {
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
	 * Updates the Lor Activity to have the given external resource value
	 * @param {boolean} isExternalResource boolean value that represents external resource status
	 */
	async setLorActivityExternalResource(isExternalResource) {
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
	 * Deletes the LOR activity
	 */
	async deleteLorActivity() {
		if (!this._entity) {
			return;
		}

		const action = this._entity.getActionByName(Actions.webLink.deleteLorActivity);
		if (!action) {
			return;
		}

		await performSirenAction(this._token, action);
		this.dispose();
	}

	async updateLorActivityVersion(isDynamic, version) {
		if (!this._entity) {
			return;
		}

		const action = this._entity.getActionByName(Actions.lorActivity.updateVersion);

		if (!action) {
			return;
		}

		const fields = [
			{ name: 'isDynamic', value: isDynamic },
			{ name: 'version', value: version }
		];
		await performSirenAction(this._token, action, fields);
	}

	/**
	 * Checks if content lor activty properties passed in match what is currently stored
	 * @param {object} lorActivity Object containing lor activty specific properties
	 */
	equals(contentlorActivity) {
		const diffs = [
			[this.title(), contentlorActivity.title],
			[this.isExternalResource(), contentlorActivity.isExternalResource]
		];
		for (const [left, right] of diffs) {
			if (left !== right) {
				return false;
			}
		}
		return true;
	}
}
