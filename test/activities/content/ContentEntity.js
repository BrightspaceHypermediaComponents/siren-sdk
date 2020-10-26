import { ContentEntity } from '../../../src/activities/content/ContentEntity.js';
import { contentEntityData } from './data/TestContentEntity.js';

describe('ContentEntity', () => {
	let contentData;

	beforeEach(() => {
		contentData = window.D2L.Hypermedia.Siren.Parse(contentEntityData);
	});

	it('gets content-module href', () => {
		var contentEntity = new ContentEntity(contentData);
		expect(contentEntity.getModuleHref()).to.equal('https://fake-tenant-id.modules.api.proddev.d2l/6613/modules/12345');
	});
});
