import { AssociateGradeEntity } from '../../../src/activities/associateGrade/AssociateGradeEntity.js';
import { expect } from '@open-wc/testing';
import fetchMock from 'fetch-mock/esm/client.js';
import { getFormData } from '../../utility/test-helpers.js';
import { gradeSchemeLinked } from './data/GradeSchemeLinked.js';
import { GradeSchemeLinkedEntity } from '../../../src/activities/associateGrade/GradeSchemeLinkedEntity.js';
import SirenParse from 'siren-parser';

describe('GradeSchemeLinkedEntity', () => {
	afterEach(() => {
		fetchMock.reset();
	});

	describe('Can select', () => {
		let entity, entityJson;

		beforeEach(() => {
			entityJson = SirenParse(gradeSchemeLinked.selected);
			entity = new GradeSchemeLinkedEntity(entityJson);
		});

		it('gets href', () => {
			expect(entity.href()).to.equal('https://5096e993-e418-4681-81c5-cae06b019fbb.grades.api.dev.brightspace.com/organizations/6613/grade-schemes/1');
		});

		it('gets schemeId', () => {
			expect(entity.schemeId()).to.equal(1);
		});

		it('can choose scheme', () => {
			expect(entity.canChooseScheme()).to.be.true;
		});

		it('is selected', () => {
			expect(entity.isSelected()).to.be.true;
		});

		it('is default', () => {
			expect(entity.isDefault()).to.be.true;
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
			entityJson = SirenParse(gradeSchemeLinked.missingPermission);
			entity = new GradeSchemeLinkedEntity(entityJson);
		});

		it('gets href', () => {
			expect(entity.href()).to.equal('https://5096e993-e418-4681-81c5-cae06b019fbb.grades.api.dev.brightspace.com/organizations/6613/grade-schemes/2');
		});

		it('schemeId is not serialized', () => {
			expect(entity.schemeId()).to.be.undefined;
		});

		it('can not choose scheme', () => {
			expect(entity.canChooseScheme()).to.be.false;
		});

		it('is not selected', () => {
			expect(entity.isSelected()).to.be.false;
		});

		it('is not default', () => {
			expect(entity.isDefault()).to.be.false;
		});

		it('skips selecting scheme as it does not have the choose-scheme action', async() => {
			await entity.selectScheme();
			expect(fetchMock.done());
		});
	});
});
