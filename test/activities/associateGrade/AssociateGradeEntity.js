import { notInGradebookEditable } from './data/NotInGradebookEditable.js';
import { notInGradebookNonEditable } from './data/NotInGradebookNonEditable.js';
import { notInGradebookCannotCreateNewEditable } from './data/NotInGradebookCannotCreateNewEditable.js';
import { newGradeEditable } from './data/NewGradeEditable.js';
import { newGradeNonEditable } from './data/NewGradeNonEditable.js';
import { existingGradeEditable } from './data/ExistingGradeEditable.js';
import { existingGradeNonEditable } from './data/ExistingGradeNonEditable.js';
import { AssociateGradeEntity, GradebookStatus, GradeType } from '../../../src/activities/associateGrade/AssociateGradeEntity.js';

describe('not in gradebook', () => {
	let editableEntity, nonEditableEntity;

	beforeEach(() => {
		editableEntity = window.D2L.Hypermedia.Siren.Parse(notInGradebookEditable);
		nonEditableEntity = window.D2L.Hypermedia.Siren.Parse(notInGradebookNonEditable);
	});

	describe('gradebookStatus', () => {
		it('gets gradebook status when editable', () => {
			const entity = new AssociateGradeEntity(editableEntity);
			expect(entity.gradebookStatus()).to.equal(GradebookStatus.NotInGradebook);
		});

		it('gets gradebook status when uneditable', () => {
			const entity = new AssociateGradeEntity(nonEditableEntity);
			expect(entity.gradebookStatus()).to.equal(GradebookStatus.NotInGradebook);
		});
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

	describe('gradebookStatus', () => {
		it('gets gradebook status when editable', () => {
			const entity = new AssociateGradeEntity(editableEntity);
			expect(entity.gradebookStatus()).to.equal(GradebookStatus.NewGrade);
		});

		it('gets gradebook status when uneditable', () => {
			const entity = new AssociateGradeEntity(nonEditableEntity);
			expect(entity.gradebookStatus()).to.equal(GradebookStatus.NewGrade);
		});
	});

	describe('grade properties', () => {
		it('gets new gradeName', () => {
			const entity = new AssociateGradeEntity(editableEntity);
			expect(entity.gradeName()).to.equal('Homework 1');
		});

		it('gets new maxPoints', () => {
			const entity = new AssociateGradeEntity(editableEntity);
			expect(entity.maxPoints()).to.equal(150);
		});

		it('gets new gradeType', () => {
			const entity = new AssociateGradeEntity(editableEntity);
			expect(entity.gradeType()).to.equal(GradeType.Numeric);
		});
	});

	describe('canCreateNewGrade', () => {
		it('returns true when new grade is editable', () => {
			const entity = new AssociateGradeEntity(editableEntity);
			expect(entity.canCreateNewGrade()).to.be.true;
		});

		it('returns false when new grade is uneditable (gradebookStatus action missing)', () => {
			const entity = new AssociateGradeEntity(nonEditableEntity);
			expect(entity.canCreateNewGrade()).to.be.false;
		});

		it('returns false when new grade is uneditable (gradebookStatus action editable, missing create-new as an option)', () => {
			const editableCannotCreateNewEntity = window.D2L.Hypermedia.Siren.Parse(notInGradebookCannotCreateNewEditable);
			const entity = new AssociateGradeEntity(editableCannotCreateNewEntity);
			expect(entity.canCreateNewGrade()).to.be.false;
		});
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

	describe('canGetGradeCategories', () => {
		it('returns true when new grade is editable', () => {
			const entity = new AssociateGradeEntity(editableEntity);
			expect(entity.canGetCategories()).to.be.true;
		});

		it('returns false when new grade is uneditable', () => {
			const entity = new AssociateGradeEntity(nonEditableEntity);
			expect(entity.canGetCategories()).to.be.false;
		});
	});

	describe('selectedSchemeHref', () => {
		it('returns true when new grade is editable', () => {
			const entity = new AssociateGradeEntity(editableEntity);
			expect(entity.selectedSchemeHref()).to.equal('https://5096e993-e418-4681-81c5-cae06b019fbb.grades.api.dev.brightspace.com/organizations/123171/grade-scheme/5258');
		});

		it('returns false when new grade is uneditable', () => {
			const entity = new AssociateGradeEntity(nonEditableEntity);
			expect(entity.selectedSchemeHref()).to.be.undefined;
		});
	});
});

describe('existing grade', () => {
	let editableEntity, nonEditableEntity;

	beforeEach(() => {
		editableEntity = window.D2L.Hypermedia.Siren.Parse(existingGradeEditable);
		nonEditableEntity = window.D2L.Hypermedia.Siren.Parse(existingGradeNonEditable);
	});

	describe('gradebookStatus', () => {
		it('gets gradebook status when editable', () => {
			const entity = new AssociateGradeEntity(editableEntity);
			expect(entity.gradebookStatus()).to.equal(GradebookStatus.ExistingGrade);
		});

		it('gets gradebook status when uneditable', () => {
			const entity = new AssociateGradeEntity(nonEditableEntity);
			expect(entity.gradebookStatus()).to.equal(GradebookStatus.ExistingGrade);
		});
	});

	describe('canChooseExistingGrade', () => {
		it('returns true when existing grade is editable', () => {
			const entity = new AssociateGradeEntity(editableEntity);
			expect(entity.canChooseGrade()).to.be.true;
		});

		it('returns false when existing grade is uneditable', () => {
			const entity = new AssociateGradeEntity(nonEditableEntity);
			expect(entity.canChooseGrade()).to.be.false;
		});
	});
});
