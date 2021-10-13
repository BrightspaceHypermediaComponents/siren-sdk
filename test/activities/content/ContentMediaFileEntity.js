/* global fetchMock */
import { ContentMediaFileEntity } from '../../../src/activities/content/ContentMediaFileEntity.js';
import { contentMediaFileData } from './data/TestContentMediaFileEntity.js';
import { getFormData } from '../../utility/test-helpers.js';

describe('ContentHtmlFileEntity', () => {
	let fileData;
	let contentMediaFileEntity;

	beforeEach(() => {
		fileData = window.D2L.Hypermedia.Siren.Parse(contentMediaFileData);
		contentMediaFileEntity = new ContentMediaFileEntity(fileData);
	});

	afterEach(() => {
		fetchMock.reset();
	});

	describe('Reads properties', () => {
		it('reads title', () => {
			expect(contentMediaFileEntity.title()).to.equal('Test Media File Title');
		});

		it('reads rich text description', () => {
			expect(contentMediaFileEntity.descriptionRichText()).to.equal('<p>description text</p>');
		});

		it('reads text description', () => {
			expect(contentMediaFileEntity.descriptionText()).to.equal('description text');
		});

		it('reads embed media', () => {
			expect(contentMediaFileEntity.embedMedia()).to.equal('true');
		});
	});

	describe('Equality tests', () => {
		it('Equality should return true when details match', () => {
			const fileData = {
				title: 'Test Media File Title',
				fileHref: 'https://fake-tenant-id.files.api.proddev.d2l/my-file.html/usages/6614'
			};
			expect(contentMediaFileEntity.equals(fileData)).to.equal(true);
		});

		it('Equality should return false when title is different', () => {
			const fileData = {
				title: 'New Title',
				fileHref: 'https://fake-tenant-id.files.api.proddev.d2l/my-file.html/usages/6614'
			};
			expect(contentMediaFileEntity.equals(fileData)).to.equal(false);
		});

		it('Equality should return false when fileHref is different', () => {
			const fileData = {
				title: 'Test Media File Title',
				fileHref: 'https://fake-tenant-id.files.api.proddev.d2l/my-super-cool-file.html/usages/6614'
			};
			expect(contentMediaFileEntity.equals(fileData)).to.equal(false);
		});
	});

	describe('Actions', () => {
		it('saves title', async() => {
			fetchMock.patchOnce('https://fake-tenant-id.content.api.proddev.d2l/6613/files/12345', fileData);

			await contentMediaFileEntity.setFileTitle('New Title');

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('title')).to.equal('New Title');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('saves description', async() => {
			fetchMock.patchOnce('https://fake-tenant-id.content.api.proddev.d2l/6613/files/12345', fileData);

			await contentMediaFileEntity.setFileDescription('<p>New description</p>');

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('description')).to.equal('<p>New description</p>');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('saves html content', async() => {
			fetchMock.patchOnce('https://fake-tenant-id.content.api.proddev.d2l/6613/files/html/12345', fileData);

			await contentMediaFileEntity.setHtmlFileHtmlContent('<!doctype html><html lang="en"><head><title>My File</title></head><body><p>This is my file</p></body></html>');

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('htmlContent')).to.equal('<!doctype html><html lang="en"><head><title>My File</title></head><body><p>This is my file</p></body></html>');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('performs delete request', async() => {
			fetchMock.deleteOnce('https://fake-tenant-id.content.api.proddev.d2l/6613/files/12345', fileData);
			await contentMediaFileEntity.deleteFile();
			expect(fetchMock.called()).to.be.true;
		});
	});

	describe('Links', () => {
		it('can get file href', () => {
			expect(contentMediaFileEntity.getFileHref()).to.equal('https://fake-tenant-id.files.api.proddev.d2l/my-file.html/usages/6614');
		});
	});

	describe('Classes', () => {
		it('can get file type', () => {
			expect(contentMediaFileEntity.getFileType()).to.equal('media');
		});
	});
});
