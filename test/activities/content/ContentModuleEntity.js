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

	it('reads description', () => {
		var contentModuleEntity = new ContentModuleEntity(moduleData);
		expect(contentModuleEntity.title()).to.equal('<p>description text</p>');
	});
});
