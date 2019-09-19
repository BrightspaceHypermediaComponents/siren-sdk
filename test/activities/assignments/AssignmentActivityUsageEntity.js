import { AssignmentActivityUsageEntity } from '../../../src/activities/assignments/AssignmentActivityUsageEntity.js';

describe('AssignmentActivityUsageEntity', () => {

	describe('Basic loading', () => {
		it('reads assignment link', () => {
			var entity = window.D2L.Hypermedia.Siren.Parse({
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
			var assignmentActivityUsageEntity = new AssignmentActivityUsageEntity(entity);
			expect(assignmentActivityUsageEntity.assignmentHref()).to.equal('https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7');
		});
	});
});
