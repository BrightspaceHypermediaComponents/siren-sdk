import { editableCollection, nonEditableCollection } from '../data/submissionViews/SubmissionViewsEntity.js';
import { QuizSubmissionViewsEntity } from '../../../../src/activities/quizzes/submissionViews/QuizSubmissionViewsEntity.js';

describe('QuizSubmissionViewsEntity', () => {
	var editableEntity, nonEditableEntity;

	beforeEach(() => {
		editableEntity = window.D2L.Hypermedia.Siren.Parse(editableCollection);
		nonEditableEntity = window.D2L.Hypermedia.Siren.Parse(nonEditableCollection);
	});

	describe('canAddView', () => {
		it('has add view action on editable entity', () => {
			var entity = new QuizSubmissionViewsEntity(editableEntity);
			expect(entity.canAddView()).to.be.true;
		});
		it('does not have add view action on non editable entity', () => {
			var entity = new QuizSubmissionViewsEntity(nonEditableEntity);
			expect(entity.canAddView()).to.be.false;
		});
	});

	describe('linkedSubmissionViews', () => {
		it('gets views', () => {
			var entity = new QuizSubmissionViewsEntity(editableEntity);
			expect(entity.linkedSubmissionViews().length).to.equal(2);
		});
	});
});
