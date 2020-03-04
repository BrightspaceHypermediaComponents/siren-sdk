import { GradeCandidateCollectionEntity } from '../../src/activities/GradeCandidateCollectionEntity.js';
import { testData } from './data/GradeCandidateCollectionEntity.js';

describe('GradeCandidateCollectionEntity', () => {
	let sandbox;
	afterEach(() => {
		sandbox.restore();
	});

	describe('getGradeCandidates', () => {
		let entity;

		beforeEach(() => {
			const entityJson = window.D2L.Hypermedia.Siren.Parse(testData.gradeCandidateCollectionEntity);
			entity = new GradeCandidateCollectionEntity(entityJson);
			sandbox = sinon.sandbox.create();
		});

		it('returns entities', () => {
			const result = entity.getGradeCandidates();
			expect(result).to.have.lengthOf(3);
		});
	});
});
