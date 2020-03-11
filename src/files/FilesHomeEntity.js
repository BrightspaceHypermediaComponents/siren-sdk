import { Actions } from '../hypermedia-constants';
import { Entity } from '../es6/Entity';
import { performSirenAction } from '../es6/SirenAction';

/**
 * FilesHomeEntity class representation of organization files
 */
export class FilesHomeEntity extends Entity {

	/**
	 * @returns {bool} True if the file preview location action is present
	 */
	canPreviewFiles() {
		return this._entity && this._entity.hasActionByName(Actions.files.filePreviewLocation);
	}

	/**
	 * @retirms {string } Calls the Siren action to get a preview location for the specified file
	 */
	async getFilePreviewLocationEntity(fileSystemType, fileId) {
		if (!this.canPreviewFiles()) {
			return;
		}

		const action = this._entity.getActionByName(Actions.files.filePreviewLocation);
		const fields = [
			{ name: 'fileSystemType', value: fileSystemType },
			{ name: 'fileId', value: fileId }
		];
		const sirenEntity = await performSirenAction(this._token, action, fields);
		return sirenEntity;
	}
}
