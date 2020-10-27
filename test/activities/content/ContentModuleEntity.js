/* global fetchMock */

import { ContentModuleEntity } from '../../../src/activities/content/ContentModuleEntity.js';
import { contentModuleData } from './data/TestContentModuleEntity.js';
import { getFormData } from '../../utility/test-helpers.js';

describe('ContentModuleEntity', () => {
	let moduleData;
	let contentModuleEntity;

	beforeEach(() => {
		moduleData = window.D2L.Hypermedia.Siren.Parse(contentModuleData);
		contentModuleEntity = new ContentModuleEntity(moduleData);
	});

	afterEach(() => {
		fetchMock.reset();
	});

	describe('Reads properties', () => {
		it('reads title', () => {
			expect(contentModuleEntity.title()).to.equal('Test Content Module Title');
		});

		it('reads rich text description', () => {
			expect(contentModuleEntity.descriptionRichText()).to.equal('<p>description text</p>');
		});

		it('reads text description', () => {
			expect(contentModuleEntity.descriptionText()).to.equal('description text');
		});
	});

	describe('Equality tests', () => {
		it('Equality should return true when details match', () => {
			const contentModule = {
				title: 'Test Content Module Title',
				descriptionRichText: '<p>description text</p>'
			};
			expect(contentModuleEntity.equals(contentModule)).to.equal(true);
		});

		it('Equality should return false when title is different', () => {
			const contentModule = {
				title: 'Different Content Module Title',
				descriptionRichText: '<p>description text</p>'
			};
			expect(contentModuleEntity.equals(contentModule)).to.equal(false);
		});

		it('Equality should return false when description is different', () => {
			const contentModule = {
				title: 'Test Content Module Title',
				descriptionRichText: '<p>Different description text</p>'
			};
			expect(contentModuleEntity.equals(contentModule)).to.equal(false);
		});
	});

	describe('Saves', () => {
		it('saves title', async() => {
			fetchMock.patchOnce('https://fake-tenant-id.modules.api.proddev.d2l/6613/modules/12345', moduleData);

			await contentModuleEntity.setModuleTitle('New Title');

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('title')).to.equal('New Title');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('saves description', async() => {
			fetchMock.patchOnce('https://fake-tenant-id.modules.api.proddev.d2l/6613/modules/12345', moduleData);

			await contentModuleEntity.setModuleDescription('<p>New description</p>');

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('description')).to.equal('<p>New description</p>');
			}
			expect(fetchMock.called()).to.be.true;
		});
	});
});
