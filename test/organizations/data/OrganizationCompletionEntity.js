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
				'href': '../completion/tracking.json',
				'name': 'do-not-track-completion',
				'method': 'PUT'
			},
			{
				'href': '../completion/tracking.json',
				'name': 'display-progress',
				'method': 'PUT'
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
				'href': '../completion/tracking.json',
				'name': 'do-not-track-completion',
				'method': 'PUT'
			},
			{
				'href': '../completion/tracking.json',
				'name': 'do-not-display-progress',
				'method': 'PUT'
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
				'href': '../completion/tracking.json',
				'name': 'track-completion',
				'method': 'PUT'
			},
			{
				'href': '../completion/tracking.json',
				'name': 'display-progress',
				'method': 'PUT'
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
