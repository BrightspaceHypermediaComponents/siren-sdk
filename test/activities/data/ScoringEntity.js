export const testData = {
	scoringEntityEditable: {
		'class':[
			'score-out-of'
		],
		'properties':{
			'scoreOutOf':5,
			'gradeMaxPoints':5
		},
		'links':[
			{
				'rel':[
					'self'
				],
				'href':'https://7b81c573-c2ec-4a6b-adec-0011f509dc6b.activities.api.dev.brightspace.com/activities/6606_2000_303/usages/123163/scoring'
			}
		],
		'actions':[
			{
				'href':'https://7b81c573-c2ec-4a6b-adec-0011f509dc6b.assignments.api.dev.brightspace.com/123163/folders/303/score-out-of',
				'name':'update',
				'method':'POST',
				'fields':[
					{
						'type':'number',
						'name':'scoreOutOf',
						'value':5
					}
				]
			}
		]
	},
	scoringEntityReadonly: {
		'class':[
			'score-out-of'
		],
		'properties':{
			'scoreOutOf':5,
			'gradeMaxPoints':5
		},
		'links':[
			{
				'rel':[
					'self'
				],
				'href':'https://7b81c573-c2ec-4a6b-adec-0011f509dc6b.activities.api.dev.brightspace.com/activities/6606_2000_303/usages/123163/scoring'
			}
		],
	}
};
