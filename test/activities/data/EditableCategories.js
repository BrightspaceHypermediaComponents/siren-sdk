export const editableCategories = {
	'class': [
		'categories',
		'collection'
	],
	'entities': [
		{
			'class': [
				'category',
				'selected'
			],
			'rel': [
				'item'
			],
			'properties': {
				'name': 'category1',
				'categoryId': '123'
			},
			'actions': [
				{
					'href': 'https://afe99802-9130-4320-a770-8d138b941e74.activities.api.proddev.d2l/6606/folders/13',
					'name': 'select',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'hidden',
							'name': 'categoryId',
							'value': '123'
						}
					]
				}
			]
		},
		{
			'class': [
				'category'
			],
			'rel': [
				'item'
			],
			'properties': {
				'name': 'category2',
				'categoryId': '123'
			},
			'actions': [
				{
					'href': 'https://afe99802-9130-4320-a770-8d138b941e74.activities.api.proddev.d2l/6606/folders/13',
					'name': 'select',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'hidden',
							'name': 'categoryId',
							'value': '1001'
						}
					]
				}
			]
		},
		{
			'class': [
				'category',
			],
			'rel': [
				'item'
			],
			'properties': {
				'name': 'category3',
				'categoryId': '456'
			},
			'actions': [
				{
					'href': 'https://afe99802-9130-4320-a770-8d138b941e74.activities.api.proddev.d2l/6606/folders/13',
					'name': 'select',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'hidden',
							'name': 'categoryId',
							'value': '456'
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
			'href': 'https://afe99802-9130-4320-a770-8d138b941e74.activities.api.proddev.d2l/6606/folders/13/categories'
		}
	],
	'actions': [
		{
			'href': 'https://afe99802-9130-4320-a770-8d138b941e74.activities.api.proddev.d2l/6606/folders/13/categories',
			'name': 'add',
			'method': 'POST',
			'fields': [
				{
					'type': 'text',
					'name': 'categoryName',
					'value': ''
				}
			]
		}
	]
};
