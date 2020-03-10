/* global fetchMock */

import { ActivityUsageEntity } from '../../src/activities/ActivityUsageEntity.js';
import { testData } from './data/ActivityUsageEntity.js';
import { getFormData } from '../utility/test-helpers.js';

describe('ActivityUsageEntity', () => {
	let entity, entityCannotEditGrades, readonlyEntity, entityJson, entityJsonCannotEditGrades;

	beforeEach(() => {
		entityJson = window.D2L.Hypermedia.Siren.Parse(testData.activityUsageEntityEditable);
		entity = new ActivityUsageEntity(entityJson);

		entityJsonCannotEditGrades = window.D2L.Hypermedia.Siren.Parse(testData.activityUsageEntityEditableCannotEditGrades);
		entityCannotEditGrades = new ActivityUsageEntity(entityJsonCannotEditGrades);

		const readonlyJson = window.D2L.Hypermedia.Siren.Parse(testData.activityUsageEntityReadOnly);
		readonlyEntity = new ActivityUsageEntity(readonlyJson);
	});

	describe('Basic loading', () => {
		it('can get organizationHref', () => {
			expect(entity.organizationHref()).to.equal('http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/organizations/6609');
		});

		it('can get specializationHref', () => {
			expect(entity.specializationHref()).to.equal('http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/assignments/6609/folders/31');
		});

		it('can get userActivityUsageHref', () => {
			expect(entity.userActivityUsageHref()).to.equal('http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/activities/activities/6606_2000_31/usages/6609/users/169');
		});

		it('can get gradeCandidatesHref', () => {
			expect(entity.gradeCandidatesHref()).to.equal('http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/activities/activities/6606_2000_31/usages/6609/grade-candidates');
		});

		it('can edit release conditions', () => {
			expect(entity.canEditReleaseConditions()).to.be.true;
		});

		it('can get release conditions url', () => {
			expect(entity.editReleaseConditionsUrl()).to.equal('/d2l/le/conditionalRelease/6609/dialog/dropboxes/31/openDialog');
		});
	});

	describe('Functionality', () => {
		let sandbox;

		beforeEach(() => {
			sandbox = sinon.sandbox.create();
		});

		afterEach(() => {
			sandbox.restore();
		});

		describe('Due Date', () => {
			describe('Can edit', () => {
				let setDueDateSpy;

				beforeEach(() => {
					setDueDateSpy = sandbox.spy(entity, 'setDueDate');
				});

				it('gets due date', () => {
					expect(entity.dueDate()).to.equal('2019-12-26T04:59:00.000Z');
				});

				it('can edit due date', () => {
					entity.canEditDueDate().then(result => expect(result).to.be.true);
				});

				it.skip('returns a promise when setting due date', () => {
					entity.setDueDate('2019-12-27T04:59:00.000Z');
					expect(setDueDateSpy.returnValues[0]).to.be.a('promise');
				});
			});

			describe('Can NOT edit', () => {
				let setDueDateSpy;

				beforeEach(() => {
					setDueDateSpy = sandbox.spy(readonlyEntity, 'setDueDate');
				});

				it('gets due date', () => {
					expect(readonlyEntity.dueDate()).to.equal('2019-12-26T04:59:00.000Z');
				});

				it.skip('returns false for canEditDueDate function', () => {
					readonlyEntity.canEditDueDate().then(result => expect(result).to.be.false);
				});

				it.skip('returns undefined if attempting to edit due date', () => {
					readonlyEntity.setDueDate('2019-12-27T04:59:00.000Z')
						.then(() => expect(setDueDateSpy.returnValues[0]).to.be.undefined);
				});
			});
		});

		describe('Draft Status', () => {
			describe('Can edit', () => {
				let setDraftStatusSpy;

				beforeEach(() => {
					setDraftStatusSpy = sandbox.spy(entity, 'setDraftStatus');
				});

				it('gets isDraft', () => {
					expect(entity.isDraft()).to.be.true;
				});

				it('gets isPublished', () => {
					expect(entity.isPublished()).to.be.false;
				});

				it('can edit draft', () => {
					expect(entity.canEditDraft()).to.be.true;
				});

				it.skip('returns a promise when setting draft', () => {
					entity.setDraftStatus(false);
					expect(setDraftStatusSpy.returnValues[0]).to.be.a('promise');
				});
			});

			describe('Can NOT edit', () => {
				it('gets isDraft', () => {
					expect(readonlyEntity.isDraft()).to.be.true;
				});

				it('gets isPublished', () => {
					expect(readonlyEntity.isPublished()).to.be.false;
				});

				it('can edit draft', () => {
					expect(readonlyEntity.canEditDraft()).to.be.false;
				});

				it('returns undefined if attempting to edit draft state', async() => {
					expect(await readonlyEntity.setDraftStatus(false)).to.be.undefined;
				});
			});
		});

		describe('Score Out Of', () => {
			describe('Can edit', () => {
				let setScoreOutOfSpy, removeFromGradesSpy, addToGradesSpy, setUngradedSpy;

				beforeEach(() => {
					setScoreOutOfSpy = sandbox.spy(entity, 'setScoreOutOf');
					removeFromGradesSpy = sandbox.spy(entity, 'removeFromGrades');
					addToGradesSpy = sandbox.spy(entity, 'addToGrades');
					setUngradedSpy = sandbox.spy(entity, 'setUngraded');
				});

				it('gets scoreOutOf', () => {
					expect(entity.scoreOutOf()).to.equal(56);
				});

				it('gets inGrades', () => {
					expect(entity.inGrades()).to.equal(true);
				});

				it('gets gradeType', () => {
					expect(entity.gradeType()).to.equal('Points');
				});

				it('can edit score out of', () => {
					expect(entity.canEditScoreOutOf()).to.be.true;
				});

				it.skip('returns a promise when setting scoreOutOf', () => {
					entity.setScoreOutOf('70');
					expect(setScoreOutOfSpy.returnValues[0]).to.be.a('promise');
				});

				it.skip('returns a promise when removing from grades', () => {
					entity.removeFromGrades();
					expect(removeFromGradesSpy.returnValues[0]).to.be.a('promise');
				});

				it.skip('returns a promise when adding to grades', () => {
					entity.addToGrades();
					expect(addToGradesSpy.returnValues[0]).to.be.a('promise');
				});

				it.skip('returns a promise when setting ungraded', () => {
					entity.setUngraded();
					expect(setUngradedSpy.returnValues[0]).to.be.a('promise');
				});
			});

			describe('Can NOT edit', () => {

				it('gets scoreOutOf', () => {
					expect(readonlyEntity.scoreOutOf()).to.equal(56);
				});

				it('gets inGrades', () => {
					expect(readonlyEntity.inGrades()).to.equal(true);
				});

				it('gets gradeType', () => {
					expect(readonlyEntity.gradeType()).to.equal('Points');
				});

				it('can edit score out of', () => {
					expect(readonlyEntity.canEditScoreOutOf()).to.be.false;
				});

				it('returns undefined if attempting to setting scoreOutOf', async() => {
					expect(await readonlyEntity.setScoreOutOf(70)).to.be.undefined;
				});

				it('returns undefined if attempting to removing from grades', async() => {
					expect(await readonlyEntity.removeFromGrades()).to.be.undefined;
				});

				it('returns undefined if attempting to adding to grades', async() => {
					expect(await readonlyEntity.addToGrades()).to.be.undefined;
				});

				it('returns undefined if attempting to setting ungraded', async() => {
					expect(await readonlyEntity.setUngraded()).to.be.undefined;
				});
			});
		});
	});

	describe('Saves', () => {

		afterEach(() => {
			fetchMock.reset();
		});

		describe('dates', () => {
			it('saves dates in aggregate', async() => {
				fetchMock.patchOnce('http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/activities/activities/6606_2000_31/usages/6609', entityJson);

				await entity.save({
					dates: {
						dueDate: '2020-02-23T04:59:00.000Z'
					}
				});

				const form = await getFormData(fetchMock.lastCall().request);
				if (!form.notSupported) {
					expect(form.get('startDate')).to.equal('');
					expect(form.get('dueDate')).to.equal('2020-02-23T04:59:00.000Z');
					expect(form.get('endDate')).to.equal('');
					expect(form.get('validateOnly')).to.be.null;
				}
				expect(fetchMock.called()).to.be.true;
			});

			it('skips save if not dirty', async() => {
				await entity.save({
					dates: {
						dueDate: '2019-12-26T04:59:00.000Z'
					}
				});

				expect(fetchMock.done());
			});

			it('skips save if not editable', async() => {
				await readonlyEntity.save({
					dates: {
						dueDate: '2020-02-23T04:59:00.000Z'
					}
				});

				expect(fetchMock.done());
			});
		});

		describe('visibility', () => {
			it('saves visibility', async() => {
				fetchMock.putOnce('http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/assignments/6609/folders/31/draft', entityJson);

				await entity.save({
					isDraft: false
				});

				const form = await getFormData(fetchMock.lastCall().request);
				if (!form.notSupported) {
					expect(form.get('draft')).to.equal('false');
				}
				expect(fetchMock.called()).to.be.true;
			});

			it('skips save if not dirty', async() => {
				await entity.save({
					isDraft: true
				});

				expect(fetchMock.done());
			});

			it('skips save if not editable', async() => {
				await readonlyEntity.save({
					isDraft: false
				});

				expect(fetchMock.done());
			});
		});

		describe('score and grade', () => {
			it('saves updated score', async() => {
				fetchMock.postOnce('http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/assignments/6609/folders/31/score-out-of', entityJson);

				await entity.save({
					scoreAndGrade: {
						scoreOutOf: '99',
						inGrades: true
					}
				});

				const form = await getFormData(fetchMock.lastCall().request);
				if (!form.notSupported) {
					expect(form.get('scoreOutOf')).to.equal('99');
					expect(form.get('inGrades')).to.equal('true');
				}
				expect(fetchMock.called()).to.be.true;
			});

			it('saves empty score', async() => {
				fetchMock.postOnce('http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/assignments/6609/folders/31/score-out-of', entityJson);

				await entity.save({
					scoreAndGrade: {
						scoreOutOf: '',
						inGrades: false
					}
				});

				const form = await getFormData(fetchMock.lastCall().request);
				if (!form.notSupported) {
					expect(form.get('scoreOutOf')).to.equal('');
					expect(form.get('inGrades')).to.equal('false');
				}
				expect(fetchMock.called()).to.be.true;
			});

			it('removes from grades', async() => {
				fetchMock.postOnce('http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/assignments/6609/folders/31/score-out-of', entityJson);

				await entity.save({
					scoreAndGrade: {
						scoreOutOf: '56',
						inGrades: false
					}
				});

				const form = await getFormData(fetchMock.lastCall().request);
				if (!form.notSupported) {
					expect(form.get('scoreOutOf')).to.equal('56');
					expect(form.get('inGrades')).to.equal('false');
				}
				expect(fetchMock.called()).to.be.true;
			});

			it('skips updating grade if cannot edit grade', async() => {
				fetchMock.postOnce('http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/assignments/6609/folders/31/score-out-of', entityJsonCannotEditGrades);

				await entityCannotEditGrades.save({
					scoreAndGrade: {
						scoreOutOf: '99',
						inGrades: false
					}
				});

				const form = await getFormData(fetchMock.lastCall().request);
				if (!form.notSupported) {
					expect(form.get('scoreOutOf')).to.equal('99');
					expect(form.get('inGrades')).to.be.null;
				}
				expect(fetchMock.called()).to.be.true;
			});

			it('skips save if not dirty', async() => {
				await entity.save({
					scoreAndGrade: {
						scoreOutOf: '56',
						inGrades: true
					}
				});

				expect(fetchMock.done());
			});

			it('skips save if not editable', async() => {
				await readonlyEntity.save({
					scoreAndGrade: {
						scoreOutOf: '99',
						inGrades: false
					}
				});

				expect(fetchMock.done());
			});
		});
	});

	describe('Validation', () => {

		afterEach(() => {
			fetchMock.reset();
		});

		describe('dates', () => {
			it('validates dates in aggregate', async() => {
				fetchMock.patchOnce('http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/activities/activities/6606_2000_31/usages/6609', entityJson);

				await entity.validate({
					dates: {
						startDate: '2020-02-23T04:59:00.000Z',
						dueDate: '2020-02-24T04:59:00.000Z',
						endDate: '2020-02-25T04:59:00.000Z'
					}
				});

				const form = await getFormData(fetchMock.lastCall().request);
				if (!form.notSupported) {
					expect(form.get('startDate')).to.equal('2020-02-23T04:59:00.000Z');
					expect(form.get('dueDate')).to.equal('2020-02-24T04:59:00.000Z');
					expect(form.get('endDate')).to.equal('2020-02-25T04:59:00.000Z');
					expect(form.get('validateOnly')).to.equal('true');
				}
				expect(fetchMock.called()).to.be.true;
			});

			it('skips validation if not dirty', async() => {
				await entity.validate({
					dates: {
						startDate: '',
						dueDate: '2019-12-26T04:59:00.000Z',
						endDate: ''
					}
				});

				expect(fetchMock.done());
			});

			it('skips validation if not editable', async() => {
				await readonlyEntity.validate({
					dates: {
						startDate: '2020-02-23T04:59:00.000Z',
						dueDate: '2020-02-24T04:59:00.000Z',
						endDate: '2020-02-25T04:59:00.000Z'
					}
				});

				expect(fetchMock.done());
			});
		});
	});
});
