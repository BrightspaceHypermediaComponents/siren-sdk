import { expect } from '@open-wc/testing';
import { gradeCategory } from './data/GradeCategory.js';
import { GradeCategoryEntity } from '../../../src/activities/associateGrade/GradeCategoryEntity.js';
import SirenParse from 'siren-parser';

describe('GradeCategoryEntity', () => {
	describe('get properties', () => {
		let entity;

		beforeEach(() => {
			const entityJson = SirenParse(gradeCategory);
			entity = new GradeCategoryEntity(entityJson);
		});

		it('gets name', () => {
			expect(entity.name()).to.equal('Category A');
		});
	});
});
