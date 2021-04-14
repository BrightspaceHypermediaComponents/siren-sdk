export const newGradeEditable = {
	'class': [
		'associate-grade', 'new-grade'
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
							'selected': true
						},
						{
							'title': 'Link to an existing grade item',
							'value': 'existing-grade',
							'selected': false
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
				'new-grade', 'numeric'
			],
			'properties': {
				'name': 'Homework 1',
				'maxPoints': 150
			},
			'actions': [
				{
					'href': 'https://5096e993-e418-4681-81c5-cae06b019fbb.activities.api.dev.brightspace.com/activities/6606_2000_277/usages/123171/associate-grade?workingCopyId=123',
					'name': 'choose-type',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'radio',
							'name': 'gradeType',
							'value': [
								{
									'title': 'Numeric',
									'value': 'numeric',
									'selected': true
								},
								{
									'title': 'Select Box',
									'value': 'selectbox',
									'selected': false
								}
							]
						},
						{
							'type': 'text',
							'name': 'maxPoints',
							'value': '150'
						},
						{
							'type': 'text',
							'name': 'gradeName',
							'value': 'Homework 1'
						}
					]
				},
				{
					'href': 'https://5096e993-e418-4681-81c5-cae06b019fbb.activities.api.dev.brightspace.com/activities/6606_2000_277/usages/123171/associate-grade/grade-categories?workingCopyId=123',
					'name': 'get-categories',
					'method': 'GET'
				}
			],
			'entities': [
				{
					'class': [
						'numeric'
					],
					'rel': [
						'related'
					],
					'actions': [
						{
							'href': 'https://5096e993-e418-4681-81c5-cae06b019fbb.activities.api.dev.brightspace.com/activities/6606_2000_277/usages/123171/associate-grade/grade-schemes?workingCopyId=123',
							'name': 'get-schemes',
							'method': 'GET'
						}
					],
					'links': [
						{
							'rel': [
								'https://grades.api.brightspace.com/rels/grade-scheme',
								'related'
							],
							'href': 'https://5096e993-e418-4681-81c5-cae06b019fbb.grades.api.dev.brightspace.com/organizations/123171/grade-scheme/5258'
						}
					]
				},
				{
					'class': [
						'selectbox'
					],
					'rel': [
						'related'
					],
					'actions': [
						{
							'href': 'https://5096e993-e418-4681-81c5-cae06b019fbb.activities.api.dev.brightspace.com/activities/6606_2000_277/usages/123171/associate-grade/grade-schemes?workingCopyId=123',
							'name': 'get-schemes',
							'method': 'GET',
							'fields': [
								{
									'type': 'hidden',
									'name': 'gradeType',
									'value': 'selectbox'
								}
							]
						}
					],
					'links': [
						{
							'rel': [
								'https://grades.api.brightspace.com/rels/grade-scheme',
								'related'
							],
							'href': 'https://5096e993-e418-4681-81c5-cae06b019fbb.grades.api.dev.brightspace.com/organizations/123171/grade-scheme/5258'
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
				},
				{
					'rel': [
						'https://grades.api.brightspace.com/rels/grade-category',
						'related'
					],
					'href': 'https://5096e993-e418-4681-81c5-cae06b019fbb.grades.api.dev.brightspace.com/organizations/123171/grade-categories/5258'
				}
			]
		}
	]
};
