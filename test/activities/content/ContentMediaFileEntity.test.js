import { contentMediaFileData } from './data/TestContentMediaFileEntity.js';
import { ContentMediaFileEntity } from '../../../src/activities/content/ContentMediaFileEntity.js';
import { expect } from '@open-wc/testing';
import fetchMock from 'fetch-mock/esm/client.js';
import SirenParse from 'siren-parser';

describe('ContentHtmlFileEntity', () => {
	let fileData;
	let contentMediaFileEntity;

	beforeEach(() => {
		fileData = SirenParse(contentMediaFileData);
		contentMediaFileEntity = new ContentMediaFileEntity(fileData);
	});

	afterEach(() => {
		fetchMock.reset();
	});

	describe('Reads properties', () => {
		it('reads embed media', () => {
			expect(contentMediaFileEntity.embedMedia()).to.equal('true');
		});

		it('reads media file location', () => {
			expect(contentMediaFileEntity.isContentServiceResource()).to.equal('true');
		});

		it('reads advanced editing feature flag', () => {
			expect(contentMediaFileEntity.isAdvancedEditingEnabled()).to.equal('true');
		});

		it ('reads mediaFileName property', () => {
			expect(contentMediaFileEntity.mediaFileName()).to.equal('test.mp4');
		});

		it ('reads Content Service contentId', () => {
			expect(contentMediaFileEntity.contentServiceContentId()).to.equal('fake-content-service-content-id');
		});

		it ('reads Content Service endpoint', () => {
			expect(contentMediaFileEntity.contentServiceEndpoint()).to.equal('https://fake-content-service-endpoint/');
		});

		it ('reads tenantId', () => {
			expect(contentMediaFileEntity.tenantId()).to.equal('fake-tenant-id');
		});

		it ('reads allowDownload property', () => {
			expect(contentMediaFileEntity.allowDownload()).to.equal('true');
		});

		it ('reads topicId', () => {
			expect(contentMediaFileEntity.topicId()).to.equal(12345);
		});
	});

	describe('Links', () => {
		it('can get captions href', () => {
			expect(contentMediaFileEntity.getMediaFileCaptionsHref()).to.equal('https://fake-tenant-id.files.api.proddev.d2l/6614/files/media/captions');
		});
	});
});