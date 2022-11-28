import { Entity } from '../../es6/Entity.js';
import { performSirenAction } from '../../es6/SirenAction.js';

/**
 * ContentCompletionEntity class representation of a d2l content completion entity.
 */
export class ContentCompletionEntity extends Entity {

	/** @returns {bool} Whether or not the the content completion type is manual*/
	async isContentCompletionManual() {
		return this._entity && this._entity.hasClass('manual');
	}

	/** @returns {bool} Whether or not the the content has been marked as completed*/
	async isContentCompleted() {
		return this._entity && this._entity.hasClass('completed');
	}

	/**
	 * Updates the completion status to completed
	 */
	async markAsComplete() {
		if (!this._entity) {
			return;
		}
		const action = this._entity.getActionByName('mark-as-complete');
		if (!action) {
			return;
		}

		const res = await performSirenAction(this._token, action);
		return res;
	}
}
