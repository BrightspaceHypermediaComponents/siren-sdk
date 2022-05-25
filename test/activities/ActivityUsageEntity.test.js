import { ActivityUsageEntity } from '../../src/activities/ActivityUsageEntity.js';
import { expect } from '@open-wc/testing';
import fetchMock from 'fetch-mock/esm/client.js';
import { getFormData } from '../utility/test-helpers.js';
import sinon from 'sinon';
import SirenParse from 'siren-parser';
import { testData } from './data/ActivityUsageEntity.js';

describe('ActivityUsageEntity', () => {
	let entity, readonlyEntity, entityJson;

	beforeEach(() => {
		entityJson = SirenParse(testData.activityUsageEntityEditable);
		entity = new ActivityUsageEntity(entityJson);

		const readonlyJson = SirenParse(testData.activityUsageEntityReadOnly);
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

		it('can get gradeHref', () => {
			expect(entity.gradeHref()).to.equal('http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/grades/organizations/6609/grades/6064');
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

		it('can get alignments url', () => {
			expect(entity.alignmentsHref()).to.equal('http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/alignments/activity-usage/6609?ActivityBatchId=6606_2000_31');
		});

		it('can get legacy competencies url', () => {
			expect(entity.competenciesHref()).to.equal('http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/alignments/activity-usage/6606/legacy-competencies?ActivityBatchId=6606_2000_7');
		});

		it('can get associations url', () => {
			expect(entity.getRubricAssociationsHref()).to.equal('http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/activities/activities/6606_2000_31/usages/6609/associations');
		});

		it('can get direct associations url', () => {
			expect(entity.getDirectRubricAssociationsHref()).to.equal('http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/activities/activities/6606_2000_31/usages/6609/associations?direct=1');
		});

		it('can get indirect associations url', () => {
			expect(entity.getIndirectRubricAssociationsHref()).to.equal('http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/activities/activities/6606_2000_31/usages/6609/associations?indirect=1');
		});

		it('can get special access url', () => {
			expect(entity.specialAccessHref()).to.equal('http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/activities/activities/6606_2000_31/usages/6609/special-access');
		});

		it('can get create-form url', () => {
			expect(entity.createFormHref()).to.equal('http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/activities/activities/6606_2000_31/usages/6609?mode=creating');
		});
	});

	describe('read only loading', () => {
		it('create-form url returns blank', () => {
			expect(readonlyEntity.createFormHref()).to.be.undefined;
		});
	});

	describe('Functionality', () => {
		let sandbox;

		beforeEach(() => {
			sandbox = sinon.createSandbox();
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

	describe('Equals', () => {
		it('return true when equal', () => {
			expect(entity.equals({
				dates: {
					dueDate: '2019-12-26T04:59:00.000Z',
					startDate: undefined,
					endDate: undefined
				},
				isDraft: true
			})).to.be.true;
		});

		it('return false when equal', () => {
			expect(entity.equals({
				dates: {
					dueDate: '2019-12-26T04:59:00.000Z',
					startDate: undefined,
					endDate: undefined
				},
				isDraft: false
			})).to.be.false;
		});
	});
});
