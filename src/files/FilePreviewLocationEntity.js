import { Entity } from '../es6/Entity';

/**
 * FilePreviewLocationEntity class representation of file preview location
 */
export class FilePreviewLocationEntity extends Entity {

	/**
	 * @returns {bool} True if the file preview location action is present
	 */
	previewLocation() {
		return this._entity && this._entity.properties && this._entity.properties.previewLocation;
	}
}
