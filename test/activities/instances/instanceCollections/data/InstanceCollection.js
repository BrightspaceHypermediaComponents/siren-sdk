export const instance_collection = {
	'class': [
		'instance-collection'
	],
	'entities': [
		{
			'class': [
				'collected-object'
			],
			'properties': {
				'SortOrder': 2.0,
				'Completion': 'Required'
			},
			'rel': [
				'object',
				//this doesn't exist yet
				'https://fake-tenant-id.activities.api.dev.brightspace.com/CollectedObject/2'			],
		},
		{
			'class': [
				'collected-object'
			],
			'properties': {
				'SortOrder': 3.0,
				'Completion': 'Required'
			},
			'rel': [
				'object',
				//this doesn't exist yet
				'https://fake-tenant-id.activities.api.dev.brightspace.com/CollectedObject/3'			],
		},
		{
			'class': [
				'collected-object'
			],
			'properties': {
				'SortOrder': 4.0,
				'Completion': 'Optional'
			},
			'rel': [
				'object',
				//this doesn't exist yet
				'https://fake-tenant-id.activities.api.dev.brightspace.com/CollectedObject/1'
			],
		},
		{
			'class': [
				'instance-collection'
			],
			'rel': [
				'instance_collection',
				'https://fake-tenant-id.activities.api.dev.brightspace.com/InstanceCollection/640'
			],
		},
	],
	'links': [
		{
			'rel': [
				'self'
			],
			'href': 'https://fake-tenant-id.activities.api.dev.brightspace.com/InstanceCollection/639'
		}
	]
};
