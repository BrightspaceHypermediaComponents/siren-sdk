import { ContentLTILinkFrameOptionsEntity } from '../../../src/activities/content/ContentLTILinkFrameOptionsEntity.js';
import { contentLTILinkFrameOptionsEntityData } from './data/TestContentLTILinkFrameOptionsEntity.js';
import { expect } from '@open-wc/testing';
import fetchMock from 'fetch-mock/esm/client.js';
import SirenParse from 'siren-parser';

describe('ContentLTILinkFrameOptionsEntity', () => {
	let ltiFrameOptionsLinkData;
	let contentLTIFrameOptionsLinkEntity;

	beforeEach(() => {
		ltiFrameOptionsLinkData = SirenParse(contentLTILinkFrameOptionsEntityData);
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
