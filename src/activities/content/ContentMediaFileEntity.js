import { ContentFileEntity } from './ContentFileEntity.js';
import ContentHelperFunctions from './ContentHelperFunctions';
import { Rels } from '../../hypermedia-constants';

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

	/**
	 * @returns {boolean|undefined} Determines whether the entity is located on the content service or not (otherwise manage files)
	 */
	isContentServiceResource() {
		return this._entity && this._entity.properties && this._entity.properties.isContentServiceResource;
	}

	/**
	 * @returns {boolean|undefined} Determines whether the advanced editing is enabled for this entity.
	 */
	isAdvancedEditingEnabled() {
		return this._entity && this._entity.properties && this._entity.properties.isAdvancedEditingEnabled;
	}

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
	 * @returns {string|undefined} The contentId of the media, present if it is located on the content service.
	 */
	contentServiceContentId() {
		return this._entity && this._entity.properties && this._entity.properties.contentServiceContentId;
	}
	/**
	 * @returns {string|undefined} Content service endpoint for making requests against, present if the media is located on the content service.
	 */
	contentServiceEndpoint() {
		return this._entity && this._entity.properties && this._entity.properties.contentServiceEndpoint;
	}
	/**
	 * @returns {string|undefined} The tenantId for the media, present if the media is located on the content service.
	 */
	tenantId() {
		return this._entity && this._entity.properties && this._entity.properties.tenantId;
	}
	/**
	 * @returns {boolean|undefined} Determines whether the download button is enabled for the embdedded media view.
	 */
	allowDownload() {
		return this._entity && this._entity.properties && this._entity.properties.allowDownload;
	}
}
