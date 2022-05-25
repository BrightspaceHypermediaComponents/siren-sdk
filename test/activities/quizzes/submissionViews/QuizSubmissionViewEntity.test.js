import { editablePrimaryView, editableSecondaryView, nonEditablePrimaryView, nonEditableSecondaryView } from '../data/submissionViews/SubmissionViewEntity.js';
import { expect } from '@open-wc/testing';
import { QuizSubmissionViewEntity } from '../../../../src/activities/quizzes/submissionViews/QuizSubmissionViewEntity.js';
import SirenParse from 'siren-parser';

describe('QuizSubmissionViewEntity', () => {
	let editablePrimaryViewEntity, editableSecondaryViewEntity, nonEditablePrimaryViewEntity, nonEditableSecondaryViewEntity;

	beforeEach(() => {
		editablePrimaryViewEntity = SirenParse(editablePrimaryView);
		editableSecondaryViewEntity = SirenParse(editableSecondaryView);
		nonEditablePrimaryViewEntity = SirenParse(nonEditablePrimaryView);
		nonEditableSecondaryViewEntity = SirenParse(nonEditableSecondaryView);
	});

	describe('Can delete submission view', () => {
		it('can delete as secondary view has action', () => {
			const entity = new QuizSubmissionViewEntity(editableSecondaryViewEntity);
			expect(entity.canDeleteSubmissionView()).to.be.true;
		});
		it('cannot delete as primary view does not have the action', () => {
			const entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
			expect(entity.canDeleteSubmissionView()).to.be.false;
		});
	});

	describe('Is Primary View', () => {
		it('is primary view and should be true', () => {
			const entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
			expect(entity.isPrimaryView()).to.be.true;
		});
		it('is secondary view and should be false', () => {
			const entity = new QuizSubmissionViewEntity(editableSecondaryViewEntity);
			expect(entity.isPrimaryView()).to.be.false;
		});
	});

	describe('Is Standards Supported', () => {
		it('isStandardsSupported should be true', () => {
			const entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
			expect(entity.isStandardsSupported()).to.be.true;
		});
	});

	describe('Is Ip Restrictions Supported', () => {
		it('isIpRestrictions on primary view should be false', () => {
			const entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
			expect(entity.isIpRestrictionsSupported()).to.be.false;
		});

		it('isIpRestrictions on secondary view should be true', () => {
			const entity = new QuizSubmissionViewEntity(editableSecondaryViewEntity);
			expect(entity.isIpRestrictionsSupported()).to.be.true;
		});
	});

	describe('Attempt Restrictions', () => {
		it('returns correct value from editable secondary view entity', () => {
			const entity = new QuizSubmissionViewEntity(editableSecondaryViewEntity);
			expect(entity.attemptRestrictions()).to.be.true;
		});
		it('returns correct value from non editable secondary view entity', () => {
			const entity = new QuizSubmissionViewEntity(nonEditableSecondaryViewEntity);
			expect(entity.attemptRestrictions()).to.be.true;
		});
		it('should have action as it is editable secondary entity', () => {
			const entity = new QuizSubmissionViewEntity(editableSecondaryViewEntity);
			expect(entity.canUpdateAttemptRestrictions()).to.be.true;
		});
		it('should not have action as it is non editable secondary entity', () => {
			const entity = new QuizSubmissionViewEntity(nonEditableSecondaryViewEntity);
			expect(entity.canUpdateAttemptRestrictions()).to.be.false;
		});
		it('should not have action as it is editable primary entity', () => {
			const entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
			expect(entity.canUpdateAttemptRestrictions()).to.be.false;
		});
	});

	describe('IP Restrictions', () => {
		it('returns correct value from editable secondary view entity', () => {
			const entity = new QuizSubmissionViewEntity(editableSecondaryViewEntity);
			expect(entity.ipRestrictions()).to.be.true;
		});
		it('returns correct value from non editable secondary view entity', () => {
			const entity = new QuizSubmissionViewEntity(nonEditableSecondaryViewEntity);
			expect(entity.ipRestrictions()).to.be.true;
		});
		it('should have action as it is editable secondary entity', () => {
			const entity = new QuizSubmissionViewEntity(editableSecondaryViewEntity);
			expect(entity.canUpdateIpRestrictions()).to.be.true;
		});
		it('should not have action as it is non editable secondary entity', () => {
			const entity = new QuizSubmissionViewEntity(nonEditableSecondaryViewEntity);
			expect(entity.canUpdateIpRestrictions()).to.be.false;
		});
		it('should not have action as it is editable primary entity', () => {
			const entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
			expect(entity.canUpdateIpRestrictions()).to.be.false;
		});
	});

	describe('Time Limit', () => {
		it('returns correct value from editable secondary view entity', () => {
			const entity = new QuizSubmissionViewEntity(editableSecondaryViewEntity);
			expect(entity.timeLimit()).to.be.true;
		});
		it('returns correct value from non editable secondary view entity', () => {
			const entity = new QuizSubmissionViewEntity(nonEditableSecondaryViewEntity);
			expect(entity.timeLimit()).to.be.true;
		});
		it('should have action as it is editable secondary entity', () => {
			const entity = new QuizSubmissionViewEntity(editableSecondaryViewEntity);
			expect(entity.canUpdateTimeLimit()).to.be.true;
		});
		it('should not have action as it is non editable secondary entity', () => {
			const entity = new QuizSubmissionViewEntity(nonEditableSecondaryViewEntity);
			expect(entity.canUpdateTimeLimit()).to.be.false;
		});
		it('should not have action as it is editable primary entity', () => {
			const entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
			expect(entity.canUpdateTimeLimit()).to.be.false;
		});
	});

	describe('Show standards', () => {
		it('returns correct value from editable entity', () => {
			const entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
			expect(entity.showStandards()).to.be.true;
		});
		it('returns correct value from non editable entity', () => {
			const entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
			expect(entity.showStandards()).to.be.true;
		});
		it('should have action as it is editable', () => {
			const entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
			expect(entity.canUpdateShowStandards()).to.be.true;
		});
		it('should not have action as it is non editable', () => {
			const entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
			expect(entity.canUpdateShowStandards()).to.be.false;
		});
	});

	describe('Show attempt score', () => {
		it('returns correct value from editable entity', () => {
			const entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
			expect(entity.showAttemptScore()).to.be.false;
		});
		it('returns correct value from non editable entity', () => {
			const entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
			expect(entity.showAttemptScore()).to.be.true;
		});
		it('should have action as it is editable', () => {
			const entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
			expect(entity.canUpdateShowAttemptScore()).to.be.true;
		});
		it('should not have action as it is non editable', () => {
			const entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
			expect(entity.canUpdateShowAttemptScore()).to.be.false;
		});
	});

	describe('Show stats class average', () => {
		it('returns correct value from editable entity', () => {
			const entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
			expect(entity.showStatsClassAverage()).to.be.true;
		});
		it('returns correct value from non editable entity', () => {
			const entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
			expect(entity.showStatsClassAverage()).to.be.true;
		});
		it('should have action as it is editable', () => {
			const entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
			expect(entity.canUpdateShowStatsClassAverage()).to.be.true;
		});
		it('should not have action as it is non editable', () => {
			const entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
			expect(entity.canUpdateShowStatsClassAverage()).to.be.false;
		});
	});

	describe('Show stats score distribution', () => {
		it('returns correct value from editable entity', () => {
			const entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
			expect(entity.showStatsScoreDistribution()).to.be.false;
		});
		it('returns correct value from non editable entity', () => {
			const entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
			expect(entity.showStatsScoreDistribution()).to.be.true;
		});
		it('should have action as it is editable', () => {
			const entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
			expect(entity.canUpdateShowStatsScoreDistribution()).to.be.true;
		});
		it('should not have action as it is non editable', () => {
			const entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
			expect(entity.canUpdateShowStatsScoreDistribution()).to.be.false;
		});
	});

	describe('Message Sub-entity', () => {
		it('correctly identifies editable entity as richtext', () => {
			const entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
			expect(entity.isMessageRichtext()).to.be.true;
		});
		it('correctly identifies non editable entity as richtext', () => {
			const entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
			expect(entity.isMessageRichtext()).to.be.true;
		});
		it('returns correct message text from editable entity', () => {
			const entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
			expect(entity.messageText()).to.be.equal('hello');
		});
		it('returns correct message text from non editable entity', () => {
			const entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
			expect(entity.messageText()).to.be.equal('hello');
		});
		it('returns correct message HTML from editable entity', () => {
			const entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
			expect(entity.messageHtml()).to.be.equal('<p>hello</p>');
		});
		it('returns correct message HTML from non editable entity', () => {
			const entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
			expect(entity.messageHtml()).to.be.equal('<p>hello</p>');
		});
		it('should have action as it is editable', () => {
			const entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
			expect(entity.canUpdateMessage()).to.be.true;
		});
		it('should not have action as it is non editable', () => {
			const entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
			expect(entity.canUpdateMessage()).to.be.false;
		});
	});

	describe('Release Date Sub-entity', () => {
		it('returns correct release date', () => {
			const entity = new QuizSubmissionViewEntity(nonEditableSecondaryViewEntity);
			expect(entity.releaseDate()).to.be.equal('2021-01-03T04:59:59.000Z');
		});
		it('should have action as it is editable secondary view', () => {
			const entity = new QuizSubmissionViewEntity(editableSecondaryViewEntity);
			expect(entity.canUpdateReleaseDate()).to.be.true;
		});
		it('should not have action as it is non editable secondary view', () => {
			const entity = new QuizSubmissionViewEntity(nonEditableSecondaryViewEntity);
			expect(entity.canUpdateReleaseDate()).to.be.false;
		});
		it('should not have action as it is a primary view', () => {
			const entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
			expect(entity.canUpdateReleaseDate()).to.be.undefined;
		});
	});

	describe('Time Limit Sub-entity', () => {
		it('returns correct time limit for editable secondary view', () => {
			const entity = new QuizSubmissionViewEntity(editableSecondaryViewEntity);
			const actualTimeLimitNumber = entity.timeLimitNumber();
			expect(actualTimeLimitNumber.value).to.be.equal(120);
			expect(actualTimeLimitNumber.min).to.be.equal(1);
			expect(actualTimeLimitNumber.max).to.be.equal(9999);
		});
		it('returns correct time limit for non editable secondary view', () => {
			const entity = new QuizSubmissionViewEntity(nonEditableSecondaryViewEntity);
			expect(entity.timeLimitNumber().value).to.be.equal(120);
		});
		it('should have action as it is editable secondary view', () => {
			const entity = new QuizSubmissionViewEntity(editableSecondaryViewEntity);
			expect(entity.canUpdateTimeLimitNumber()).to.be.true;
		});
		it('should not have action as it is non editable secondary view', () => {
			const entity = new QuizSubmissionViewEntity(nonEditableSecondaryViewEntity);
			expect(entity.canUpdateTimeLimitNumber()).to.be.false;
		});
		it('should not have action as it is a primary view', () => {
			const entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
			expect(entity.canUpdateTimeLimitNumber()).to.be.undefined;
		});
	});

	describe('Attempt Restrictions Sub-entity', () => {
		describe('attempt restrictions', () => {
			it('returns correct attempt restrictions for editable secondary view', () => {
				const entity = new QuizSubmissionViewEntity(editableSecondaryViewEntity);
				expect(entity.attemptRestrictionNumber()).to.be.equal(1);
			});
			it('returns correct attempt restrictions for non editable secondary view', () => {
				const entity = new QuizSubmissionViewEntity(nonEditableSecondaryViewEntity);
				expect(entity.attemptRestrictionNumber()).to.be.equal(1);
			});
			it('should have action as it is editable secondary view', () => {
				const entity = new QuizSubmissionViewEntity(editableSecondaryViewEntity);
				expect(entity.canUpdateAttemptRestrictionNumber()).to.be.true;
			});
			it('should not have action as it is non editable secondary view', () => {
				const entity = new QuizSubmissionViewEntity(nonEditableSecondaryViewEntity);
				expect(entity.canUpdateAttemptRestrictionNumber()).to.be.false;
			});
			it('should not have action as it is a primary view', () => {
				const entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
				expect(entity.canUpdateAttemptRestrictionNumber()).to.be.undefined;
			});
		});

		describe('attemptRestrictionsOptions', () => {
			it('returns correct attemptRestrictionsOptions for editable secondary view', () => {
				const entity = new QuizSubmissionViewEntity(editableSecondaryViewEntity);
				expect(entity.attemptRestrictionsOptions().length).to.equal(3);
			});
			it('returns correct attemptRestrictionsOptions for non editable secondary view', () => {
				const entity = new QuizSubmissionViewEntity(nonEditableSecondaryViewEntity);
				expect(entity.attemptRestrictionsOptions()).to.be.undefined;
			});
			it('returns correct attemptRestrictionsOptions for primary view', () => {
				const entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
				expect(entity.attemptRestrictionsOptions()).to.be.undefined;
			});
		});

		describe('grade restrictions', () => {
			it('returns correct grade restrictions for editable secondary view', () => {
				const entity = new QuizSubmissionViewEntity(editableSecondaryViewEntity);
				expect(entity.gradeRestrictions()).to.be.true;
			});
			it('returns correct grade restrictions for non editable secondary view', () => {
				const entity = new QuizSubmissionViewEntity(nonEditableSecondaryViewEntity);
				expect(entity.gradeRestrictions()).to.be.true;
			});
			it('should have action as it is editable secondary view', () => {
				const entity = new QuizSubmissionViewEntity(editableSecondaryViewEntity);
				expect(entity.canUpdateGradeRestrictions()).to.be.true;
			});
			it('should not have action as it is non editable secondary view', () => {
				const entity = new QuizSubmissionViewEntity(nonEditableSecondaryViewEntity);
				expect(entity.canUpdateGradeRestrictions()).to.be.false;
			});
			it('should not have action as it is a primary view', () => {
				const entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
				expect(entity.canUpdateGradeRestrictions()).to.be.undefined;
			});
		});
	});

	describe('Grade Restrictions Sub-entity', () => {
		it('returns correct grade restrictions min max grade for editable secondary view', () => {
			const entity = new QuizSubmissionViewEntity(editableSecondaryViewEntity);
			const actualMinMaxGrade = entity.gradeRestrictionsMinMaxGrade();

			const minGrade = actualMinMaxGrade['min-grade'];
			expect(minGrade.value).to.be.equal(0);
			expect(minGrade.min).to.be.equal(0);
			expect(minGrade.max).to.be.equal(100);

			const maxGrade = actualMinMaxGrade['max-grade'];
			expect(maxGrade.value).to.be.equal(100);
			expect(maxGrade.min).to.be.equal(0);
			expect(maxGrade.max).to.be.equal(100);
		});
		it('returns correct grade restrictions min max grade for non editable secondary view', () => {
			const entity = new QuizSubmissionViewEntity(nonEditableSecondaryViewEntity);
			const actualMinMaxGrade = entity.gradeRestrictionsMinMaxGrade();

			const minGrade = actualMinMaxGrade['min-grade'];
			expect(minGrade.value).to.be.equal(0.0);

			const maxGrade = actualMinMaxGrade['max-grade'];
			expect(maxGrade.value).to.be.equal(100.0);
		});
		it('should have action as it is editable secondary view', () => {
			const entity = new QuizSubmissionViewEntity(editableSecondaryViewEntity);
			expect(entity.canUpdateGradeRestrictionsMinMaxGrade()).to.be.true;
		});
		it('should not have action as it is non editable secondary view', () => {
			const entity = new QuizSubmissionViewEntity(nonEditableSecondaryViewEntity);
			expect(entity.canUpdateGradeRestrictionsMinMaxGrade()).to.be.false;
		});
		it('should not have action as it is a primary view', () => {
			const entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
			expect(entity.canUpdateGradeRestrictionsMinMaxGrade()).to.be.undefined;
		});
	});

	describe('Hide Show Questions Sub-entity', () => {
		it('returns correct value from editable entity', () => {
			const entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
			expect(entity.hideQuestions()).to.be.true;
		});
		it('returns correct value from non editable entity', () => {
			const entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
			expect(entity.hideQuestions()).to.be.true;
		});
		it('should have action as it is editable', () => {
			const entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
			expect(entity.canUpdateHideShowQuestions()).to.be.true;
		});
		it('should not have action as it is non editable', () => {
			const entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
			expect(entity.canUpdateHideShowQuestions()).to.be.false;
		});

		describe('Show Questions Sub-entity', () => {
			describe('Show Questions', () => {
				it('returns correct value from editable entity', () => {
					const entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
					expect(entity.showQuestionsType()).to.equal('incorrect-questions');
				});
				it('returns correct value from non editable entity', () => {
					const entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
					expect(entity.showQuestionsType()).to.equal('all-questions');
				});
				it('should have action as it is editable', () => {
					const entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
					expect(entity.canUpdateShowQuestions()).to.be.true;
				});
				it('should not have action as it is non editable', () => {
					const entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
					expect(entity.canUpdateShowQuestions()).to.be.false;
				});
			});

			describe('Show Question Types', () => {
				it('returns correct value from editable entity', () => {
					const entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
					expect(entity.showQuestionsOptions().length).to.equal(3);
				});
				it('returns undefined from non editable entity', () => {
					const entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
					expect(entity.showQuestionsOptions()).to.be.undefined;
				});
			});

			describe('Show correct answers', () => {
				it('returns correct value from editable entity', () => {
					const entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
					expect(entity.showCorrectAnswers()).to.be.true;
				});
				it('returns correct value from non editable entity', () => {
					const entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
					expect(entity.showCorrectAnswers()).to.be.true;
				});
				it('should have action as it is editable', () => {
					const entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
					expect(entity.canUpdateShowCorrectAnswers()).to.be.true;
				});
				it('should not have action as it is non editable', () => {
					const entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
					expect(entity.canUpdateShowCorrectAnswers()).to.be.false;
				});
			});

			describe('Show learner responses', () => {
				it('returns correct value from editable entity', () => {
					const entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
					expect(entity.showLearnerResponses()).to.be.false;
				});
				it('returns correct value from non editable entity', () => {
					const entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
					expect(entity.showLearnerResponses()).to.be.true;
				});
				it('should have action as it is editable', () => {
					const entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
					expect(entity.canUpdateShowLearnerResponses()).to.be.true;
				});
				it('should not have action as it is non editable', () => {
					const entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
					expect(entity.canUpdateShowLearnerResponses()).to.be.false;
				});
			});

			describe('Show question score', () => {
				it('returns correct value from editable entity', () => {
					const entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
					expect(entity.showQuestionScore()).to.be.true;
				});
				it('returns correct value from non editable entity', () => {
					const entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
					expect(entity.showQuestionScore()).to.be.true;
				});
				it('should have action as it is editable', () => {
					const entity = new QuizSubmissionViewEntity(editablePrimaryViewEntity);
					expect(entity.canUpdateShowQuestionScore()).to.be.true;
				});
				it('should not have action as it is non editable', () => {
					const entity = new QuizSubmissionViewEntity(nonEditablePrimaryViewEntity);
					expect(entity.canUpdateShowQuestionScore()).to.be.false;
				});
			});
		});
	});
});
