import { GradeSchemeCollectionEntity } from '../../../src/activities/associateGrade/GradeSchemeCollectionEntity.js';
import { gradeSchemeCollection } from './data/GradeSchemeCollection.js';

describe('GradeSchemeCollectionEntity', () => {
	describe('getGradeSchemes', () => {
		let entity;

		beforeEach(() => {
			const entityJson = window.D2L.Hypermedia.Siren.Parse(gradeSchemeCollection);
			entity = new GradeSchemeCollectionEntity(entityJson);
		});

		it('returns entities', () => {
			const result = entity.getGradeSchemes();
			expect(result).to.have.lengthOf(2);
		});
	});
});
