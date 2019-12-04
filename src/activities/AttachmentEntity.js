import { Entity } from '../es6/Entity';

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
	 * @returns {string} Attachment's location (for link attachments)
	 */
	href() {
		return this._entity && this._entity.properties && this._entity.properties.href;
	}
}
