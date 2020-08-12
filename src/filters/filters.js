import { Entity } from '../es6/Entity.js';
import { FilterEntity } from './filter';

/**
 * EnrollmentEntity class representation of a d2l enrollment. TODO ACTUAL
 */
export class FilterListEntity extends Entity {
	getFilterByTitle(title) {
		if(!this._entity.entities || !title) {
			return;
		}

		for (const filter of this._entity.entities) {
			if (filter.title.toLowerCase() === title.toLowerCase()) {
				return new FilterEntity(filter, this._token, () => {});
			}
		}
	}
}
