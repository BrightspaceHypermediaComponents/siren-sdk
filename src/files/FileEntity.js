import { Entity } from '../es6/Entity.js';

/**
 * FileEntity class representation of a d2l content file entity.
 */
export class FileEntity extends Entity {
	/**
	 * @returns {string|undefined} Title of the content HTML file template entity
	 */
	title() {
		return this._entity && this._entity.properties && this._entity.properties.title;
	}

	/**
	 * @returns {string|null} File's location
	 */
	getFileLocationHref() {
		if (!this._entity || !this._entity.hasLinkByClass('filtered-data')) {
			return null;
		}

		return this._entity.getLinkByClass('filtered-data').href;
	}

	/**
	 * @returns {string|null} File's raw data location
	 */
	getFileDataLocationHref() {
		if (!this._entity || !this._entity.hasLinkByClass('raw-data')) {
			return null;
		}

		return this._entity.getLinkByClass('raw-data').href;
	}
}
