import { quizAttemptsEntity } from '../data/attempts/QuizAttemptsEntity.js';
import { QuizAttemptsEntity } from '../../../../src/activities/quizzes/attempts/QuizAttemptsEntity.js';

describe('attempts', () => {
	var entityJson;

	beforeEach(() => {
		entityJson = window.D2L.Hypermedia.Siren.Parse(quizAttemptsEntity);
	});

	describe('canUpdateAttemptsAllowed', () => {
		it('returns true when attempts allowed is editable', () => {
			var entity = new QuizAttemptsEntity(entityJson);
			expect(entity.canUpdateAttemptsAllowed()).to.be.true;
		});
	});

	describe('attempts', () => {
		it('can read number of attempts allowed', () => {
			var entity = new QuizAttemptsEntity(entityJson);
			expect(entity.attemptsAllowed()).to.equal(3);
		});
	});
});
