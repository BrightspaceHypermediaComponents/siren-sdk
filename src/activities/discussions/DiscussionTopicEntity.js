import { Actions, Rels } from '../../hypermedia-constants.js';
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

	/**
	 * @summary Checks if topic entity has changed, primarily used for dirty check
	 * @param {object} topic the topic that's being modified
	 */
	equals(topic) {
		const diffs = [
			[topic.name, this.name()],
			[topic.description, this.descriptionEditorHtml()],
		];

		for (const [current, initial] of diffs) {
			if (current !== initial) {
				return false;
			}
		}

		return true;
	}

	/**
	 * @returns {bool} Whether or not the edit description action is present on the topic description entity
	 */
	canEditDescription() {
		const descriptionEntity = this._getDescriptionEntity();
		return descriptionEntity
			&& descriptionEntity.hasActionByName(Actions.discussions.topic.updateDescription);
	}

	/**
	 * @returns {object} a helper function to get topic description entity
	 */

	_getDescriptionEntity() {
		return this._entity
			&& this._entity.hasSubEntityByRel(Rels.Discussions.description)
			&& this._entity.getSubEntityByRel(Rels.Discussions.description);
	}

	/**
	 * @returns {string} Topic description in plaintext (HTML stripped)
	 */
	descriptionPlaintext() {
		const descriptionEntity = this._getDescriptionEntity();
		return descriptionEntity
			&& descriptionEntity.properties
			&& descriptionEntity.properties.text;
	}

	/**
	 * @returns {string} Topic description in HTML
	 */
	descriptionHtml() {
		const descriptionEntity = this._getDescriptionEntity();
		if (!descriptionEntity || !descriptionEntity.properties || !descriptionEntity.properties.html) {
			return;
		}
		return descriptionEntity.properties.html;
	}

	/**
	 * @returns {string} Topic description formatted to be used with a d2l-html-editor
	 */
	descriptionEditorHtml() {
		const descriptionEntity = this._getDescriptionEntity();
		if (!descriptionEntity) {
			return;
		}

		const updateDescriptionAction = descriptionEntity.getActionByName(Actions.discussions.topic.updateDescription);
		return updateDescriptionAction
			&& updateDescriptionAction.hasFieldByName('description')
			&& updateDescriptionAction.getFieldByName('description').value;
	}

	/**
	 * @summary Formats action and fields if topic description has changed
	 * @param {object} topic the topic that's being modified
	 * @returns {object} the appropriate action/fields to update
	 */

	_formatUpdateDescriptionAction(topic) {
		const { description } = topic || {};

		if (typeof description === 'undefined') return;
		if (!this._hasFieldValueChanged(description, this.descriptionEditorHtml())) return;
		if (!this.canEditDescription()) return;

		const descriptionEntity = this._getDescriptionEntity();
		if (!descriptionEntity) return;
		const action = descriptionEntity.getActionByName(Actions.discussions.topic.updateDescription);

		if (!action) {
			return;
		}

		const fields = [
			{ name: 'description', value: description },
		];
		return { action, fields };
	}

	/**
	 * @summary Fires all the formatted siren actions collectively
	 * @param {object} topic the topic that's being modified
	 */
	async save(topic) {
		if (!topic) return;

		const updateNameAction = this._formatUpdateNameAction(topic);
		const updateDescriptionAction = this._formatUpdateDescriptionAction(topic);

		const sirenActions = [
			updateNameAction,
			updateDescriptionAction,
		];

		await performSirenActions(this._token, sirenActions);
	}

	_hasFieldValueChanged(currentValue, initialValue) {
		return currentValue !== initialValue;
	}
}
