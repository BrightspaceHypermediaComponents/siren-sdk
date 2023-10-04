import { collected_object } from './data/CollectedObject.js';
import { CollectedObjectEntity } from '../../../../src/activities/instances/instanceCollections/CollectedObject.js';
import { expect } from '@open-wc/testing';
import SirenParse from 'siren-parser';

describe('CollectedObjectEntity', () => {
	let entity, entityJson;

	beforeEach(() => {
		entityJson = SirenParse(collected_object);
		entity = new CollectedObjectEntity(entityJson);
	});

	describe('Basic info', () => {
		it('can get sortOrder', () => {
			expect(entity.sortOrder()).to.equal(2.0);
		});

		it('can get completion', () => {
			expect(entity.completionType()).to.equal('Required');
		});

		it('can get self href', () => {
			expect(entity.collectedObjectHref()).to.equal('https://fake-tenant-id.activities.api.dev.brightspace.com/CollectedObject/1');
		});
	});
});
