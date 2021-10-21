import { ContentFileEntity } from './ContentFileEntity.js';

/**
 *  ContentMediaFileEntity class representation of a d2l audio or video content-file entity.
 */
export class ContentMediaFileEntity extends ContentFileEntity {
	/**
	 * @returns {boolean|undefined} Determines whether media should be displayed in an embedded view
	 */
	embedMedia() {
		return this._entity && this._entity.properties && this._entity.properties.embedMedia;
	}
}
