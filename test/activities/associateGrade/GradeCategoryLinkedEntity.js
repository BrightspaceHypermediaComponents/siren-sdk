/* global fetchMock */

import { AssociateGradeEntity } from '../../../src/activities/associateGrade/AssociateGradeEntity.js';
import { getFormData } from '../../utility/test-helpers.js';
import { GradeCategoryLinkedEntity } from '../../../src/activities/associateGrade/GradeCategoryLinkedEntity.js';
import { gradeCategoryLinked } from './data/GradeCategoryLinked.js';

describe('GradeCandidateLinkedEntity', () => {
	afterEach(() => {
		fetchMock.reset();
	});

	describe('Can select', () => {
		let entity, entityJson;

		beforeEach(() => {
			entityJson = window.D2L.Hypermedia.Siren.Parse(gradeCategoryLinked.selected);
			entity = new GradeCategoryLinkedEntity(entityJson);
		});

		it('gets href', () => {
			expect(entity.href()).to.equal('https://6544ba98-b4dd-4f95-a5f9-16ecf2e92784.grades.api.proddev.d2l/organizations/6609/grade-categories/5002');
		});

		it('can choose category', () => {
			expect(entity.canChooseCategory()).to.be.true;
		});

		it('is selected', () => {
			expect(entity.isSelected()).to.be.true;
		});

		it('returns a promise when selecting category', async() => {
			fetchMock.patchOnce('https://6544ba98-b4dd-4f95-a5f9-16ecf2e92784.activities.api.proddev.d2l/activities/6606_2000_1/usages/6609/associate-grade?workingCopyId=eb537250-bcd1-41fc-af48-7745966f8bc0', entityJson);

			const result = await entity.selectCategory();

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('gradeCategoryId')).to.equal('5002');
			}
			expect(fetchMock.called()).to.be.true;
			expect(result).to.be.an.instanceof(AssociateGradeEntity);
		});
	});

	describe('Cannot select', () => {
		let entity, entityJson;

		beforeEach(() => {
			entityJson = window.D2L.Hypermedia.Siren.Parse(gradeCategoryLinked.missingPermission);
			entity = new GradeCategoryLinkedEntity(entityJson);
		});

		it('gets href', () => {
			expect(entity.href()).to.equal('https://6544ba98-b4dd-4f95-a5f9-16ecf2e92784.grades.api.proddev.d2l/organizations/6609/grade-categories/5003');
		});

		it('can not choose category', () => {
			expect(entity.canChooseCategory()).to.be.false;
		});

		it('is not selected', () => {
			expect(entity.isSelected()).to.be.false;
		});

		it('skips selecting category as it does not have the choose-category action', async() => {
			await entity.selectCategory();
			expect(fetchMock.done());
		});
	});
});
