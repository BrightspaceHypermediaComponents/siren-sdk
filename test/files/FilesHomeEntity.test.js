import { expect } from '@open-wc/testing';
import fetchMock from 'fetch-mock/esm/client.js';
import { FilePreviewLocationEntity } from '../../src/files/FilePreviewLocationEntity.js';
import { filePreviewLocationEntity } from './data/FilePreviewLocationEntity.js';
import { FilesHomeEntity } from '../../src/files/FilesHomeEntity.js';
import SirenParse from 'siren-parser';
import { testData } from './data/FilesHomeEntity.js';

describe('AssignmentEntity', () => {
	let editableEntity;

	beforeEach(() => {
		editableEntity = SirenParse(testData.filesHomeEntityEditable);
	});

	afterEach(() => {
		fetchMock.reset();
	});

	describe('preview location', () => {
		it('gets preview location', async() => {
			fetchMock.getOnce('https://b4b1eaba-26aa-4017-b37c-33e22649e477.files.api.proddev.d2l/121213/preview-location?fileSystemType=Temp&fileId=12345',
				filePreviewLocationEntity);

			const filesHomeEntity = new FilesHomeEntity(editableEntity);

			const sirenFilePreviewLocation = await filesHomeEntity.getFilePreviewLocationEntity('Temp', '12345');

			const previewLocationEntity = new FilePreviewLocationEntity(sirenFilePreviewLocation);
			expect(previewLocationEntity.previewLocation()).to.equal('/d2l/lp/files/temp/12345/View');
			expect(fetchMock.called()).to.be.true;
		});
	});
});
