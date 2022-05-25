import { editableCollection, nonEditableCollection } from '../data/submissionViews/SubmissionViewsEntity.js';
import { expect } from '@open-wc/testing';
import { QuizSubmissionViewsEntity } from '../../../../src/activities/quizzes/submissionViews/QuizSubmissionViewsEntity.js';
import SirenParse from 'siren-parser';

describe('QuizSubmissionViewsEntity', () => {
	let editableEntity, nonEditableEntity;

	beforeEach(() => {
		editableEntity = SirenParse(editableCollection);
		nonEditableEntity = SirenParse(nonEditableCollection);
	});

	describe('canAddView', () => {
		it('has add view action on editable entity', () => {
			const entity = new QuizSubmissionViewsEntity(editableEntity);
			expect(entity.canAddView()).to.be.true;
		});
		it('does not have add view action on non editable entity', () => {
			const entity = new QuizSubmissionViewsEntity(nonEditableEntity);
			expect(entity.canAddView()).to.be.false;
		});
	});

	describe('linkedSubmissionViews', () => {
		it('gets views', () => {
			const entity = new QuizSubmissionViewsEntity(editableEntity);
			expect(entity.linkedSubmissionViews().length).to.equal(2);
		});
	});
});
