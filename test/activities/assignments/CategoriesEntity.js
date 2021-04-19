/* global fetchMock */

import { CategoriesEntity } from '../../../src/activities/assignments/CategoriesEntity.js';
import { nonEditableCategories } from './data/NonEdtiableCategories.js';
import { editableCategories } from './data/EditableCategories.js';
import { emptyCategories } from './data/EmptyCategories.js';
import { nonSelectedCategories } from './data/NonSelectedCategories';
import { getFormData } from '../../utility/test-helpers.js';

const expectedCategory = {
	'rel':['item'],
	'properties':{'name':'category1', 'categoryId': '123'},
	'class':['category', 'selected'],
	'actions':[{'name':'select',
		'href':'https://afe99802-9130-4320-a770-8d138b941e74.assignments.api.proddev.d2l/6606/folders/13',
		'method':'PATCH',
		'type':'application/x-www-form-urlencoded',
		'fields':[{'name':'categoryId', 'type':'hidden', 'value':'123'}]}]
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

			expect(selected.properties.name).to.equal(expectedCategory.properties.name);
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

			expect(selected.properties.name).to.equal(expectedCategory.properties.name);
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

	describe('equals', () => {
		it('returns true when equal', () => {
			var categoriesEntity = new CategoriesEntity(editableEntity);

			const res = categoriesEntity.equals({ categoryId: '123' });
			expect(res).to.be.true;
		});

		it('returns false when not equal', () => {
			var categoriesEntity = new CategoriesEntity(editableEntity);

			const res = categoriesEntity.equals({ categoryId: 'nonsense' });
			expect(res).to.be.false;
		});

		it('handles case with no selected category', () => {
			var categoriesEntity = new CategoriesEntity(missingSelectedEntity);

			const res = categoriesEntity.equals({ categoryId: '123' });
			expect(res).to.be.false;
		});
	});

	describe('Saves', () => {
		it('saves categoryId', async() => {
			await fetchMock.patchOnce('https://afe99802-9130-4320-a770-8d138b941e74.assignments.api.proddev.d2l/6606/folders/13', editableEntity);

			var categoriesEntity = new CategoriesEntity(editableEntity);

			await categoriesEntity.save({
				categoryId: '123',
			});
			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('categoryId')).to.equal('123');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('saves name', async() => {
			await fetchMock.postOnce('https://afe99802-9130-4320-a770-8d138b941e74.assignments.api.proddev.d2l/6606/folders/13/categories', editableEntity);

			var categoriesEntity = new CategoriesEntity(editableEntity);

			await categoriesEntity.save({
				categoryName: 'Murphys Law',
			});
			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('categoryName')).to.equal('Murphys Law');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('skips save if not editable', async() => {
			var categoriesEntity = new CategoriesEntity(nonEditableEntity);

			await categoriesEntity.save({
				categoryId: '123'
			});

			expect(fetchMock.done());
		});
	});
});
