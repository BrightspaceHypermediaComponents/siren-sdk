import { quizAttemptsEntity } from '../data/attempts/EditableEntity.js';
import { nonEditableAttemptsEntity } from '../data/attempts/NonEditableEntity.js';
import { QuizAttemptsEntity } from '../../../../src/activities/quizzes/attempts/QuizAttemptsEntity.js';

describe('attempts allowed', () => {
	let editableEntity, nonEditableEntity;

	beforeEach(() => {
		editableEntity = window.D2L.Hypermedia.Siren.Parse(quizAttemptsEntity);
		nonEditableEntity = window.D2L.Hypermedia.Siren.Parse(nonEditableAttemptsEntity);
	});

	describe('canUpdateAttemptsAllowed', () => {
		it('returns true when attempts allowed is editable', () => {
			const entity = new QuizAttemptsEntity(editableEntity);
			expect(entity.canUpdateAttemptsAllowed()).to.be.true;
		});

		it('returns false when attempts allowed is uneditable', () => {
			const entity = new QuizAttemptsEntity(nonEditableEntity);
			expect(entity.canUpdateAttemptsAllowed()).to.be.false;
		});
	});

	describe('attemptsAllowed', () => {
		it('can read number of attempts allowed', () => {
			const entity = new QuizAttemptsEntity(editableEntity);
			expect(entity.attemptsAllowed()).to.equal('3');
		});
	});

	describe('attemptsAllowedOptions', () => {
		it('can read all the options for attempts allowed', () => {
			const entity = new QuizAttemptsEntity(editableEntity);
			const attemptOptions = entity.attemptsAllowedOptions();
			expect(attemptOptions).to.be.an('array');
			expect(attemptOptions.length).to.equal(11);
		});
	});
});

describe('overall grade calculation', () => {
	let editableEntity, nonEditableEntity;

	beforeEach(() => {
		editableEntity = window.D2L.Hypermedia.Siren.Parse(quizAttemptsEntity);
		nonEditableEntity = window.D2L.Hypermedia.Siren.Parse(nonEditableAttemptsEntity);
	});

	describe('canUpdateOverallGradeCalculation', () => {
		it('returns true when overall grade calculation is editable', () => {
			const entity = new QuizAttemptsEntity(editableEntity);
			expect(entity.canUpdateOverallGradeCalculation()).to.be.true;
		});

		it('returns false when overall grade calculation is uneditable', () => {
			const entity = new QuizAttemptsEntity(nonEditableEntity);
			expect(entity.canUpdateOverallGradeCalculation()).to.be.false;
		});
	});

	describe('overallGradeCalculationType', () => {
		it('can read overall grade calculation type title and value', () => {
			const entity = new QuizAttemptsEntity(editableEntity);
			expect(entity.overallGradeCalculationType().title).to.equal('Lowest Attempt');
			expect(entity.overallGradeCalculationType().value).to.equal('lowest');
		});
	});

	describe('overallGradeCalculationOptions', () => {
		it('can read overall grade calculation options', () => {
			const entity = new QuizAttemptsEntity(editableEntity);
			expect(entity.overallGradeCalculationOptions().length).to.equal(5);
		});
	});
});
