import { ContentEntity, CONTENT_TYPES } from '../../../src/activities/content/ContentEntity.js';
import { contentModuleEntityData, contentWebLinkEntityData, contentLTILinkEntityData } from './data/TestContentEntity.js';

describe('Module ContentEntity', () => {
	let contentData;
	let contentEntity;

	beforeEach(() => {
		contentData = window.D2L.Hypermedia.Siren.Parse(contentModuleEntityData);
		contentEntity = new ContentEntity(contentData);
	});

	it('gets module entity type', () => {
		expect(contentEntity.getEntityType()).to.equal(CONTENT_TYPES.module);
	});

	it('gets content-module href', () => {
		expect(contentEntity.getModuleHref()).to.equal('https://fake-tenant-id.modules.api.proddev.d2l/6613/modules/12345');
	});
});

describe('Web Link ContentEntity', () => {
	let contentData;
	let contentEntity;

	beforeEach(() => {
		contentData = window.D2L.Hypermedia.Siren.Parse(contentWebLinkEntityData);
		contentEntity = new ContentEntity(contentData);
	});

	it('gets web link entity type', () => {
		expect(contentEntity.getEntityType()).to.equal(CONTENT_TYPES.weblink);
	});

	it('gets content-weblink href', () => {
		expect(contentEntity.getWebLinkHref()).to.equal('https://fake-tenant-id.weblinks.api.proddev.d2l/6613/weblinks/12345');
	});
});

describe('LTI Link ContentEntity', () => {
	let contentData;
	let contentEntity;

	beforeEach(() => {
		contentData = window.D2L.Hypermedia.Siren.Parse(contentLTILinkEntityData);
		contentEntity = new ContentEntity(contentData);
	});

	it('gets LTI link entity type', () => {
		expect(contentEntity.getEntityType()).to.equal(CONTENT_TYPES.ltilink);
	});

	it('gets content-ltilink href', () => {
		expect(contentEntity.getLTILinkHref()).to.equal('https://fake-tenant-id.weblinks.api.proddev.d2l/6613/ltilinks/12345');
	});
});
