export const existingGradeEditable = {
	'class': [
		'associate-grade', 'existing-grade'
	],
	'actions': [
		{
			'href': 'https://5096e993-e418-4681-81c5-cae06b019fbb.activities.api.dev.brightspace.com/activities/6606_2000_277/usages/123171/associate-grade?workingCopyId=123',
			'name': 'gradebook-status',
			'method': 'PATCH',
			'fields': [
				{
					'type': 'radio',
					'name': 'gradebookStatus',
					'value': [
						{
							'title': 'Not in gradebook',
							'value': 'not-in-gradebook',
							'selected': false
						},
						{
							'title': 'Create a new grade item',
							'value': 'new-grade',
							'selected': false
						},
						{
							'title': 'Link to an existing grade item',
							'value': 'existing-grade',
							'selected': true
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
			'href': 'https://5096e993-e418-4681-81c5-cae06b019fbb.activities.api.dev.brightspace.com/activities/6606_2000_277/usages/123171/associate-grade?workingCopyId=123'
		}
	],
	'entities': [
		{
			'class': [
				'existing-grade'
			],
			'rel': [
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
