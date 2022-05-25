import { expect } from '@open-wc/testing';
import { gradeSchemeCollection } from './data/GradeSchemeCollection.js';
import { GradeSchemeCollectionEntity } from '../../../src/activities/associateGrade/GradeSchemeCollectionEntity.js';
import SirenParse from 'siren-parser';

describe('GradeSchemeCollectionEntity', () => {
	describe('getGradeSchemes', () => {
		let entity;

		beforeEach(() => {
			const entityJson = SirenParse(gradeSchemeCollection);
			entity = new GradeSchemeCollectionEntity(entityJson);
		});

		it('returns entities', () => {
			const result = entity.getGradeSchemes();
			expect(result).to.have.lengthOf(2);
		});
	});
});
