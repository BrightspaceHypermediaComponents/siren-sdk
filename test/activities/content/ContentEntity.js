import { ContentEntity, CONTENT_TYPES } from '../../../src/activities/content/ContentEntity.js';
import { contentEntityData } from './data/TestContentEntity.js';

describe('ContentEntity', () => {
	let contentData;
	let contentEntity;

	beforeEach(() => {
		contentData = window.D2L.Hypermedia.Siren.Parse(contentEntityData);
		contentEntity = new ContentEntity(contentData);
	});

	it('gets entity type', () => {
		expect(contentEntity.getEntityType()).to.equal(CONTENT_TYPES.module);
	});

	it('gets content-module href', () => {
		expect(contentEntity.getModuleHref()).to.equal('https://fake-tenant-id.modules.api.proddev.d2l/6613/modules/12345');
	});
});
