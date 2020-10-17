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
			})).to.be.true;
		});

		it('return false when not equal', () => {
			var quizEntity = new QuizEntity(editableEntity);
			expect(quizEntity.equals({
				name: 'This is a terrible quiz',
			})).to.be.false;
		});
	});
});
