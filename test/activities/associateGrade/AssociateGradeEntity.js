import { notInGradebookEditable } from './data/NotInGradebookEditable.js';
import { notInGradebookNonEditable } from './data/NotInGradebookNonEditable.js';
import { newGradeEditable } from './data/NewGradeEditable.js';
import { newGradeNonEditable } from './data/NewGradeNonEditable.js';
import { AssociateGradeEntity } from '../../../src/activities/associateGrade/AssociateGradeEntity.js';

describe('not in gradebook', () => {
	let editableEntity, nonEditableEntity;

	beforeEach(() => {
		editableEntity = window.D2L.Hypermedia.Siren.Parse(notInGradebookEditable);
		nonEditableEntity = window.D2L.Hypermedia.Siren.Parse(notInGradebookNonEditable);
	});

	describe('canEditGradebookStatus', () => {
		it('returns true when gradebook status is editable', () => {
			const entity = new AssociateGradeEntity(editableEntity);
			expect(entity.canEditGradebookStatus()).to.be.true;
		});

		it('returns false when gradebook status is uneditable', () => {
			const entity = new AssociateGradeEntity(nonEditableEntity);
			expect(entity.canEditGradebookStatus()).to.be.false;
		});
	});
});

describe('new grade', () => {
	let editableEntity, nonEditableEntity;

	beforeEach(() => {
		editableEntity = window.D2L.Hypermedia.Siren.Parse(newGradeEditable);
		nonEditableEntity = window.D2L.Hypermedia.Siren.Parse(newGradeNonEditable);
	});

	describe('canEditNewGrade', () => {
		it('returns true when new grade is editable', () => {
			const entity = new AssociateGradeEntity(editableEntity);
			expect(entity.canEditNewGrade()).to.be.true;
		});

		it('returns false when new grade is uneditable', () => {
			const entity = new AssociateGradeEntity(nonEditableEntity);
			expect(entity.canEditNewGrade()).to.be.false;
		});
	});
});
