import { contentHtmlFileData } from './data/TestContentHtmlFileEntity.js';
import { ContentHtmlFileEntity } from '../../../src/activities/content/ContentHtmlFileEntity.js';
import { expect } from '@open-wc/testing';
import fetchMock from 'fetch-mock/esm/client.js';
import { getFormData } from '../../utility/test-helpers.js';
import SirenParse from 'siren-parser';
import { FILE_TYPES } from '../../../src/activities/content/ContentFileEntity.js';

describe('ContentHtmlFileEntity', () => {
	let fileData;
	let contentHtmlFileEntity;

	beforeEach(() => {
		fileData = SirenParse(contentHtmlFileData);
		contentHtmlFileEntity = new ContentHtmlFileEntity(fileData);
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

		it('reads font size', () => {
			expect(contentHtmlFileEntity.fontSize()).to.equal('24');
		});

		it('reads font face', () => {
			expect(contentHtmlFileEntity.fontFace()).to.equal('arial');
		});
	});

	describe('Equality tests', () => {
		it('Equality should return true when details match', () => {
			const fileData = {
				fileType: FILE_TYPES.html,
				title: 'Test Html File Title',
				fileHref: 'https://fake-tenant-id.files.api.proddev.d2l/my-file.html/usages/6614',
			};
			expect(contentHtmlFileEntity.equals(fileData)).to.equal(true);
		});

		it('Equality should return false when title is different', () => {
			const fileData = {
				fileType: FILE_TYPES.html,
				title: 'New Title',
				fileHref: 'https://fake-tenant-id.files.api.proddev.d2l/my-file.html/usages/6614',
			};
			expect(contentHtmlFileEntity.equals(fileData)).to.equal(false);
		});

		it('Equality should return false when fileHref is different', () => {
			const fileData = {
				fileType: FILE_TYPES.html,
				title: 'Test Html File Title',
				fileHref: 'https://fake-tenant-id.files.api.proddev.d2l/my-super-cool-file.html/usages/6614',
			};
			expect(contentHtmlFileEntity.equals(fileData)).to.equal(false);
		});
	});

	describe('Actions', () => {
		it('saves title', async() => {
			fetchMock.patchOnce('https://fake-tenant-id.content.api.proddev.d2l/6613/files/12345', fileData);

			await contentHtmlFileEntity.setFileTitle('New Title');

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('title')).to.equal('New Title');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('saves description', async() => {
			fetchMock.patchOnce('https://fake-tenant-id.content.api.proddev.d2l/6613/files/12345', fileData);

			await contentHtmlFileEntity.setFileDescription('<p>New description</p>');

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('description')).to.equal('<p>New description</p>');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('saves html content', async() => {
			fetchMock.patchOnce('https://fake-tenant-id.content.api.proddev.d2l/6613/files/html/12345', fileData);

			await contentHtmlFileEntity.setHtmlFileHtmlContent('<!doctype html><html lang="en"><head><title>My File</title></head><body><p>This is my file</p></body></html>');

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('htmlContent')).to.equal('<!doctype html><html lang="en"><head><title>My File</title></head><body><p>This is my file</p></body></html>');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('performs delete request', async() => {
			fetchMock.deleteOnce('https://fake-tenant-id.content.api.proddev.d2l/6613/files/12345', fileData);
			await contentHtmlFileEntity.deleteFile();
			expect(fetchMock.called()).to.be.true;
		});
	});

	describe('Links', () => {
		it('can get file href', () => {
			expect(contentHtmlFileEntity.getFileHref()).to.equal('https://fake-tenant-id.files.api.proddev.d2l/my-file.html/usages/6614');
		});

		it('can get templates href', () => {
			expect(contentHtmlFileEntity.getHtmlTemplatesHref()).to.equal('https://fake-tenant-id.files.api.proddev.d2l/6614/files/html/templates');
		});
	});

	describe('Classes', () => {
		it('can get file type', () => {
			expect(contentHtmlFileEntity.getFileType()).to.equal('html');
		});
	});
});
