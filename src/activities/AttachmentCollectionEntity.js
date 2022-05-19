import { Entity } from '../es6/Entity.js';
import { performSirenAction } from '../es6/SirenAction.js';
import { Rels } from '../hypermedia-constants.js';

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
	 * @returns {Array} Returns all Attachment sub-entities hrefs from the attachments collection
	 */
	getAttachmentEntityHrefs() {
		const attachments = this.getAttachmentEntities();
		const attachmentHrefs = attachments.map(attachment => {
			if (attachment.href) {
				return attachment.href;
			}

			return attachment.getLinkByRel('self').href;
		});
		return attachmentHrefs;
	}

	/**
	 * @returns {bool} Returns true if any valid action to add attachments is present on the entity
	 */
	canAddAttachments() {
		return this.canAddLinkAttachment()
			|| this.canAddGoogleDriveLinkAttachment()
			|| this.canAddOneDriveLinkAttachment()
			|| this.canAddOneDriveLtiLinkAttachment()
			|| this.canAddFileAttachment()
			|| this.canAddVideoNoteAttachment()
			|| this.canAddAudioNoteAttachment();
	}

	async _addLinkAttachment(action, name, href) {
		const fields = [{
			name: 'name', value: name
		}, {
			name: 'href', value: href
		}];
		await performSirenAction(this._token, action, fields);
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
		await this._addLinkAttachment(action, name, href);
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
		await this._addLinkAttachment(action, name, href);
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
		await this._addLinkAttachment(action, name, href);
	}

	/**
	 * @returns {bool} Returns true if the add-onedrivelti-link action is present on the entity
	 */
	canAddOneDriveLtiLinkAttachment() {
		return this._entity.hasActionByName('add-onedrivelti-link');
	}

	/**
	 * Adds a OneDrive LTI link attachment to the attachments collection
	 * @param {string} name Name for the OneDrive LTI link attachment
	 * @param {string} href URL of the OneDrive LTI link attachment
	 */
	async addOneDriveLtiLinkAttachment(name, href) {
		if (!this.canAddOneDriveLtiLinkAttachment()) {
			return;
		}

		const action = this._entity.getActionByName('add-onedrivelti-link');
		await this._addLinkAttachment(action, name, href);
	}

	async _addFileAttachment(action, fileSystemType, fileId) {
		let fields = [
			{ name: 'fileSystemType', value: fileSystemType },
			{ name: 'fileId', value: fileId }
		];
		if (action.hasFieldByName('value')) {
			fields = [
				{
					name: 'value',
					value: JSON.stringify({ FileSystemType: fileSystemType, FileId: fileId})
				}
			];
		}

		await performSirenAction(this._token, action, fields);
	}

	/**
	 * @returns {bool} Returns true if the add-video-note action is present on the entity
	 */
	canAddVideoNoteAttachment() {
		return this._entity.hasActionByName('add-video-note');
	}

	/**
	 * Adds a Video Note attachment to the attachments collection
	 * @param {string} fileSystemType Type of file system the video note is stored on (see enum FileSystemTypes)
	 * @param {string} fileId ID of an existing video note e.g. "abcd1234.html;filename.html"
	 */
	async addVideoNoteAttachment(fileSystemType, fileId) {
		if (!this.canAddVideoNoteAttachment()) {
			return;
		}

		const action = this._entity.getActionByName('add-video-note');
		await this._addFileAttachment(action, fileSystemType, fileId);
	}

	/**
	 * @returns {bool} Returns true if the add-audio-note action is present on the entity
	 */
	canAddAudioNoteAttachment() {
		return this._entity.hasActionByName('add-audio-note');
	}

	/**
	 * Adds an Audio Note attachment to the attachments collection
	 * @param {string} fileSystemType Type of file system the audio note is stored on (see enum FileSystemTypes)
	 * @param {string} fileId ID of an existing audio note e.g. "abcd1234.html;filename.html"
	 */
	async addAudioNoteAttachment(fileSystemType, fileId) {
		if (!this.canAddAudioNoteAttachment()) {
			return;
		}

		const action = this._entity.getActionByName('add-audio-note');
		await this._addFileAttachment(action, fileSystemType, fileId);
	}

	/**
	 * @returns {bool} Returns true if the add-file action is present on the entity
	 */
	canAddFileAttachment() {
		return this._entity.hasActionByName('add-file');
	}

	/**
	 * Attaches an existing file to the attachment collection
	 * @param {string} fileSystemType Type of file system the existing file is stored on (see enum FileSystemTypes)
	 * @param {string} fileId ID of an existing file e.g. "abcd1234.png;filename.png" or "/shared/filename.png"
	 */
	async addFileAttachment(fileSystemType, fileId) {
		if (!this.canAddFileAttachment()) {
			return;
		}

		const action = this._entity.getActionByName('add-file');
		await this._addFileAttachment(action, fileSystemType, fileId);
	}

	/**
	 * @returns {string} Returns URL of the files home API
	 */
	getFilesHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.Files.files)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.Files.files).href;
	}
}
