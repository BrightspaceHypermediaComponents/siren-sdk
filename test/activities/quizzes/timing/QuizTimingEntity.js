import { recommendedQuizTiming, enforcedQuizTiming } from '../data/timing/EditableQuizTimingEntity';
import { nonEditableRecommendedQuizTiming, nonEditableEnforcedQuizTiming } from '../data/timing/NonEditableQuizTimingEntity';
import { QuizTimingEntity } from '../../../../src/activities/quizzes/timing/QuizTimingEntity.js';
import { Classes } from '../../../../src/hypermedia-constants.js';

describe('QuizTimingEntity', () => {
	var enforcedTimingEntity, recommendedTimingEntity, nonEditableEnforcedTimingEntity, nonEditableRecommendedTimingEntity;

	beforeEach(() => {
		enforcedTimingEntity = window.D2L.Hypermedia.Siren.Parse(enforcedQuizTiming);
		recommendedTimingEntity = window.D2L.Hypermedia.Siren.Parse(recommendedQuizTiming);
		nonEditableEnforcedTimingEntity = window.D2L.Hypermedia.Siren.Parse(nonEditableEnforcedQuizTiming);
		nonEditableRecommendedTimingEntity = window.D2L.Hypermedia.Siren.Parse(nonEditableRecommendedQuizTiming);
	});

	describe('timing', () => {
		describe('canEditTiming', () => {
			it('returns true when enforced timing entity can be edited', () => {
				var entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.canEditTiming()).to.be.true;
			});
			it('returns true when recommended timing entity can be edited', () => {
				var entity = new QuizTimingEntity(recommendedTimingEntity);
				expect(entity.canEditTiming()).to.be.true;
			});
		});

		describe('cannotEditTiming', () => {
			it('returns false when enforced timing entity cannot be edited', () => {
				var entity = new QuizTimingEntity(nonEditableEnforcedTimingEntity);
				expect(entity.canEditTiming()).to.be.false;
			});
			it('returns false when recommended timing entity cannot be edited', () => {
				var entity = new QuizTimingEntity(nonEditableRecommendedTimingEntity);
				expect(entity.canEditTiming()).to.be.false;
			});
		});

		describe('isTimingEnforced', () => {
			it('returns true when timing is enforced', () => {
				var entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.isTimingEnforced()).to.be.true;
				entity = new QuizTimingEntity(nonEditableEnforcedTimingEntity);
				expect(entity.isTimingEnforced()).to.be.true;
			});
			it('returns false when timing is recommended', () => {
				var entity = new QuizTimingEntity(recommendedTimingEntity);
				expect(entity.isTimingEnforced()).to.be.false;
				entity = new QuizTimingEntity(nonEditableRecommendedTimingEntity);
				expect(entity.isTimingEnforced()).to.be.false;
			});
			it('returns true when passed a value matching enforced class', () => {
				var entity = new QuizTimingEntity(recommendedTimingEntity);
				expect(entity.isTimingEnforced(Classes.quizzes.timing.enforced)).to.be.true;
			});
			it('returns false when passed a value not matching enforced class', () => {
				var entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.isTimingEnforced('not an enforced class')).to.be.false;
			});
		});
	});

	describe('timingType', () => {
		it('can get recommended timing entity', () => {
			var entity = new QuizTimingEntity(recommendedTimingEntity);
			expect(entity.hasClass(Classes.quizzes.timing.recommended)).to.be.true;
		});
		it('can get non-editable recommended timing entity', () => {
			var entity = new QuizTimingEntity(nonEditableRecommendedTimingEntity);
			expect(entity.hasClass(Classes.quizzes.timing.recommended)).to.be.true;
		});
		it('can get enforced timing entity', () => {
			var entity = new QuizTimingEntity(enforcedTimingEntity);
			expect(entity.hasClass(Classes.quizzes.timing.enforced)).to.be.true;
		});
		it('can get non-editable enforced timing entity', () => {
			var entity = new QuizTimingEntity(nonEditableEnforcedTimingEntity);
			expect(entity.hasClass(Classes.quizzes.timing.enforced)).to.be.true;
		});
	});

	describe('time limits', () => {
		describe('canEditTimeLimit', () => {
			it('can edit recommended time limit', () => {
				var entity = new QuizTimingEntity(recommendedTimingEntity);
				expect(entity.canEditTimeLimit()).to.be.true;
			});
			it('can edit enforced time limit', () => {
				var entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.canEditTimeLimit()).to.be.true;
			});
			it('cannot edit noneditable recommended time limit', () => {
				var entity = new QuizTimingEntity(nonEditableRecommendedTimingEntity);
				expect(entity.canEditTimeLimit()).to.be.false;
			});
			it('cannot edit noneditable recommended time limit', () => {
				var entity = new QuizTimingEntity(nonEditableEnforcedTimingEntity);
				expect(entity.canEditTimeLimit()).to.be.false;
			});
		});

		describe('enforcedTimeLimit', () => {
			it('can read enforced time limit', () => {
				var entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.enforcedTimeLimit().value).to.equal(120);
			});
			it('can read enforced grace period', () => {
				var entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.enforcedGraceLimit().value).to.equal(5);
			});
		});

		describe('minEnforcedTimeLimit', () => {
			it('can read min enforced time limit', () => {
				var entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.minEnforcedTimeLimit()).to.equal(1);
			});
		});

		describe('maxEnforcedTimeLimit', () => {
			it('can read max enforced time limit', () => {
				var entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.maxEnforcedTimeLimit()).to.equal(9999);
			});
		});

		describe('minEnforcedGraceLimit', () => {
			it('can read min enforced grace limit', () => {
				var entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.minEnforcedGraceLimit()).to.equal(1);
			});
		});

		describe('maxEnforcedGraceLimit', () => {
			it('can read max enforced grace limit', () => {
				var entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.maxEnforcedGraceLimit()).to.equal(2147483647);
			});
		});

		describe('canEditGracePeriod', () => {
			it('return true when can edit grace period', () => {
				var entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.canEditGracePeriod()).to.be.true;
			});
		});

		describe('recommendedTimeLimit', () => {
			it('can read recommended time limit', () => {
				var entity = new QuizTimingEntity(recommendedTimingEntity);
				expect(entity.recommendedTimeLimit().value).to.equal(120);
			});
		});

		describe('minRecommendedTimeLimit', () => {
			it('can read min recommended time limit', () => {
				var entity = new QuizTimingEntity(recommendedTimingEntity);
				expect(entity.minRecommendedTimeLimit()).to.equal(1);
			});
		});

		describe('maxRecommendedTimeLimit', () => {
			it('can read max recommended time limit', () => {
				var entity = new QuizTimingEntity(recommendedTimingEntity);
				expect(entity.maxRecommendedTimeLimit()).to.equal(9999);
			});
		});
	});

	describe('extended deadline', () => {
		describe('canEditExtendedDeadline', () => {
			it('returns true when can edit extended deadline', () => {
				var entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.canEditExtendedDeadline()).to.be.true;
			});
			it('returns true when cannot edit extended deadline', () => {
				var entity = new QuizTimingEntity(nonEditableEnforcedTimingEntity);
				expect(entity.canEditExtendedDeadline()).to.be.false;
			});
		});
		describe('getExtendedDeadline', () => {
			it('can get extended deadline from enforced entity', () => {
				var entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.getExtendedDeadline()).to.equal(1);
			});
			it('can get extended deadline from non-editable enforced entity', () => {
				var entity = new QuizTimingEntity(nonEditableEnforcedTimingEntity);
				expect(entity.getExtendedDeadline()).to.equal(1);
			});
		});
	});

	describe('exceeded time limit', () => {
		describe('canEditExceededTimeLimitBehaviour', () => {
			it('returns true when can edit exceeded time limit behaviour', () => {
				var entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.canEditExceededTimeLimitBehaviour()).to.be.true;
			});
			it('returns false when cannot edit exceeded time limit behaviour', () => {
				var entity = new QuizTimingEntity(nonEditableEnforcedTimingEntity);
				expect(entity.canEditExceededTimeLimitBehaviour()).to.be.false;
			});
		});
	});

	describe('getSubmissionLateTypeIdTitle', () => {
		it('cannot get submission late type Id title from enforced entity', () => {
			var entity = new QuizTimingEntity(enforcedTimingEntity);
			expect(entity.getSubmissionLateTypeIdTitle()).to.be.undefined;
		});
		it('can get submission late type Id title from non-editable enforced entity', () => {
			var entity = new QuizTimingEntity(nonEditableEnforcedTimingEntity);
			expect(entity.getSubmissionLateTypeIdTitle()).to.equal('After the grace period, flag the quiz attempt as exceeded time limit, and allow the student to continue working. Quiz attempt will be automatically scored as zero after an extended deadline.');
		});
	});

	describe('show clock', () => {
		describe('showClock', () => {
			it('returns true when showClock is checked', () => {
				var entity = new QuizTimingEntity(recommendedTimingEntity);
				expect(entity.showClock()).to.be.true;
				entity = new QuizTimingEntity(nonEditableRecommendedTimingEntity);
				expect(entity.showClock()).to.be.true;
			});
		});
		describe('canEditShowClock', () => {
			it('returns true when can edit showClock', () => {
				var entity = new QuizTimingEntity(recommendedTimingEntity);
				expect(entity.canEditShowClock()).to.be.true;
			});
			it('returns false when cannot edit showClock', () => {
				var entity = new QuizTimingEntity(nonEditableRecommendedTimingEntity);
				expect(entity.canEditShowClock()).to.be.false;
			});
		});
	});

	describe('automatic zero', () => {
		describe('isAutomaticZero', () => {
			it('returns true extended deadline automatic zero is selected', () => {
				var entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.isAutomaticZero()).to.be.true;
			});
			it('returns true if passed value matching automatic zero class', () => {
				var entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.isAutomaticZero(Classes.quizzes.timing.automaticZero)).to.be.true;
			});
			it('returns false if passed value not matching automatic zero class', () => {
				var entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.isAutomaticZero('not true')).to.be.false;
			});
		});
	});
});
