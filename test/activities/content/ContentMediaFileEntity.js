/* global fetchMock */
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
	});

	describe('Links', () => {
		it('can get captions href', () => {
			expect(contentMediaFileEntity.getMediaCaptionsHref()).to.equal('https://fake-tenant-id.files.api.proddev.d2l/6614/files/media/captions');
		});
	});
});
