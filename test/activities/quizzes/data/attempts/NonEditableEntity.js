export const nonEditableAttemptsEntity = {
	'class': [
		'attempts'
	],
	'properties': {
		'attempts': '3'
	},
	'entities': [
		{
			'class': [
				'overall-grade-calculation-type'
			],
			'rel': [
				'related'
			],
			'properties': {
				'overallGradeCalculationType': {
					'title': 'Lowest Attempt',
					'value': 'lowest'
				}
			}
		},
		{
			'class': [
				'retake-incorrect-only',
				'checked'
			],
			'rel': [
				'related'
			]
		},
		{
			'class': [
				'attempt-conditions',
				'collection'
			],
			'rel': [
				'related'
			],
			'entities': [
				{
					'class': [
						'attempt-condition'
					],
					'rel': [
						'item'
					]
				},
				{
					'class': [
						'attempt-condition'
					],
					'rel': [
						'item'
					]
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
	],
	'rel': [
		'https://quizzes.api.brightspace.com/rels/attempts'
	]
};
