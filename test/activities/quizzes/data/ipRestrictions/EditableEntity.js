export const editableRestrictions = {
	'class': [
		'ip-restrictions',
		'collection'
	],
	'entities': [
		{
			'class': [
				'ip-range'
			],
			'rel': [
				'item'
			],
			'properties': {
				'start': '8.8.8.8',
				'end': '9.9.9.9'
			},
			'actions': [
				{
					'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/37/ip',
					'name': 'update',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'text',
							'name': 'start',
							'value': '8.8.8.8'
						},
						{
							'type': 'text',
							'name': 'end',
							'value': '9.9.9.9'
						},
						{
							'type': 'hidden',
							'name': 'oldStart',
							'value': '8.8.8.8'
						},
						{
							'type': 'hidden',
							'name': 'oldEnd',
							'value': '9.9.9.9'
						}
					]
				},
				{
					'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/37/ip',
					'name': 'delete',
					'method': 'DELETE',
					'fields': [
						{
							'type': 'text',
							'name': 'start',
							'value': '8.8.8.8'
						},
						{
							'type': 'text',
							'name': 'end',
							'value': '9.9.9.9'
						}
					]
				}
			]
		},
		{
			'class': [
				'ip-range'
			],
			'rel': [
				'item'
			],
			'properties': {
				'start': '10.10.10.10',
				'end': '12.12.12.12'
			},
			'actions': [
				{
					'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/37/ip',
					'name': 'update',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'text',
							'name': 'start',
							'value': '10.10.10.10'
						},
						{
							'type': 'text',
							'name': 'end',
							'value': '12.12.12.12'
						},
						{
							'type': 'hidden',
							'name': 'oldStart',
							'value': '10.10.10.10'
						},
						{
							'type': 'hidden',
							'name': 'oldEnd',
							'value': '12.12.12.12'
						}
					]
				},
				{
					'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/37/ip',
					'name': 'delete',
					'method': 'DELETE',
					'fields': [
						{
							'type': 'text',
							'name': 'start',
							'value': '10.10.10.10'
						},
						{
							'type': 'text',
							'name': 'end',
							'value': '12.12.12.12'
						}
					]
				}
			]
		},
		{
			'class': [
				'ip-range'
			],
			'rel': [
				'item'
			],
			'properties': {
				'start': '1.1.1.1',
				'end': '4.4.4.4'
			},
			'actions': [
				{
					'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/37/ip',
					'name': 'update',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'text',
							'name': 'start',
							'value': '1.1.1.1'
						},
						{
							'type': 'text',
							'name': 'end',
							'value': '4.4.4.4'
						},
						{
							'type': 'hidden',
							'name': 'oldStart',
							'value': '1.1.1.1'
						},
						{
							'type': 'hidden',
							'name': 'oldEnd',
							'value': '4.4.4.4'
						}
					]
				},
				{
					'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/37/ip',
					'name': 'delete',
					'method': 'DELETE',
					'fields': [
						{
							'type': 'text',
							'name': 'start',
							'value': '1.1.1.1'
						},
						{
							'type': 'text',
							'name': 'end',
							'value': '4.4.4.4'
						}
					]
				}
			]
		},
		{
			'class': [
				'ip-range'
			],
			'rel': [
				'item'
			],
			'properties': {
				'start': '6.6.6.7',
				'end': '7.7.7.7'
			},
			'actions': [
				{
					'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/37/ip',
					'name': 'update',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'text',
							'name': 'start',
							'value': '6.6.6.7'
						},
						{
							'type': 'text',
							'name': 'end',
							'value': '7.7.7.7'
						},
						{
							'type': 'hidden',
							'name': 'oldStart',
							'value': '6.6.6.7'
						},
						{
							'type': 'hidden',
							'name': 'oldEnd',
							'value': '7.7.7.7'
						}
					]
				},
				{
					'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/37/ip',
					'name': 'delete',
					'method': 'DELETE',
					'fields': [
						{
							'type': 'text',
							'name': 'start',
							'value': '6.6.6.7'
						},
						{
							'type': 'text',
							'name': 'end',
							'value': '7.7.7.7'
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
			'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/37/ip'
		}
	],
	'actions': [
		{
			'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/37/ip',
			'name': 'add',
			'method': 'PATCH',
			'fields': [
				{
					'type': 'text',
					'name': 'start',
					'value': ''
				},
				{
					'type': 'text',
					'name': 'end',
					'value': ''
				}
			]
		}
	]
};
