import { ActivitySpecialAccessEntity } from '../../src/activities/ActivitySpecialAccessEntity.js';
import { expect } from '@open-wc/testing';
import SirenParse from 'siren-parser';
import { testData } from './data/ActivitySpecialAccessEntity.js';

describe('ActivityUsageEntity', () => {
	let entity, entityJson;

	beforeEach(() => {
		entityJson = SirenParse(testData.basic);
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
