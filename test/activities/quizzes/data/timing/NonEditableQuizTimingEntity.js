export const nonEditableRecommendedQuizTiming = {
	'class': ['recommended'],
	'properties': {
		'timingType': {
			'title': 'Recommended Time Limit'
		}
	},
	'entities': nonEditableTimingSubentities
};

export const nonEditableEnforcedQuizTiming = {
	'class': ['enforced'],
	'properties': {
		'timingType': {
			'title': 'Enforced Time Limit'
		}
	},
	'entities': nonEditableTimingSubentities,
	'rel':['https://quizzes.api.brightspace.com/rels/timing'],
	'links': [
		{
			'rel': [ 'self' ],
			'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22/timing?workingCopyId=1234'
		}
	]
};

const nonEditableTimingSubentities = [
	nonEditableRecommendedSubEntity,
	nonEditableEnforcedSubEntity
];

const nonEditableRecommendedSubEntity = [
	{
		'class': ['recommended', 'show-clock'],
		'properties': {
			'timeLimit': 120
		},
		'rel':['https://quizzes.api.brightspace.com/rels/timing-type']
	}
];

const nonEditableEnforcedSubEntity = {
	'class': ['enforced', 'uselatelimit'],
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
			'value': 120
		},
		'submissionLateTypeId': {
			'title': 'After the grace period, flag the quiz attempt as exceeded time limit, and allow the student to continue working. Quiz attempt will be automatically scored as zero after an extended deadline.'
		},
		'graceLimit': {
			'title': 'Grace Period',
			'value': 5
		}
	},
	'rel':['https://quizzes.api.brightspace.com/rels/timing-type']
};
