export const quizAttemptsEntity = {
	'class': [
		'attempts'
	],
	'rel': [
		'https://quizzes.api.brightspace.com/rels/attempts'
	],
	'properties': {
		'attempts': 3
	},
	'actions': [
		{
			'href': 'https://tenantId.quizzes.api.dev.brightspace.com/123170/quizzes/1391/attempt',
			'name': 'update-attempts',
			'method': 'PATCH',
			'fields': [
				{
					'type': 'number',
					'name': 'attempts',
					'value': 3
				}
			]
		}
	],
	'links': [
		{
			'rel': [
				'self'
			],
			'href': 'https://tenantId.quizzes.api.dev.brightspace.com/123170/quizzes/1391/attempts'
		}
	]
};
