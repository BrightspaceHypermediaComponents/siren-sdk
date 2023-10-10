export const testData = {
	assignmentActivityInstanceEntity: {
		'class': [
			'activity-instance',
			'assignment-activity-instance'
		],
		'entities': [
			{
				'class': [
					'date',
					'start-date',
					'start-date-type'
				],
				'rel': [
					'https://api.brightspace.com/rels/date'
				],
				'properties': {
					'date': '2023-07-16T04:01:00.000Z',
					'availabilityType': 1
				}
			},
			{
				'class': [
					'date',
					'end-date',
					'end-date-type'
				],
				'rel': [
					'https://api.brightspace.com/rels/date'
				],
				'properties': {
					'date': '2023-07-25T03:59:59.000Z',
					'availabilityType': 0
				}
			},
			{
				'class': [
					'date',
					'due-date'
				],
				'rel': [
					'https://api.brightspace.com/rels/date'
				],
				'properties': {
					'date': '2023-07-23T03:59:59.000Z'
				}
			}
		],
		'links': [
			{
				'rel': ['self'],
				'href': 'http://localhost:7000/scenarios/4_assignment-1-user-2-submissions-complete-evaluated/activity/activity-instance/activity-instance.json'
			},
			{
				'rel': [
					'https://activities.api.brightspace.com/rels/associations'
				],
				'href': 'http://localhost:7000/scenarios/4_assignment-1-user-2-submissions-complete-evaluated/activity/activity-instance-associataion/activity-instance-association.json'
			},
			{
				'rel': [
					'https://api.brightspace.com/rels/assignment'
				],
				'href': 'http://localhost:7000/scenarios/4_assignment-1-user-2-submissions-complete-evaluated/assignment/assignment.json'
			},
			{
				'rel': [
					'https://activities.api.brightspace.com/rels/assigned-activities'
				],
				'href': 'http://localhost:7000/scenarios/4_assignment-1-user-2-submissions-complete-evaluated/activity/assigned-activities/assigned-activities.json',
				'class': ['show-hidden']
			},
			{
				'rel': [
					'https://activities.api.brightspace.com/rels/grade'
				],
				'href': 'http://localhost:7000/scenarios/4_assignment-1-user-2-submissions-complete-evaluated/activity/assigned-assignment-activity-grade/assigned-assignment-activity-grade.json'
			}
		]
	}
};
