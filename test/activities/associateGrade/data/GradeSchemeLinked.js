export const gradeSchemeLinked = {
	selected: {
		'class': [
			'grade-scheme',
			'selected',
			'default'
		],
		'rel': [
			'item'
		],
		'actions': [
			{
				'href': 'https://5096e993-e418-4681-81c5-cae06b019fbb.activities.api.dev.brightspace.com/activities/6606_2000_277/usages/123171/associate-grade?workingCopyId=123',
				'name': 'choose-scheme',
				'method': 'PATCH',
				'fields': [
					{
						'type': 'hidden',
						'name': 'gradeSchemeId',
						'value': '1'
					}
				]
			}
		],
		'properties': {
			'gradeSchemeId': 1
		},
		'links': [
			{
				'rel': [
					'https://grades.api.brightspace.com/rels/grade-scheme'
				],
				'href': 'https://5096e993-e418-4681-81c5-cae06b019fbb.grades.api.dev.brightspace.com/organizations/6613/grade-schemes/1'
			}
		]
	},
	missingPermission: {
		'class': [
			'grade-scheme'
		],
		'rel': [
			'item'
		],
		'links': [
			{
				'rel': [
					'https://grades.api.brightspace.com/rels/grade-scheme'
				],
				'href': 'https://5096e993-e418-4681-81c5-cae06b019fbb.grades.api.dev.brightspace.com/organizations/6613/grade-schemes/2'
			}
		]
	}
};
