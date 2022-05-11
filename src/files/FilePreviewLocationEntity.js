import { Entity } from '../es6/Entity.js';

/**
 * FilePreviewLocationEntity class representation of file preview location
 */
export class FilePreviewLocationEntity extends Entity {

	/**
	 * @returns {string} Returns the file preview location for the file
	 */
	previewLocation() {
		return this._entity && this._entity.properties && this._entity.properties.previewLocation;
	}
}
