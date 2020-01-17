import { SelflessEntity } from '../es6/SelflessEntity.js';
import { Rels } from '../hypermedia-constants';
import { ActivityUsageEntity } from './ActivityUsageEntity.js';
import { performSirenAction } from '../es6/SirenAction';

/**
 * ActionCollection Entity representation of a D2L Action Collection response
 */
export class ActionCollectionEntity extends SelflessEntity {
	_items() {
		if (!this._entity) {
			return;
		}
		return this._entity.getSubEntitiesByRel('item').map(item => {
			const actionItemEntity = new ActionItemEntity(this._sdkParentEntity, item);
			return actionItemEntity;
		});
	}

	items() {
		return this._items();
	}

	getNextAction() {
		return this._entity.getActionByName('next');
	}
	getSearchAction() {
		return this._entity.getActionByName('search');
	}
	getExecuteMultipleAction() {
		return this._entity.getActionByName('execute-multiple');
	}

}

class ActionItemEntity extends SelflessEntity {
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

	async addActionItem() {
		const action = this._entity.actions && this._entity.actions[0];
		if (action) {
			await performSirenAction(this._token, action, null, true);
		}
	}

	getActionState() {
		return this._entity.properties.actionState;
	}
}
