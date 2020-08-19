import { Entity } from '../es6/Entity.js';
import { Actions } from '../hypermedia-constants'
import { performSirenAction } from 'siren-sdk/src/es6/SirenAction.js';

/**
 * EnrollmentEntity class representation of a d2l enrollment. TODO ACTUAL
 */
export class FilterEntity extends Entity {
	filterIsApplied(filter) {
		return this._entity.class.includes('on');
	}

	async toggleFilter() {
		return this.filterIsApplied()
			? await this.removeFilter()
			: await this.addFilter();
	}

	async addFilter() {
		const action = this._entity.getActionByName(Actions.filters.addFilter);
		if (!action) {
			return;
		}
		return new FilterEntity(await performSirenAction(this._token, action), this._token, () => {});
	}

	async removeFilter() {
		const action = this._entity.getActionByName(Actions.filters.removeFilter);
		if (!action) {
			return;
		}
		return new FilterEntity(await performSirenAction(this._token, action), this._token, () => {});
	}

	async applyFilters() {
		const action = this._entity.getActionByName(Actions.filters.applyFilters);
		if (!action) {
			return;
		}
		return await performSirenAction(this._token, action);
	}

	get id() {
		return this._entity.properties.id;
	}
}
