import { ActivityGradeEntity } from '../../src/activities/ActivityGradeEntity.js';
import { expect } from '@open-wc/testing';
import SirenParse from 'siren-parser';
import { testData } from './data/ActivityGradeEntity.js';

describe('ActivityGradeEntity', () => {
	describe('Numeric Grade Tests', () => {
		let entity;

		beforeEach(() => {
			const entityJson = SirenParse(testData.gradeEntity.Numeric);
			entity = new ActivityGradeEntity(entityJson);
		});

		it('gets scoreType', () => {
			expect(entity.scoreType()).to.equal('Numeric');
		});

		it('gets score', () => {
			expect(entity.score()).to.equal(0.694090143);
		});

		it('gets outOf', () => {
			expect(entity.outOf()).to.equal(100);
		});

		it('gets letterGrade', () => {
			expect(entity.letterGrade()).to.equal(null);
		});

		it('gets letterGradeOptions', () => {
			expect(entity.letterGradeOptions()).to.equal(null);
		});
	});

	describe('Letter Grade Tests', () => {
		let entity;

		beforeEach(() => {
			const entityJson = SirenParse(testData.gradeEntity.LetterGrade);
			entity = new ActivityGradeEntity(entityJson);
		});

		it('gets scoreType', () => {
			expect(entity.scoreType()).to.equal('LetterGrade');
		});

		it('gets score', () => {
			expect(entity.score()).to.equal(null);
		});

		it('gets outOf', () => {
			expect(entity.outOf()).to.equal(null);
		});

		it('gets letterGrade', () => {
			expect(entity.letterGrade()).to.equal('A');
		});

		it('gets letterGradeOptions', () => {
			expect(entity.letterGradeOptions()).to.deep.equal(['A', 'B', 'C']);
		});
	});
});
