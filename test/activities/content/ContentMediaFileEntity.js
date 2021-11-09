/* global fetchMock */
import { expect } from 'chai';
import { ContentMediaFileEntity } from '../../../src/activities/content/ContentMediaFileEntity.js';
import { contentMediaFileData } from './data/TestContentMediaFileEntity.js';

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
	});

	describe('Links', () => {
		it('can get captions href', () => {
			expect(contentMediaFileEntity.getMediaCaptionsHref()).to.equal('https://fake-tenant-id.files.api.proddev.d2l/6614/files/media/captions');
		});
	});
});
