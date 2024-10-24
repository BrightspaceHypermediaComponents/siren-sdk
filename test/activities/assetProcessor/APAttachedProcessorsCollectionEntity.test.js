import { APAttachedProcessorsCollectionEntity } from '../../../src/activities/assetProcessor/APAttachedProcessorsCollectionEntity.js';
import { attachedProcessorsCollection } from './data/AttachedProcessorsCollection.js';
import { expect } from '@open-wc/testing';
import SirenParse from 'siren-parser';

describe('APAttachedProcessorsCollectionEntity', () => {
	describe('getAttachedProcessors', () => {
		let entity;

		beforeEach(() => {
			const entityJson = SirenParse(attachedProcessorsCollection);
			entity = new APAttachedProcessorsCollectionEntity(entityJson);
		});

		it('returns entities', () => {
			const result = entity.attachedProcessors();
			expect(result).to.have.lengthOf(3);

			result.forEach(attachedProcessor => {
				expect(attachedProcessor.externalDeploymentId()).to.be.a('string');
				expect(attachedProcessor.deploymentName()).to.be.a('string');
				expect(attachedProcessor.assetProcessorId()).to.be.a('number');
				expect(attachedProcessor.title()).to.be.a('string');
				expect(attachedProcessor.settingsLinkId()).to.be.a('number');
				expect(attachedProcessor.eulaLaunchRoute()).to.be.a('string');
				expect(attachedProcessor.isEnabled()).to.be.a('boolean');
				expect(attachedProcessor.isExternalResource()).to.be.a('boolean');
				expect(attachedProcessor.width()).to.be.a('number');
				expect(attachedProcessor.height()).to.be.a('number');
			});
		});
	});
});
