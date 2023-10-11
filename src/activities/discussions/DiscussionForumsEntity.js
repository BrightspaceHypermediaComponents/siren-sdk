import { Actions } from '../../hypermedia-constants.js';
import { Entity } from '../../es6/Entity.js';
import { performSirenAction } from '../../es6/SirenAction.js';

/**
 * DiscussionForumsEntity class representation of a D2L Discussion Forums collection.
 */
export class DiscussionForumsEntity extends Entity {
	/**
	 * @returns {bool} Whether or not the create forum action is present on the discussion forums entity
	 */
	canCreateForum() {
		return this._entity && this._entity.hasActionByName(Actions.discussions.forums.createForum);
	}

	/**
	 * @summary Calls the create forum action if name is provided and user has create permission
	 * @param {object} name the new forum's name
	 */
	async createForum(name) {
		if (!name) return;
		if (!this.canCreateForum()) return;

		const action = this._entity.getActionByName(Actions.discussions.forums.createForum);
		const fields = [{ name: 'name', value: name }];
		return await performSirenAction(this._token, action, fields);
	}
}
