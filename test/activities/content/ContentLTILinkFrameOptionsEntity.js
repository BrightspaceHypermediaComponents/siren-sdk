/* global fetchMock */
import { ContentLTILinkFrameOptionsEntity } from '../../../src/activities/content/ContentLTILinkFrameOptionsEntity.js';
import { contentLTILinkFrameOptionsEntityData } from './data/TestContentLTILinkFrameOptionsEntity.js';

describe('ContentLTILinkFrameOptionsEntity', () => {
	let ltiFrameOptionsLinkData;
	let contentLTIFrameOptionsLinkEntity;

	beforeEach(() => {
		ltiFrameOptionsLinkData = window.D2L.Hypermedia.Siren.Parse(contentLTILinkFrameOptionsEntityData);
		contentLTIFrameOptionsLinkEntity = new ContentLTILinkFrameOptionsEntity(ltiFrameOptionsLinkData);
	});

	afterEach(() => {
		fetchMock.reset();
	});

	describe('Reads properties', () => {
		it('reads canBeEmbedded', () => {
			expect(contentLTIFrameOptionsLinkEntity.canBeEmbedded()).to.equal('true');
		});

		it('reads quicklink', () => {
			expect(contentLTIFrameOptionsLinkEntity.quickLink()).to.equal('https://quicklink.phoenix-is-the-best.com');
		});
	});
});
