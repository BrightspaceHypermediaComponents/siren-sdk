import { GradeCategoryCollectionEntity } from '../../../src/activities/associateGrade/GradeCategoryCollectionEntity.js';
import { gradeCategoryCollection } from './data/GradeCategoryCollection.js';

describe('GradeCategoryCollectionEntity', () => {
	describe('getGradeCategories', () => {
		let entity;

		beforeEach(() => {
			const entityJson = window.D2L.Hypermedia.Siren.Parse(gradeCategoryCollection);
			entity = new GradeCategoryCollectionEntity(entityJson);
		});

		it('returns entities', () => {
			const result = entity.getGradeCategories();
			expect(result).to.have.lengthOf(2);
		});
	});
});
