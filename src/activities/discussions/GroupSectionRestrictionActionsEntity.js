import { Actions, Classes } from '../../hypermedia-constants.js';
import { Entity } from '../../es6/Entity.js';
import { performSirenAction } from '../../es6/SirenAction.js';
import { RestrictedTopicCollectionEntity } from './RestrictedTopicCollectionEntity.js';

export class GroupSectionRestrictionActionsEntity extends Entity {
	canSetToRestrictedTopic() {
		if (!this._entity) return;
		return this._entity.hasActionByName(Actions.discussions.groupSectionRestrictions.setToRestrictedTopic);
	}
	canSetToRestrictedThreads() {
		if (!this._entity) return;
		return this._entity.hasActionByName(Actions.discussions.groupSectionRestrictions.setToRestrictedThreads);
	}
	setToRestrictedTopic() {
		if (!this._entity) return;

		const action = this._entity.getActionByName(Actions.discussions.groupSectionRestrictions.setToRestrictedTopic);
		if (!action) return;

		performSirenAction(this._token, action);
	}
	setToRestrictedThreads(groupTypeId) {
		if (!this._entity) return;

		const action = this._entity.getActionByName(Actions.discussions.groupSectionRestrictions.setToRestrictedThreads);
		if (!action) return;

		const fields = [
			{ name: 'groupTypeId', value: groupTypeId }
		];

		performSirenAction(this._token, action, fields);
	}
	restrictedThreadCategories() {
		if (!this._entity) return;

		const action = this._entity.getActionByName(Actions.discussions.groupSectionRestrictions.setToRestrictedThreads);
		if (!action) return;

		const fields = action.getFieldByName('groupTypeId');
		return fields && fields.value;

	}
	restrictedTopicCollection() {
		if (!this._entity) return null;

		const subEntity = this._entity.getSubEntityByClass(Classes.discussions.restrictedTopic);
		if (!subEntity) {
			return null;
		}
		return new RestrictedTopicCollectionEntity(subEntity);
	}
	canToggleGroupsRestrictedTopic() {
		if (!this._entity) return null;
		const subEntity = this._entity.getSubEntityByClass(Classes.discussions.restrictedTopic);
		return subEntity && subEntity.hasActionByName(Actions.discussions.groupSectionRestrictions.toggleGroupsRestrictedTopic);
	}
	_formatToggleGroupsRestrictedTopicAction(toggleGroupIds) {
		if (!toggleGroupIds) return;
		if (!this.canToggleGroupsRestrictedTopic()) return;
		const subEntity = this._entity.getSubEntityByClass(Classes.discussions.restrictedTopic);
		const action = subEntity.getActionByName(Actions.discussions.groupSectionRestrictions.toggleGroupsRestrictedTopic);
		const fields = toggleGroupIds.map(id => {
			return { name: 'toggleGroupIds', value: id };
		});

		return { action, fields };
	}
	_restrictedTopicToggle(selectedIds) {
		const outputToggle = [];
		const oldRestrictedTopicCollection = this.restrictedTopicCollection().getRestrictedTopics();
		if (!oldRestrictedTopicCollection) return;

		const newRestrictedTopicMap = {};
		selectedIds.forEach(ids => {
			newRestrictedTopicMap[ids] = ids;
		});

		oldRestrictedTopicCollection.forEach(oldTopic => {
			const oldTopicId = oldTopic.id();
			const newIsSelected = newRestrictedTopicMap[oldTopicId] !== undefined;
			if (oldTopic.isSelected() !== newIsSelected) {
				outputToggle.push(oldTopicId);
			}
		});

		return outputToggle;
	}

	async toggleGroupsRestrictedTopic(selectedIds) {
		if (!selectedIds) return;
		if (!this.canToggleGroupsRestrictedTopic()) return;

		const toggleGroupIds = this._restrictedTopicToggle(selectedIds);

		const sirenAction = this._formatToggleGroupsRestrictedTopicAction(toggleGroupIds);
		if (!sirenAction) return;

		const { action, fields } = sirenAction;

		performSirenAction(this._token, action, fields);
	}
}
