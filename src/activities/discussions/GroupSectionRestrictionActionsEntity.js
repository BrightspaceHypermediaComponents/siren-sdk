import { Actions } from '../../hypermedia-constants.js';
import { Entity } from '../../es6/Entity.js';
import { performSirenAction } from '../../es6/SirenAction.js';

export class GroupSectionRestrictionActionsEntity extends Entity {
	canSetToRestrictedTopic() {
		if (!this._entity) return;
		return !this._entity.hasActionByName(Actions.discussions.groupSectionRestrictions.setToRestrictedTopic);
	}
	canSetToRestrictedThreads() {
		if (!this._entity) return;
		return !this._entity.hasActionByName(Actions.discussions.groupSectionRestrictions.setToRestrictedThreads);
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
}
