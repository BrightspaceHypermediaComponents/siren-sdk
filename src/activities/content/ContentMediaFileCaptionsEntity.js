import { Entity } from '../../es6/Entity.js';

/**
 * ContentMediaFileCaptionsEntity class representation of an html file templates entity.
 */
export class ContentMediaFileCaptionsEntity extends Entity {
	/**
	 * @returns {array|undefined} Array containing the subentites of the file caption entity, if they exist
	 */
	getMediaFileCaptions() {
		return this._entity && this._entity.getSubEntitiesByRel('item');
	}
}
