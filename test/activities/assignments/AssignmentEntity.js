import { AssignmentEntity } from '../../../src/activities/assignments/AssignmentEntity.js';

describe('AssignmentEntity', () => {
	var editableEntity, nonEditableEntity;

	beforeEach(() => {
		nonEditableEntity = window.D2L.Hypermedia.Siren.Parse({
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

		editableEntity = window.D2L.Hypermedia.Siren.Parse({
			'class': [
				'assignment'
			],
			'properties': {
				'name': 'Extra Special Assignment',
			},
			'actions': [
				{
					'class': [
						'required'
					],
					'href': 'https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7',
					'name': 'update-name',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'text',
							'name': 'name',
							'value': 'Folder 1'
						}
					]
				},
				{
					'href': 'https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7',
					'name': 'update-instructions',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'text',
							'name': 'instructions',
							'value': ''
						}
					]
				},
				{
					'href': 'https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7',
					'name': 'update-max-grade-point',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'number',
							'name': 'outOf',
							'value': 10.000000000
						}
					]
				},
			],
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
	});

	describe('Basic loading', () => {
		it('reads name', () => {
			var assignmentEntity = new AssignmentEntity(nonEditableEntity);
			expect(assignmentEntity.name()).to.equal('Extra Special Assignment');
		});
	});
	describe('Editable', () => {
		it('sets canEditName to true', () => {
			var assignmentEntity = new AssignmentEntity(editableEntity);
			expect(assignmentEntity.canEditName()).to.be.true;
		});
	});
	describe('Non Editable', () => {
		it('sets canEditName to false', () => {
			var assignmentEntity = new AssignmentEntity(nonEditableEntity);
			expect(assignmentEntity.canEditName()).to.be.false;
		});
	});
});
