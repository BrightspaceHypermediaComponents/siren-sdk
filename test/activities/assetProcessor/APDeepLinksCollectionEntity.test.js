import { APDeepLinksCollectionEntity } from '../../../src/activities/assetProcessor/APDeepLinksCollectionEntity.js';
import { deepLinksCollection } from './data/DeepLinksCollection.js';
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

			result.forEach(deepLink => {
				expect(deepLink.deploymentName()).to.be.a('string');
				expect(deepLink.linkId()).to.be.a('number');
				expect(deepLink.linkName()).to.be.a('string');
				expect(deepLink.deepLinkLaunchRoute()).to.be.a('string');
				expect(deepLink.requiresEula()).to.be.a('boolean');
			});
		});
	});
});
