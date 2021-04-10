/* global fetchMock */

import { CategoriesEntity } from '../../src/activities/CategoriesEntity.js';
import { nonEditableCategories } from './data/NonEdtiableCategories.js';
import { editableCategories } from './data/EditableCategories.js';
import { emptyCategories } from './data/EmptyCategories.js';
import { nonSelectedCategories } from './data/NonSelectedCategories';

const expectedCategory = {
	name: 'category1',
	selected: true,
	index: 0,
};

describe('CategoriesEntity', () => {
	var editableEntity, nonEditableEntity, emptyEntity, missingSelectedEntity;

	beforeEach(() => {
		nonEditableEntity = window.D2L.Hypermedia.Siren.Parse(nonEditableCategories);
		editableEntity = window.D2L.Hypermedia.Siren.Parse(editableCategories);
		emptyEntity = window.D2L.Hypermedia.Siren.Parse(emptyCategories);
		missingSelectedEntity = window.D2L.Hypermedia.Siren.Parse(nonSelectedCategories);
	});

	afterEach(() => {
		fetchMock.reset();
	});

	describe('Categories', () => {
		it('GetsCategories', () => {
			var categoriesEntity = new CategoriesEntity(editableEntity);
			const categories = categoriesEntity.getCategories();

			expect(Array.isArray(categories)).to.be.true;
			expect(categories.length).to.equal(3);

			const { stringify } = JSON;
			expect(stringify(categories[0])).to.equal(stringify(expectedCategory));
		});

		it('GetsCategoriesWhenNonePresent', () => {
			var categoriesEntity = new CategoriesEntity(emptyEntity);
			const categories = categoriesEntity.getCategories();

			expect(Array.isArray(categories)).to.be.true;
			expect(categories.length).to.equal(0);
		});

		it('GetsSelectedCategoriesWhenPresent', () => {
			var categoriesEntity = new CategoriesEntity(editableEntity);

			const selected = categoriesEntity.getSelectedCategory();

			expect(selected.properties.name).to.equal(expectedCategory.name);
			expect(selected.class.includes('selected')).to.be.true;
		});

		it('GetsSelectedCategoriesWhenNotPresent', () => {
			var categoriesEntity = new CategoriesEntity(missingSelectedEntity);
			const selected = categoriesEntity.getSelectedCategory();

			expect(selected).to.be.undefined;
		});

		it('GetsSelectedCategoriesWithNoActions', () => {
			var categoriesEntity = new CategoriesEntity(nonEditableEntity);
			const selected = categoriesEntity.getSelectedCategory();

			expect(selected.properties.name).to.equal(expectedCategory.name);
			expect(selected.class.includes('selected')).to.be.true;
		});
	});

	describe('Editable', () => {
		it('sets canEditCategories to true', () => {
			var categoriesEntity = new CategoriesEntity(editableEntity);

			const res = categoriesEntity.canEditCategories();
			expect(res).to.be.true;
		});
	});

	describe('non editable', () => {
		it('sets canEditCategories to false', () => {
			var categoriesEntity = new CategoriesEntity(nonEditableEntity);

			const res = categoriesEntity.canEditCategories();
			expect(res).to.be.false;
		});
	});
});
