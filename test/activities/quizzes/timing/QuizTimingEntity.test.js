import { buildTimingWithTimerSettings, enforcedQuizTiming, recommendedQuizTiming } from '../data/timing/EditableQuizTimingEntity.js';
import { nonEditableEnforcedQuizTiming, nonEditableRecommendedQuizTiming } from '../data/timing/NonEditableQuizTimingEntity.js';
import { Classes } from '../../../../src/hypermedia-constants.js';
import { expect } from '@open-wc/testing';
import { QuizTimingEntity } from '../../../../src/activities/quizzes/timing/QuizTimingEntity.js';
import SirenParse from 'siren-parser';

describe('QuizTimingEntity', () => {
	let enforcedTimingEntity,
		recommendedTimingEntity,
		nonEditableEnforcedTimingEntity,
		nonEditableRecommendedTimingEntity,
		timerSettingsNoTimeLimitTimingEntity,
		timerSettingsRecommendedTimingEntity,
		timerSettingsAutosubmitTimingEntity,
		timerSettingsFlagLateTimingEntity;

	beforeEach(() => {
		enforcedTimingEntity = SirenParse(enforcedQuizTiming);
		recommendedTimingEntity = SirenParse(recommendedQuizTiming);
		nonEditableEnforcedTimingEntity = SirenParse(nonEditableEnforcedQuizTiming);
		nonEditableRecommendedTimingEntity = SirenParse(nonEditableRecommendedQuizTiming);
		timerSettingsNoTimeLimitTimingEntity = SirenParse(buildTimingWithTimerSettings(0, Classes.quizzes.timing.noTimeLimit, null, null));
		timerSettingsRecommendedTimingEntity = SirenParse(buildTimingWithTimerSettings(120, Classes.quizzes.timing.recommended, null, 'recommendedlimit'));
		timerSettingsAutosubmitTimingEntity = SirenParse(buildTimingWithTimerSettings(120, Classes.quizzes.timing.enforced, 'autosubmitattempt', 'autosubmit'));
		timerSettingsFlagLateTimingEntity = SirenParse(buildTimingWithTimerSettings(120, Classes.quizzes.timing.enforced, 'allownormalsubmission', 'markexceedtime'));
	});

	describe('timing', () => {
		describe('canEditTiming', () => {
			it('returns true when enforced timing entity can be edited', () => {
				const entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.canEditTiming()).to.be.true;
			});
			it('returns true when recommended timing entity can be edited', () => {
				const entity = new QuizTimingEntity(recommendedTimingEntity);
				expect(entity.canEditTiming()).to.be.true;
			});
		});

		describe('cannotEditTiming', () => {
			it('returns false when enforced timing entity cannot be edited', () => {
				const entity = new QuizTimingEntity(nonEditableEnforcedTimingEntity);
				expect(entity.canEditTiming()).to.be.false;
			});
			it('returns false when recommended timing entity cannot be edited', () => {
				const entity = new QuizTimingEntity(nonEditableRecommendedTimingEntity);
				expect(entity.canEditTiming()).to.be.false;
			});
			it('returns false when timer settings is present', () => {
				let entity = new QuizTimingEntity(timerSettingsNoTimeLimitTimingEntity);
				expect(entity.canEditTiming()).to.be.false;
				entity = new QuizTimingEntity(timerSettingsRecommendedTimingEntity);
				expect(entity.canEditTiming()).to.be.false;
				entity = new QuizTimingEntity(timerSettingsAutosubmitTimingEntity);
				expect(entity.canEditTiming()).to.be.false;
				entity = new QuizTimingEntity(timerSettingsFlagLateTimingEntity);
				expect(entity.canEditTiming()).to.be.false;
			});
		});

		describe('isTimingEnforced', () => {
			it('returns true when timing is enforced', () => {
				let entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.isTimingEnforced()).to.be.true;
				entity = new QuizTimingEntity(nonEditableEnforcedTimingEntity);
				expect(entity.isTimingEnforced()).to.be.true;
				entity = new QuizTimingEntity(timerSettingsAutosubmitTimingEntity);
				expect(entity.isTimingEnforced()).to.be.true;
				entity = new QuizTimingEntity(timerSettingsFlagLateTimingEntity);
			});
			it('returns false when timing is recommended', () => {
				let entity = new QuizTimingEntity(recommendedTimingEntity);
				expect(entity.isTimingEnforced()).to.be.false;
				entity = new QuizTimingEntity(nonEditableRecommendedTimingEntity);
				expect(entity.isTimingEnforced()).to.be.false;
				entity = new QuizTimingEntity(timerSettingsRecommendedTimingEntity);
				expect(entity.isTimingEnforced()).to.be.false;
			});
			it('returns false when timing is no time limit', () => {
				const entity = new QuizTimingEntity(timerSettingsNoTimeLimitTimingEntity);
				expect(entity.isTimingEnforced()).to.be.false;
			});
			it('returns true when passed a value matching enforced class', () => {
				const entity = new QuizTimingEntity(recommendedTimingEntity);
				expect(entity.isTimingEnforced(Classes.quizzes.timing.enforced)).to.be.true;
			});
			it('returns false when passed a value not matching enforced class', () => {
				const entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.isTimingEnforced('not an enforced class')).to.be.false;
			});
		});
	});

	describe('timingType', () => {
		it('can get recommended timing entity', () => {
			const entity = new QuizTimingEntity(recommendedTimingEntity);
			expect(entity.hasClass(Classes.quizzes.timing.recommended)).to.be.true;
		});
		it('can get non-editable recommended timing entity', () => {
			let entity = new QuizTimingEntity(nonEditableRecommendedTimingEntity);
			expect(entity.hasClass(Classes.quizzes.timing.recommended)).to.be.true;
			entity = new QuizTimingEntity(timerSettingsRecommendedTimingEntity);
			expect(entity.hasClass(Classes.quizzes.timing.recommended)).to.be.true;
		});
		it('can get enforced timing entity', () => {
			const entity = new QuizTimingEntity(enforcedTimingEntity);
			expect(entity.hasClass(Classes.quizzes.timing.enforced)).to.be.true;
		});
		it('can get non-editable enforced timing entity', () => {
			let entity = new QuizTimingEntity(nonEditableEnforcedTimingEntity);
			expect(entity.hasClass(Classes.quizzes.timing.enforced)).to.be.true;
			entity = new QuizTimingEntity(timerSettingsAutosubmitTimingEntity);
			expect(entity.hasClass(Classes.quizzes.timing.enforced)).to.be.true;
			entity = new QuizTimingEntity(timerSettingsFlagLateTimingEntity);
			expect(entity.hasClass(Classes.quizzes.timing.enforced)).to.be.true;
		});
	});

	describe('time limits', () => {
		describe('canEditTimeLimit', () => {
			it('can edit recommended time limit', () => {
				const entity = new QuizTimingEntity(recommendedTimingEntity);
				expect(entity.canEditTimeLimit()).to.be.true;
			});
			it('can edit enforced time limit', () => {
				const entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.canEditTimeLimit()).to.be.true;
			});
			it('cannot edit noneditable recommended time limit', () => {
				const entity = new QuizTimingEntity(nonEditableRecommendedTimingEntity);
				expect(entity.canEditTimeLimit()).to.be.false;
			});
			it('cannot edit noneditable recommended time limit', () => {
				const entity = new QuizTimingEntity(nonEditableEnforcedTimingEntity);
				expect(entity.canEditTimeLimit()).to.be.false;
			});
			it('can edit time limit in timer settings subentity', () => {
				let entity = new QuizTimingEntity(timerSettingsNoTimeLimitTimingEntity);
				expect(entity.canEditTimingTimeLimit()).to.be.true;
				entity = new QuizTimingEntity(timerSettingsRecommendedTimingEntity);
				expect(entity.canEditTimingTimeLimit()).to.be.true;
				entity = new QuizTimingEntity(timerSettingsAutosubmitTimingEntity);
				expect(entity.canEditTimingTimeLimit()).to.be.true;
				entity = new QuizTimingEntity(timerSettingsFlagLateTimingEntity);
				expect(entity.canEditTimingTimeLimit()).to.be.true;
			});
			it('cannot edit enforced and recommended time limits when timer settins is present', () => {
				let entity = new QuizTimingEntity(timerSettingsNoTimeLimitTimingEntity);
				expect(entity.canEditTimeLimit()).to.be.false;
				entity = new QuizTimingEntity(timerSettingsRecommendedTimingEntity);
				expect(entity.canEditTimeLimit()).to.be.false;
				entity = new QuizTimingEntity(timerSettingsAutosubmitTimingEntity);
				expect(entity.canEditTimeLimit()).to.be.false;
				entity = new QuizTimingEntity(timerSettingsFlagLateTimingEntity);
				expect(entity.canEditTimeLimit()).to.be.false;
			});
			it('cannot edit time limit in timer settings when the subentity is not present', () => {
				let entity = new QuizTimingEntity(recommendedTimingEntity);
				expect(entity.canEditTimingTimeLimit()).to.be.false;
				entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.canEditTimingTimeLimit()).to.be.false;
				entity = new QuizTimingEntity(nonEditableRecommendedTimingEntity);
				expect(entity.canEditTimingTimeLimit()).to.be.false;
				entity = new QuizTimingEntity(nonEditableEnforcedTimingEntity);
				expect(entity.canEditTimingTimeLimit()).to.be.false;
			});
		});

		describe('enforcedTimeLimit', () => {
			it('can read enforced time limit', () => {
				let entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.enforcedTimeLimit().value).to.equal(120);
				entity = new QuizTimingEntity(timerSettingsFlagLateTimingEntity);
				expect(entity.enforcedTimeLimit().value).to.equal(120);
				entity = new QuizTimingEntity(timerSettingsAutosubmitTimingEntity);
				expect(entity.enforcedTimeLimit().value).to.equal(120);
			});
			it('can read enforced grace period', () => {
				let entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.enforcedGraceLimit().value).to.equal(5);
				entity = new QuizTimingEntity(timerSettingsFlagLateTimingEntity);
				expect(entity.enforcedGraceLimit().value).to.equal(5);
				entity = new QuizTimingEntity(timerSettingsAutosubmitTimingEntity);
				expect(entity.enforcedGraceLimit().value).to.equal(5);
			});
		});

		describe('minEnforcedTimeLimit', () => {
			it('can read min enforced time limit', () => {
				const entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.minEnforcedTimeLimit()).to.equal(1);
			});
		});

		describe('maxEnforcedTimeLimit', () => {
			it('can read max enforced time limit', () => {
				const entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.maxEnforcedTimeLimit()).to.equal(9999);
			});
		});

		describe('minEnforcedGraceLimit', () => {
			it('can read min enforced grace limit', () => {
				const entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.minEnforcedGraceLimit()).to.equal(1);
			});
		});

		describe('maxEnforcedGraceLimit', () => {
			it('can read max enforced grace limit', () => {
				const entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.maxEnforcedGraceLimit()).to.equal(2147483647);
			});
		});

		describe('canEditGracePeriod', () => {
			it('return true when can edit grace period', () => {
				const entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.canEditGracePeriod()).to.be.true;
			});
			it('returns false when cannot edit grace period', () => {
				let entity = new QuizTimingEntity(nonEditableEnforcedTimingEntity);
				expect(entity.canEditGracePeriod()).to.be.false;
				entity = new QuizTimingEntity(timerSettingsAutosubmitTimingEntity);
				expect(entity.canEditGracePeriod()).to.be.false;
				entity = new QuizTimingEntity(timerSettingsFlagLateTimingEntity);
				expect(entity.canEditGracePeriod()).to.be.false;
			});
		});

		describe('recommendedTimeLimit', () => {
			it('can read recommended time limit', () => {
				let entity = new QuizTimingEntity(recommendedTimingEntity);
				expect(entity.recommendedTimeLimit().value).to.equal(120);
				entity = new QuizTimingEntity(timerSettingsRecommendedTimingEntity);
				expect(entity.recommendedTimeLimit().value).to.equal(120);
			});
		});

		describe('minRecommendedTimeLimit', () => {
			it('can read min recommended time limit', () => {
				const entity = new QuizTimingEntity(recommendedTimingEntity);
				expect(entity.minRecommendedTimeLimit()).to.equal(1);
			});
		});

		describe('maxRecommendedTimeLimit', () => {
			it('can read max recommended time limit', () => {
				const entity = new QuizTimingEntity(recommendedTimingEntity);
				expect(entity.maxRecommendedTimeLimit()).to.equal(9999);
			});
		});
	});

	describe('extended deadline', () => {
		describe('canEditExtendedDeadline', () => {
			it('returns true when can edit extended deadline', () => {
				const entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.canEditExtendedDeadline()).to.be.true;
			});
			it('returns false when cannot edit extended deadline', () => {
				let entity = new QuizTimingEntity(nonEditableEnforcedTimingEntity);
				expect(entity.canEditExtendedDeadline()).to.be.false;
				entity = new QuizTimingEntity(timerSettingsAutosubmitTimingEntity);
				expect(entity.canEditExtendedDeadline()).to.be.false;
				entity = new QuizTimingEntity(timerSettingsFlagLateTimingEntity);
				expect(entity.canEditExtendedDeadline()).to.be.false;
			});
		});
		describe('getExtendedDeadline', () => {
			it('can get extended deadline from enforced entity', () => {
				const entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.getExtendedDeadline()).to.equal(1);
			});
			it('can get extended deadline from non-editable enforced entity', () => {
				let entity = new QuizTimingEntity(nonEditableEnforcedTimingEntity);
				expect(entity.getExtendedDeadline()).to.equal(1);
				entity = new QuizTimingEntity(timerSettingsAutosubmitTimingEntity);
				expect(entity.getExtendedDeadline()).to.equal(1);
				entity = new QuizTimingEntity(timerSettingsFlagLateTimingEntity);
				expect(entity.getExtendedDeadline()).to.equal(1);
			});
		});
	});

	describe('exceeded time limit', () => {
		describe('canEditExceededTimeLimitBehaviour', () => {
			it('returns true when can edit exceeded time limit behaviour', () => {
				const entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.canEditExceededTimeLimitBehaviour()).to.be.true;
			});
			it('returns false when cannot edit exceeded time limit behaviour', () => {
				let entity = new QuizTimingEntity(nonEditableEnforcedTimingEntity);
				expect(entity.canEditExceededTimeLimitBehaviour()).to.be.false;
				entity = new QuizTimingEntity(timerSettingsAutosubmitTimingEntity);
				expect(entity.canEditExceededTimeLimitBehaviour()).to.be.false;
				entity = new QuizTimingEntity(timerSettingsFlagLateTimingEntity);
				expect(entity.canEditExceededTimeLimitBehaviour()).to.be.false;
			});
		});
	});

	describe('getSubmissionLateTypeIdTitle', () => {
		it('cannot get submission late type Id title from enforced entity', () => {
			const entity = new QuizTimingEntity(enforcedTimingEntity);
			expect(entity.getSubmissionLateTypeIdTitle()).to.be.undefined;
		});
		it('can get submission late type Id title from non-editable enforced entity', () => {
			let entity = new QuizTimingEntity(nonEditableEnforcedTimingEntity);
			expect(entity.getSubmissionLateTypeIdTitle()).to.equal('After the grace period, flag the quiz attempt as exceeded time limit, and allow the student to continue working. Quiz attempt will be automatically scored as zero after an extended deadline.');
			entity = new QuizTimingEntity(timerSettingsAutosubmitTimingEntity);
			expect(entity.getSubmissionLateTypeIdTitle()).to.equal('After the grace period, flag the quiz attempt as exceeded time limit, and prevent the student from making further changes.');
			entity = new QuizTimingEntity(timerSettingsFlagLateTimingEntity);
			expect(entity.getSubmissionLateTypeIdTitle()).to.equal('After the grace period, flag the quiz attempt as exceeded time limit, and allow the student to continue working.');
		});
	});

	describe('show clock', () => {
		describe('showClock', () => {
			it('returns true when showClock is checked', () => {
				let entity = new QuizTimingEntity(recommendedTimingEntity);
				expect(entity.showClock()).to.be.true;
				entity = new QuizTimingEntity(nonEditableRecommendedTimingEntity);
				expect(entity.showClock()).to.be.true;
				entity = new QuizTimingEntity(timerSettingsRecommendedTimingEntity);
				expect(entity.showClock()).to.be.true;
			});
		});
		describe('canEditShowClock', () => {
			it('returns true when can edit showClock', () => {
				const entity = new QuizTimingEntity(recommendedTimingEntity);
				expect(entity.canEditShowClock()).to.be.true;
			});
			it('returns false when cannot edit showClock', () => {
				let entity = new QuizTimingEntity(nonEditableRecommendedTimingEntity);
				expect(entity.canEditShowClock()).to.be.false;
				entity = new QuizTimingEntity(timerSettingsRecommendedTimingEntity);
				expect(entity.canEditShowClock()).to.be.false;
			});
		});
	});

	describe('automatic zero', () => {
		describe('isAutomaticZero', () => {
			it('returns true extended deadline automatic zero is selected', () => {
				const entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.isAutomaticZero()).to.be.true;
			});
			it('returns true if passed value matching automatic zero class', () => {
				const entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.isAutomaticZero(Classes.quizzes.timing.automaticZero)).to.be.true;
			});
			it('returns false if passed value not matching automatic zero class', () => {
				const entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.isAutomaticZero('not true')).to.be.false;
			});
		});
	});

	describe('time limit type', () => {
		describe('canEditTimeLimitType', () => {
			it('returns true when can edit timeLimitType', () => {
				let entity = new QuizTimingEntity(timerSettingsNoTimeLimitTimingEntity);
				expect(entity.canEditTimeLimitType()).to.be.true;
				entity = new QuizTimingEntity(timerSettingsRecommendedTimingEntity);
				expect(entity.canEditTimeLimitType()).to.be.true;
				entity = new QuizTimingEntity(timerSettingsAutosubmitTimingEntity);
				expect(entity.canEditTimeLimitType()).to.be.true;
				entity = new QuizTimingEntity(timerSettingsFlagLateTimingEntity);
				expect(entity.canEditTimeLimitType()).to.be.true;
			});
			it('returns false when cannot edit timeLimitType', () => {
				let entity = new QuizTimingEntity(recommendedTimingEntity);
				expect(entity.canEditTimeLimitType()).to.be.false;
				entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.canEditTimeLimitType()).to.be.false;
				entity = new QuizTimingEntity(nonEditableEnforcedTimingEntity);
				expect(entity.canEditTimeLimitType()).to.be.false;
				entity = new QuizTimingEntity(nonEditableRecommendedTimingEntity);
				expect(entity.canEditTimeLimitType()).to.be.false;

			});
		});
	});

	describe('set time limit checkbox', () => {
		describe('canToggleSetTimeLimit', () => {
			it('returns true when can edit set time limit', () => {
				let entity = new QuizTimingEntity(timerSettingsNoTimeLimitTimingEntity);
				expect(entity.canToggleSetTimeLimit()).to.be.true;
				entity = new QuizTimingEntity(timerSettingsRecommendedTimingEntity);
				expect(entity.canToggleSetTimeLimit()).to.be.true;
				entity = new QuizTimingEntity(timerSettingsAutosubmitTimingEntity);
				expect(entity.canToggleSetTimeLimit()).to.be.true;
				entity = new QuizTimingEntity(timerSettingsFlagLateTimingEntity);
				expect(entity.canToggleSetTimeLimit()).to.be.true;
			});
			it('returns false when cannot edit set time limit', () => {
				let entity = new QuizTimingEntity(recommendedTimingEntity);
				expect(entity.canToggleSetTimeLimit()).to.be.false;
				entity = new QuizTimingEntity(enforcedTimingEntity);
				expect(entity.canToggleSetTimeLimit()).to.be.false;
				entity = new QuizTimingEntity(nonEditableEnforcedTimingEntity);
				expect(entity.canToggleSetTimeLimit()).to.be.false;
				entity = new QuizTimingEntity(nonEditableRecommendedTimingEntity);
				expect(entity.canToggleSetTimeLimit()).to.be.false;
			});
		});
	});
});
