export const workingCopyQuiz = {
	'properties': {
		'name': 'What a great quiz'
	},
	'class': [
		'named-entity',
		'quiz'
	],
	'actions': [
		{
			'name': 'checkout',
			'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22',
			'method': 'POST',
			'fields': [
				{
					'name': 'parentWorkingCopyId',
					'type': 'text',
					'value': '12345'
				}
			]
		},
		{
			'name': 'checkin',
			'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22?workingCopyId=12345',
			'method': 'POST'
		}
	],
	'links': [
		{
			'rel': [
				'self'
			],
			'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22'
		},
		{
			'rel': [
				'alternate'
			],
			'href': 'http://d2l-d6xpge1xiym.desire2learn.d2l:44444/d2l/lms/quizzing/quizzing.d2l?ou=6606&qi=22',
			'type': 'text/html'
		},
		{
			'rel': [
				'preview'
			],
			'type': 'text/html',
			'href': 'http://test.desire2learn.d2l/d2l/lms/quizzing/user/quiz_summary.d2l?ou=6606&qi=46&isprv=1&fromQB=1&bp=1'
		},
		{
			'rel': [
				'https://api.brightspace.com/rels/organization'
			],
			'href': 'https://afe99802-9130-4320-a770-8d138b941e74.organizations.api.proddev.d2l/6606'
		},
		{
			'rel': [
				'https://activities.api.brightspace.com/rels/activity-usage'
			],
			'href': 'https://afe99802-9130-4320-a770-8d138b941e74.activities.api.proddev.d2l/activities/6606_51000_22/usages/6606'
		}
	]
};
