import { GradeCategoryEntity } from '../../../src/activities/associateGrade/GradeCategoryEntity.js';
import { gradeCategory } from './data/GradeCategory.js';

describe('GradeCategoryEntity', () => {
	describe('get properties', () => {
		let entity;

		beforeEach(() => {
			const entityJson = window.D2L.Hypermedia.Siren.Parse(gradeCategory);
			entity = new GradeCategoryEntity(entityJson);
		});

		it('gets name', () => {
			expect(entity.name()).to.equal('Category A');
		});
	});
});
