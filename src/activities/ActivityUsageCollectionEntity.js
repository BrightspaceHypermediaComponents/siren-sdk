'use strict';

import { Entity } from '../es6/Entity.js';
import { Rels } from '../hypermedia-constants';
import { ActivityUsageEntity } from './ActivityUsageEntity.js';
import { performSirenAction } from '../es6/SirenAction.js';

const actions = {
	removeActivity: 'remove-activity'
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

	removeItem(href) {
		const newEntityList = [];
		this._entity.entities.forEach((entity) => {
			if (href === entity.getLinkByRel('self').href) {
				const action = entity.getActionByName(actions.removeActivity);
				performSirenAction(this._token, action).then((response) => {
					this.update(response);
				});
			} else {
				newEntityList.push(entity);
			}
		});
		this._entity.entities = newEntityList;
		this.update(this._entity);
	}
}

class CollectedItemEntity extends Entity {
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
