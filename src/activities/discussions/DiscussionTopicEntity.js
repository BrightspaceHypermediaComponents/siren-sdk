import { Actions, Classes, Rels } from '../../hypermedia-constants.js';
import { performSirenAction, performSirenActions } from '../../es6/SirenAction.js';
import { Entity } from '../../es6/Entity.js';
const NONE_RATING_TYPE = 'None';

/**
 * DiscussionTopicEntity class representation of a D2L Discussion Topic.
 */
export class DiscussionTopicEntity extends Entity {
	/**
	 * @returns {string} the href of the discussion topic's discussion forum entity
	 */
	forumHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.Discussions.forum)) {
			return;
		}
		return this._entity.getLinkByRel(Rels.Discussions.forum).href;
	}

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
	 * @returns {bool} Whether or not the discussion topic entity has posts.
	 */
	hasPosts() {
		return this._entity && this._entity.hasClass(Classes.discussions.hasPosts);
	}

	/**
	 * @returns {number} Post rating scheme of discussion topic.
	 */
	postRatingSelection() {
		const options = this.postRatingOptions();
		const selected = options?.find(option => option?.selected);
		return selected.value || NONE_RATING_TYPE;
	}

	/**
	 * @returns {object[]} Post rating options of discussion topic.
	 */
	postRatingOptions() {
		const entity = this._entity;
		if (!entity) return;

		const action = this._entity.getActionByName(Actions.discussions.topic.updateRatingType);
		const fields = action && action.getFieldByName('ratingType');

		return fields && fields.value;
	}

	/**
	 * @summary Formats action and fields if topic name has changed and user has edit permission
	 * @param {object} topic the topic that's being modified
	 * @param {bool} shouldSyncNameWithForum determines whether topic and forum names should sync
	 * @returns {object} the appropriate action/fields to update
	 */
	_formatUpdateNameAction(topic, shouldSyncNameWithForum) {
		const { name } = topic || {};

		if (!name) return;
		if (!this._hasFieldValueChanged(name, this.name())) return;
		if (!this.canEditName()) return;

		const action = this._entity.getActionByName(Actions.discussions.topic.updateName);
		const fields = [
			{ name: 'name', value: name },
			{ name: 'shouldSyncNameWithForum', value: shouldSyncNameWithForum },
		];

		return { action, fields };
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
	 * @returns {bool} Sync draft status with topic's parent forum against the draft endpoint
	 */
	canSyncDraftWithForum() {
		return this._entity && this._entity.hasActionByName(Actions.discussions.topic.syncDraftWithForum);
	}

	/**
	 * Updates the draft status of the activity usage entity to draft or published
	 * @param {object} topic the topic that's being modified
	 * @param {bool} shouldSyncDraftWithForum Whether to sync the draft status with the forum or not
	 */

	_formatSyncDraftStatusAction(topic, shouldSyncDraftWithForum) {
		const { isDraft } = topic || {};
		if (!this.canSyncDraftWithForum() || typeof isDraft === 'undefined' || !shouldSyncDraftWithForum) {
			return;
		}

		const action = this._entity.getActionByName(Actions.discussions.topic.syncDraftWithForum);
		const fields = [
			{ name: 'draft', value: isDraft },
			{ name: 'shouldSyncDraftWithForum', value: shouldSyncDraftWithForum }
		];
		return { action, fields };
	}

	/**
	 * Updates the topic's rating scheme selection
	 * @param {object} topic the topic that's being modified
	 */
	_formatUpdateRatePostAction(topic) {
		const { postRatingSelection } = topic || {};

		if (!postRatingSelection) {
			return;
		}

		const action = this._entity.getActionByName(Actions.discussions.topic.updateRatingType);
		const fields = [{ name: 'ratingType', value: postRatingSelection }];

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
			[topic.postRatingSelection, this.postRatingSelection()],
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
	 * @param {bool} shouldSyncNameWithForum determines whether topic and forum names should sync
	 * @param {bool} shouldSyncNameWithForum determines whether topic and forum draft status should sync
	 */
	async save(topic, shouldSyncNameWithForum, shouldSyncDraftWithForum) {
		if (!topic) return;

		const updateNameAction = this._formatUpdateNameAction(topic, shouldSyncNameWithForum);
		const updateDescriptionAction = this._formatUpdateDescriptionAction(topic);
		const syncDraftWithForum = this._formatSyncDraftStatusAction(topic, shouldSyncDraftWithForum);
		const updateRatePostType = this._formatUpdateRatePostAction(topic);

		const sirenActions = [
			updateNameAction,
			updateDescriptionAction,
			syncDraftWithForum,
			updateRatePostType
		];

		await performSirenActions(this._token, sirenActions);
	}

	_hasFieldValueChanged(currentValue, initialValue) {
		return currentValue !== initialValue;
	}

	canDelete() {
		return this._entity.hasActionByName(Actions.discussions.topic.delete);
	}

	async delete(shouldDeleteParentForum = false) {
		const action = this.canDelete() && this._entity.getActionByName(Actions.discussions.topic.delete);
		if (!action) {
			return;
		}

		const fields = [
			{ name: 'shouldDeleteParentForum', value: shouldDeleteParentForum }
		];

		await performSirenAction(this._token, action, fields).then(() => {
			this.dispose();
		});
	}
}
