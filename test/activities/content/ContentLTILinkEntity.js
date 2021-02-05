/* global fetchMock */
import { ContentLTILinkEntity } from '../../../src/activities/content/contentLTILinkEntity.js';
import { contentLTILinkData } from './data/TestContentLTILinkEntity.js';

describe('ContentLTILinkEntity', () => {
	let ltiLinkData;
	let contentLTILinkEntity;

	beforeEach(() => {
		//ltiLinkData = window.D2L.Hypermedia.Siren.Parse(contentLTILinkData);
		//contentLTILinkEntity = new ContentLTILinkEntity(ltiLinkData);
	});

	afterEach(() => {
		fetchMock.reset();
	});

	describe('Reads properties', () => {
		it('reads title', () => {
			//expect(contentLTILinkEntity.title()).to.equal('Test LTI Link Title');
		});

		it('reads rich text description', () => {
			//expect(contentLTILinkEntity.descriptionRichText()).to.equal('<p>description text</p>');
		});

		it('reads text description', () => {
			//expect(contentLTILinkEntity.descriptionText()).to.equal('description text');
		});

		it('reads url', () => {
			//expect(contentLTILinkEntity.url()).to.equal('https://phoenix-is-the-best.com');
		});

		it('reads isExternalResources', () => {
			//expect(contentLTILinkEntity.isExternalResource()).to.equal(true);
		});
	});
});
