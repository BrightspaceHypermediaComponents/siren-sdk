export const existingGradeNonEditable = {
	'class': [
		'associate-grade', 'existing-grade'
	],
	'links': [
		{
			'rel': [
				'self'
			],
			'href': 'https://5096e993-e418-4681-81c5-cae06b019fbb.activities.api.dev.brightspace.com/activities/6606_2000_277/usages/123171/associate-grade?workingCopyId=123'
		}
	],
	'entities': [
		{
			'class': [
				'existing-grade'
			],
			'actions': [
				{
					'href': 'https://5096e993-e418-4681-81c5-cae06b019fbb.activities.api.dev.brightspace.com/activities/6606_2000_277/usages/123171/grade-candidates?gradeTypes=5&includeGradesWithDirectRubrics=0?workingCopyId=123',
					'name': 'choose-grade',
					'method': 'GET'
				}
			],
			'links': [
				{
					'rel': [
						'https://grades.api.brightspace.com/rels/grade',
						'related'
					],
					'href': 'https://5096e993-e418-4681-81c5-cae06b019fbb.grades.api.dev.brightspace.com/organizations/123504/grades/5860'
				}
			]
		}
	]
};
