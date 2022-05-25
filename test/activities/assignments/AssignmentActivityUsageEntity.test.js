import { AssignmentActivityUsageEntity } from '../../../src/activities/assignments/AssignmentActivityUsageEntity.js';
import { expect } from '@open-wc/testing';
import SirenParse from 'siren-parser';

describe('AssignmentActivityUsageEntity', () => {

	describe('Basic loading', () => {
		it('reads assignment link', () => {
			const entity = SirenParse({
				'class': [
					'assignment-activity',
					'published'
				],
				'entities': [],
				'links': [
					{
						'rel': [
							'https://activities.api.brightspace.com/rels/activity-usage',
							'self'
						],
						'href': 'https://f5aa43d7-c082-485c-84f5-4808147fe98a.activities.api.dev.brightspace.com/activities/6606_2000_7/usages/123065'
					},
					{
						'rel': [
							'https://api.brightspace.com/rels/assignment'
						],
						'href': 'https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7'
					}
				]
			});
			const assignmentActivityUsageEntity = new AssignmentActivityUsageEntity(entity);
			expect(assignmentActivityUsageEntity.assignmentHref()).to.equal('https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7');
		});
	});
});
