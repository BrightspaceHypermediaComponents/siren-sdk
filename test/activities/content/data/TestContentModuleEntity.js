export const contentModuleData = {
	'actions': [
		{
			'href': 'https://fake-tenant-id.modules.api.proddev.d2l/6613/modules/12345',
			'name': 'update-title',
			'method': 'PATCH',
			'fields': [
				{
					'class': ['required'],
					'type': 'text',
					'name': 'title',
					'value': 'Test Content Module Title'
				}
			]
		},
		{
			'href': 'https://fake-tenant-id.modules.api.proddev.d2l/6613/modules/12345',
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
			'href': 'https://fake-tenant-id.modules.api.proddev.d2l/6613/modules/12345',
			'name': 'delete-module',
			'method': 'DELETE'
		}
	],
	'class': [
		'describable-entity',
		'module'
	],
	'properties': {
		'title': 'Test Content Module Title'
	},
	'entities': [
		{
			'class': ['richtext', 'description'],
			'properties': { 'text': 'description text', 'html': '<p>description text</p>' },
			'rel': []
		},
		{
			'class': ['richtext', 'raw-description'],
			'properties': { 'text': 'description text', 'html': '<p>description text</p>' },
			'rel': []
		}
	],
	'rel': []
};
