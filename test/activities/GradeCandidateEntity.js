import { GradeCandidateCollectionEntity } from '../../src/activities/GradeCandidateCollectionEntity.js';
import { testData } from './data/GradeCandidateCollectionEntity.js';

describe('GradeCandidateCollectionEntity', () => {
	let collectionEntity;
	let sandbox;

	beforeEach(() => {
		const entityJson = window.D2L.Hypermedia.Siren.Parse(testData.gradeCandidateCollectionEntity);
		collectionEntity = new GradeCandidateCollectionEntity(entityJson);
		sandbox = sinon.sandbox.create();
	});

	afterEach(() => {
		sandbox.restore();
	});

	describe('GradeCandidateEntity', () => {
		let associateGradeSpy;
		let entity;

		beforeEach(() => {
			entity = collectionEntity.getGradeCandidateEntities()[0];
			associateGradeSpy = sandbox.spy(entity, 'associateGrade');
		});

		it('gets name', () => {
			expect(entity.name()).to.equal('Assignment 1 Grade');
		});

		it('gets maxPoints', () => {
			expect(entity.maxPoints()).to.equal('30');
		});

		it('can associate grade', () => {
			expect(entity.canAssociateGrade()).to.be.true;
		});

		it('returns a promise when associating grade', () => {
			entity.associateGrade();
			expect(associateGradeSpy.returnValues[0]).to.be.a('promise');
		});
	});
});
