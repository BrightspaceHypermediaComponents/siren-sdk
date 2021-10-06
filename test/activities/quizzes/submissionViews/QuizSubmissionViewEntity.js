import { editablePrimaryView, editableSecondaryView } from '../data/submissionViews/SubmissionViewEntity';
import { QuizSubmissionViewEntity } from '../../../../src/activities/quizzes/submissionViews/QuizSubmissionViewEntity';

describe('QuizSubmissionViewEntity', () => {
	var editablePrimaryViewEntity, editableSecondaryViewEntity;

	beforeEach(() => {
		editablePrimaryViewEntity = window.D2L.Hypermedia.Siren.Parse(editablePrimaryView);
		editableSecondaryViewEntity = window.D2L.Hypermedia.Siren.Parse(editableSecondaryView);
	});

	describe('isPrimaryView', () => {
		it('is primary view and should be true', () => {
			var entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
			expect(entity.isPrimaryView()).to.be.true;
		});
		it('is secondary view and should be false', () => {
			var entity = new QuizSubmissionViewEntity(editableSecondaryViewEntity);
			expect(entity.isPrimaryView()).to.be.false;
		});
	});
});
