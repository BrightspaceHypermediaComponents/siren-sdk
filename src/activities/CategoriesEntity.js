import { Entity } from '../es6/Entity.js';
import { Classes, Actions } from '../hypermedia-constants.js';
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
			selected: category.hasClass(Classes.assignments.selected),
			index
		}));
	}

	/**
	 * @returns {Boolean} Whether or not a user can edit categories
	*/
	canEditCategories() {
		if (!this._entity) {
			return;
		}

		return !!this._entity.getActionByName(Actions.assignments.add);
	}

	/**
	 * @returns {Object} The currently selected category
	*/
	getSelectedCategory() {
		if (!this._entity) {
			return;
		}

		const subEntities = this._entity.getSubEntitiesByClass(Classes.assignments.category);

		let selectedCategory;
		if (subEntities) {
			selectedCategory = subEntities.find(category => category.class.includes(Classes.assignments.selected));
		}

		return selectedCategory;
	}
}
