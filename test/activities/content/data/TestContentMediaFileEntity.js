export const contentMediaFileData = {
	'actions': [
		{
			'href': 'https://fake-tenant-id.content.api.proddev.d2l/6613/files/12345',
			'name': 'update-title',
			'method': 'PATCH',
			'fields': [
				{
					'class': ['required'],
					'type': 'text',
					'name': 'title',
					'value': 'Test File Title'
				}
			]
		},
		{
			'href': 'https://fake-tenant-id.content.api.proddev.d2l/6613/files/12345',
			'name': 'update-description',
			'method': 'PATCH',
			'fields': [
				{
					'class': ['required'],
					'type': 'text',
					'name': 'description',
					'value': '<p>description text</p>'
				}
			]
		},
		{
			'href': 'https://fake-tenant-id.content.api.proddev.d2l/6613/files/12345',
			'name': 'delete-content-file',
			'method': 'DELETE'
		}
	],
	'class': [
		'describable-entity',
		'content-file',
		'video'
	],
	'properties': {
		'title': 'Test Media File Title',
		'url': 'https://phoenix-is-the-best.com',
		'embedMedia': 'true',
		'isAdvancedEditingEnabled': 'true',
		'isContentServiceResource': 'true',
		'mediaFileName': 'test.mp4'
	},
	'entities': [{
		'class': ['richtext', 'description'],
		'properties': {'text': 'description text', 'html': '<p>description text</p>'},
		'rel': []
	}],
	'links': [{
		'rel': [
			'https://files.api.brightspace.com/rels/file'
		],
		'class': [
			'file',
		],
		'type': 'application/vnd.siren+json',
		'href': 'https://fake-tenant-id.files.api.proddev.d2l/my-file.html/usages/6614'
	},
	{
		'rel': [
			'https://content.api.brightspace.com/rels/content-media-captions'
		],
		'href': 'https://fake-tenant-id.files.api.proddev.d2l/6614/files/media/captions'
	}],
	'rel': []
};
