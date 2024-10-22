import { APAttachedProcessorsCollectionEntity } from '../../../src/activities/assetProcessor/APAttachedProcessorsCollectionEntity.js';
import { attachedProcessorsCollection } from './data/AttachedProcessors.js';
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
			expect(result).to.have.lengthOf(2);
		});
	});
});
