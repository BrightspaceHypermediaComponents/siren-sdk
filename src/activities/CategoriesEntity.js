import { Actions, Classes } from '../hypermedia-constants.js';
import { Entity } from '../es6/Entity.js';
import { performSirenAction } from '../es6/SirenAction.js';

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

		return this._entity.getSubEntitiesByClass(Classes.activities.category);
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

		return this._entity.hasActionByName(Actions.activities.add);
	}

	/**
	 * @returns {Boolean} Whether or not a user can edit categories
	*/
	canEditCategories() {
		if (!this._entity) {
			return;
		}

		return this._entity.hasClass(Classes.activities.collection);
	}

	/**
	 * @returns {Object} The currently selected category
	*/
	getSelectedCategory() {
		if (!this._entity) {
			return;
		}

		const subEntities = this._entity.getSubEntitiesByClass(Classes.activities.category);

		let selectedCategory;
		if (subEntities) {
			selectedCategory = subEntities.find(category => category.class.includes(Classes.activities.selected));
		}

		return selectedCategory;
	}

	getSelectedCategoryName() {
		if (!this._entity) {
			return;
		}

		return this._entity.properties.selectedCategory;
	}

	equals(category) {
		const selectedCategory = this.getSelectedCategory();
		if (!selectedCategory) {
			return category.categoryId === selectedCategory;
		}

		return Number(category.categoryId) === Number(selectedCategory.properties.categoryId);
	}

	getSelectedCategoryHref(categoryId) {
		if (!this._entity) {
			return;
		}

		const subEntities = this._entity.getSubEntitiesByClass(Classes.activities.category);

		let selectedCategory;
		if (subEntities) {
			selectedCategory = subEntities.find(category => Number(category.properties.categoryId) === categoryId);
		}

		if (!selectedCategory) return;

		let action = selectedCategory.getActionByName(Actions.activities.categories.deselect);
		if (!action) action = selectedCategory.getActionByName(Actions.activities.categories.select);
		if (!action) return;

		const { href } = action;

		return href;
	}

	_generateDeselectCategoryAction() {
		if (!this.canEditCategories()) return;

		const selectedCategory = this.getSelectedCategory();
		if (!selectedCategory) return;

		const action = selectedCategory.getActionByName(Actions.activities.categories.deselect);

		return { action };
	}

	_generateNewCategoryAction(categoryName) {
		if (!this.canAddCategories()) return;

		const newCategoryAction = this._entity.getActionByName(Actions.activities.categories.add);
		if (!newCategoryAction) return;
		const currentFields = newCategoryAction.getFieldByName('categoryName');
		currentFields.value = categoryName;

		return { action: newCategoryAction, fields: [currentFields] };
	}

	_generateSelectCategoryAction(category) {
		if (!this.canEditCategories()) return;

		const categoryEntity = this._getCategoryById(category.categoryId);
		const selectCategoryAction = categoryEntity && categoryEntity.getActionByName(Actions.activities.categories.select);

		if (selectCategoryAction) {
			return { action: selectCategoryAction };
		}
	}

	_generateDeletePreviousAndAssociateWithNewCategory(category, shouldDeletePreviousCategory) {
		const categoryEntity = this._getCategoryById(category.categoryId);
		if (!categoryEntity) return;

		const action = shouldDeletePreviousCategory && categoryEntity.getActionByName(Actions.activities.categories.deletePreviousAndAssociateWithNewCategory);
		if (!action) return;
		const fields = [
			{ name: 'deletePreviousCategory', value: shouldDeletePreviousCategory }
		];

		return { action, fields };
	}

	_hasCategoryIdChanged(categoryId) {
		const selectedCategory = this.getSelectedCategory();
		const initialId = selectedCategory && selectedCategory.properties.categoryId;

		return categoryId !== initialId;
	}

	async save(category, shouldDeletePreviousCategory = false) {
		const hasCategoryIdChanged = category.categoryId && this._hasCategoryIdChanged(category.categoryId);

		if (hasCategoryIdChanged && category.categoryId !== UNSET_CATEGORY_ID) {
			const { action, fields } = shouldDeletePreviousCategory
				? this._generateDeletePreviousAndAssociateWithNewCategory(category, shouldDeletePreviousCategory) || {}
				: this._generateSelectCategoryAction(category) || {};

			return action && await performSirenAction(this._token, action, fields);
		}

		if (hasCategoryIdChanged && category.categoryId === UNSET_CATEGORY_ID) {
			const { action, fields } = this._generateDeselectCategoryAction(category) || {};

			return action && await performSirenAction(this._token, action, fields);
		}

		if (category.categoryName) {
			const { action, fields } = this._generateNewCategoryAction(category.categoryName) || {};

			return action && await performSirenAction(this._token, action, fields);
		}
	}
}
