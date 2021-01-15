export const recommendedQuizTiming = {
	'class': [],
	'actions': [
		{
			'fields': [
				{
					'name': 'timingType',
					'type': 'radio',
					'value': [
						{
							'selected': true,
							'title': 'Recommended Time Limit',
							'value': 0
						},
						{
							'selected': false,
							'title': 'Enforced Time Limit',
							'value': 1
						}
					]
				}
			],
			'name': 'update-timing-type',
			'method': 'PATCH',
			'href': 'quizzes/{quizId}/timing?workingCopyId=<forkId>'
		}
	],
	'properties': {
		'timingType': {
			'title': 'Recommended Time Limit',
			'value': 0
		}
	},
	'entities': [
		{
			'class': ['recommended', 'show-clock'],
			'actions': [
				{
					'fields': [
						{
							'type': 'number',
							'name': 'timeLimit',
							'value': 120,
							'min': 1,
							'max': 9999
						}
					],
					'href': 'quizzes/{quizId}/timing?workingCopyId=<forkId>',
					'method': 'PATCH',
					'name': 'update-timing-time-limit'
				},
				{
					'fields': [
						{
							'type': 'checkbox',
							'name': 'hasTimer',
							'title': 'Show clock',
							'value': true
						}
					],
					'name': 'update-timing-has-timer',
					'method': 'PATCH',
					'href': 'quizzes/{quizId}/timing?workingCopyId=<forkId>'
				}
			],
			'properties': {
				'timeLimit': 120
			},
			'rel':['https://quizzes.api.brightspace.com/rels/timing-type']
		}
	]
};
