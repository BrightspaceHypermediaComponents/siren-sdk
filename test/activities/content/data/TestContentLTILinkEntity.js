export const contentLTILinkData = {
	'actions': [
		{
			'href': 'https://fake-tenant-id.weblinks.api.proddev.d2l/6613/ltilinks/12345',
			'name': 'update-title',
			'method': 'PATCH',
			'fields': [
				{
					'class': ['required'],
					'type': 'text',
					'name': 'title',
					'value': 'Test Web Link Title'
				}
			]
		},
		{
			'href': 'https://fake-tenant-id.weblinks.api.proddev.d2l/6613/ltilinks/12345',
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
			'href': 'https://fake-tenant-id.weblinks.api.proddev.d2l/6613/ltilinks/12345/external',
			'name': 'update-external-resource',
			'method': 'PUT',
			'fields': [
				{
					'type': 'checkbox',
					'name': 'isExternalResource',
					'value': true
				}
			]
		},
		{
			'href': 'https://fake-tenant-id.weblinks.api.proddev.d2l/6613/ltilinks/12345',
			'name': 'delete-ltiLink',
			'method': 'DELETE'
		}
	],
	'class': [
		'describable-entity',
		'topic',
		'external-resource'
	],
	'properties': {
		'title': 'Test LTI Link Title',
		'url': 'https://phoenix-is-the-best.com'
	},
	'entities': [{
		'class': ['richtext', 'description'],
		'properties': { 'text': 'description text', 'html': '<p>description text</p>' },
		'rel': []
	}],
	'rel': []
};
