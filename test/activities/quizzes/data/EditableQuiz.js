export const editableQuiz = {
	'properties': {
		'name': 'What a great quiz'
	},
	'class': [
		'named-entity',
		'quiz'
	],
	'actions': [
		{
			'name': 'update-name',
			'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22',
			'method': 'PATCH',
			'type': 'application/x-www-form-urlencoded',
			'fields': [
				{
					'name': 'name',
					'class': [
						'required'
					],
					'type': 'text',
					'value': 'Untitled'
				}
			]
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
			'class': [
				'shuffle',
				'checked'
			],
			'rel': [
				'https://quizzes.api.brightspace.com/rels/shuffle'
			],
			'actions': [
				{
					'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22',
					'name': 'update-shuffle',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'checkbox',
							'name': 'shuffle',
							'value': true
						}
					]
				}
			]
		},
		{
			'rel': [
				'https://quizzes.api.brightspace.com/rels/has-hints'
			],
			'class': [
				'has-hints',
				'checked'
			],
			'actions': [
				{
					'name': 'update-hints',
					'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22',
					'method': 'PATCH',
					'type': 'application/x-www-form-urlencoded',
					'fields': [
						{
							'name': 'hasHints',
							'type': 'checkbox',
							'value': true
						}
					]
				}
			]
		},
		{
			'class': [
				'disable-right-click',
				'checked'
			],
			'rel': [
				'https://quizzes.api.brightspace.com/rels/disable-right-click'
			],
			'actions': [
				{
					'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22',
					'name': 'update-disable-right-click',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'checkbox',
							'name': 'disableRightClick',
							'value': true
						}
					]
				}
			]
		},
		{
			'class': [
				'disable-pager-access',
				'checked'
			],
			'rel': [
				'https://quizzes.api.brightspace.com/rels/disable-pager-access'
			],
			'actions': [
				{
					'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22',
					'name': 'update-disable-pager-access',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'checkbox',
							'name': 'disablePagerAccess',
							'value': true
						}
					]
				}
			]
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
			'actions': [
				{
					'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22',
					'name': 'update-quiz-password',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'password',
							'name': 'password',
							'value': 'hello'
						}
					]
				}
			]
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
			'actions': [
				{
					'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22',
					'name': 'update-notification-email',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'text',
							'name': 'notificationEmail',
							'value': 'moose@d2l.com'
						}
					]
				}
			]
		}
	]
};
