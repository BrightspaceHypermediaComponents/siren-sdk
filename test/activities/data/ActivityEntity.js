export const testData = {
	activityEntityEditable: {
		'class': ['activity'],
		'entities': [
			{
				'class': [
					'activity-name'
				],
				'rel': [
					'https://activities.api.brightspace.com/rels/activity-name'
				],
				'properties': {
					'name': 'Sample Activity Name'
				},
				'actions': [
					{
						'href': 'https://d53287c1-ad48-4c2e-a0a7-bd53c3029e95.activities.api.dev.brightspace.com/activities/5',
						'name': 'update-name',
						'method': 'PATCH',
						'fields': [
							{
								'type': 'text',
								'name': 'name',
								'value': 'Sample Activity Name'
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
				'href': 'https://d53287c1-ad48-4c2e-a0a7-bd53c3029e95.activities.api.dev.brightspace.com/activities/5'
			}
		]
	},
	activityEntityReadOnly: {
		'class': ['activity'],
		'entities': [
			{
				'class': [
					'activity-name'
				],
				'rel': [
					'https://activities.api.brightspace.com/rels/activity-name'
				],
				'properties': {
					'name': 'Sample Activity Name'
				}
			}
		],

		'links': [
			{
				'rel': [
					'self'
				],
				'href': 'https://d53287c1-ad48-4c2e-a0a7-bd53c3029e95.activities.api.dev.brightspace.com/activities/5'
			}
		]
	}
};
