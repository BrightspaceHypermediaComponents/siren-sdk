export const contentRemixEntityData = {
	'class': [
		'remix-page'
	],
	'properties': {
		'characterLimit': 6000
	},
	'actions': [
		{
			'name': 'simplify-content',
			'title': 'Simplify Content',
			'method': 'POST',
			'href': 'https://content.api.brightspace.com/6613/remix',
			'type': 'application/x-www-form-urlencoded',
			'fields': [
				{
					'name': 'originalHtmlContent',
					'type': 'text',
					'class': ['required']
				},
				{
					'name': 'textComplexity',
					'type': 'text'
				},
				{
					'name': 'customInstructions',
					'type': 'text'
				},
				{
					'name': 'detectedLang',
					'type': 'text',
					'class': ['required']
				},
				{
					'name': 'sessionId',
					'type': 'text',
					'class': ['required']
				},
				{
					'name': 'generationId',
					'type': 'text',
					'class': ['required']
				},
				{
					'name': 'iterationNumber',
					'type': 'number',
					'class': ['required']
				},
				{
					'name': 'sourceIndex',
					'type': 'number',
					'class': ['required']
				},
				{
					'name': 'topicId',
					'type': 'text'
				}
			]
		}
	],
	'links': [
		{
			'rel': ['self'],
			'href': 'https://content.api.brightspace.com/6613/remix'
		}
	]
};

export const contentRemixEntityDataWithoutAction = {
	'class': [
		'remix-page'
	],
	'properties': {
		'characterLimit': 3000
	},
	'actions': [],
	'links': [
		{
			'rel': ['self'],
			'href': 'https://content.api.brightspace.com/6613/remix'
		}
	]
};

export const contentRemixEntityDataWithoutClass = {
	'class': [],
	'properties': {
		'characterLimit': 2000
	},
	'actions': [
		{
			'name': 'simplify-content',
			'title': 'Simplify Content',
			'method': 'POST',
			'href': 'https://content.api.brightspace.com/6613/remix',
			'type': 'application/x-www-form-urlencoded',
			'fields': []
		}
	],
	'links': [
		{
			'rel': ['self'],
			'href': 'https://content.api.brightspace.com/6613/remix'
		}
	]
};

export const contentRemixEntityDataMinimal = {
	'class': [],
	'properties': {},
	'actions': [],
	'links': []
};
