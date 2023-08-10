import { ContentFileEntity } from './ContentFileEntity.js';
import ContentHelperFunctions from './ContentHelperFunctions.js';
import { Rels } from '../../hypermedia-constants.js';

/**
 *  ContentMediaFileEntity class representation of a d2l audio or video content-file entity.
 */
export class ContentMediaFileEntity extends ContentFileEntity {

	mediaFileName() {
		return this._entity && this._entity.properties && this._entity.properties.mediaFileName;
	}

	/**
	 * @returns {string|null} media captions href
	 */
	getMediaFileCaptionsHref() {
		return ContentHelperFunctions.getHrefFromRel(Rels.Content.mediaCaptions, this._entity);
	}

	/**
	 * @returns {boolean|undefined} Determines whether the download button is enabled for the embdedded media view.
	 */
	allowDownload() {
		return this._entity && this._entity.properties && this._entity.properties.allowDownload;
	}
}
