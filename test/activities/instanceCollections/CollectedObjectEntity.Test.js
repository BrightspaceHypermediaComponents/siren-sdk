import { CollectedObjectEntity } from '../../src/activities/instanceCollections/CollectedObject.js';
import { expect } from '@open-wc/testing';
import SirenParse from 'siren-parser';
import { testData } from './data/CollectedObject.js';

describe('CollectedObjectEntity', () => {
	let entity, entityJson;

	beforeEach(() => {
		entityJson = SirenParse(testData.basic);
		entity = new CollectedObjectEntity(entityJson);
	});

	describe('Basic info', () => {
		it('can get sortOrder', () => {
			expect(entity.getSortOrder()).to.equal(2.0);
		});

		it('can get completion', () => {
			expect(entity.getCompletion()).to.equal('Required');
		});

		it('can get self href', () => {
			expect(entity.collectedObjectHref()).to.equal('https://fake-tenant-id.activities.api.dev.brightspace.com/CollectedObject/1');
		});
	});
});
