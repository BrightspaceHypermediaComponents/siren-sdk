import { APDeepLinksCollectionEntity } from '../../../src/activities/assetProcessor/APDeepLinksCollectionEntity.js';
import { deepLinksCollection } from './data/DeepLinks.js';
import { expect } from '@open-wc/testing';
import SirenParse from 'siren-parser';

describe('APDeepLinksCollectionEntity', () => {
	describe('getDeepLinks', () => {
		let entity;

		beforeEach(() => {
			const entityJson = SirenParse(deepLinksCollection);
			entity = new APDeepLinksCollectionEntity(entityJson);
		});

		it('returns entities', () => {
			const result = entity.deepLinks();
			expect(result).to.have.lengthOf(2);
		});
	});
});
