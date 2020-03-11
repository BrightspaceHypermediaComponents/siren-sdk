import { Entity } from '../es6/Entity.js';
import { Rels } from '../hypermedia-constants';
import { ActivityUsageEntity } from './ActivityUsageEntity.js';
import { performSirenAction } from '../es6/SirenAction.js';

const actions = {
	removeActivity: 'remove-activity',
	moveActivity: 'move-activity'
};

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
		const fields = [{name: 'itemToMoveId', value: itemToMoveId}];
		targetId && fields.push({name: 'targetId', value: targetId});
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
}

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
