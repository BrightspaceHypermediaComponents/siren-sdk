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
				fileHref: 'https://fake-tenant-id.files.api.proddev.d2l/my-html-file.html/usages/6614'
			};
			expect(contentHtmlFileEntity.equals(htmlFileData)).to.equal(true);
		});

		it('Equality should return false when title is different', () => {
			const htmlFileData = {
				title: 'New Title',
				fileHref: 'https://fake-tenant-id.files.api.proddev.d2l/my-html-file.html/usages/6614'
			};
			expect(contentHtmlFileEntity.equals(htmlFileData)).to.equal(false);
		});

		it('Equality should return false when fileHref is different', () => {
			const htmlFileData = {
				title: 'Test Html File Title',
				fileHref: 'https://fake-tenant-id.files.api.proddev.d2l/my-super-cool-html-file.html/usages/6614'
			};
			expect(contentHtmlFileEntity.equals(htmlFileData)).to.equal(false);
		});
	});

	describe('Actions', () => {
		it('saves title', async() => {
			fetchMock.patchOnce('https://fake-tenant-id.content.api.proddev.d2l/6613/files/html/12345', htmlFileData);

			await contentHtmlFileEntity.setHtmlFileTitle('New Title');

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('title')).to.equal('New Title');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('saves description', async() => {
			fetchMock.patchOnce('https://fake-tenant-id.content.api.proddev.d2l/6613/files/html/12345', htmlFileData);

			await contentHtmlFileEntity.setHtmlFileDescription('<p>New description</p>');

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('description')).to.equal('<p>New description</p>');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('saves html content', async() => {
			fetchMock.patchOnce('https://fake-tenant-id.content.api.proddev.d2l/6613/files/html/12345', htmlFileData);

			await contentHtmlFileEntity.setHtmlFileContent('<!doctype html><html lang="en"><head><title>My File</title></head><body><p>This is my file</p></body></html>');

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('htmlContent')).to.equal('<!doctype html><html lang="en"><head><title>My File</title></head><body><p>This is my file</p></body></html>');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('performs delete request', async() => {
			fetchMock.deleteOnce('https://fake-tenant-id.content.api.proddev.d2l/6613/files/html/12345', htmlFileData);
			await contentHtmlFileEntity.deleteHtmlFile();
			expect(fetchMock.called()).to.be.true;
		});
	});

	describe('Links', () => {
		it('can get file href', () => {
			expect(contentHtmlFileEntity.getFileHref()).to.equal('https://fake-tenant-id.files.api.proddev.d2l/my-html-file.html/usages/6614');
		});
	});
});
