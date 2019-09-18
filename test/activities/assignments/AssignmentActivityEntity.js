import { AssignmentActivityEntity } from '../../../src/activities/assignments/AssignmentActivityEntity.js';

describe('AssignmentActivityEntity', () => {

	describe('Basic loading', () => {
		it('reads name', () => {
			var entity = window.D2L.Hypermedia.Siren.Parse({
				'class': [
					'assignment'
				],
				'properties': {
					'name': 'Extra Special Assignment',
				},
				'links': [
					{
						'rel': [
							'self'
						],
						'href': 'https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7'
					},
					{
						'rel': [
							'https://activities.api.brightspace.com/rels/activity-usage'
						],
						'href': 'https://f5aa43d7-c082-485c-84f5-4808147fe98a.activities.api.dev.brightspace.com/activities/6606_2000_7/usages/123065'
					},
				],
				'rel': [
					'https://assignments.api.brightspace.com/rels/assignment'
				]
			});
			var assignmentActivityEntity = new AssignmentActivityEntity(entity);
			expect(assignmentActivityEntity.name()).to.equal('Extra Special Assignment');
		});
	});
});
