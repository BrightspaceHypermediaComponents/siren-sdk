import { expect } from '@open-wc/testing';
import { instance_collection } from './data/InstanceCollection.js';
import { InstanceCollectionEntity } from '../../../src/activities/instances/instanceCollections/InstanceCollection.js';
import SirenParse from 'siren-parser';

describe('InstanceCollectionEntity', () => {
	let entity, entityJson;

	beforeEach(() => {
		entityJson = SirenParse(instance_collection);
		entity = new InstanceCollectionEntity(entityJson);
	});

	describe('Basic info', () => {
		it('can get collected object sub-entities', () => {
			expect(entity.collectedObjects().length).to.equal(3);
		});

		it('can get collected instance sub-entities', () => {
			expect(entity.collectedInstanceCollections().length).to.equal(1);
		});

		it('can get self href', () => {
			expect(entity.instanceCollectionHref()).to.equal('https://fake-tenant-id.activities.api.dev.brightspace.com/InstanceCollection/639');
		});
	});
});
