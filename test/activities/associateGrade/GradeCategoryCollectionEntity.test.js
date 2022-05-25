import { expect } from '@open-wc/testing';
import { gradeCategoryCollection } from './data/GradeCategoryCollection.js';
import { GradeCategoryCollectionEntity } from '../../../src/activities/associateGrade/GradeCategoryCollectionEntity.js';
import SirenParse from 'siren-parser';

describe('GradeCategoryCollectionEntity', () => {
	describe('getGradeCategories', () => {
		let entity;

		beforeEach(() => {
			const entityJson = SirenParse(gradeCategoryCollection);
			entity = new GradeCategoryCollectionEntity(entityJson);
		});

		it('returns entities', () => {
			const result = entity.getGradeCategories();
			expect(result).to.have.lengthOf(2);
		});
	});
});
