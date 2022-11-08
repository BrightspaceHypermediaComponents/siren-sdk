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

		it ('reads mediaFileName property', () => {
			expect(contentMediaFileEntity.mediaFileName()).to.equal('test.mp4');
		});

		it ('reads allowDownload property', () => {
			expect(contentMediaFileEntity.allowDownload()).to.equal('true');
		});
	});

	describe('Links', () => {
		it('can get captions href', () => {
			expect(contentMediaFileEntity.getMediaFileCaptionsHref()).to.equal('https://fake-tenant-id.files.api.proddev.d2l/6614/files/media/captions');
		});
	});
});
