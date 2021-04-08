import { Entity } from '../es6/Entity';

/**
 * FileEntity class representation of a d2l content file entity.
 */
export class FileEntity extends Entity {

	/**
	 * @returns {string} File's location
	 */
	getFileLocationHref() {
		if (!this._entity || !this._entity.hasLinkByRel('alternate')) {
			return;
		}

		return this._entity.getLinkByRel('alternate').href;
	}
}
