const tenantId = 'f5aa43d7-c082-485c-84f5-4808147fe98a';

export const editableDiscussionTopic = {
	'class': [
		'named-entity',
		'topic',
		'html',
		'has-posts'
	],
	'properties': {
		'name': 'What a great topic',
		'description': '<p>A great topic description</p>',
	},
	'actions': [
		{
			'class': [
				'required'
			],
			'href': `https://${tenantId}.discussions.api.dev.brightspace.com/6613/forums/10003/topics/10004`,
			'name': 'update-name',
			'method': 'PATCH',
			'fields': [
				{
					'type': 'text',
					'name': 'name',
				}
			]
		},
		{
			'title': 'Delete a topic',
			'href': `https://${tenantId}.discussions.api.dev.brightspace.com/6613/forums/10003/topics/10004`,
			'name': 'delete-topic',
			'method': 'DELETE',
			'fields': [
				{
					'name': 'shouldDeleteParentForum',
					'type': 'checkbox',
					'value': true
				}
			]
		},
		{
			'title' : 'Update topic rating',
			'href': `https://${tenantId}.api.dev.brightspace.com/d2l/api/hm/discussions/6609/forums/10025/topics/10026`,
			'name': 'update-ratingtype',
			'method': 'PATCH',
			'type': 'application/x-www-form-urlencoded',
			'fields': [
				{
					'name': 'ratingType',
					'type': 'radio',
					'value': [
						{
							'value': 'None',
							'title': 'No Rating',
							'selected': true
						},
						{
							'value': 'FiveStar',
							'title': 'Five-star Rating',
							'selected': false
						},
						{
							'value': 'UpVoteDownVote',
							'title': 'Up Vote/Down Vote Rating',
							'selected': false
						},
						{
							'value': 'UpVoteOnly',
							'title': 'Up Vote Only Rating',
							'selected': false
						}
					]
				}
			]
		},
		{
			'title' : 'Update participation type',
			'href': `https://${tenantId}.api.dev.brightspace.com/d2l/api/hm/discussions/6609/forums/10025/topics/10026`,
			'name': 'update-participationtype',
			'method': 'PATCH',
			'type': 'application/x-www-form-urlencoded',
			'fields': [
				{
					'name': 'participationType',
					'type': 'radio',
					'value': [
						{
							'value': 'defaultParticipation',
							'selected': true
						},
						{
							'value': 'anonymous',
							'selected': false
						},
						{
							'value': 'startThreadToView',
							'selected': false
						},
					]
				}
			]
		}
	],
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
			'actions': [
				{
					'href': `https://${tenantId}.discussions.api.dev.brightspace.com/6613/forums/10003/topics/10004`,
					'name': 'update-description',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'text',
							'name': 'description',
							'value': '<p>A great topic description</p>'
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
