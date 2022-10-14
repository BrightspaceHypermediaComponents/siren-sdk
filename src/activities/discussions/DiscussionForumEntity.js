import { Actions } from '../../hypermedia-constants.js';
import { Entity } from '../../es6/Entity.js';
import { performSirenActions } from '../../es6/SirenAction.js';

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
	 * @param {object} forum the forum that's being modified
	 * @returns {object} the appropriate action/fields to update
	 */
	_formatUpdateNameAction(forum) {
		const { name } = forum || {};

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
	 * @summary Checks if forum entity has changed, primarily used for dirty check
	 * @param {object} forum the forum that's being modified
	 */
	equals(forum) {
		const diffs = [
			[forum.name, this.name()],
		];

		for (const [current, initial] of diffs) {
			if (current !== initial) {
				return false;
			}
		}

		return true;
	}

	/**
	 * @summary Fires all the formatted siren actions collectively
	 * @param {object} forum the forum that's being modified
	 */
	async save(forum) {
		if (!forum) return;

		const updateNameAction = this._formatUpdateNameAction(forum);

		const sirenActions = [
			updateNameAction,
		];

		await performSirenActions(this._token, sirenActions);
	}

	_hasFieldValueChanged(currentValue, initialValue) {
		return currentValue !== initialValue;
	}
}
