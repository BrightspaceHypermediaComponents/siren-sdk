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
					],
					'properties': {
						'attempt': 2,
						'min': 22.300000000,
						'max': 77.000000000
					}
				},
				{
					'class': [
						'attempt-condition'
					],
					'rel': [
						'item'
					],
					'properties': {
						'attempt': 3,
						'min': 1.000000000
					}
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
