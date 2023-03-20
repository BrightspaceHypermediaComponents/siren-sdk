const editableRecommendedSubEntity = {
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
			'href': 'quizzes/{quizId}/timing?workingCopyId=<workingCopyId>',
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
			'href': 'quizzes/{quizId}/timing?workingCopyId=<workingCopyId>'
		}
	],
	'properties': {
		'timeLimit': {
			value: 120
		}
	},
	'rel': ['https://quizzes.api.brightspace.com/rels/timing-type'],
	'title': 'Recommended Time Limit'
};

const editableEnforcedSubEntity = {
	'class': ['enforced', 'uselatelimit'],
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
							'selected': false,
							'title': 'Allow the learner to continue working',
							'value': 'allownormalsubmission'
						},
						{
							'selected': false,
							'title': 'Prevent the learner from making further changes',
							'value': 'autosubmitattempt'
						},
						{
							'selected': true,
							'title': 'Allow the learner to continue working, but automatically score the attempt as zero after an extended deadline.',
							'value': 'uselatelimit'
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
					'max': 2147483647,
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
			'class': ['uselatelimit'],
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
		'graceLimit': {
			'title': 'Grace Period',
			'value': 5
		}
	},
	'rel': ['https://quizzes.api.brightspace.com/rels/timing-type'],
	'title': 'Enforced Time Limit'
};

const editableTimingSubentities = [
	editableRecommendedSubEntity,
	editableEnforcedSubEntity
];

export const recommendedQuizTiming = {
	'class': ['recommended'],
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
							'value': 'recommended'
						},
						{
							'selected': false,
							'title': 'Enforced Time Limit',
							'value': 'enforced'
						}
					]
				}
			],
			'name': 'update-timing-type',
			'method': 'PATCH',
			'href': 'quizzes/{quizId}/timing?workingCopyId=<workingCopyId>'
		}
	],
	'entities': editableTimingSubentities,
	'rel': ['https://quizzes.api.brightspace.com/rels/timing'],
	'links': [
		{
			'rel': ['self'],
			'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22/timing'
		}
	]
};

export const enforcedQuizTiming = {
	'class': ['enforced'],
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
							'value': 'recommended'
						},
						{
							'selected': true,
							'title': 'Enforced Time Limit',
							'value': 'enforced'
						}
					]
				}
			],
			'name': 'update-timing-type',
			'method': 'PATCH',
			'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22/timing'
		}
	],
	'entities': editableTimingSubentities,
	'rel': ['https://quizzes.api.brightspace.com/rels/timing'],
	'links': [
		{
			'rel': ['self'],
			'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22/timing'
		}
	]
};

function buildEditableTimerSettingsEntity(timeLimit, timingType, submissionLateType, timeLimitType, isSynchronous) {
	return {
		'class': ['with-time-limit-type', timeLimitType || 'autosubmit', isSynchronous ? 'synchronous' : 'asynchronous'],
		'rel': ['https://quizzes.api.brightspace.com/rels/timing-type'],
		'properties': {
			'timeLimit': {
				'title': 'Time Limit',
				'value': timeLimit
			}
		},
		'title': 'Timer Settings',
		'actions': [
			{
				'href': 'https://c29f6240-0b9e-40d6-9b12-566e53c9b33b.quizzes.api.dev.brightspace.com/6609/quizzes/16/timing',
				'name': 'update-quiz-start-type',
				'method': 'PATCH',
				'fields': [
			  		{
						'type': 'radio',
						'name': 'startType',
						'value': [
				  			{
								'title': 'Asynchronous: Timer starts when the learner launches the quiz',
								'value': 'asynchronous',
								'selected': !isSynchronous
				  			},
				  			{
								'title': 'Synchronous: Timer starts on the start date',
								'value': 'synchronous',
								'selected': isSynchronous
				  			}
						]
			  		}
				]
		  	},
			{
				'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22/timing?workingCopyId=1234',
				'name': 'toggle-set-time-limit',
				'method': 'PATCH',
				'fields': [
					{
						'type': 'checkbox',
						'name': 'hasTimeLimit',
						'value': timingType !== 'notimelimit'
					}
				]
			},
			{
				'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22/timing?workingCopyId=1234',
				'name': 'update-timing-time-limit',
				'method': 'PATCH',
				'fields': [
					{
						'type': 'number',
						'title': 'Time Limit',
						'name': 'timeLimit',
						'value': timeLimit,
						'min': 1,
						'max': 9999
					}
				]
			},
			{
				'title': 'Time Limit Type',
				'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22/timing?workingCopyId=1234',
				'name': 'update-time-limit-type',
				'method': 'PATCH',
				'fields': [
					{
						'type': 'radio',
						'name': 'timeLimitType',
						'value': [
							{
								'title': 'Automatically submit the quiz attempt',
								'value': 'autosubmit',
								'selected': (timeLimitType === 'autosubmit' &&
									timingType === 'enforced' &&
									timeLimit !== 0 &&
									(submissionLateType === 'autosubmitattempt' || submissionLateType === 'uselatelimit')) ||
									(timingType === 'notimelimit' && timeLimit === 0)
							},
							{
								'title': 'Flag the attempt as exceeded time limit and allow the learner to continue working',
								'value': 'markexceedtime',
								'selected': timeLimitType === 'markexceedtime' &&
									timingType === 'enforced' &&
									submissionLateType === 'allownormalsubmission' &&
									timeLimit !== 0
							},
							{
								'title': 'Do nothing: the time limit is recommended, not enforced',
								'value': 'recommendedlimit',
								'selected': timeLimitType === 'recommendedlimit' && timingType === 'recommended' && timeLimit !== 0
							}
						]
					}
				]
			}
		]
	};
}

function buildNonEditableRecommendedSubEntity(timeLimit) {
	return {
		'class': ['recommended', 'show-clock'],
		'properties': {
			'timeLimit': {
				value: timeLimit
			}
		},
		'rel': ['https://quizzes.api.brightspace.com/rels/timing-type'],
		'title': 'Recommended Time Limit'
	};
}

const readOnlySubmissionLateTypeTitles = {
	'allownormalsubmission': 'After the grace period, flag the quiz attempt as exceeded time limit, and allow the student to continue working.',
	'autosubmitattempt': 'After the grace period, flag the quiz attempt as exceeded time limit, and prevent the student from making further changes.',
};

function buildNonEditableEnforcedSubEntity(timeLimit, submissionLateType) {
	return {
		'class': ['enforced', submissionLateType || 'autosubmitattempt'],
		'entities': [
			{
				'class': ['uselatelimit'],
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
				'value': timeLimit
			},
			'graceLimit': {
				'title': 'Grace Period',
				'value': 5
			},
			'submissionLateTypeId': {
				'title': readOnlySubmissionLateTypeTitles[submissionLateType]
			}
		},
		'rel': ['https://quizzes.api.brightspace.com/rels/timing-type'],
		'title': 'Enforced Time Limit'
	};
}

export function buildTimingWithTimerSettings(timeLimit, timingType, submissionLateType, timeLimitType, isSynchronous) {
	return {
		'class':[timingType],
		'entities': [
			buildNonEditableRecommendedSubEntity(timeLimit),
			buildNonEditableEnforcedSubEntity(timeLimit, submissionLateType),
			buildEditableTimerSettingsEntity(timeLimit, timingType, submissionLateType, timeLimitType, isSynchronous)
		],
		'rel': ['https://quizzes.api.brightspace.com/rels/timing'],
		'links': [
			{
				'rel': ['self'],
				'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22/timing'
			}
		]
	};
}
