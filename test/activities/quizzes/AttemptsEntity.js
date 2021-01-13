import { attemptsEntity } from './data/AttemptsEntity.js';
import { AttemptsEntity } from '../../../src/activities/quizzes/AttemptsEntity.js';

describe('attempts', () => {
	var entityJson;

	beforeEach(() => {
		entityJson = window.D2L.Hypermedia.Siren.Parse(attemptsEntity);
	});

	describe('canUpdateAttemptsAllowed', () => {
		it('returns true when attempts allowed is editable', () => {
			var entity = new AttemptsEntity(entityJson);
			expect(entity.canUpdateAttemptsAllowed()).to.be.true;
		});
	});

	describe('attempts', () => {
		it('can read number of attempts allowed', () => {
			var entity = new AttemptsEntity(entityJson);
			expect(entity.attemptsAllowed()).to.equal(3);
		});
	});
});
