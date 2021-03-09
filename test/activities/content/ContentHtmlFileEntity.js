/* global fetchMock */
import { ContentHtmlFileEntity } from '../../../src/activities/content/ContentHtmlFileEntity.js';
import { contentHtmlFileData } from './data/TestContentHtmlFileEntity.js';
import { getFormData } from '../../utility/test-helpers.js';

describe('ContentHtmlFileEntity', () => {
	let htmlFileData;
	let contentHtmlFileEntity;

	beforeEach(() => {
		htmlFileData = window.D2L.Hypermedia.Siren.Parse(contentHtmlFileData);
		contentHtmlFileEntity = new ContentHtmlFileEntity(htmlFileData);
	});

	afterEach(() => {
		fetchMock.reset();
	});

	describe('Reads properties', () => {
		it('reads title', () => {
			expect(contentHtmlFileEntity.title()).to.equal('Test Html File Title');
		});

		it('reads rich text description', () => {
			expect(contentHtmlFileEntity.descriptionRichText()).to.equal('<p>description text</p>');
		});

		it('reads text description', () => {
			expect(contentHtmlFileEntity.descriptionText()).to.equal('description text');
		});
	});

	describe('Equality tests', () => {
		it('Equality should return true when details match', () => {
			const htmlFileData = {
				title: 'Test Html File Title',
				descriptionRichText: '<p>description text</p>'
			};
			expect(contentHtmlFileEntity.equals(htmlFileData)).to.equal(true);
		});

		it('Equality should return false when title is different', () => {
			const htmlFileData = {
				title: 'New Title',
				descriptionRichText: '<p>description text</p>'
			};
			expect(contentHtmlFileEntity.equals(htmlFileData)).to.equal(false);
		});

		it('Equality should return false when description is different', () => {
			const htmlFileData = {
				title: 'New Title',
				descriptionRichText: '<p>New description text</p>'
			};
			expect(contentHtmlFileEntity.equals(htmlFileData)).to.equal(false);
		});
	});

	describe('Actions', () => {
		it('saves title', async() => {
			fetchMock.patchOnce('https://fake-tenant-id.content.api.proddev.d2l/6613/htmlfiles/12345', htmlFileData);

			await contentHtmlFileEntity.setHtmlFileTitle('New Title');

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('title')).to.equal('New Title');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('saves description', async() => {
			fetchMock.patchOnce('https://fake-tenant-id.content.api.proddev.d2l/6613/htmlfiles/12345', htmlFileData);

			await contentHtmlFileEntity.setHtmlFileDescription('<p>New description</p>');

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('description')).to.equal('<p>New description</p>');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('performs delete request', async() => {
			fetchMock.deleteOnce('https://fake-tenant-id.content.api.proddev.d2l/6613/htmlfiles/12345', htmlFileData);
			await contentHtmlFileEntity.deleteHtmlFile();
			expect(fetchMock.called()).to.be.true;
		});
	});
});
