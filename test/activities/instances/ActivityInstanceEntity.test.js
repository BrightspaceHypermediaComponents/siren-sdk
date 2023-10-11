import { ActivityInstanceEntity } from '../../../src/activities/instances/ActivityInstanceEntity.js';
import { expect } from '@open-wc/testing';
import SirenParse from 'siren-parser';
import { testData } from './data/ActivityInstanceEntity.js';

describe('ActivityInstanceEntity', () => {
	let entity, entityJson;

	beforeEach(() => {
		entityJson = SirenParse(testData.assignmentActivityInstanceEntity);
		entity = new ActivityInstanceEntity(entityJson);
	});

	describe('Basic info', () => {
		it('should return Assignment activity type', () => {
			expect(entity.activityType()).to.equal('Assignment');
		});

		it('should return start date', () => {
			expect(entity.startDate()).to.equal('2023-07-16T04:01:00.000Z');
		});

		it('should return start date type', () => {
			expect(entity.startDateType()).to.equal(1);
		});

		it('should return end date type', () => {
			expect(entity.endDate()).to.equal('2023-07-25T03:59:59.000Z');
		});

		it('should return end date type', () => {
			expect(entity.endDateType()).to.equal(0);
		});

		it('should return due date', () => {
			expect(entity.dueDate()).to.equal('2023-07-23T03:59:59.000Z');
		});
	});
});
