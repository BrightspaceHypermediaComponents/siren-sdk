export const contentHtmlFileData = {
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
			'href': 'https://fake-tenant-id.content.api.proddev.d2l/6613/files/html/12345',
			'name': 'update-html-content',
			'method': 'PATCH',
			'fields': [
				{
					'class': ['required'],
					'type': 'text',
					'name': 'htmlContent',
					'value': '<!doctype html><html lang="en"><head><title>My File</title></head><body><p>This is my file</p></body></html>'
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
		'title': 'Test Html File Title',
		'url': 'https://phoenix-is-the-best.com'
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
	}],
	'rel': []
};
