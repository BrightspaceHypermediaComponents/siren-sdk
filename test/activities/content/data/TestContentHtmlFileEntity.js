export const contentHtmlFileData = {
	'actions': [
		{
			'href': 'https://fake-tenant-id.content.api.proddev.d2l/6613/htmlfiles/12345',
			'name': 'update-title',
			'method': 'PATCH',
			'fields': [
				{
					'class': ['required'],
					'type': 'text',
					'name': 'title',
					'value': 'Test Html File Title'
				}
			]
		},
		{
			'href': 'https://fake-tenant-id.content.api.proddev.d2l/6613/htmlfiles/12345',
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
			'href': 'https://fake-tenant-id.content.api.proddev.d2l/6613/htmlfiles/12345',
			'name': 'delete-htmlFile',
			'method': 'DELETE'
		}
	],
	'class': [
		'describable-entity',
		'topic'
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
	'rel': []
};
