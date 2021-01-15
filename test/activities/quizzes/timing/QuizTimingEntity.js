import { enforcedQuizTiming } from '../data/timing/EnforcedQuizTimingEntity';
import { recommendedQuizTiming } from '../data/timing/RecommendedQuizTimingEntity';
import { QuizTimingEntity } from '../../../../src/activities/quizzes/timing/QuizTimingEntity.js';

describe('QuizTimingEntity', () => {
	var enforcedTimingEntity, recommendedTimingEntity;

	beforeEach(() => {
		enforcedTimingEntity = window.D2L.Hypermedia.Siren.Parse(enforcedQuizTiming);
		recommendedTimingEntity = window.D2L.Hypermedia.Siren.Parse(recommendedQuizTiming);
	});

	describe('can update timing', () => {
		it('returns true when enforced timing entity can be edited', () => {
			var entity = new QuizTimingEntity(enforcedTimingEntity);
			expect(entity.canEditTiming()).to.be.true;
		});
		it('returns true when recommended timing entity can be edited', () => {
			var entity = new QuizTimingEntity(recommendedTimingEntity);
			expect(entity.canEditTiming()).to.be.true;
		});
	});

	describe('timing type', () => {
		it('returns true when timing is enforced ', () => {
			var entity = new QuizTimingEntity(enforcedTimingEntity);
			expect(entity.isTimingEnforced()).to.be.true;
		});
		it('returns false when timing is recommended ', () => {

			var entity = new QuizTimingEntity(recommendedTimingEntity);
			expect(entity.isTimingEnforced()).to.be.false;
		});
	});

	describe('time limits', () => {
		it('can read enforced time limit', () => {
			var entity = new QuizTimingEntity(enforcedTimingEntity);
			expect(entity.enforcedTimeLimit().value).to.equal(120);
		});
		it('can read enforced grace period', () => {
			var entity = new QuizTimingEntity(enforcedTimingEntity);
			expect(entity.enforcedGraceLimit().value).to.equal(5);
		});
		it('can read recommended time limit', () => {
			var entity = new QuizTimingEntity(recommendedTimingEntity);
			expect(entity.recommendedTimeLimit()).to.equal(120);
		});
	});

	describe('show clock', () => {
		it('return true when showClock is checked', () => {
			var entity = new QuizTimingEntity(recommendedTimingEntity);
			expect(entity.showClock()).to.be.true;
		});
	});
});
