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
		'module',
		'ai-inspired'
	],
	'properties': {
		'title': 'Test Content Module Title',
		'depth': 8675309,
		'customAccentColor': 'FF0000',
		'orgUnitId': '6613',
		'moduleId': '12345',
		'registryId': '38db1f7d-7917-445d-867e-67034387744b',
		'aiHumanOrigin': 0
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
	'rel': [],
	'links': [
		{
			'href': 'https://fake-tenant-id.modules.api.proddev.d2l/6613/modules/12345/summary',
			'rel': ['https://modules.api.brightspace.com/rels/generate-summary'],
		},
		{
			'href': 'https://dev-lores.fake.com/',
			'rel': ['https://modules.api.brightspace.com/rels/lores-endpoint'],
		}
	]
};
