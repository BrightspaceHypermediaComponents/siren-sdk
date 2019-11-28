'use strict';

import { Entity } from '../es6/Entity';
import { performSirenAction } from '../es6/SirenAction';

/**
 * Entity representation of a collection of attachments
 */
export class AttachmentCollectionEntity extends Entity {
	/**
	 * @returns {Array} Returns all Attachment sub-entities from the attachments collection
	 */
	getAttachmentEntities() {
		return this._entity.getSubEntitiesByRel('item');
	}

	/**
	 * @returns {bool} Returns true if any valid action to add attachments is present on the entity
	 */
	canAddAttachments() {
		return this.canAddLinkAttachment()
			|| this.canAddGoogleDriveLinkAttachment()
			|| this.canAddOneDriveLinkAttachment();
	}

	/**
	 * @returns {bool} Returns true if the add-link action is present on the entity
	 */
	canAddLinkAttachment() {
		return this._entity.hasActionByName('add-link');
	}

	/**
	 * Adds a link attachment to the attachments collection
	 * @param {string} name Name for the link attachment
	 * @param {string} href URL of the link attachment
	 */
	async addLinkAttachment(name, href) {
		if (!this.canAddLinkAttachment()) {
			return;
		}

		const action = this._entity.getActionByName('add-link');
		const fields = [{
			name: 'name', value: name
		}, {
			name: 'href', value: href
		}];
		await performSirenAction(this._token, action, fields);
	}

	/**
	 * @returns {bool} Returns true if the add-google-drive-link action is present on the entity
	 */
	canAddGoogleDriveLinkAttachment() {
		return this._entity.hasActionByName('add-google-drive-link');
	}

	/**
	 * Adds a Google Drive link attachment to the attachments collection
	 * @param {string} name Name for the Google Drive link attachment
	 * @param {string} href URL of the Google Drive link attachment
	 */
	async addGoogleDriveLinkAttachment(name, href) {
		if (!this.canAddGoogleDriveLinkAttachment()) {
			return;
		}

		const action = this._entity.getActionByName('add-google-drive-link');
		const fields = [{
			name: 'name', value: name
		}, {
			name: 'href', value: href
		}];
		await performSirenAction(this._token, action, fields);
	}

	/**
	 * @returns {bool} Returns true if the add-onedrive-link action is present on the entity
	 */
	canAddOneDriveLinkAttachment() {
		return this._entity.hasActionByName('add-onedrive-link');
	}

	/**
	 * Adds a OneDrive link attachment to the attachments collection
	 * @param {string} name Name for the OneDrive link attachment
	 * @param {string} href URL of the OneDrive link attachment
	 */
	async addOneDriveLinkAttachment(name, href) {
		if (!this.canAddOneDriveLinkAttachment()) {
			return;
		}

		const action = this._entity.getActionByName('add-onedrive-link');
		const fields = [{
			name: 'name', value: name
		}, {
			name: 'href', value: href
		}];
		await performSirenAction(this._token, action, fields);
	}
}
