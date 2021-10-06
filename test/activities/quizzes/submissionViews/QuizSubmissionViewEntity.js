import { editablePrimaryView, editableSecondaryView, nonEditablePrimaryView } from '../data/submissionViews/SubmissionViewEntity';
import { QuizSubmissionViewEntity } from '../../../../src/activities/quizzes/submissionViews/QuizSubmissionViewEntity';

describe('QuizSubmissionViewEntity', () => {
	var editablePrimaryViewEntity, editableSecondaryViewEntity, nonEditablePrimaryViewEntity;

	beforeEach(() => {
		editablePrimaryViewEntity = window.D2L.Hypermedia.Siren.Parse(editablePrimaryView);
		editableSecondaryViewEntity = window.D2L.Hypermedia.Siren.Parse(editableSecondaryView);
		nonEditablePrimaryViewEntity = window.D2L.Hypermedia.Siren.Parse(nonEditablePrimaryView);
	});

	describe('Is Primary View', () => {
		it('is primary view and should be true', () => {
			var entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
			expect(entity.isPrimaryView()).to.be.true;
		});
		it('is secondary view and should be false', () => {
			var entity = new QuizSubmissionViewEntity(editableSecondaryViewEntity);
			expect(entity.isPrimaryView()).to.be.false;
		});
	});

	describe('Show standards', () => {
		it('returns correct value from editable entity', () => {
			var entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
			expect(entity.showStandards()).to.be.true;
		});
		it('returns correct value from non editable entity', () => {
			var entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
			expect(entity.showStandards()).to.be.true;
		});
		it('should have action as it is editable', () => {
			var entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
			expect(entity.canUpdateShowStandards()).to.be.true;
		});
		it('should not have action as it is non editable', () => {
			var entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
			expect(entity.canUpdateShowStandards()).to.be.false;
		});
	});

	describe('Show attempt score', () => {
		it('returns correct value from editable entity', () => {
			var entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
			expect(entity.showAttemptScore()).to.be.false;
		});
		it('returns correct value from non editable entity', () => {
			var entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
			expect(entity.showAttemptScore()).to.be.true;
		});
		it('should have action as it is editable', () => {
			var entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
			expect(entity.canUpdateShowAttemptScore()).to.be.true;
		});
		it('should not have action as it is non editable', () => {
			var entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
			expect(entity.canUpdateShowAttemptScore()).to.be.false;
		});
	});

	describe('Show stats class average', () => {
		it('returns correct value from editable entity', () => {
			var entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
			expect(entity.showStatsClassAverage()).to.be.true;
		});
		it('returns correct value from non editable entity', () => {
			var entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
			expect(entity.showStatsClassAverage()).to.be.true;
		});
		it('should have action as it is editable', () => {
			var entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
			expect(entity.canUpdateShowStatsClassAverage()).to.be.true;
		});
		it('should not have action as it is non editable', () => {
			var entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
			expect(entity.canUpdateShowStatsClassAverage()).to.be.false;
		});
	});

	describe('Show stats score distribution', () => {
		it('returns correct value from editable entity', () => {
			var entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
			expect(entity.showStatsScoreDistribution()).to.be.false;
		});
		it('returns correct value from non editable entity', () => {
			var entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
			expect(entity.showStatsScoreDistribution()).to.be.true;
		});
		it('should have action as it is editable', () => {
			var entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
			expect(entity.canUpdateShowStatsScoreDistribution()).to.be.true;
		});
		it('should not have action as it is non editable', () => {
			var entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
			expect(entity.canUpdateShowStatsScoreDistribution()).to.be.false;
		});
	});

	describe('Message Sub-entity', () => {
		describe('Message', () => {
			it('returns correct message text from editable entity', () => {
				var entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
				expect(entity.messageText()).to.equal('hello');
			});
			it('returns correct message text from non editable entity', () => {
				var entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
				expect(entity.messageText()).to.be.equal('hello');
			});
			it('returns correct message HTML from editable entity', () => {
				var entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
				expect(entity.messageHtml()).to.be.equal('<p>hello</p>');
			});
			it('returns correct message HTML from non editable entity', () => {
				var entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
				expect(entity.messageHtml()).to.be.equal('<p>hello</p>');
			});
			it('should have action as it is editable', () => {
				var entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
				expect(entity.canUpdateMessage()).to.be.true;
			});
			it('should not have action as it is non editable', () => {
				var entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
				expect(entity.canUpdateMessage()).to.be.false;
			});
		});
	});

	describe('Hide Show Questions Sub-entity', () => {
		describe('Hide Questions', () => {
			it('returns correct value from editable entity', () => {
				var entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
				expect(entity.hideQuestions()).to.be.true;
			});
			it('returns correct value from non editable entity', () => {
				var entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
				expect(entity.hideQuestions()).to.be.true;
			});
			it('should have action as it is editable', () => {
				var entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
				expect(entity.canUpdateHideShowQuestions()).to.be.true;
			});
			it('should not have action as it is non editable', () => {
				var entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
				expect(entity.canUpdateHideShowQuestions()).to.be.false;
			});
		});

		describe('Show Question Sub-entity', () => {
			describe('Show Questions', () => {
				it('returns correct value from editable entity', () => {
					var entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
					expect(entity.showQuestionsType()).to.equal('incorrect-questions');
				});
				it('returns correct value from non editable entity', () => {
					var entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
					expect(entity.showQuestionsType()).to.equal('all-questions');
				});
				it('should have action as it is editable', () => {
					var entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
					expect(entity.canUpdateShowQuestions()).to.be.true;
				});
				it('should not have action as it is non editable', () => {
					var entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
					expect(entity.canUpdateShowQuestions()).to.be.false;
				});
			});

			describe('Show Question Types', () => {
				it('returns correct value from editable entity', () => {
					var entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
					expect(entity.showQuestionsOptions().length).to.equal(3);
				});
				it('returns undefined from non editable entity', () => {
					var entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
					expect(entity.showQuestionsOptions()).to.be.undefined;
				});
			});

			describe('Show correct answers', () => {
				it('returns correct value from editable entity', () => {
					var entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
					expect(entity.showCorrectAnswers()).to.be.true;
				});
				it('returns correct value from non editable entity', () => {
					var entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
					expect(entity.showCorrectAnswers()).to.be.true;
				});
				it('should have action as it is editable', () => {
					var entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
					expect(entity.canUpdateShowCorrectAnswers()).to.be.true;
				});
				it('should not have action as it is non editable', () => {
					var entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
					expect(entity.canUpdateShowCorrectAnswers()).to.be.false;
				});
			});

			describe('Show learner responses', () => {
				it('returns correct value from editable entity', () => {
					var entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
					expect(entity.showLearnerResponses()).to.be.false;
				});
				it('returns correct value from non editable entity', () => {
					var entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
					expect(entity.showLearnerResponses()).to.be.true;
				});
				it('should have action as it is editable', () => {
					var entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
					expect(entity.canUpdateShowLearnerResponses()).to.be.true;
				});
				it('should not have action as it is non editable', () => {
					var entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
					expect(entity.canUpdateShowLearnerResponses()).to.be.false;
				});
			});

			describe('Show question score', () => {
				it('returns correct value from editable entity', () => {
					var entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
					expect(entity.showQuestionScore()).to.be.true;
				});
				it('returns correct value from non editable entity', () => {
					var entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
					expect(entity.showQuestionScore()).to.be.true;
				});
				it('should have action as it is editable', () => {
					var entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
					expect(entity.canUpdateShowQuestionScore()).to.be.true;
				});
				it('should not have action as it is non editable', () => {
					var entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
					expect(entity.canUpdateShowQuestionScore()).to.be.false;
				});
			});
		});
	});
});
