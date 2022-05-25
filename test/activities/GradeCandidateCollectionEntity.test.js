import { expect } from '@open-wc/testing';
import { GradeCandidateCollectionEntity } from '../../src/activities/GradeCandidateCollectionEntity.js';
import sinon from 'sinon';
import SirenParse from 'siren-parser';
import { testData } from './data/GradeCandidateCollectionEntity.js';

describe('GradeCandidateCollectionEntity', () => {
	let sandbox;
	afterEach(() => {
		sandbox.restore();
	});

	describe('getGradeCandidates', () => {
		let entity;

		beforeEach(() => {
			const entityJson = SirenParse(testData.gradeCandidateCollectionEntity);
			entity = new GradeCandidateCollectionEntity(entityJson);
			sandbox = sinon.createSandbox();
		});

		it('returns entities', () => {
			const result = entity.getGradeCandidates();
			expect(result).to.have.lengthOf(3);
		});
	});
});
