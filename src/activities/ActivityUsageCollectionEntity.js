import { Actions, Rels } from '../hypermedia-constants.js';
import { ActivityUsageEntity } from './ActivityUsageEntity.js';
import { Entity } from '../es6/Entity.js';
import { performSirenAction } from '../es6/SirenAction.js';

const actions = {
	removeActivity: 'remove-activity',
	moveActivity: 'move-activity'
};

class CollectedItemEntity extends Entity {
	id() {
		return this._entity && this._entity.properties && this._entity.properties.id;
	}

	activityUsageHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.Activities.activityUsage)) {
			return;
		}
		return this._entity.getLinkByRel(Rels.Activities.activityUsage).href;
	}

	onActivityUsageChange(onChange) {
		const activityUsageHref = this.activityUsageHref();
		activityUsageHref && this._subEntity(ActivityUsageEntity, activityUsageHref, onChange);
	}
}

/**
 * ActivityUsageCollectionEntity class representation of a d2l activity usage collection.
 */
export class ActivityUsageCollectionEntity extends Entity {
	_items() {
		if (!this._entity) {
			return;
		}
		return this._entity.getSubEntitiesByRel('item');
	}

	onItemsChange(onChange) {
		const items = this._items();

		items.forEach((entity, index) => {
			const onChangeWithIndex = collectedItem => {
				onChange(collectedItem, index);
			};
			entity && this._subEntity(CollectedItemEntity, entity, onChangeWithIndex);
		});
	}

	async moveItem(itemToMoveId, targetId) {
		const action = this.getActionByName(actions.moveActivity);
		const fields = [{ name: 'itemToMoveId', value: itemToMoveId }];
		targetId && fields.push({ name: 'targetId', value: targetId });
		await performSirenAction(this._token, action, fields);
	}

	removeItem(href) {
		const newEntityList = [];
		this._entity.entities.forEach((entity) => {
			if (href === entity.getLinkByRel('self').href) {
				const action = entity.getActionByName(actions.removeActivity);
				performSirenAction(this._token, action);
			} else {
				newEntityList.push(entity);
			}
		});
		this._entity.entities = newEntityList;
		this.update(this._entity);
	}

	/*
	 * @returns {String} Gets selected paging type's string id
	*/
	getSelectedPagingType() {
		const pagingTypeOptions = this.getPagingTypeOptions();

		if (!pagingTypeOptions) return;

		const selectedOption = pagingTypeOptions.find(option => option.selected);

		return selectedOption && selectedOption.value;
	}

	/*
	 * @returns {Array} Gets all available paging type objects
	*/
	getPagingTypeOptions() {
		const entity = this._entity;

		if (!entity) return;

		const action = this._getSetCollectionPagingAction();
		const fields = action && action.getFieldByName('pagingType');

		return fields && fields.value;
	}

	/*
	 * @returns {Boolean} Whether or not a user can edit paging type
	*/
	canUpdatePagingType() {
		if (!this._entity) {
			return;
		}

		return this._entity.hasActionByName(Actions.activities.activityUsageCollection.setCollectionPaging);
	}

	equals(activityUsageCollection) {
		const initialSelectedPagingType = this.getSelectedPagingType();
		const { selectedPagingType : currentSelectedPagingType } = activityUsageCollection;
		return currentSelectedPagingType === initialSelectedPagingType;
	}

	_getSetCollectionPagingAction() {
		return this.canUpdatePagingType() && this._entity.getActionByName(Actions.activities.activityUsageCollection.setCollectionPaging);
	}

	async save(activityUsageCollection) {
		if (!this.canUpdatePagingType() || !activityUsageCollection) return;

		const initialSelectedPagingType = this.getSelectedPagingType();
		const { selectedPagingType : currentSelectedPagingType } = activityUsageCollection;
		if (currentSelectedPagingType !== initialSelectedPagingType) {
			const setCollectionPagingAction = this._getSetCollectionPagingAction();

			if (!setCollectionPagingAction) return;

			const fields = [
				{ name: 'pagingType', value: currentSelectedPagingType }
			];

			return await performSirenAction(this._token, setCollectionPagingAction, fields);
		}
	}
}
