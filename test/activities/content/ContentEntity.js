import { ContentEntity } from '../../../src/activities/content/ContentEntity.js';
import { editableContent } from './data/EditableContent.js';

describe('ContentEntity', () => {
	let editableEntity;

	beforeEach(() => {
		editableEntity = window.D2L.Hypermedia.Siren.Parse(editableContent);
	});

	describe('Basic loading', () => {
		it('reads title', () => {
			var contentEntity = new ContentEntity(editableEntity);
			expect(contentEntity.title()).to.equal('Test Content Title');
		});
	});
});
