export const testData = {
	assignmentStatusEntity: {
		'class': [
			'assignment',
			'evaluation-status'
		],
		'properties': {
			'assigned': 30,
			'completed': 15,
			'evaluated': 10,
			'published': 5,
			'newsubmissions': 1,
			'resubmissions': 2
		},
		'entities': [
			{
				'class': [
					'relative-uri'
				],
				'rel': [
					'item',
					'https://assessments.api.brightspace.com/rels/submission-application'
				],
				'properties': {
					'path': 'submission'
				}
			},
			{
				'class': [
					'relative-uri'
				],
				'rel': [
					'item',
					'https://assessments.api.brightspace.com/rels/assess-all-application'
				],
				'properties': {
					'path': 'assess-all'
				}
			},
			{
				'class': [
					'relative-uri'
				],
				'rel': [
					'item',
					'https://assessments.api.brightspace.com/rels/assess-new-application'
				],
				'properties': {
					'path': 'asses-new'
				}
			}
		],
		'links': [
			{
				'rel': [
					'https://activities.api.brightspace.com/rels/evaluation-status'
				],
				'href': 'https://2864b37c-fb9f-4b5b-ae27-897885ef47ce.activities.api.proddev.d2l/activities/6606_2000_3/usages/6613/evaluation-status'
			},
			{
				'rel': [
					'https://activities.api.brightspace.com/rels/activity-usage'
				],
				'href': 'https://2864b37c-fb9f-4b5b-ae27-897885ef47ce.activities.api.proddev.d2l/activities/6606_2000_3/usages/6613'
			},
			{
				'rel': [
					'assignment'
				],
				'href': 'https://2864b37c-fb9f-4b5b-ae27-897885ef47ce.assignments.api.proddev.d2l/6613/folders/3'
			}
		],
		'rel': [
			'https://assignments.api.brightspace.com/rels/evaluation-status'
		]
	},
	quizStatusEntity: {
		class: [ 'quiz', 'evaluation-status' ],
		...testData.assignmentStatusEntity
	},
	discussionTopicStatusEntity: {
		class: [ 'topic', 'evaluation-status' ],
		...testData.assignmentStatusEntity
	},
	unexpectedStatusEntity: {
		class: [ 'unexpectedActivityTypeClass', 'evaluation-status' ],
		...testData.assignmentStatusEntity
	}
};
