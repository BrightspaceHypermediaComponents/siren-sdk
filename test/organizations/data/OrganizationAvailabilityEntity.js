export const testData = {
	current: {
		'class': [
			'orgunit-availability',
			'explicit',
			'current'
		],
		'rel': [
			'https://api.brightspace.com/rels/cache-primer'
		],
		'entities': [
			{
				'class': [
					'current',
					'orgunit-type'
				],
				'rel': [
					'https://api.brightspace.com/rels/organization-type'
				],
				'properties': {
					'name': 'Department'
				}
			}
		],
		'actions': [
			{
				'title': 'Delete Item',
				'href': 'https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/121147/availability-set/NjYwNl8xMDAwMDA1XzI1NDAwMF81/explicit/121147',
				'name': 'delete-item',
				'method': 'DELETE'
			}
		],
		'links': [
			{
				'rel': [
					'self'
				],
				'href': 'https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/121147/availability-set/NjYwNl8xMDAwMDA1XzI1NDAwMF81/explicit/121147'
			},
			{
				'rel': [
					'collection'
				],
				'href': 'https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/121147/availability-set/NjYwNl8xMDAwMDA1XzI1NDAwMF81'
			},
			{
				'rel': [
					'https://api.brightspace.com/rels/organization'
				],
				'href': 'https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/121147'
			}
		]
	},
	explicit: {
		'class': [
			'orgunit-availability',
			'explicit'
		],
		'rel': [
			'https://api.brightspace.com/rels/cache-primer'
		],
		'entities': [
			{
				'class': [
					'current',
					'orgunit-type'
				],
				'rel': [
					'https://api.brightspace.com/rels/organization-type'
				],
				'properties': {
					'name': 'Organization'
				}
			}
		],
		'actions': [
			{
				'title': 'Delete Item',
				'href': 'https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/121147/availability-set/NjYwNl8xMDAwMDA1XzI1NDAwMF81/explicit/6606',
				'name': 'delete-item',
				'method': 'DELETE'
			}
		],
		'links': [
			{
				'rel': [
					'self'
				],
				'href': 'https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/121147/availability-set/NjYwNl8xMDAwMDA1XzI1NDAwMF81/explicit/6606'
			},
			{
				'rel': [
					'collection'
				],
				'href': 'https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/121147/availability-set/NjYwNl8xMDAwMDA1XzI1NDAwMF81'
			},
			{
				'rel': [
					'https://api.brightspace.com/rels/organization'
				],
				'href': 'https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/6606'
			}
		]
	},
	inherit: {
		'class': [
			'orgunit-availability',
			'inherit'
		],
		'rel': [
			'https://api.brightspace.com/rels/cache-primer'
		],
		'entities': [
			{
				'class': [
					'current',
					'orgunit-type'
				],
				'rel': [
					'https://api.brightspace.com/rels/organization-type'
				],
				'properties': {
					'name': 'Department'
				}
			}
		],
		'actions': [
			{
				'title': 'Delete Item',
				'href': 'https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/121147/availability-set/NjYwNl8xMDAwMDA1XzI1NDAwMF81/inherit/121147',
				'name': 'delete-item',
				'method': 'DELETE'
			}
		],
		'links': [
			{
				'rel': [
					'self'
				],
				'href': 'https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/121147/availability-set/NjYwNl8xMDAwMDA1XzI1NDAwMF81/inherit/121147'
			},
			{
				'rel': [
					'collection'
				],
				'href': 'https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/121147/availability-set/NjYwNl8xMDAwMDA1XzI1NDAwMF81'
			},
			{
				'rel': [
					'https://api.brightspace.com/rels/organization'
				],
				'href': 'https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/121147'
			}
		]
	},
	inheritWithDescendantType: {
		'class': [
			'orgunit-availability',
			'inherit'
		],
		'rel': [
			'https://api.brightspace.com/rels/cache-primer'
		],
		'entities': [
			{
				'class': [
					'descendant',
					'orgunit-type'
				],
				'rel': [
					'https://api.brightspace.com/rels/organization-type'
				],
				'properties': {
					'name': 'College'
				}
			},
			{
				'class': [
					'current',
					'orgunit-type'
				],
				'rel': [
					'https://api.brightspace.com/rels/organization-type'
				],
				'properties': {
					'name': 'Department'
				}
			}
		],
		'actions': [
			{
				'title': 'Delete Item',
				'href': 'https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/121147/availability-set/NjYwNl8xMDAwMDA1XzI1NDAwMF81/inherit/121147/205',
				'name': 'delete-item',
				'method': 'DELETE'
			}
		],
		'links': [
			{
				'rel': [
					'self'
				],
				'href': 'https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/121147/availability-set/NjYwNl8xMDAwMDA1XzI1NDAwMF81/inherit/121147/205'
			},
			{
				'rel': [
					'collection'
				],
				'href': 'https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/121147/availability-set/NjYwNl8xMDAwMDA1XzI1NDAwMF81'
			},
			{
				'rel': [
					'https://api.brightspace.com/rels/organization'
				],
				'href': 'https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/121147'
			}
		]
	},
	cannotDelete: {
		'class': [
			'orgunit-availability',
			'explicit',
			'current'
		],
		'rel': [
			'https://api.brightspace.com/rels/cache-primer'
		],
		'entities': [
			{
				'class': [
					'current',
					'orgunit-type'
				],
				'rel': [
					'https://api.brightspace.com/rels/organization-type'
				],
				'properties': {
					'name': 'Department'
				}
			}
		],
		'links': [
			{
				'rel': [
					'self'
				],
				'href': 'https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/121147/availability-set/NjYwNl8xMDAwMDA1XzI1NDAwMF81/explicit/121147'
			},
			{
				'rel': [
					'collection'
				],
				'href': 'https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/121147/availability-set/NjYwNl8xMDAwMDA1XzI1NDAwMF81'
			},
			{
				'rel': [
					'https://api.brightspace.com/rels/organization'
				],
				'href': 'https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/121147'
			}
		]
	}
};
