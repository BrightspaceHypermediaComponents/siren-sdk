import { Entity } from '../../es6/Entity';
import { Rels } from '../../hypermedia-constants';

export const CONTENT_TYPES = {
	module: 'module',
	topic: 'topic',
	weblink: 'weblink'
};

/**
 * ContentEntity class representation of a d2l content entity.
 */
export class ContentEntity extends Entity {

	/**
	 * @returns {string} content type
	 */
	getEntityType() {
		// TODO - add more specific entity types to the activity-usage class array
		// as we start working on new content types
		if (!this._entity) {
			return null;
		} else if (this._entity.hasClass(CONTENT_TYPES.module)) {
			return CONTENT_TYPES.module;
		} else if (this._entity.hasClass(CONTENT_TYPES.topic)) {
			return CONTENT_TYPES.topic;
		}  else if (this._entity.hasClass(CONTENT_TYPES.weblink)) {
			return CONTENT_TYPES.weblink;
		} else {
			return null;
		}
	}

	/**
	 * @returns {string} content-module link
	 */
	getModuleHref() {
		return this._entity
			&& this._entity.hasLinkByRel(Rels.Content.moduleEntity)
			&& this._entity.getLinkByRel(Rels.Content.moduleEntity).href;
	}

	/**
	 * @returns {string} content-weblink link
	 */
	getWebLinkHref() {
		return this._entity
			&& this._entity.hasLinkByRel(Rels.Content.weblinkEntity)
			&& this._entity.getLinkByRel(Rels.Content.weblinkEntity).href;
	}
}
