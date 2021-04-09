import { Entity } from '../es6/Entity';
import { Classes } from '../hypermedia-constants.js';
// import { performSirenAction } from '../es6/SirenAction';

/**
 * CategoriesEntity class representation of an attachment (link or file)
 */
export class CategoriesEntity extends Entity {

	/**
	 * @returns {Array} Categories for orgUnit
	*/
	getCategories() {
		if (!this._entity) {
			return;
		}

		return this._entity.getSubEntitiesByClass(Classes.assignments.category).map((category, index) => ({
			name: category.properties.name,
			selected: category.hasClass('selected'),
			index
		}));
	}
}
