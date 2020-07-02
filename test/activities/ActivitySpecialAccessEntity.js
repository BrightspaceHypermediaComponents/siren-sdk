import { testData } from './data/ActivitySpecialAccessEntity.js';
import { ActivitySpecialAccessEntity } from '../../src/activities/ActivitySpecialAccessEntity.js';

describe('ActivityUsageEntity', () => {
	let entity, entityJson;

	beforeEach(() => {
		entityJson = window.D2L.Hypermedia.Siren.Parse(testData.basic);
		entity = new ActivitySpecialAccessEntity(entityJson);
	});

	describe('Basic loading', () => {
		it('can get isRestricted', () => {
			expect(entity.isRestricted()).to.equal(false);
		});

		it('can get userCount', () => {
			expect(entity.userCount()).to.equal(1);
		});

		it('can get url', () => {
			expect(entity.url()).to.equal('https://special-access-dialog-url/');
		});
	});
});
