import { Entity } from '../es6/Entity.js';
import { Actions, Rels } from '../hypermedia-constants'
import { performSirenAction } from 'siren-sdk/src/es6/SirenAction.js';
import { FilterListEntity } from './filters';

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

	async getFiltersEntityByClass(filterClass) {
		const entity = this._entity.getSubEntityByClass(filterClass);
		let entityFetched = false;
		const entityPromise = new Promise((resolve, reject) => {
			this._subEntity(FilterListEntity, entity.href, (filterListEntity, error) => {
				if (entityFetched) { return }
				if (error) { reject(error); }
				entityFetched = true;
				resolve(filterListEntity);
			})
		});

		const x = await entityPromise;
		console.log('LLLLLLLLentityLLLLLLLL', entity, x);
		return x;
	}

	async applyFilters(filter) {
		const action = filter.getActionByName('apply');
		if (!action) {
			return;
		}
		console.log('ACTION', action)
		return await performSirenAction(this._token, action);
	}
}
