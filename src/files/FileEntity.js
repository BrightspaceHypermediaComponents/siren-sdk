import { Entity } from '../es6/Entity';

/**
 * FileEntity class representation of a d2l content file entity.
 */
export class FileEntity extends Entity {

	/**
	 * @returns {string|null} File's location
	 */
	getFileLocationHref() {
		if (!this._entity || !this._entity.hasLinkByRel('alternate')) {
			return null;
		}

		return this._entity.getLinkByRel('alternate').href;
	}
}
