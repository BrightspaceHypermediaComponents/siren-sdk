export const notInGradebookEditable = {
	'class': [
		'associate-grade', 'not-in-gradebook'
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
							'selected': true
						},
						{
							'title': 'Create a new grade item',
							'value': 'new-grade',
							'selected': false
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
	]
};
