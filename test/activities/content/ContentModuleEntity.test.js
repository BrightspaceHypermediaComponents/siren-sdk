import { contentModuleData } from './data/TestContentModuleEntity.js';
import { ContentModuleEntity } from '../../../src/activities/content/ContentModuleEntity.js';
import { expect } from '@open-wc/testing';
import fetchMock from 'fetch-mock/esm/client.js';
import { getFormData } from '../../utility/test-helpers.js';
import SirenParse from 'siren-parser';

describe('ContentModuleEntity', () => {
	let moduleData;
	let contentModuleEntity;

	beforeEach(() => {
		moduleData = SirenParse(contentModuleData);
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

		it('reads depth', () => {
			expect(contentModuleEntity.depth()).to.equal(8675309);
		});

		it('reads custom accent color', () => {
			expect(contentModuleEntity.customAccentColor()).to.equal('FF0000');
		});

		it('reads org unit id', () => {
			expect(contentModuleEntity.orgUnitId()).to.equal('6613');
		});

		it('reads module id', () => {
			expect(contentModuleEntity.moduleId()).to.equal('12345');
		});

		it('reads generate module summary url', () => {
			expect(contentModuleEntity.generateSummaryEndpoint()).to.equal('https://fake-tenant-id.modules.api.proddev.d2l/6613/modules/12345/summary');
		});

		it('reads lores endpoint url', () => {
			expect(contentModuleEntity.loresEndpoint()).to.equal('https://dev-lores.fake.com/');
		});

		it('reads ai inspired', () => {
			expect(contentModuleEntity.isAiInspired()).to.equal(true);
		});

		it('reads ai human origin', () => {
			expect(contentModuleEntity.aiHumanOrigin()).to.equal(0);
		});
	});

	describe('Equality tests', () => {
		it('Equality should return true when details match', () => {
			const contentModule = {
				title: 'Test Content Module Title',
				descriptionRichText: '<p>description text</p>',
				rawDescriptionRichText: '<p>description text</p>',
				depth: 8675309,
				customAccentColor: 'FF0000',
				aiHumanOrigin: 0
			};
			expect(contentModuleEntity.equals(contentModule)).to.equal(true);
		});

		it('Equality should return false when title is different', () => {
			const contentModule = {
				title: 'Different Content Module Title',
				descriptionRichText: '<p>description text</p>',
				rawDescriptionRichText: '<p>description text</p>',
				depth: 8675309,
				customAccentColor: 'FF0000',
				aiHumanOrigin: 0
			};
			expect(contentModuleEntity.equals(contentModule)).to.equal(false);
		});

		it('Equality should return false when description is different', () => {
			const contentModule = {
				title: 'Test Content Module Title',
				descriptionRichText: '<p>Different description text</p>',
				rawDescriptionRichText: '<p>description text</p>',
				depth: 8675309,
				customAccentColor: 'FF0000',
				aiHumanOrigin: 0
			};
			expect(contentModuleEntity.equals(contentModule)).to.equal(false);
		});

		it('Equality should return false when depth is different', () => {
			const contentModule = {
				title: 'Test Content Module Title',
				descriptionRichText: '<p>description text</p>',
				rawDescriptionRichText: '<p>description text</p>',
				depth: 1,
				customAccentColor: 'FF0000',
				aiHumanOrigin: 0
			};
			expect(contentModuleEntity.equals(contentModule)).to.equal(false);
		});

		it('Equality should return false when custom accent color is different', () => {
			const contentModule = {
				title: 'Test Content Module Title',
				descriptionRichText: '<p>description text</p>',
				rawDescriptionRichText: '<p>description text</p>',
				depth: 1,
				customAccentColor: 'AAAAAA',
				aiHumanOrigin: 0
			};
			expect(contentModuleEntity.equals(contentModule)).to.equal(false);
		});
	});

	describe('Actions', () => {
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

		it('performs delete request', async() => {
			fetchMock.deleteOnce('https://fake-tenant-id.modules.api.proddev.d2l/6613/modules/12345', moduleData);
			await contentModuleEntity.deleteModule();
			expect(fetchMock.called()).to.be.true;
		});

		it('saves aiHumanOrigin', async() => {
			fetchMock.patchOnce('https://fake-tenant-id.modules.api.proddev.d2l/6613/modules/12345', moduleData);

			await contentModuleEntity.setAiHumanOrigin(3);

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('aiHumanOrigin')).to.equal('3');
			}
			expect(fetchMock.called()).to.be.true;
		});
	});
});
