import { AssignmentEntity } from '../../../src/activities/assignments/AssignmentEntity.js';

describe('AssignmentEntity', () => {

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
			var assignmentEntity = new AssignmentEntity(entity);
			expect(assignmentEntity.name()).to.equal('Extra Special Assignment');
		});
	});
});
