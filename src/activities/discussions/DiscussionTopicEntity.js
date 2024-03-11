import { Actions, Classes, Rels } from '../../hypermedia-constants.js';
import { performSirenAction, performSirenActions } from '../../es6/SirenAction.js';
import { Entity } from '../../es6/Entity.js';
const NONE_RATING_TYPE = 'None';
const HUMAN_GENERATED = 0;
const AI_INSPIRED = 3;

/**
 * DiscussionTopicEntity class representation of a D2L Discussion Topic.
 */
export class DiscussionTopicEntity extends Entity {
	/**
	 * @returns {string} the href of the categories the discussion topic could associate to
	 */
	categoriesHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.Discussions.topicCategories)) {
			return;
		}
		return this._entity.getLinkByRel(Rels.Discussions.topicCategories).href;
	}

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

	isAiInspired() {
		return this._entity && this._entity.hasClass(Classes.discussions.aiInspired);
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
		return selected?.value || NONE_RATING_TYPE;
	}

	/**
	 * @returns {object[]} Post rating options of discussion topic.
	 */
	postRatingOptions() {
		if (!this.canUpdateRatingType()) return;

		const action = this._entity.getActionByName(Actions.discussions.topic.updateRatingType);
		const fields = action && action.getFieldByName('ratingType');

		return fields && fields.value;
	}

	/**
	 * @returns {number} participation option of discussion topic.
	 */
	participationSelection() {
		const options = this.participationOptions();
		const selected = options?.find(option => option?.selected);
		return selected?.value;
	}

	/**
	 * @returns {object[]} participation options of discussion topic.
	 */
	participationOptions() {
		if (!this.canUpdateParticipationOption()) return;

		const action = this._entity.getActionByName(Actions.discussions.topic.updateParticipationOption);
		const fields = action && action.getFieldByName('participationType');

		return fields && fields.value;
	}

	/**
	 * @returns {bool} whether the update participation type action is present in the topic entity
	 */
	canUpdateParticipationOption() {
		const entity = this._entity;
		return entity && entity.hasActionByName(Actions.discussions.topic.updateParticipationOption);
	}

	/**
	 * @returns {bool} If the discussion topic requires approval is enabled.
	 */
	requiresApproval() {
		if (!this.canEditRequiresApproval()) {
			return;
		}

		const action = this._entity.getActionByName(Actions.discussions.topic.requiresApproval);
		const fields = action && action.getFieldByName('requiresApproval');

		return fields && fields.value;
	}

	/**
	 * @returns {bool} Whether the discussion topic requires approval action is available to edit.
	 */
	canEditRequiresApproval() {
		const entity = this._entity;
		return entity && entity.hasActionByName(Actions.discussions.topic.requiresApproval);
	}

	/**
	 * Updates the topic's participation option selection
	 * @param {object} topic the topic that's being modified
	 */
	_formatUpdateParticipationOptionAction(topic) {
		const { participationSelection } = topic || {};

		if (!participationSelection || !this.canUpdateParticipationOption()) {
			return;
		}
		if (!this._hasFieldValueChanged(participationSelection, this.participationSelection())) return;

		const action = this._entity.getActionByName(Actions.discussions.topic.updateParticipationOption);
		const fields = [{ name: 'participationType', value: participationSelection }];
		return { action, fields };
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
	 * @summary Formats action and fields if topic has been ai inspired
	 * @param {object} topic the topic that's being modified
	 * @returns {object} the appropriate action/fields to update
	 */
	_formatUpdateAiInspiredAction(topic) {
		const { isAiInspired } = topic || {};

		if (typeof isAiInspired === 'undefined') return;
		if (!this._hasFieldValueChanged(isAiInspired, this.isAiInspired())) return;

		const action = this._entity.getActionByName(Actions.discussions.topic.updateName);
		const fields = [
			{ name: 'aiHumanOrigin', value: isAiInspired ? AI_INSPIRED : HUMAN_GENERATED },
		];

		return { action, fields };
	}

	/**
	 * @summary Formats action and fields if topic 'requires approval' status has changed and user has edit permission
	 * @param {object} topic the topic that's being modified
	 * @returns {object} the appropriate action/fields to update
	 */
	_formatUpdateRequiresApproval(topic) {
		const { requiresApproval } = topic || {};

		if (requiresApproval === undefined || requiresApproval === null) return;
		if (!this._hasFieldValueChanged(requiresApproval, this.requiresApproval())) return;
		if (!this.canEditRequiresApproval()) return;

		const action = this._entity.getActionByName(Actions.discussions.topic.requiresApproval);
		const fields = [{ name: 'requiresApproval', value: requiresApproval }];
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
	 * @returns {bool} whether the update rating type action is present in the topic entity
	 */
	canUpdateRatingType() {
		const entity = this._entity;
		return entity && entity.hasActionByName(Actions.discussions.topic.updateRatingType);
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

		if (!postRatingSelection || !this.canUpdateRatingType()) {
			return;
		}
		if (!this._hasFieldValueChanged(postRatingSelection, this.postRatingSelection())) return;

		const action = this._entity.getActionByName(Actions.discussions.topic.updateRatingType);
		const fields = [{ name: 'ratingType', value: postRatingSelection }];
		return { action, fields };
	}

	/**
	 * @returns {string} name of the parent forum associated with the discussion topic
	 */
	forumName() {
		return this._entity && this._entity.properties && this._entity.properties.forumName;
	}

	/**
	 * @returns {bool} Whether or not the create and associate with forum action is present on the discussion topic entity
	 */
	canCreateAndAssociateWithForum() {
		return this._entity && this._entity.hasActionByName(Actions.discussions.topic.createAndAssociateWithForum);
	}

	/**
	 * @summary Formats action and fields if topic name has changed and user has edit permission
	 * @param {string} forumName the new forum's name
	 * @returns {object} the appropriate action/fields to update
	 */
	_formatCreateAndAssociateWithForumAction(forumName) {
		if (!forumName) return;
		if (!this._hasFieldValueChanged(forumName, this.forumName())) return;
		if (!this.canCreateAndAssociateWithForum()) return;

		const action = this._entity.getActionByName(Actions.discussions.topic.createAndAssociateWithForum);
		const fields = [
			{ name: 'forumName', value: forumName },
		];

		return { action, fields };
	}

	/**
	 * @summary Calls the create and associate with forum action if name is provided and user has create permission
	 * @param {string} name the new forum's name
	 */
	async createAndAssociateWithForum(name) {
		if (!name) return;
		if (!this.canCreateAndAssociateWithForum()) return;

		const sirenAction = this._formatCreateAndAssociateWithForumAction(name);
		if (!sirenAction) return;

		const { action, fields } = sirenAction;
		await performSirenAction(this._token, action, fields);
	}

	/**
	 * @returns {bool} If the topic's course has no groups or sections
	 */
	hasNoGroupsOrSections() {
		if (!this._entity) {
			return false;
		}
		const subEntity = this._entity.getSubEntityByRel(Rels.Discussions.groupSectionRestrictions);
		if (!subEntity) {
			return false;
		}
		return subEntity.hasClass(Classes.discussions.noGroupsOrSections);
	}

	groupSectionRestrictionsHref() {
		if (!this._entity) {
			return false;
		}
		const subEntity = this._entity.getSubEntityByRel(Rels.Discussions.groupSectionRestrictions);
		if (!subEntity) {
			return false;
		}
		return subEntity.href;
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
			[topic.participationSelection, this.participationSelection()],
			[topic.requiresApproval, this.requiresApproval()]
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
		const updateParticipationOption = this._formatUpdateParticipationOptionAction(topic);
		const updateRequiresApproval = this._formatUpdateRequiresApproval(topic);
		const updateIsAiInspired = this._formatUpdateAiInspiredAction(topic);

		const sirenActions = [
			updateNameAction,
			updateDescriptionAction,
			syncDraftWithForum,
			updateRatePostType,
			updateParticipationOption,
			updateRequiresApproval,
			updateIsAiInspired
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
