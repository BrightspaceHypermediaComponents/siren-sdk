export const quizAttemptsEntity = {
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
			},
			'actions': [
				{
					'href': 'https://tenantId.quizzes.api.dev.brightspace.com/123170/quizzes/1391/attempts',
					'name': 'update-overall-grade-calculation-type',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'radio',
							'name': 'overallGradeCalculationType',
							'value': [
								{
									'title': 'Highest Attempt',
									'value': 'highest',
									'selected': false
								},
								{
									'title': 'Lowest Attempt',
									'value': 'lowest',
									'selected': true
								},
								{
									'title': 'Average of all Attempts',
									'value': 'average',
									'selected': false
								},
								{
									'title': 'First Attempt',
									'value': 'first',
									'selected': false
								},
								{
									'title': 'Last Attempt',
									'value': 'last',
									'selected': false
								}
							]
						}
					]
				}
			]
		},
		{
			'class': [
				'retake-incorrect-only',
				'checked'
			],
			'rel': [
				'related'
			],
			'actions': [
				{
					'href': 'https://tenantId.quizzes.api.dev.brightspace.com/123170/quizzes/1391/attempts',
					'name': 'update-retake-incorrect-only',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'checkbox',
							'name': 'retakeIncorrectOnly',
							'value': true
						}
					]
				}
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
					'actions': [
						{
							'href': 'https://tenantId.quizzes.api.dev.brightspace.com/123170/quizzes/1391/attempts',
							'name': 'update-condition',
							'method': 'PATCH',
							'fields': [
								{
									'type': 'hidden',
									'name': 'attempt',
									'value': 2
								},
								{
									'type': 'number',
									'name': 'min'
								},
								{
									'type': 'number',
									'name': 'max'
								}
							]
						}
					]
				},
				{
					'class': [
						'attempt-condition'
					],
					'rel': [
						'item'
					],
					'actions': [
						{
							'href': 'https://tenantId.quizzes.api.dev.brightspace.com/123170/quizzes/1391/attempts',
							'name': 'update-condition',
							'method': 'PATCH',
							'fields': [
								{
									'type': 'hidden',
									'name': 'attempt',
									'value': 3
								},
								{
									'type': 'number',
									'name': 'min'
								},
								{
									'type': 'number',
									'name': 'max'
								}
							]
						}
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
	'actions': [
		{
			'href': 'https://tenantId.quizzes.api.dev.brightspace.com/123170/quizzes/1391/attempts',
			'name': 'update-attempts',
			'method': 'PATCH',
			'fields': [
				{
					'type': 'radio',
					'name': 'attemptsAllowed',
					'value': [
						{
							'title': 'Unlimited',
							'value': 0,
							'selected': false
						},
						{
							'title': 1,
							'value': 1,
							'selected': false
						},
						{
							'title': 2,
							'value': 2,
							'selected': false
						},
						{
							'title': 3,
							'value': 3,
							'selected': true
						},
						{
							'title': 4,
							'value': 4,
							'selected': false
						},
						{
							'title': 5,
							'value': 5,
							'selected': false
						},
						{
							'title': 6,
							'value': 6,
							'selected': false
						},
						{
							'title': 7,
							'value': 7,
							'selected': false
						},
						{
							'title': 8,
							'value': 8,
							'selected': false
						},
						{
							'title': 9,
							'value': 9,
							'selected': false
						},
						{
							'title': 10,
							'value': 10,
							'selected': false
						}
					]
				}
			]
		}
	],
	'rel': [
		'https://quizzes.api.brightspace.com/rels/attempts'
	]
};
