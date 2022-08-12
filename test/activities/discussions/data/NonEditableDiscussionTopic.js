const tenantId = 'f5aa43d7-c082-485c-84f5-4808147fe98a';

export const nonEditableDiscussionTopic = {
	'class': [
		'named-entity',
		'topic',
	],
	'properties': {
		'name': 'What a great topic',
		'description': '<p>A great topic description</p>',
	},
	'entities': [
		{
			'class': [
				'richtext',
				'description',
				'annotated'
			],
			'rel': [
				'item',
				'https://discussions.api.brightspace.com/rels/description'
			],
			'properties': {
				'text': 'A great topic description',
				'html': '<p>A great topic description</p>'
			},
			'actions': []
		}
	],
	'links': [
		{
			'rel': [
				'self'
			],
			'href': `https://${tenantId}.discussions.api.dev.brightspace.com/6613/forums/10003/topics/10004`
		},
		{
			'rel': [
				'alternate'
			],
			'type': 'text/html',
			'href': 'https://cd2022812192.devlms.brightspace.com/d2l/le/6613/discussions/topics/10004/View'
		},
		{
			'rel': [
				'https://activities.api.brightspace.com/rels/activity-usage'
			],
			'href': `https://${tenantId}.activities.api.dev.brightspace.com/activities/6606_3000_10004/usages/6613`
		},
		{
			'rel': [
				'organization',
				'https://api.brightspace.com/rels/organization'
			],
			'href': `https://${tenantId}.organizations.api.dev.brightspace.com/6613`
		},
		{
			'rel': [
				'up',
				'https://discussions.api.brightspace.com/rels/forum'
			],
			'href': `https://${tenantId}.discussions.api.dev.brightspace.com/6613/forums/10003`
		},
	],
	'rel': [
		'https://discussions.api.brightspace.com/rels/topic'
	]
};
