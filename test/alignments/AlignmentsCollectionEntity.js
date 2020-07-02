import { AlignmentsCollectionEntity } from '../../src/alignments/AlignmentsCollectionEntity.js';
import { testData } from './data/AlignmentsCollectionEntity.js';

describe('AlignmentsCollectionEntity', () => {
	let entity, entityJson;

	describe('editable', () => {
		beforeEach(() => {
			entityJson = window.D2L.Hypermedia.Siren.Parse(testData.AlignmentsCollectionEntity.editable);
			entity = new AlignmentsCollectionEntity(entityJson);
		});

		it('can get alignments', () => {
			expect(entity.getAlignments()).to.have.lengthOf(2);
		});

		it('can update alignments', () => {
			expect(entity.canUpdateAlignments()).to.be.true;
		});

		it('has submit action', () => {
			expect(entity.hasSubmitAction()).to.be.true;
		});
	});

	describe('readonly', () => {
		beforeEach(() => {
			entityJson = window.D2L.Hypermedia.Siren.Parse(testData.AlignmentsCollectionEntity.readonly);
			entity = new AlignmentsCollectionEntity(entityJson);
		});

		it('can get alignments', () => {
			expect(entity.getAlignments()).to.have.lengthOf(2);
		});

		it('can not update alignments', () => {
			expect(entity.canUpdateAlignments()).to.be.false;
		});

		it('does not have submit action', () => {
			expect(entity.hasSubmitAction()).to.be.false;
		});
	});

	describe('empty', () => {
		beforeEach(() => {
			entityJson = window.D2L.Hypermedia.Siren.Parse(testData.AlignmentsCollectionEntity.empty);
			entity = new AlignmentsCollectionEntity(entityJson);
		});

		it('can get empty alignments', () => {
			expect(entity.getAlignments()).to.have.lengthOf(0);
		});
	});
});
