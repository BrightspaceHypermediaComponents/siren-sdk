import { ContentModuleEntity } from '../../../src/activities/content/ContentModuleEntity.js';
import { contentModuleData } from './data/TestContentModuleEntity.js';

describe('ContentModuleEntity', () => {
	let moduleData;

	beforeEach(() => {
		moduleData = window.D2L.Hypermedia.Siren.Parse(contentModuleData);
	});

	it('reads title', () => {
		var contentModuleEntity = new ContentModuleEntity(moduleData);
		expect(contentModuleEntity.title()).to.equal('Test Content Module Title');
	});

	it('reads rich text description', () => {
		var contentModuleEntity = new ContentModuleEntity(moduleData);
		expect(contentModuleEntity.descriptionRichText()).to.equal('<p>description text</p>');
	});

	it('reads text description', () => {
		var contentModuleEntity = new ContentModuleEntity(moduleData);
		expect(contentModuleEntity.descriptionText()).to.equal('description text');
	});
});
