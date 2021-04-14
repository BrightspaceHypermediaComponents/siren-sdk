import { Entity } from '../es6/Entity.js';
import { Classes, Actions } from '../hypermedia-constants.js';
import { performSirenAction } from '../es6/SirenAction.js';

/**
 * CategoriesEntity class representation
 */
export class CategoriesEntity extends Entity {

	/**
	 * @returns {Array} Categories for orgUnit
	*/
	getCategories() {
		if (!this._entity) {
			return;
		}

		return this._entity.getSubEntitiesByClass(Classes.assignments.category);
	}
	/**
	 * @returns {Object} Gets category with a selected id
	*/
	_getCategoryById(categoryId) {
		if (categoryId === undefined) return;

		const categories = this.getCategories();

		if (!categories || !categories.length) return;

		return categories.find(category => Number(categoryId) === category.properties.categoryId);
	}

	/**
	 * @returns {Boolean} Whether or not a user can edit categories
	*/
	canEditCategories() {
		if (!this._entity) {
			return;
		}

		return this._entity.hasActionByName(Actions.assignments.add);
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

	equals(category) {
		const selectedCategory = this.getSelectedCategory();
		if (!selectedCategory) {
			return category.categoryId === selectedCategory;
		}

		return category.categoryId === this.getSelectedCategory().properties.categoryId;
	}

	async save(category) {
		if (!this.canEditCategories()) return;

		const categoryEntity = this._getCategoryById(category.categoryId);

		if (!categoryEntity) return;

		const action = categoryEntity.getActionByName(Actions.assignments.categories.select);
		if (!action) {
			return;
		}

		await performSirenAction(this._token, action);
	}
}
