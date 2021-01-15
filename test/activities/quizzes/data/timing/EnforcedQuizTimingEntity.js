export const enforcedQuizTiming = {
	'class': [],
	'actions': [
		{
			'fields': [
				{
					'name': 'timingType',
					'type': 'radio',
					'value': [
						{
							'selected': false,
							'title': 'Recommended Time Limit',
							'value': 0
						},
						{
							'selected': true,
							'title': 'Enforced Time Limit',
							'value': 1
						}
					]
				}
			],
			'name': 'update-timing-type',
			'method': 'PATCH',
			'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22/timing?workingCopyId=1234'
		}
	],
	'properties': {
		'timingType': {
			'title': 'Enforced Time Limit',
			'value': 1
		}
	},
	'entities': [
		{
			'class': ['enforced'],
			'actions': [
				{
					'fields': [
						{
							'type': 'number',
							'name': 'timeLimit',
							'value': 120,
							'title': 'Time Limit',
							'min': 1,
							'max': 9999
						}
					],
					'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22/timing?workingCopyId=1234',
					'method': 'PATCH',
					'name': 'update-timing-time-limit'
				},
				{
					'fields': [
						{
							'name': 'submissionLateTypeId',
							'type': 'radio',
							'value': [
								{
									'selected': true,
									'title': 'Allow the learner to continue working',
									'value': 0
								},
								{
									'selected': false,
									'title': 'Prevent the learner from making further changes',
									'value': 2
								},
								{
									'selected': false,
									'title': 'Allow the learner to continue working, but automatically score the attempt as zero after an extended deadline.',
									'value': 1
								}
							]
						}
					],
					'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22/timing?workingCopyId=1234',
					'method': 'PATCH',
					'name': 'update-timing-late-type-id'
				},
				{
					'fields': [
						{
							'type': 'number',
							'name': 'graceLimit',
							'value': 5,
							'min': 1,
							'max': 999999999999999,
							'title': 'Grace Period'
						}
					],
					'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22/timing?workingCopyId=1234',
					'method': 'PATCH',
					'name': 'update-timing-grace-limit'
				}
			],
			'entities': [
				{
					'class': ['automatic-zero'],
					'actions': [
						{
							'fields': [
								{
									'type': 'radio',
									'name': 'submissionLateData',
									'title': 'Extended Deadline',
									'value': [
										{
											'selected': true,
											'value': 1
										},
										{
											'selected': false,
											'value': 5
										},
										{
											'selected': false,
											'value': 10
										},
										{
											'selected': false,
											'value': 15
										},
										{
											'selected': false,
											'value': 30
										},
										{
											'selected': false,
											'value': 45
										},
										{
											'selected': false,
											'value': 60
										},
										{
											'selected': false,
											'value': 120
										}
									]
								}
							],
							'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22/timing?workingCopyId=1234',
							'method': 'PATCH',
							'name': 'update-timing-late-data'
						}
					],
					'properties': {
						'submissionLateData': {
							'title': 'Extended Deadline',
							'value': 1
						}
					},
					'rel': ['https://quizzes.api.brightspace.com/rels/timing-late-type']
				}
			],
			'properties': {
				'timeLimit': {
					'title': 'Time Limit',
					'value': 120
				},
				'lateTypeId': {
					'title': 'After the grace period, flag the quiz attempt as exceeded time limit, and allow the student to continue working. Quiz attempt will be automatically scored as zero after an extended deadline.',
					'value': 1
				},
				'graceLimit': {
					'title': 'Grace Period',
					'value': 5
				}
			},
			'rel':['https://quizzes.api.brightspace.com/rels/timing-type']
		}
	],
	'rel':['https://quizzes.api.brightspace.com/rels/timing'],
	'links': [
		{
			'rel': [ 'self' ],
			'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22/timing?workingCopyId=1234'
		}
	]
};
