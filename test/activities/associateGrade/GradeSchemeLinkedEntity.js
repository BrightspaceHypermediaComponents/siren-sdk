/* global fetchMock */

import { AssociateGradeEntity } from '../../../src/activities/associateGrade/AssociateGradeEntity';
import { getFormData } from '../../utility/test-helpers.js';
import { GradeSchemeLinkedEntity } from '../../../src/activities/associateGrade/GradeSchemeLinkedEntity.js';
import { gradeSchemeLinked } from './data/GradeSchemeLinked.js';

describe('GradeCandidateLinkedEntity', () => {
	afterEach(() => {
		fetchMock.reset();
	});

	describe('Can select', () => {
		let entity, entityJson;

		beforeEach(() => {
			entityJson = window.D2L.Hypermedia.Siren.Parse(gradeSchemeLinked.selected);
			entity = new GradeSchemeLinkedEntity(entityJson);
		});

		it('gets href', () => {
			expect(entity.href()).to.equal('https://5096e993-e418-4681-81c5-cae06b019fbb.grades.api.dev.brightspace.com/organizations/6613/grade-schemes/1');
		});

		it('can choose scheme', () => {
			expect(entity.canChooseScheme()).to.be.true;
		});

		it('is selected', () => {
			expect(entity.isSelected()).to.be.true;
		});

		it('returns a promise when selecting scheme', async() => {
			fetchMock.patchOnce('https://5096e993-e418-4681-81c5-cae06b019fbb.activities.api.dev.brightspace.com/activities/6606_2000_277/usages/123171/associate-grade?workingCopyId=123', entityJson);

			const result = await entity.selectScheme();

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('gradeSchemeId')).to.equal('1');
			}
			expect(fetchMock.called()).to.be.true;
			expect(result).to.be.an.instanceof(AssociateGradeEntity);
		});
	});

	describe('Cannot select', () => {
		let entity, entityJson;

		beforeEach(() => {
			entityJson = window.D2L.Hypermedia.Siren.Parse(gradeSchemeLinked.missingPermission);
			entity = new GradeSchemeLinkedEntity(entityJson);
		});

		it('gets href', () => {
			expect(entity.href()).to.equal('https://5096e993-e418-4681-81c5-cae06b019fbb.grades.api.dev.brightspace.com/organizations/6613/grade-schemes/2');
		});

		it('can not choose scheme', () => {
			expect(entity.canChooseScheme()).to.be.false;
		});

		it('is not selected', () => {
			expect(entity.isSelected()).to.be.false;
		});

		it('skips selecting scheme as it does not have the choose-scheme action', async() => {
			await entity.selectScheme();
			expect(fetchMock.done());
		});
	});
});
