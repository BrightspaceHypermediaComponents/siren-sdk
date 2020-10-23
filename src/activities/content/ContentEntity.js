import { Entity } from '../../es6/Entity';
import { Rels } from '../../hypermedia-constants';

/**
 * ContentEntity class representation of a d2l content entity.
 */
export class ContentEntity extends Entity {
	/**
	 * @returns {string} Title of the content item
	 */
	title() {
		return this._entity && this._entity.properties && this._entity.properties.title;
	}

	/**
	 * @returns {string} content-module link
	 */
	getModuleHref() {
		return this._entity
			&& this._entity.hasLinkByRel(Rels.Content.moduleEntity)
			&& this._entity.getLinkByRel(Rels.Content.moduleEntity);
	}
}
