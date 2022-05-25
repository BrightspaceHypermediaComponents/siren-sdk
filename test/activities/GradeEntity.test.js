import { expect } from '@open-wc/testing';
import { GradeEntity } from '../../src/activities/GradeEntity.js';
import SirenParse from 'siren-parser';
import { testData } from './data/GradeEntity.js';

describe('GradeEntity', () => {
	describe('Grade from Points Gradebook', () => {
		let entity;

		beforeEach(() => {
			const entityJson = SirenParse(testData.gradeEntity.points);
			entity = new GradeEntity(entityJson);
		});

		it('gets name', () => {
			expect(entity.name()).to.equal('Numeric type');
		});

		it('gets baseWeight', () => {
			expect(entity.baseWeight()).to.be.undefined;
		});

		it('gets maxPoints', () => {
			expect(entity.maxPoints()).to.equal(15);
		});
	});

	describe('Grade from Weighted Gradebook', () => {
		let entity;

		beforeEach(() => {
			const entityJson = SirenParse(testData.gradeEntity.weighted);
			entity = new GradeEntity(entityJson);
		});

		it('gets name', () => {
			expect(entity.name()).to.equal('Numeric type inside category');
		});

		it('gets baseWeight', () => {
			expect(entity.baseWeight()).to.equal(10);
		});

		it('gets maxPoints', () => {
			expect(entity.maxPoints()).to.equal(100);
		});
	});
});
