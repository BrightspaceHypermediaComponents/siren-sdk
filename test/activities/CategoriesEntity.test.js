import { CategoriesEntity } from '../../src/activities/CategoriesEntity.js';
import { editableCategories } from './data/EditableCategories.js';
import { emptyCategories } from './data/EmptyCategories.js';
import { expect } from '@open-wc/testing';
import fetchMock from 'fetch-mock/esm/client.js';
import { getFormData } from '../utility/test-helpers.js';
import { nonEditableCategories } from './data/NonEdtiableCategories.js';
import { nonSelectedCategories } from './data/NonSelectedCategories.js';
import SirenParse from 'siren-parser';

const expectedCategory = {
	'rel':['item'],
	'properties':{ 'name':'category1', 'categoryId': '123' },
	'class':['category', 'selected'],
	'actions':[{ 'name':'select',
		'href':'https://afe99802-9130-4320-a770-8d138b941e74.assignments.api.proddev.d2l/6606/folders/13',
		'method':'PATCH',
		'type':'application/x-www-form-urlencoded',
		'fields':[{ 'name':'categoryId', 'type':'hidden', 'value':'123' }] }]
};

describe('CategoriesEntity', () => {
	let editableEntity, nonEditableEntity, emptyEntity, missingSelectedEntity;

	beforeEach(() => {
		nonEditableEntity = SirenParse(nonEditableCategories);
		editableEntity = SirenParse(editableCategories);
		emptyEntity = SirenParse(emptyCategories);
		missingSelectedEntity = SirenParse(nonSelectedCategories);
	});

	afterEach(() => {
		fetchMock.reset();
	});

	describe('Categories', () => {
		it('GetsCategories', () => {
			const categoriesEntity = new CategoriesEntity(editableEntity);
			const categories = categoriesEntity.getCategories();

			expect(Array.isArray(categories)).to.be.true;
			expect(categories.length).to.equal(3);

			const { stringify } = JSON;
			expect(stringify(categories[0])).to.equal(stringify(expectedCategory));
		});

		it('GetsCategoriesWhenNonePresent', () => {
			const categoriesEntity = new CategoriesEntity(emptyEntity);
			const categories = categoriesEntity.getCategories();

			expect(Array.isArray(categories)).to.be.true;
			expect(categories.length).to.equal(0);
		});

		it('GetsSelectedCategoriesWhenPresent', () => {
			const categoriesEntity = new CategoriesEntity(editableEntity);

			const selected = categoriesEntity.getSelectedCategory();

			expect(selected.properties.name).to.equal(expectedCategory.properties.name);
			expect(selected.class.includes('selected')).to.be.true;
		});

		it('GetsSelectedCategoriesWhenNotPresent', () => {
			const categoriesEntity = new CategoriesEntity(missingSelectedEntity);
			const selected = categoriesEntity.getSelectedCategory();

			expect(selected).to.be.undefined;
		});

		it('GetsSelectedCategoriesWithNoActions', () => {
			const categoriesEntity = new CategoriesEntity(nonEditableEntity);
			const selected = categoriesEntity.getSelectedCategory();

			expect(selected.properties.name).to.equal(expectedCategory.properties.name);
			expect(selected.class.includes('selected')).to.be.true;
		});
	});

	describe('Editable', () => {
		it('sets canEditCategories to true', () => {
			const categoriesEntity = new CategoriesEntity(editableEntity);

			const res = categoriesEntity.canEditCategories();
			expect(res).to.be.true;
		});
	});

	describe('non editable', () => {
		it('sets canEditCategories to false', () => {
			const categoriesEntity = new CategoriesEntity(nonEditableEntity);

			const res = categoriesEntity.canEditCategories();
			expect(res).to.be.false;
		});
	});

	describe('Can add', () => {
		it('sets canAddCategories to true', () => {
			const categoriesEntity = new CategoriesEntity(editableEntity);

			const res = categoriesEntity.canAddCategories();
			expect(res).to.be.true;
		});
	});

	describe('Cannot add', () => {
		it('sets canAddCategories to false', () => {
			const categoriesEntity = new CategoriesEntity(nonEditableEntity);

			const res = categoriesEntity.canAddCategories();
			expect(res).to.be.false;
		});
	});

	describe('equals', () => {
		it('returns true when equal', () => {
			const categoriesEntity = new CategoriesEntity(editableEntity);

			const res = categoriesEntity.equals({ categoryId: '123' });
			expect(res).to.be.true;
		});

		it('returns false when not equal', () => {
			const categoriesEntity = new CategoriesEntity(editableEntity);

			const res = categoriesEntity.equals({ categoryId: 'nonsense' });
			expect(res).to.be.false;
		});

		it('handles case with no selected category', () => {
			const categoriesEntity = new CategoriesEntity(missingSelectedEntity);

			const res = categoriesEntity.equals({ categoryId: '123' });
			expect(res).to.be.false;
		});
	});

	describe('Saves', () => {
		it('saves categoryId', async() => {
			await fetchMock.patchOnce('https://afe99802-9130-4320-a770-8d138b941e74.assignments.api.proddev.d2l/6606/folders/13', editableEntity);

			const categoriesEntity = new CategoriesEntity(editableEntity);

			await categoriesEntity.save({
				categoryId: '456',
			});
			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('categoryId')).to.equal('456');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('saves name', async() => {
			await fetchMock.postOnce('https://afe99802-9130-4320-a770-8d138b941e74.assignments.api.proddev.d2l/6606/folders/13/categories', editableEntity);

			const categoriesEntity = new CategoriesEntity(editableEntity);

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
			const categoriesEntity = new CategoriesEntity(nonEditableEntity);

			await categoriesEntity.save({
				categoryId: '123'
			});

			expect(fetchMock.done());
		});
	});
});
