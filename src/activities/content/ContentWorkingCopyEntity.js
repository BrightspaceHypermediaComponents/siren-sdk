import { Entity } from '../../es6/Entity';
import { Actions } from '../../hypermedia-constants';
import { performSirenAction } from '../../es6/SirenAction';

export class ContentWorkingCopyEntity extends Entity {

	/**
	 * performs a checkout action on the entity
	 */
	async checkout() {
		if (!this._entity) {
			return;
		}
		const action = this._entity.getActionByName(Actions.workingCopy.checkout);
		if (!action) {
			return;
		}

		return await performSirenAction(this._token, action);
	}

	/**
	 * performs a commit action on the entity
	 */
	async commit() {
		if (!this._entity) {
			return;
		}
		const action = this._entity.getActionByName(Actions.workingCopy.commit);
		if (!action) {
			return;
		}

		return await performSirenAction(this._token, action);
	}
}
