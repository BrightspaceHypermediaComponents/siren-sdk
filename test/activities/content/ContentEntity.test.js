import { CONTENT_TYPES, ContentEntity } from '../../../src/activities/content/ContentEntity.js';
import { contentFileEntityData, contentLTILinkEntityData, contentModuleEntityData, contentWebLinkEntityData } from './data/TestContentEntity.js';
import { expect } from '@open-wc/testing';
import SirenParse from 'siren-parser';

describe('Module ContentEntity', () => {
	let contentData;
	let contentEntity;

	beforeEach(() => {
		contentData = SirenParse(contentModuleEntityData);
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
		contentData = SirenParse(contentWebLinkEntityData);
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
		contentData = SirenParse(contentLTILinkEntityData);
		contentEntity = new ContentEntity(contentData);
	});

	it('gets LTI link entity type', () => {
		expect(contentEntity.getEntityType()).to.equal(CONTENT_TYPES.ltilink);
	});

	it('gets content-ltilink href', () => {
		expect(contentEntity.getLTILinkHref()).to.equal('https://fake-tenant-id.weblinks.api.proddev.d2l/6613/ltilinks/12345');
	});
});

describe('File ContentEntity', () => {
	let contentData;
	let contentEntity;

	beforeEach(() => {
		contentData = SirenParse(contentFileEntityData);
		contentEntity = new ContentEntity(contentData);
	});

	it('gets file entity type', () => {
		expect(contentEntity.getEntityType()).to.equal(CONTENT_TYPES.contentFile);
	});

	it('gets content-file href', () => {
		expect(contentEntity.getContentFileHref()).to.equal('https://fake-tenant-id.content.api.proddev.d2l/6613/files/12345');
	});
});
