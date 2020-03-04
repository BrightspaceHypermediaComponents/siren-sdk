import { GradeCategoryEntity } from '../../src/activities/GradeCategoryEntity.js';
import { testData } from './data/GradeCategoryEntity.js';

describe('GradeCategoryEntity', () => {
	describe('Normal grade category', () => {
		let entity;

		beforeEach(() => {
			const entityJson = window.D2L.Hypermedia.Siren.Parse(testData.gradeCategoryEntity.normal);
			entity = new GradeCategoryEntity(entityJson);
		});

		it('gets name', () => {
			expect(entity.name()).to.equal('Category 1');
		});
	});
});
