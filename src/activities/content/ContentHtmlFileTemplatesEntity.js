import { Entity } from '../../es6/Entity';

/**
 * ContentHtmlFileTemplatesEntity class representation of a html files templates entity.
 */
export class ContentHtmlFileTemplatesEntity extends Entity {

	/**
	 * @returns {array|undefined} Array containing the subentites of the file template entity, if they exist
	 */
	getHtmlFileTemplates() {    
		return this._entity && this._entity.getSubEntitiesByRel('about');
	}
}
