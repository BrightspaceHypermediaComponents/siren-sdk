import { Entity } from '../../es6/Entity';
import { Rels } from '../../hypermedia-constants';
import ContentHelperFunctions from './ContentHelperFunctions.js';

export const CONTENT_TYPES = {
	htmlFile: 'htmlFile',
	ltilink: 'ltilink',
	module: 'module',
	topic: 'topic',
	weblink: 'weblink',
};

/**
 * ContentEntity class representation of a d2l content entity.
 */
export class ContentEntity extends Entity {

	/**
	 * @returns {string|null} content type
	 */
	getEntityType() {
		// TODO - add more specific entity types to the activity-usage class array
		// as we start working on new content types
		if (!this._entity) {
			return null;
		} else if (this._entity.hasLinkByRel(Rels.Content.moduleEntity)) {
			return CONTENT_TYPES.module;
		} else if (this._entity.hasLinkByRel(Rels.Content.weblinkEntity)) {
			return CONTENT_TYPES.weblink;
		} else if (this._entity.hasLinkByRel(Rels.Content.ltilinkEntity)) {
			return CONTENT_TYPES.ltilink;
		} else if (this._entity.hasLinkByRel(Rels.Content.htmlFileEntity)) {
			return CONTENT_TYPES.htmlFile;
		} else if (this._entity.hasClass(CONTENT_TYPES.topic)) {
			return CONTENT_TYPES.topic;
		} else {
			return null;
		}
	}

	/**
	 * @returns {string} content-module link
	 */
	getModuleHref() {
		return ContentHelperFunctions.getHrefFromRel(Rels.Content.moduleEntity, this._entity);
	}

	/**
	 * @returns {string} content-weblink link
	 */
	getWebLinkHref() {
		return ContentHelperFunctions.getHrefFromRel(Rels.Content.weblinkEntity, this._entity);
	}

	/**
	 * @returns {string} content-ltilink link
	 */
	getLTILinkHref() {
		return ContentHelperFunctions.getHrefFromRel(Rels.Content.ltilinkEntity, this._entity);
	}

	/**
	 * @returns {string} content-htmlfile link
	 */
	getHtmlFileHref() {
		return ContentHelperFunctions.getHrefFromRel(Rels.Content.htmlFileEntity, this._entity);
	}
}
