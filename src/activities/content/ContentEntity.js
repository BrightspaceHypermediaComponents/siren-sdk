import { Entity } from '../../es6/Entity';
import { Rels } from '../../hypermedia-constants';

export const CONTENT_TYPES = {
	module: 'module',
	topic: 'topic'
};

/**
 * ContentEntity class representation of a d2l content entity.
 */
export class ContentEntity extends Entity {

	/**
	 * @returns {string} content-module link
	 */
	getEntityType() {
		// TODO - add more specific entity types to the activity-usage class array
		// once we start working on non-module content types
		if (!this._entity) {
			return null;
		} else if (this._entity.hasClass(CONTENT_TYPES.module)) {
			return CONTENT_TYPES.module;
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
		return this._entity
			&& this._entity.hasLinkByRel(Rels.Content.moduleEntity)
			&& this._entity.getLinkByRel(Rels.Content.moduleEntity).href;
	}
}
