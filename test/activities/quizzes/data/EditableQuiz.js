export const editableQuiz = {
	'class': [
		'quiz'
	],
	'properties': {
		'name': 'What a great quiz'
	},
	'actions': [
		{
			'class': [
				'required'
			],
			'href': 'https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123060/folders/7',
			'name': 'update-name',
			'method': 'PATCH',
			'fields': [
				{
					'type': 'text',
					'name': 'name',
				}
			]
		},
	],
	'links': [
		{
			'rel': [
				'self'
			],
			'href': 'https://f5aa43d7-c082-485c-84f5-4808147fe98a.quizzes.api.dev.brightspace.com/123060/folders/7'
		},
		{
			'rel': [
				'https://activities.api.brightspace.com/rels/activity-usage'
			],
			'href': 'https://f5aa43d7-c082-485c-84f5-4808147fe98a.activities.api.dev.brightspace.com/activities/6606_51000_7/usages/123060'
		},
	],
	'rel': [
		'https://quizzes.api.brightspace.com/rels/quiz'
	]
};
