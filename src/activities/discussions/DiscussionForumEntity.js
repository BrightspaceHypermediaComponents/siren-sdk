import { Actions, Rels } from '../../hypermedia-constants.js';
import { Entity } from '../../es6/Entity.js';
import { performSirenAction } from '../../es6/SirenAction.js';

/**
 * DiscussionForumEntity class representation of a D2L Discussion Forum.
 */
export class DiscussionForumEntity extends Entity {
	/**
	 * @returns {string} the href of the collection that the discussion forum belongs to
	 */
	forumsHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.Discussions.forums)) {
			return;
		}
		return this._entity.getLinkByRel(Rels.Discussions.forums).href;
	}

	/**
	 * @returns {string} Name of the discussion forum
	 */
	name() {
		return this._entity && this._entity.properties && this._entity.properties.name;
	}

	/**
	 * @returns {bool} Whether or not the edit name action is present on the discussion forum entity
	 */
	canEditName() {
		return this._entity && this._entity.hasActionByName(Actions.discussions.forum.updateName);
	}

	/**
	 * @summary Formats action and fields if forum name has changed and user has edit permission
	 * @param {object} name the forum's new name
	 * @returns {object} the appropriate action/fields to update
	 */
	_formatUpdateNameAction(name) {
		if (!name) return;
		if (!this._hasFieldValueChanged(name, this.name())) return;
		if (!this.canEditName()) return;

		const action = this._entity.getActionByName(Actions.discussions.forum.updateName);
		const fields = [
			{ name: 'name', value: name },
		];

		return { action, fields };
	}

	/**
	 * @summary Calls the update name action if name is provided and user has edit permission
	 * @param {object} name the forum's new name
	 */
	async updateName(name) {
		if (!name) return;
		if (!this.canEditName()) return;

		const sirenAction = this._formatUpdateNameAction(name);
		if (!sirenAction) return;

		const { action, fields } = sirenAction;
		await performSirenAction(this._token, action, fields);
	}

	_hasFieldValueChanged(currentValue, initialValue) {
		return currentValue !== initialValue;
	}
}
