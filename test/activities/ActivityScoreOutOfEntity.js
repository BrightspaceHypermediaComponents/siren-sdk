import { ActivityScoreOutOfEntity } from '../../src/activities/ActivityScoreOutOfEntity.js';
import { testData } from './data/ActivityScoreOutOfEntity.js';

describe('ActivityScoreOutOfEntity', () => {
	describe('scoreOutOf', () => {
		it('can get score out of', () => {
			const entityJson = window.D2L.Hypermedia.Siren.Parse(testData);
			const entity = new ActivityScoreOutOfEntity(entityJson);
			expect(entity.scoreOutOf()).to.equal(200);
		});
	});
});
