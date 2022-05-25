import { expect } from '@open-wc/testing';
import fetchMock from 'fetch-mock/esm/client.js';
import { getFormData } from '../utility/test-helpers.js';
import { ScoringEntity } from '../../src/activities/ScoringEntity.js';
import SirenParse from 'siren-parser';
import { testData } from './data/ScoringEntity.js';

describe('ScoringEntity', () => {
	describe('Readonly', () => {
		let entity;

		beforeEach(() => {
			const entityJson = SirenParse(testData.scoringEntityReadonly);
			entity = new ScoringEntity(entityJson);
		});

		afterEach(() => {
			fetchMock.reset();
		});

		it('gets scoreOutOf', () => {
			expect(entity.scoreOutOf()).to.equal(5);
		});

		it('gets gradeMaxPoints', () => {
			expect(entity.gradeMaxPoints()).to.equal(5);
		});

		it('skips save if not editable', async() => {
			await entity.save({
				maxGradePoints: 6
			});

			expect(fetchMock.done());
		});
	});

	describe('Editable', () => {
		let entity;
		let entityJson;

		beforeEach(() => {
			entityJson = SirenParse(testData.scoringEntityEditable);
			entity = new ScoringEntity(entityJson);
		});

		afterEach(() => {
			fetchMock.reset();
		});

		it('saves scoreOugOf', async() => {
			fetchMock.postOnce('https://7b81c573-c2ec-4a6b-adec-0011f509dc6b.assignments.api.dev.brightspace.com/123163/folders/303/score-out-of', entityJson);

			await entity.save({
				gradeMaxPoints: 6
			});

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('scoreOutOf')).to.equal('6');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('skips save if not dirty', async() => {
			await entity.save({
				gradeMaxPoints: 5
			});

			expect(fetchMock.done());
		});
	});
});
