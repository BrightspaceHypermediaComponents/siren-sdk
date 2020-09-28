export const testData = {
	trackingNoDisplay: {
		'class': [
			'active',
			'course-offering',
			'completion-tracked'
		],
		'properties': {
			'name': 'Course Name',
			'code': 'SCI100',
			'startDate': '2100-01-01T00:00:00.000Z',
			'endDate': null,
			'isActive': false
		},
		'entities': [
			{
				'class': [
					'course-image'
				],
				'rel': [
					'https://api.brightspace.com/rels/organization-image'
				],
				'href': '../data/image.json'
			},
			{
				'class': [
					'relatvie-uri'
				],
				'rel': [
					'https://api.brightspace.com/rels/organization-image'
				]
			}
		],
		'links': [
			{
				'rel': [
					'self'
				],
				'href': '../data/organization-future.json'
			},
			{
				'rel': [
					'https://api.brightspace.com/rels/parent-semester'
				],
				'href': '../data/semester.json'
			}
		],
		'actions': [
			{
				'href': 'http://api.x.io/do/not/track/completion',
				'name': 'do-not-track-completion',
				'method': 'PUT',
				'fields': [{'type': 'hidden', 'name': 'track', 'value': false}]
			},
			{
				'href': 'http://api.x.io/display/progress',
				'name': 'display-progress',
				'method': 'PUT',
				'fields': [{'type': 'hidden', 'name': 'enable', 'value': true}]
			}
		]
	},
	trackingAndDisplay: {
		'class': [
			'active',
			'course-offering',
			'completion-tracked',
			'display-progress'
		],
		'properties': {
			'name': 'Course Name',
			'code': 'SCI100',
			'startDate': '2100-01-01T00:00:00.000Z',
			'endDate': null,
			'isActive': false
		},
		'entities': [
			{
				'class': [
					'course-image'
				],
				'rel': [
					'https://api.brightspace.com/rels/organization-image'
				],
				'href': '../data/image.json'
			},
			{
				'class': [
					'relatvie-uri'
				],
				'rel': [
					'https://api.brightspace.com/rels/organization-image'
				]
			}
		],
		'links': [
			{
				'rel': [
					'self'
				],
				'href': '../data/organization-future.json'
			},
			{
				'rel': [
					'https://api.brightspace.com/rels/parent-semester'
				],
				'href': '../data/semester.json'
			}
		],
		'actions': [
			{
				'href': 'http://api.x.io/do/not/track/completion',
				'name': 'do-not-track-completion',
				'method': 'PUT',
				'fields': [{'type': 'hidden', 'name': 'track', 'value': false}]
			},
			{
				'href': 'http://api.x.io/do/not/display/progress',
				'name': 'do-not-display-progress',
				'method': 'PUT',
				'fields': [{'type': 'hidden', 'name': 'enable', 'value': false}]
			}
		]
	},
	noTracking: {
		'class': [
			'active',
			'course-offering'
		],
		'properties': {
			'name': 'Course Name',
			'code': 'SCI100',
			'startDate': '2100-01-01T00:00:00.000Z',
			'endDate': null,
			'isActive': false
		},
		'entities': [
			{
				'class': [
					'course-image'
				],
				'rel': [
					'https://api.brightspace.com/rels/organization-image'
				],
				'href': '../data/image.json'
			},
			{
				'class': [
					'relatvie-uri'
				],
				'rel': [
					'https://api.brightspace.com/rels/organization-image'
				]
			}
		],
		'links': [
			{
				'rel': [
					'self'
				],
				'href': '../data/organization-future.json'
			},
			{
				'rel': [
					'https://api.brightspace.com/rels/parent-semester'
				],
				'href': '../data/semester.json'
			}
		],
		'actions': [
			{
				'href': 'http://api.x.io/track/completion',
				'name': 'track-completion',
				'method': 'PUT',
				'fields': [{'type': 'hidden', 'name': 'track', 'value': true}]
			},
			{
				'href': 'http://api.x.io/display/progress',
				'name': 'display-progress',
				'method': 'PUT',
				'fields': [{'type': 'hidden', 'name': 'enable', 'value': true}]
			}
		]
	},
	noActions: {
		'class': [
			'active',
			'course-offering'
		],
		'properties': {
			'name': 'Course Name',
			'code': 'SCI100',
			'startDate': '2100-01-01T00:00:00.000Z',
			'endDate': null,
			'isActive': false
		},
		'entities': [
			{
				'class': [
					'course-image'
				],
				'rel': [
					'https://api.brightspace.com/rels/organization-image'
				],
				'href': '../data/image.json'
			},
			{
				'class': [
					'relatvie-uri'
				],
				'rel': [
					'https://api.brightspace.com/rels/organization-image'
				]
			}
		],
		'links': [
			{
				'rel': [
					'self'
				],
				'href': '../data/organization-future.json'
			},
			{
				'rel': [
					'https://api.brightspace.com/rels/parent-semester'
				],
				'href': '../data/semester.json'
			}
		],
		'actions': [
		]
	}
};

