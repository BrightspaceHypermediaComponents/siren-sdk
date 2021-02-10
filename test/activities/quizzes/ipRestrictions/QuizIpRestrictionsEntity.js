/* global fetchMock */

import { editableRestrictions } from '../data/ipRestrictions/EditableEntity.js';
import { nonEditableRestrictions } from '../data/ipRestrictions/NonEditableEntity.js';
import { QuizIpRestrictionsEntity } from '../../../../src/activities/quizzes/ipRestrictions/QuizIpRestrictionsEntity.js';
import { getFormData } from '../../../utility/test-helpers.js';

describe('QuizIpRestrictionsEntity', () => {
	var editableEntity, nonEditableEntity;

	const expectedEntity = JSON.stringify({
		start: '8.8.8.8',
		end: '9.9.9.9',
		id: 0
	});

	beforeEach(() => {
		editableEntity = window.D2L.Hypermedia.Siren.Parse(editableRestrictions);
		nonEditableEntity = window.D2L.Hypermedia.Siren.Parse(nonEditableRestrictions);
	});

	afterEach(() => {
		fetchMock.reset();
	});

	describe('ipRestrictions', () => {
		describe('canEditIpRestrictions', () => {
			it('returns true when ip restrictions entity can be edited', () => {
				var entity = new QuizIpRestrictionsEntity(editableEntity);
				expect(entity.canEditIpRestrictions()).to.be.true;
			});

			it('returns false when ip restrictions entity cannot be edited', () => {
				var entity = new QuizIpRestrictionsEntity(nonEditableEntity);
				expect(entity.canEditIpRestrictions()).to.be.false;
			});
		});

		describe('getIpRestrictions', () => {
			it('returns an array of ip restrictions', () => {
				var entity = new QuizIpRestrictionsEntity(editableEntity);

				const entities = entity.getIpRestrictions();

				expect(Array.isArray(entities)).to.be.true;
				expect(entities.length).to.equal(4);
			});

			it('formats an entity correctly', () => {
				var entity = new QuizIpRestrictionsEntity(editableEntity);

				const entities = entity.getIpRestrictions();
				const firstEntity = JSON.stringify(entities[0]);

				expect(firstEntity).to.equal(expectedEntity);
			});
		});

		describe('getIpRestrictionSubEntity', () => {
			it('returns a single ip restriction', () => {
				var entity = new QuizIpRestrictionsEntity(editableEntity);

				const ipEntity = entity._getIpRestriction(0);

				const { start, end, id } = ipEntity;

				expect(start).to.equal(expectedEntity.end);
				expect(end).to.equal(expectedEntity.end);
				expect(id).to.equal(expectedEntity.id);
			});
		});

		describe('addIpRestriction', () => {
			it('adds a restriction', async() => {
				fetchMock.patchOnce('https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/37/ip', editableEntity);

				var entity = new QuizIpRestrictionsEntity(editableEntity);

				await entity.addIpRestriction({
					start: '1.1.1.1',
					end: '2.2.2.2'
				});

				const form = await getFormData(fetchMock.lastCall().request);
				if (!form.notSupported) {
					expect(form.get('start')).to.equal('1.1.1.1');
					expect(form.get('end')).to.equal('2.2.2.2');
				}

				expect(fetchMock.called()).to.be.true;
			});
		});

		describe('deleteIpRestriction', () => {
			it('deletes a restriction', async() => {
				fetchMock.deleteOnce('https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/37/ip', editableEntity);

				var entity = new QuizIpRestrictionsEntity(editableEntity);

				await entity.deleteIpRestriction(0);

				const form = await getFormData(fetchMock.lastCall().request);
				if (!form.notSupported) {
					expect(form.get('start')).to.equal('8.8.8.8');
					expect(form.get('end')).to.equal('9.9.9.9');
				}

				expect(fetchMock.called()).to.be.true;
			});
		});

		describe('updateIpRestriction', () => {
			it('updates a restriction', async() => {
				fetchMock.patchOnce('https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/37/ip', editableEntity);

				var entity = new QuizIpRestrictionsEntity(editableEntity);

				const updated = {
					start: '1.1.1.1',
					end: '2.2.2.2',
					id: 0
				};

				await entity.updateIpRestriction(updated);

				const form = await getFormData(fetchMock.lastCall().request);

				if (!form.notSupported) {
					expect(form.get('start')).to.equal(updated.start);
					expect(form.get('end')).to.equal(updated.end);
					expect(form.get('oldStart')).to.equal('8.8.8.8');
					expect(form.get('oldEnd')).to.equal('9.9.9.9');
				}

				expect(fetchMock.called()).to.be.true;
			});
		});
	});
});

