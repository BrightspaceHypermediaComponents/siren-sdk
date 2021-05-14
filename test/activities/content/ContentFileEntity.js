/* global fetchMock */
import { ContentFileEntity } from '../../../src/activities/content/ContentFileEntity.js';
import { contentFileData } from './data/TestContentFileEntity.js';
import { getFormData } from '../../utility/test-helpers.js';

describe('ContentFileEntity', () => {
	let fileData;
	let contentFileEntity;

	beforeEach(() => {
		fileData = window.D2L.Hypermedia.Siren.Parse(contentFileData);
		contentFileEntity = new ContentFileEntity(fileData);
	});

	afterEach(() => {
		fetchMock.reset();
	});

	describe('Reads properties', () => {
		it('reads title', () => {
			expect(contentFileEntity.title()).to.equal('Test File Title');
		});

		it('reads rich text description', () => {
			expect(contentFileEntity.descriptionRichText()).to.equal('<p>description text</p>');
		});

		it('reads text description', () => {
			expect(contentFileEntity.descriptionText()).to.equal('description text');
		});
	});

	describe('Equality tests', () => {
		it('Equality should return true when details match', () => {
			const fileData = {
				title: 'Test File Title',
				fileHref: 'https://fake-tenant-id.files.api.proddev.d2l/my-file.file/usages/6614'
			};
			expect(contentFileEntity.equals(fileData)).to.equal(true);
		});

		it('Equality should return false when title is different', () => {
			const fileData = {
				title: 'New Title',
				fileHref: 'https://fake-tenant-id.files.api.proddev.d2l/my-file.file/usages/6614'
			};
			expect(contentFileEntity.equals(fileData)).to.equal(false);
		});

		it('Equality should return false when fileHref is different', () => {
			const fileData = {
				title: 'Test File Title',
				fileHref: 'https://fake-tenant-id.files.api.proddev.d2l/my-super-cool-file.file/usages/6614'
			};
			expect(contentFileEntity.equals(fileData)).to.equal(false);
		});
	});

	describe('Actions', () => {
		it('saves title', async() => {
			fetchMock.patchOnce('https://fake-tenant-id.content.api.proddev.d2l/6613/files/12345', fileData);

			await contentFileEntity.setFileTitle('New Title');

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('title')).to.equal('New Title');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('saves description', async() => {
			fetchMock.patchOnce('https://fake-tenant-id.content.api.proddev.d2l/6613/files/12345', fileData);

			await contentFileEntity.setFileDescription('<p>New description</p>');

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('description')).to.equal('<p>New description</p>');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('performs delete request', async() => {
			fetchMock.deleteOnce('https://fake-tenant-id.content.api.proddev.d2l/6613/files/12345', fileData);
			await contentFileEntity.deleteFile();
			expect(fetchMock.called()).to.be.true;
		});
	});

	describe('Links', () => {
		it('can get file href', () => {
			expect(contentFileEntity.getFileHref()).to.equal('https://fake-tenant-id.files.api.proddev.d2l/my-file.file/usages/6614');
		});
	});

	describe('Classes', () => {
		it('can get file type', () => {
			expect(contentFileEntity.getFileType()).to.equal('html');
		});
	});
});
