import { ActivityUsageEntity } from '../../src/activities/ActivityUsageEntity.js';
import { testData } from './data/ActivityUsageEntity.js';

describe('ActivityUsageEntity', () => {
	let entity, readonlyEntity;

	beforeEach(() => {
		const entityJson = window.D2L.Hypermedia.Siren.Parse(testData.activityUsageEntityEditable);
		entity = new ActivityUsageEntity(entityJson);

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

		it('can edit release conditions', () => {
			expect(entity.canEditReleaseConditions()).to.be.true;
		});

		it('can get release conditions url', () => {
			expect(entity.editReleaseConditionsUrl()).to.equal('/d2l/le/conditionalRelease/6609/dialog/dropboxes/31/openDialog');
		});
	});

	describe('Due Date', () => {
		describe('Can edit', () => {
			let sandbox, setDueDateSpy;

			beforeEach(() => {
				sandbox = sinon.sandbox.create();
				setDueDateSpy = sandbox.spy(entity, 'setDueDate');
			});

			afterEach(() => {
				sandbox.restore();
			});

			it('gets due date', () => {
				expect(entity.dueDate()).to.equal("2019-12-26T04:59:00.000Z");
			});

			it('can edit due date', () => {
				entity.canEditDueDate().then(result => expect(result).to.be.true);
			});

			it('returns a promise when setting due date', () => {
				entity.setDueDate("2019-12-27T04:59:00.000Z");
				expect(setDueDateSpy.returnValues[0]).to.be.a('promise');
			});
		});

		describe('Can NOT edit', () => {
			let sandbox, setDueDateSpy;

			beforeEach(() => {
				sandbox = sinon.sandbox.create();
				setDueDateSpy = sandbox.spy(readonlyEntity, 'setDueDate');
			});

			afterEach(() => {
				sandbox.restore();
			});

			it('gets due date', () => {
				expect(readonlyEntity.dueDate()).to.equal("2019-12-26T04:59:00.000Z");
			});

			it('returns false for canEditDueDate function', () => {
				readonlyEntity.canEditDueDate().then(result => expect(result).to.be.false);
			});

			it('returns undefined if attempting to edit due date', () => {
				readonlyEntity.setDueDate("2019-12-27T04:59:00.000Z")
					.then(result => expect(setDueDateSpy.returnValues[0]).to.be.undefined);
			});
		});
	});

	describe('Draft Status', () => {
		describe('Can edit', () => {
			let sandbox, setDraftStatusSpy;

			beforeEach(() => {
				sandbox = sinon.sandbox.create();
				setDraftStatusSpy = sandbox.spy(entity, 'setDraftStatus');
			});

			afterEach(() => {
				sandbox.restore();
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

			it('returns a promise when setting draft', () => {
				entity.setDraftStatus(false);
				expect(setDraftStatusSpy.returnValues[0]).to.be.a('promise');
			});
		});

		describe('Can NOT edit', () => {
			let sandbox, setDraftStatusSpy;

			beforeEach(() => {
				sandbox = sinon.sandbox.create();
				setDraftStatusSpy = sandbox.spy(readonlyEntity, 'setDraftStatus');
			});

			afterEach(() => {
				sandbox.restore();
			});

			it('gets isDraft', () => {
				expect(readonlyEntity.isDraft()).to.be.true;
			});

			it('gets isPublished', () => {
				expect(readonlyEntity.isPublished()).to.be.false;
			});

			it('can edit draft', () => {
				expect(readonlyEntity.canEditDraft()).to.be.false;
			});

			it('returns undefined if attempting to edit draft state', () => {
				readonlyEntity.setDraftStatus(false)
					.then(result => expect(setDraftStatusSpy.returnValues[0]).to.be.undefined);
			});
		});
	});

	describe('Score Out Of', () => {
		describe('Can edit', () => {
			let sandbox, setScoreOutOfSpy, removeFromGradesSpy, addToGradesSpy, setUngradedSpy;

			beforeEach(() => {
				sandbox = sinon.sandbox.create();
				setScoreOutOfSpy = sandbox.spy(entity, 'setScoreOutOf');
				removeFromGradesSpy = sandbox.spy(entity, 'removeFromGrades');
				addToGradesSpy = sandbox.spy(entity, 'addToGrades');
				setUngradedSpy = sandbox.spy(entity, 'setUngraded');
			});

			afterEach(() => {
				sandbox.restore();
			});

			it('gets scoreOutOf', () => {
				expect(entity.scoreOutOf()).to.equal(56);
			});

			it('gets inGrades', () => {
				expect(entity.inGrades()).to.equal(true);
			});

			it('gets gradeType', () => {
				expect(entity.gradeType()).to.equal("Points");
			});

			it('can edit score out of', () => {
				expect(entity.canEditScoreOutOf()).to.be.true;
			});

			it('returns a promise when setting scoreOutOf', () => {
				entity.setScoreOutOf("70");
				expect(setScoreOutOfSpy.returnValues[0]).to.be.a('promise');
			});

			it('returns a promise when removing from grades', () => {
				entity.removeFromGrades();
				expect(removeFromGradesSpy.returnValues[0]).to.be.a('promise');
			});

			it('returns a promise when adding to grades', () => {
				entity.addToGrades();
				expect(addToGradesSpy.returnValues[0]).to.be.a('promise');
			});

			it('returns a promise when setting ungraded', () => {
				entity.setUngraded();
				expect(setUngradedSpy.returnValues[0]).to.be.a('promise');
			});
		});

		describe('Can NOT edit', () => {
			let sandbox, setScoreOutOfSpy, removeFromGradesSpy, addToGradesSpy, setUngradedSpy;

			beforeEach(() => {
				sandbox = sinon.sandbox.create();
				setScoreOutOfSpy = sandbox.spy(readonlyEntity, 'setScoreOutOf');
				removeFromGradesSpy = sandbox.spy(readonlyEntity, 'removeFromGrades');
				addToGradesSpy = sandbox.spy(readonlyEntity, 'addToGrades');
				setUngradedSpy = sandbox.spy(readonlyEntity, 'setUngraded');
			});

			afterEach(() => {
				sandbox.restore();
			});

			it('gets scoreOutOf', () => {
				expect(readonlyEntity.scoreOutOf()).to.equal(56);
			});

			it('gets inGrades', () => {
				expect(readonlyEntity.inGrades()).to.equal(true);
			});

			it('gets gradeType', () => {
				expect(readonlyEntity.gradeType()).to.equal("Points");
			});

			it('can edit score out of', () => {
				expect(readonlyEntity.canEditScoreOutOf()).to.be.false;
			});

			it('returns undefined if attempting to setting scoreOutOf', () => {
				readonlyEntity.setScoreOutOf(70)
					.then(result => expect(setScoreOutOfSpy.returnValues[0]).to.be.undefined);
			});

			it('returns undefined if attempting to removing from grades', () => {
				readonlyEntity.removeFromGrades()
					.then(result => expect(removeFromGradesSpy.returnValues[0]).to.be.undefined);
			});

			it('returns undefined if attempting to adding to grades', () => {
				readonlyEntity.addToGrades()
					.then(result => expect(addToGradesSpy.returnValues[0]).to.be.undefined);
			});

			it('returns undefined if attempting to setting ungraded', () => {
				readonlyEntity.setUngraded()
					.then(result => expect(setUngradedSpy.returnValues[0]).to.be.undefined);
			});
		});
	});
});
