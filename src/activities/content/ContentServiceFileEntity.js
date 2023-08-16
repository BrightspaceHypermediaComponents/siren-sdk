import { ContentFileEntity } from './ContentFileEntity.js';
import ContentHelperFunctions from './ContentHelperFunctions.js';
import { Rels } from '../../hypermedia-constants.js';

/**
 *  ContentServiceFileEntity class representation of a Content Service content-file entity.
 */
export class ContentServiceFileEntity extends ContentFileEntity {
	/**
	 * @returns {string|null} Href to get captions
	 */
	getMediaFileCaptionsHref() {
		return ContentHelperFunctions.getHrefFromRel(Rels.Content.mediaCaptions, this._entity);
	}

	/**
	 * @returns {string|undefined} The tenant ID that owns the object.
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

	/**
	 * @returns {number|undefined} The topic ID of the object
	 */
	topicId() {
		return this._entity && this._entity.properties && this._entity.properties.topicId;
	}

	/**
	 * @returns {string|undefined} The Content Service API endpoint.
	 */
	contentServiceEndpoint() {
		return this._entity && this._entity.properties && this._entity.properties.contentServiceEndpoint;
	}

	/**
	 * @returns {string|undefined} The Content ID of the object on Content Service.
	 */
	contentServiceContentId() {
		return this._entity && this._entity.properties && this._entity.properties.contentServiceContentId;
	}

	/**
	 * @returns {string|undefined} The name of the object on Content Service.
	 */
	contentServiceName() {
		return this._entity && this._entity.properties && this._entity.properties.contentServiceName;
	}

}
