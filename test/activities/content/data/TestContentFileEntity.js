export const contentFileData = {
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
			'name': 'update-completion-criteria',
			'method': 'PATCH',
			'fields': [
				{
					'class': ['required'],
					'type': 'text',
					'name': 'criteria',
					'value': 'manual'
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
		'html'
	],
	'properties': {
		'title': 'Test File Title',
		'url': 'https://phoenix-is-the-best.com',
		'orgUnitPath': '/content/course500/'
	},
	'entities': [{
		'class': ['richtext', 'description'],
		'properties': { 'text': 'description text', 'html': '<p>description text</p>' },
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
		'href': 'https://fake-tenant-id.files.api.proddev.d2l/my-file.file/usages/6614'
	}],
	'rel': []
};
