import { enforcedQuizTiming } from '../data/timing/EnforcedQuizTimingEntity';
import { recommendedQuizTiming } from '../data/timing/RecommendedQuizTimingEntity';
import { QuizTimingEntity } from '../../../../src/activities/quizzes/timing/QuizTimingEntity.js';

describe('QuizTimingEntity', () => {
	var enforcedTimingEntity, recommendedTimingEntity;

	beforeEach(() => {
		enforcedTimingEntity = window.D2L.Hypermedia.Siren.Parse(enforcedQuizTiming);
		recommendedTimingEntity = window.D2L.Hypermedia.Siren.Parse(recommendedQuizTiming);
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
		describe('isTimingEnforced', () => {
			it('returns true when timing is enforced ', () => {
				var entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.isTimingEnforced()).to.be.true;
			});
			it('returns false when timing is recommended ', () => {
				var entity = new QuizTimingEntity(recommendedTimingEntity);
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
		describe('recommendedTimeLimit', () => {
			it('can read recommended time limit', () => {
				var entity = new QuizTimingEntity(recommendedTimingEntity);
				expect(entity.recommendedTimeLimit()).to.equal(120);
			});
		});
		describe('canEditGracePeriod', () => {
			it('return true when can edit grace period', () => {
				var entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.canEditGracePeriod()).to.be.true;
			});
		});
	});

	describe('extended deadline', () => {
		describe('canEditExtendedDeadline', () => {
			it('return true when can edit extended deadline', () => {
				var entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.canEditExtendedDeadline()).to.be.true;
			});
		});
	});

	describe('exceeded time limit', () => {
		describe('canEditExceededTimeLimitBehaviour', () => {
			it('return true when can edit exceeded time limit behaviour', () => {
				var entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.canEditExceededTimeLimitBehaviour()).to.be.true;
			});
		});
	});

	describe('show clock', () => {
		describe('showClock', () => {
			it('return true when showClock is checked', () => {
				var entity = new QuizTimingEntity(recommendedTimingEntity);
				expect(entity.showClock()).to.be.true;
			});
		});
		describe('canEditShowClock', () => {
			it('return true when can edit showClock', () => {
				var entity = new QuizTimingEntity(recommendedTimingEntity);
				expect(entity.canEditShowClock()).to.be.true;
			});
		});
	});
	describe('automatic zero', () => {
		describe('isAutomaticZero', () => {
			it('return true extended deadline automatic zero is selected', () => {
				var entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.isAutomaticZero()).to.be.true;
			});
		});
	});
});
