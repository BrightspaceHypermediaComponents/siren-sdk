export const nonEditableQuiz = {
	'properties': {
		'name': 'What a great quiz'
	},
	'class': [
		'named-entity',
		'quiz'
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
	],
	'entities': [
		{
			'rel': [
				'https://quizzes.api.brightspace.com/rels/shuffle'
			],
			'class': [
				'shuffle',
				'unchecked'
			],
		},
		{
			'rel': [
				'https://quizzes.api.brightspace.com/rels/has-hints'
			],
			'class': [
				'has-hints',
				'unchecked'
			],
		},
		{
			'class': [
				'disable-right-click',
				'unchecked'
			],
			'rel': [
				'https://quizzes.api.brightspace.com/rels/disable-right-click'
			]
		},
		{
			'class': [
				'disable-pager-access',
				'unchecked'
			],
			'rel': [
				'https://quizzes.api.brightspace.com/rels/disable-pager-access'
			],
		},
		{
			'class': [
				'quiz-password'
			],
			'rel': [
				'https://quizzes.api.brightspace.com/rels/quiz-password'
			],
			'properties': {
				'password': 'hello'
			},
		},
		{
			'class': [
				'notification-email'
			],
			'rel': [
				'https://quizzes.api.brightspace.com/rels/notification-email'
			],
			'properties': {
				'email': 'moose@d2l.com'
			},
		},
		{
			'class': [
				'prevent-moving-backwards',
				'unchecked'
			],
			'rel': [
				'https://quizzes.api.brightspace.com/rels/prevent-moving-backwards'
			],
		},
		{
			'class': [
				'auto-set-graded',
				'unchecked'
			],
			'rel': [
				'https://quizzes.api.brightspace.com/rels/auto-set-graded'
			],
		},
		{
			'class': [
				'sync-gradebook',
				'checked'
			],
			'rel': [
				'https://quizzes.api.brightspace.com/rels/sync-gradebook'
			],
		},
		{
			'class': [
				'completion-tracking',
				'submitted'
			],
			'rel': [
				'https://quizzes.api.brightspace.com/rels/completion-tracking'
			],
			'properties': {
				'passingPercentage': null
			}
		},
		{
			'class': [
				'attempts'
			],
			'rel': [
				'https://quizzes.api.brightspace.com/rels/attempts'
			],
			'href': 'https://tenantId.quizzes.api.dev.brightspace.com/123170/quizzes/1391/attempts'
		},
		{
			'class': [
				'richtext',
				'description'
			],
			'rel': [
				'item',
				'https://quizzes.api.brightspace.com/rels/description'
			],
			'properties': {
				'text': 'The Second quiz ever',
				'html': 'The Second quiz ever'
			}
		},
		{
			'class': [
				'richtext',
				'header'
			],
			'rel': [
				'item',
				'https://quizzes.api.brightspace.com/rels/header'
			],
			'properties': {
				'text': 'Top of the quiz to ya!',
				'html': 'Top of the quiz to ya!'
			}
		},
		{
			'class': [
				'richtext',
				'footer'
			],
			'rel': [
				'item',
				'https://quizzes.api.brightspace.com/rels/footer'
			],
			'properties': {
				'text': 'Bottom of the quiz to ya!',
				'html': 'Bottom of the quiz to ya!'
			}
		},
		{
			'rel': ['https://quizzes.api.brightspace.com/rels/timing'],
			'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22/timing'
		}
	]
};
