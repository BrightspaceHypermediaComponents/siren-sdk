import { GradeSchemeEntity } from '../../../src/activities/associateGrade/GradeSchemeEntity.js';
import { gradeScheme } from './data/GradeScheme.js';

describe('GradeSchemeEntity', () => {
	describe('get properties', () => {
		let entity;

		beforeEach(() => {
			const entityJson = window.D2L.Hypermedia.Siren.Parse(gradeScheme);
			entity = new GradeSchemeEntity(entityJson);
		});

		it('gets name', () => {
			expect(entity.name()).to.equal('my grade scheme');
		});
	});
});
