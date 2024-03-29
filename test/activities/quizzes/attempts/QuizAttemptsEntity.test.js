import { expect } from '@open-wc/testing';
import { nonEditableAttemptsEntity } from '../data/attempts/NonEditableEntity.js';
import { quizAttemptsEntity } from '../data/attempts/EditableEntity.js';
import { QuizAttemptsEntity } from '../../../../src/activities/quizzes/attempts/QuizAttemptsEntity.js';
import SirenParse from 'siren-parser';

describe('attempts allowed', () => {
	let editableEntity, nonEditableEntity;

	beforeEach(() => {
		editableEntity = SirenParse(quizAttemptsEntity);
		nonEditableEntity = SirenParse(nonEditableAttemptsEntity);
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
		editableEntity = SirenParse(quizAttemptsEntity);
		nonEditableEntity = SirenParse(nonEditableAttemptsEntity);
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

describe('retake incorrect only', () => {
	let editableEntity, nonEditableEntity;

	beforeEach(() => {
		editableEntity = SirenParse(quizAttemptsEntity);
		nonEditableEntity = SirenParse(nonEditableAttemptsEntity);
	});

	describe('canUpdateRetakeIncorrectOnly', () => {
		it('returns true when retake incorrect only is editable', () => {
			const entity = new QuizAttemptsEntity(editableEntity);
			expect(entity.canUpdateRetakeIncorrectOnly()).to.be.true;
		});

		it('returns false when retake incorrect only is uneditable', () => {
			const entity = new QuizAttemptsEntity(nonEditableEntity);
			expect(entity.canUpdateRetakeIncorrectOnly()).to.be.false;
		});
	});

	describe('retakeIncorrectOnly', () => {
		it('can read boolean value of retakeIncorrectOnly', () => {
			const entity = new QuizAttemptsEntity(editableEntity);
			expect(entity.isRetakeIncorrectOnly()).to.be.true;
		});

		it('can read boolean value of retakeIncorrectOnly when attempts entity is not editable', () => {
			const entity = new QuizAttemptsEntity(nonEditableEntity);
			expect(entity.isRetakeIncorrectOnly()).to.be.true;
		});
	});
});

describe('attempt conditions', () => {
	let editableEntity, nonEditableEntity;

	beforeEach(() => {
		editableEntity = SirenParse(quizAttemptsEntity);
		nonEditableEntity = SirenParse(nonEditableAttemptsEntity);
	});

	describe('canUpdateAttemptConditions', () => {
		it('returns true when attempt conditions are editable', () => {
			const entity = new QuizAttemptsEntity(editableEntity);
			expect(entity.canUpdateAttemptConditions()).to.be.true;
		});

		it('returns false when attempt conditions are uneditable', () => {
			const entity = new QuizAttemptsEntity(nonEditableEntity);
			expect(entity.canUpdateAttemptConditions()).to.be.false;
		});
	});

	describe('attemptConditions', () => {
		it('can read attempt conditions', () => {
			const entity = new QuizAttemptsEntity(editableEntity);
			expect(entity.attemptConditions().length).to.equal(2);
			const attemptConditionEntity = entity.getAttemptConditionSubEntity(2);
			expect(attemptConditionEntity.properties.min).to.equal(22.3);
			expect(attemptConditionEntity.properties.max).to.equal(77.0);
		});

		it('can read attempt conditions when attempts entity is not editable', () => {
			const entity = new QuizAttemptsEntity(nonEditableEntity);
			expect(entity.attemptConditions().length).to.equal(2);
			const attemptConditionEntity = entity.getAttemptConditionSubEntity(2);
			expect(attemptConditionEntity.properties.min).to.equal(22.3);
			expect(attemptConditionEntity.properties.max).to.equal(77.0);
		});
	});
});
