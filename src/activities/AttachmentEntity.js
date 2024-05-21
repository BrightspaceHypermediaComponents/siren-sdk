import { Entity } from '../es6/Entity.js';
import { performSirenAction } from '../es6/SirenAction.js';

/**
 * AttachmentEntity class representation of an attachment (link or file)
 */
export class AttachmentEntity extends Entity {
	/**
	 * @returns {string} Attachment's name
	 */
	name() {
		return this._entity && this._entity.properties && this._entity.properties.name;
	}

	/**
	 * @returns {string} Attachment's URL location (for link attachments) or file location (for file attachments)
	 */
	href() {
		if (!this._entity) {
			return;
		}

		if (this._entity.hasLinkByRel('alternate')) {
			return this._entity.getLinkByRel('alternate').href;
		}

		return this._entity.properties && this._entity.properties.href;
	}

	/**
	 * @returns {bool} True if the delete action is present on the attachment
	 */
	canDeleteAttachment() {
		return this._entity && this._entity.hasActionByName('delete');
	}

	/**
	 * Calls the Siren action to delete this attachment
	 */
	async deleteAttachment(immediate = false) {
		if (!this.canDeleteAttachment()) {
			return;
		}

		const action = this._entity.getActionByName('delete');
		await performSirenAction(this._token, action, null, immediate);
	}
}
