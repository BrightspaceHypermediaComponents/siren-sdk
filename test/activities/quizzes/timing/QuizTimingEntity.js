import { recommendedQuizTiming, enforcedQuizTiming } from '../data/timing/EditableQuizTimingEntity';
import { nonEditableRecommendedQuizTiming, nonEditableEnforcedQuizTiming } from '../data/timing/NonEditableQuizTimingEntity';
import { QuizTimingEntity } from '../../../../src/activities/quizzes/timing/QuizTimingEntity.js';

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
				entity = new QuizTimingEntity(nonEditableRecommendedQuizTiming);
				expect(entity.isTimingEnforced()).to.be.false;
			});
		});
	});

	describe('time limits', () => {
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
				expect(entity.recommendedTimeLimit()).to.equal(120);
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
		});
	});
});
