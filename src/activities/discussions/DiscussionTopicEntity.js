import { Actions } from '../../hypermedia-constants.js';
import { Entity } from '../../es6/Entity.js';
import { performSirenActions } from '../../es6/SirenAction.js';

/**
 * DiscussionTopicEntity class representation of a D2L Discussion Topic.
 */
export class DiscussionTopicEntity extends Entity {
	/**
	 * @returns {string} Name of the discussion topic
	 */
	name() {
		return this._entity && this._entity.properties && this._entity.properties.name;
	}

	/**
	 * @returns {bool} Whether or not the edit name action is present on the discussion topic entity
	 */
	canEditName() {
		return this._entity && this._entity.hasActionByName(Actions.discussions.topic.updateName);
	}

	/**
	 * @summary Checks if topic entity has changed, primarily used for dirty check
	 * @param {object} topic the topic that's being modified
	 */
	equals(topic) {
		const diffs = [
			[topic.name, this.name()],
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
	 * @param {object} topic the topic that's being modified
	 */
	async save(topic) {
		if (!topic) return;

		const updateNameAction = this._formatUpdateNameAction(topic);

		const sirenActions = [
			updateNameAction,
		];

		await performSirenActions(this._token, sirenActions);
	}

	/**
	 * @summary Formats action and fields if topic name has changed and user has edit permission
	 * @param {object} topic the topic that's being modified
	 * @returns {object} the appropriate action/fields to update
	 */
	_formatUpdateNameAction(topic) {
		const { name } = topic || {};

		if (!name) return;
		if (!this._hasFieldValueChanged(name, this.name())) return;
		if (!this.canEditName()) return;

		const action = this._entity.getActionByName(Actions.discussions.topic.updateName);
		const fields = [{ name: 'name', value: name }];

		return { action, fields };
	}

	_hasFieldValueChanged(currentValue, initialValue) {
		return currentValue !== initialValue;
	}
}
