export const gradeCategoryLinked = {
	selected: {
		'class': [
			'grade-category',
			'selected'
		],
		'rel': [
			'item'
		],
		'actions': [
			{
				'href': 'https://6544ba98-b4dd-4f95-a5f9-16ecf2e92784.activities.api.proddev.d2l/activities/6606_2000_1/usages/6609/associate-grade?workingCopyId=eb537250-bcd1-41fc-af48-7745966f8bc0',
				'name': 'choose-category',
				'method': 'PATCH',
				'fields': [
					{
						'type': 'hidden',
						'name': 'gradeCategoryId',
						'value': 5002
					}
				]
			}
		],
		'links': [
			{
				'rel': [
					'https://grades.api.brightspace.com/rels/grade-category'
				],
				'href': 'https://6544ba98-b4dd-4f95-a5f9-16ecf2e92784.grades.api.proddev.d2l/organizations/6609/grade-categories/5002'
			}
		]
	},
	missingPermission: {
		'class': [
			'grade-category'
		],
		'rel': [
			'item'
		],
		'links': [
			{
				'rel': [
					'https://grades.api.brightspace.com/rels/grade-category'
				],
				'href': 'https://6544ba98-b4dd-4f95-a5f9-16ecf2e92784.grades.api.proddev.d2l/organizations/6609/grade-categories/5003'
			}
		]
	}
};