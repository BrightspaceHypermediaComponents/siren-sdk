import { contentServiceFileData } from './data/TestContentServiceFileEntity.js';
import { ContentServiceFileEntity } from '../../../src/activities/content/ContentServiceFileEntity.js';
import { expect } from '@open-wc/testing';
import fetchMock from 'fetch-mock/esm/client.js';
import SirenParse from 'siren-parser';

describe('ContentHtmlFileEntity', () => {
	let fileData;
	let contentServiceFileEntity;

	beforeEach(() => {
		fileData = SirenParse(contentServiceFileData);
		contentServiceFileEntity = new ContentServiceFileEntity(fileData);
	});

	afterEach(() => {
		fetchMock.reset();
	});

	describe('Reads properties', () => {
		it('reads media file location', () => {
			expect(contentServiceFileEntity.isContentServiceResource()).to.equal('true');
		});

		it('reads advanced editing available (type based)', () => {
			expect(contentServiceFileEntity.isAdvancedEditingAvailable()).to.equal('true');
		});

		it('reads advanced editing enabled (feature flag)', () => {
			expect(contentServiceFileEntity.isAdvancedEditingEnabled()).to.equal('true');
		});

		it ('reads contentServiceName property', () => {
			expect(contentServiceFileEntity.contentServiceName()).to.equal('content-service-name');
		});

		it ('reads Content Service contentId', () => {
			expect(contentServiceFileEntity.contentServiceContentId()).to.equal('fake-content-service-content-id');
		});

		it ('reads Content Service endpoint', () => {
			expect(contentServiceFileEntity.contentServiceEndpoint()).to.equal('https://fake-content-service-endpoint/');
		});

		it ('reads tenantId', () => {
			expect(contentServiceFileEntity.tenantId()).to.equal('fake-tenant-id');
		});

		it ('reads allowDownload property', () => {
			expect(contentServiceFileEntity.allowDownload()).to.equal('true');
		});

		it ('reads topicId', () => {
			expect(contentServiceFileEntity.topicId()).to.equal(12345);
		});
	});

	describe('Links', () => {
		it('can get captions href', () => {
			expect(contentServiceFileEntity.getMediaFileCaptionsHref()).to.equal('https://fake-tenant-id.files.api.proddev.d2l/6614/files/media/captions');
		});
	});
});
