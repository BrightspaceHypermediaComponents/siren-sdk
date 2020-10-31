/* global fetchMock */

import { QuizEntity } from '../../../src/activities/quizzes/QuizEntity.js';
import { nonEditableQuiz } from './data/NoneditableQuiz';
import { editableQuiz } from './data/EditableQuiz.js';

describe('QuizEntity', () => {
	var editableEntity, nonEditableEntity;

	beforeEach(() => {
		nonEditableEntity = window.D2L.Hypermedia.Siren.Parse(nonEditableQuiz);
		editableEntity = window.D2L.Hypermedia.Siren.Parse(editableQuiz);
	});

	afterEach(() => {
		fetchMock.reset();
	});

	describe('Basic loading', () => {
		it('reads name', () => {
			var quizEntity = new QuizEntity(nonEditableEntity);
			expect(quizEntity.name()).to.equal('What a great quiz');
		});
	});

	describe('Editable', () => {
		it('sets canEditName to true', () => {
			var quizEntity = new QuizEntity(editableEntity);
			expect(quizEntity.canEditName()).to.be.true;
		});
	});

	describe('Non Editable', () => {
		it('sets canEditName to false', () => {
			var quizEntity = new QuizEntity(nonEditableEntity);
			expect(quizEntity.canEditName()).to.be.false;
		});
	});

	describe('Equals', () => {
		it('return true when equal', () => {
			var quizEntity = new QuizEntity(editableEntity);
			expect(quizEntity.equals({
				name: 'What a great quiz',
				allowHints: true
			})).to.be.true;
		});

		it('return false when not equal', () => {
			var quizEntity = new QuizEntity(editableEntity);
			expect(quizEntity.equals({
				name: 'This is a terrible quiz',
				allowHints: undefined
			})).to.be.false;
		});
	});

	describe('canEditHints', () => {
		it('returns true when hints are editable', () => {
			var quizEntity = new QuizEntity(editableEntity);
			expect(quizEntity.canEditHints()).to.be.true;
		});

		it('returns false when hints are not editable', () => {
			var quizEntity = new QuizEntity(nonEditableEntity);
			expect(quizEntity.canEditHints()).to.be.false;
		});
	});

	describe('getHintsToolEnabled', () => {
		it('returns true when hints are enabled', () => {
			var quizEntity = new QuizEntity(editableEntity);
			expect(quizEntity.getHintsToolEnabled()).to.be.true;
		});

		it('returns false when hints are not enabled', () => {
			var quizEntity = new QuizEntity(nonEditableEntity);
			expect(quizEntity.getHintsToolEnabled()).to.be.false;
		});
	});
});
