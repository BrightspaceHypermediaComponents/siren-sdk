import { Entity } from '../../es6/Entity';
import { Rels } from '../../hypermedia-constants';
import ContentHelperFunctions from './ContentHelperFunctions.js';

export const CONTENT_TYPES = {
	contentFile: 'content-file',
	ltilink: 'ltilink',
	module: 'module',
	topic: 'topic',
	weblink: 'weblink',
	scormActivity: 'scorm-activity',
	lorActivity: 'lor-activity'
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
		} else if (this._entity.hasLinkByRel(Rels.Content.contentFileEntity)) {
			return CONTENT_TYPES.contentFile;
		} else if (this._entity.hasLinkByRel(Rels.Content.contentScormActivityEntity)) {
			return CONTENT_TYPES.scormActivity;
		} else if (this._entity.hasLinkByRel(Rels.Content.contentLorActivityEntity)) {
			return CONTENT_TYPES.lorActivity;
		} else if (this._entity.hasClass(CONTENT_TYPES.topic)) {
			return CONTENT_TYPES.topic;
		} else {
			return null;
		}
	}

	/**
	 * @returns {string|null} content-module link
	 */
	getModuleHref() {
		return ContentHelperFunctions.getHrefFromRel(Rels.Content.moduleEntity, this._entity);
	}

	/**
	 * @returns {string|null} content-weblink link
	 */
	getWebLinkHref() {
		return ContentHelperFunctions.getHrefFromRel(Rels.Content.weblinkEntity, this._entity);
	}

	/**
	 * @returns {string|null} content-ltilink link
	 */
	getLTILinkHref() {
		return ContentHelperFunctions.getHrefFromRel(Rels.Content.ltilinkEntity, this._entity);
	}

	/**
	 * @returns {string|null} content-file link
	 */
	getContentFileHref() {
		return ContentHelperFunctions.getHrefFromRel(Rels.Content.contentFileEntity, this._entity);
	}

	/**
	 * @returns {string|null} content SCORM package link
	 */
	getScormActivityHref() {
		return ContentHelperFunctions.getHrefFromRel(Rels.Content.contentScormActivityEntity, this._entity);
	}

	/**
	 * @returns {string|null} content LOR link
	 */
	getLorActivityHref() {
		return ContentHelperFunctions.getHrefFromRel(Rels.Content.contentLorActivityEntity, this._entity);
	}

	/**
	 * @returns {string|null} lesson-view-page link
	 */
	getLessonViewPageHref() {
		return ContentHelperFunctions.getHrefFromRel(Rels.Content.lessonViewPage, this._entity);
	}

}
