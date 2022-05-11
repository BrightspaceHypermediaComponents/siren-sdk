import { Entity } from '../../es6/Entity.js';

/**
 * ContentHtmlFileTemplatesEntity class representation of an html file templates entity.
 */
export class ContentHtmlFileTemplatesEntity extends Entity {
	/**
	 * @returns {array|undefined} Array containing the subentites of the file template entity, if they exist
	 */
	getHtmlFileTemplates() {
		return this._entity && this._entity.getSubEntitiesByRel('about');
	}
}
