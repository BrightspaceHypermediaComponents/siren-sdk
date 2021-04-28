import { Entity } from '../../es6/Entity.js';
import { Classes, Actions } from '../../hypermedia-constants.js';
import { performSirenAction } from '../../es6/SirenAction.js';

const UNSET_CATEGORY_ID = '0';

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

		return categories.find(category => Number(categoryId) === Number(category.properties.categoryId));
	}

	/**
	 * @returns {Boolean} Whether or not a user can add categories
	*/
	canAddCategories() {
		if (!this._entity) {
			return;
		}

		return this._entity.hasActionByName(Actions.assignments.add);
	}

	/**
	 * @returns {Boolean} Whether or not a user can edit categories
	*/
	canEditCategories() {
		const categories = this.getCategories();
		if (!categories || !categories.length) {
			return;
		}

		return categories[0].hasActionByName(Actions.assignments.categories.select);
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

		return category.categoryId === selectedCategory.properties.categoryId;
	}

	_generateDeselectCategoryAction() {
		const selectedCategory = this.getSelectedCategory();
		if (!selectedCategory) return;

		const action = selectedCategory.getActionByName(Actions.assignments.categories.deselect);

		return { action };
	}

	_generateNewCategoryAction(categoryName) {
		const newCategoryAction = this._entity.getActionByName(Actions.assignments.categories.add);
		if (!newCategoryAction) return;
		const currentFields = newCategoryAction.getFieldByName('categoryName');
		currentFields.value = categoryName;

		return { action: newCategoryAction, fields: [currentFields] };
	}

	_generateSelectCategoryAction(category) {
		const categoryEntity = this._getCategoryById(category.categoryId);
		const selectCategoryAction = categoryEntity && categoryEntity.getActionByName(Actions.assignments.categories.select);

		if (selectCategoryAction) {
			return { action: selectCategoryAction };
		}
	}

	async save(category) {
		if (!this.canEditCategories()) return;

		if (category.categoryId && category.categoryId !== UNSET_CATEGORY_ID) {
			const { action, fields } = this._generateSelectCategoryAction(category);
			return await performSirenAction(this._token, action, fields);
		}

		if (category.categoryId && category.categoryId === UNSET_CATEGORY_ID) {
			const { action, fields } = this._generateDeselectCategoryAction();
			return await performSirenAction(this._token, action, fields);
		}

		if (category.categoryName) {
			const { action, fields } = this._generateNewCategoryAction(category.categoryName);
			return await performSirenAction(this._token, action, fields);
		}
	}
}
