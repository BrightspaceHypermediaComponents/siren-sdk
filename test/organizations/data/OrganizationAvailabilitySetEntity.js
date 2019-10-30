export const testData = {
	organizationAvailabilitySetEntity: {
		'class': [
			'collection',
			'orgunit-availability-set'
		],
		'entities': [
			{
				'class': [
					'orgunit-availability',
					'explicit',
					'current'
				],
				'rel': [
					'item'
				],
				'href': 'https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/6606/availability-set/NjYwNl8xMDAwMDA1XzI1NDAwMF81/explicit/6606'
			},
			{
				'class': [
					'orgunit-availability',
					'inherit'
				],
				'rel': [
					'item'
				],
				'href': 'https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/6606/availability-set/NjYwNl8xMDAwMDA1XzI1NDAwMF81/inherit/121147'
			},
			{
				'class': [
					'orgunit-availability',
					'inherit'
				],
				'rel': [
					'item'
				],
				'href': 'https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/6606/availability-set/NjYwNl8xMDAwMDA1XzI1NDAwMF81/inherit/121147/205'
			}
		],
		'links': [
			{
				'rel': [
					'self'
				],
				'href': 'https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/6606/availability-set/NjYwNl8xMDAwMDA1XzI1NDAwMF81'
			},
			{
				'rel': [
					'https://api.brightspace.com/rels/organization'
				],
				'href': 'https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/6606'
			}
		],
		'actions': [
			{
				'type': 'application/x-www-form-urlencoded',
				'title': 'Create Explicit Availability Item',
				'href': 'https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/6606/availability-set/NjYwNl8xMDAwMDA1XzI1NDAwMF81',
				'name': 'create-explicit-availability-item',
				'method': 'POST',
				'fields': [
					{
						'type': 'number',
						'name': 'explicitOrgUnitId'
					}
				]
			},
			{
				'type': 'application/x-www-form-urlencoded',
				'title': 'Create Inherited Availability Item',
				'href': 'https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/6606/availability-set/NjYwNl8xMDAwMDA1XzI1NDAwMF81',
				'name': 'create-inherited-availability-item',
				'method': 'POST',
				'fields': [
					{
						'type': 'number',
						'name': 'ancestorOrgUnitId'
					},
					{
						'type': 'number',
						'name': 'descendentOrgUnitTypeId'
					}
				]
			}
		]
	},
	cannotAdd: {
		'class': [
			'collection',
			'orgunit-availability-set'
		],
		'entities': [
			{
				'class': [
					'orgunit-availability',
					'explicit',
					'current'
				],
				'rel': [
					'item'
				],
				'href': 'https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/6606/availability-set/NjYwNl8xMDAwMDA1XzI1NDAwMF81/explicit/6606'
			},
			{
				'class': [
					'orgunit-availability',
					'inherit'
				],
				'rel': [
					'item'
				],
				'href': 'https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/6606/availability-set/NjYwNl8xMDAwMDA1XzI1NDAwMF81/inherit/121147'
			},
			{
				'class': [
					'orgunit-availability',
					'inherit'
				],
				'rel': [
					'item'
				],
				'href': 'https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/6606/availability-set/NjYwNl8xMDAwMDA1XzI1NDAwMF81/inherit/121147/205'
			}
		],
		'links': [
			{
				'rel': [
					'self'
				],
				'href': 'https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/6606/availability-set/NjYwNl8xMDAwMDA1XzI1NDAwMF81'
			},
			{
				'rel': [
					'https://api.brightspace.com/rels/organization'
				],
				'href': 'https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/6606'
			}
		]
	}
};
