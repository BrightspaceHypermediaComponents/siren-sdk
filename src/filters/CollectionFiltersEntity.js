import { Entity } from '../es6/Entity.js';
import { Actions, Rels } from '../hypermedia-constants'
import { performSirenAction } from 'siren-sdk/src/es6/SirenAction.js';
import { FilterListEntity } from './FilterListEntity';

/**
 * EnrollmentEntity class representation of a d2l enrollment. TODO ACTUAL
 */
export class CollectionFiltersEntity extends Entity {
	get appliedFiltersAmount() {
		return this._entity.properties.applied.total;
	}

	hasFiltersEntityByClass(filterClass) {
		return this._entity.hasEntityByClass(filterClass);
	}

	getFiltersEntityByClass(filterClass, onChange) {
		const entity = this._entity.getSubEntityByClass(filterClass);
		this._subEntity(FilterListEntity, entity.href, onChange);
	}

	async applyFilters(filter) {
		const action = filter.getActionByName(Actions.filters.apply);
		if (!action) {
			return;
		}
		return await performSirenAction(this._token, action);
	}
}

