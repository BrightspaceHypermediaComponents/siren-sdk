import { quizAttemptsEntity } from '../data/attempts/QuizAttemptsEntity.js';
import { QuizAttemptsEntity } from '../../../../src/activities/quizzes/attempts/QuizAttemptsEntity.js';

describe('attempts', () => {
	let entityJson;

	beforeEach(() => {
		entityJson = window.D2L.Hypermedia.Siren.Parse(quizAttemptsEntity);
	});

	describe('canUpdateAttemptsAllowed', () => {
		it('returns true when attempts allowed is editable', () => {
			const entity = new QuizAttemptsEntity(entityJson);
			expect(entity.canUpdateAttemptsAllowed()).to.be.true;
		});
	});

	describe('attempts', () => {
		it('can read number of attempts allowed', () => {
			const entity = new QuizAttemptsEntity(entityJson);
			expect(entity.attemptsAllowed()).to.equal(3);
		});
	});

	describe('attempts', () => {
		it('can read number of attempts allowed', () => {
			const entity = new QuizAttemptsEntity(entityJson);
			expect(entity.attemptsAllowedOptions()).length.to.equal(11);
		});
	});
});

describe('overall grade calculation', () => {
	let entityJson;

	beforeEach(() => {
		entityJson = window.D2L.Hypermedia.Siren.Parse(quizAttemptsEntity);
	});

	describe('canUpdateOverallGradeCalculation', () => {
		it('returns true when overall grade calculation is editable', () => {
			const entity = new QuizAttemptsEntity(entityJson);
			const subentity = entity.getOverallGradeCalculationSubEntity();
			expect(subentity.canUpdateOverallGradeCalculation()).to.be.true;
		});
	});

	describe('attempts', () => {
		it('can read overall grade calculation options', () => {
			const entity = new QuizAttemptsEntity(entityJson);
			const subentity = entity.getOverallGradeCalculationSubEntity();
			expect(subentity.overallGradeCalculationOptions()).length.to.equal(5);
		});
	});
});
