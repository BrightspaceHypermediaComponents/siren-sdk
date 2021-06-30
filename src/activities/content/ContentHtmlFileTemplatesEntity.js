import { Entity } from '../../es6/Entity';

/**
 * ContentHtmlFileTemplatesEntity class representation of an html file templates entity.
 */
export class ContentHtmlFileTemplatesEntity extends Entity {

	/**
	 * @returns {string|undefined} Title of the content HTML file template entity
	 */
	title() {
		return this._entity && this._entity.properties && this._entity.properties.title;
	}

	/**
	 * @returns {array|undefined} Array containing the subentites of the file template entity, if they exist
	 */
	getHtmlFileTemplates() {
		return this._entity && this._entity.getSubEntitiesByRel('about');
	}
}
