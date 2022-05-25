import { AlignmentsCollectionEntity } from '../../src/alignments/AlignmentsCollectionEntity.js';
import { expect } from '@open-wc/testing';
import SirenParse from 'siren-parser';
import { testData } from './data/AlignmentsCollectionEntity.js';

describe('AlignmentsCollectionEntity', () => {
	let entity, entityJson;

	describe('editable', () => {
		beforeEach(() => {
			entityJson = SirenParse(testData.alignmentsCollectionEntity.editable);
			entity = new AlignmentsCollectionEntity(entityJson);
		});

		it('can get alignments', () => {
			expect(entity.getAlignments()).to.have.lengthOf(3);
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
			entityJson = SirenParse(testData.alignmentsCollectionEntity.readOnly);
			entity = new AlignmentsCollectionEntity(entityJson);
		});

		it('can get alignments', () => {
			expect(entity.getAlignments()).to.have.lengthOf(3);
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
			entityJson = SirenParse(testData.alignmentsCollectionEntity.empty);
			entity = new AlignmentsCollectionEntity(entityJson);
		});

		it('can get empty alignments', () => {
			expect(entity.getAlignments()).to.have.lengthOf(0);
		});
	});
});
