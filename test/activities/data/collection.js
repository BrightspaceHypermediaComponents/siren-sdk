const collection = {
	entities: [
		{
			rel: ['item'],
			actions: [
				{
					href:
						'https://activities.api.testdomain.d2l/activities/6606_706000_6606/usages/6606/collection/TmpZd05sOHpNREF3WHpZLjY2MDY',
					name: 'Delete',
					method: 'DELETE'
				}
			],
			links: [
				{
					rel: ['self'],
					href:
						'https://activities.api.testdomain.d2l/activities/6606_706000_6606/usages/6606/collection/TmpZd05sOHpNREF3WHpZLjY2MDY'
				},
				{
					rel: ['https://activities.api.brightspace.com/rels/activity-usage'],
					href: 'https://activities.api.testdomain.d2l/activities/6606_3000_6/usages/6606'
				},
				{
					rel: ['up', 'collection'],
					href: 'https://activities.api.testdomain.d2l/activities/6606_706000_6606/usages/6606/collection'
				},
				{
					rel: ['next'],
					href:
						'https://activities.api.testdomain.d2l/activities/6606_706000_6606/usages/6606/collection/TmpZd05sOHpNREF3WHpRLjY2MDY'
				}
			]
		},
		{
			rel: ['item'],
			actions: [
				{
					href:
						'https://activities.api.testdomain.d2l/activities/6606_706000_6606/usages/6606/collection/TmpZd05sOHpNREF3WHpRLjY2MDY',
					name: 'Delete',
					method: 'DELETE'
				}
			],
			links: [
				{
					rel: ['self'],
					href:
						'https://activities.api.testdomain.d2l/activities/6606_706000_6606/usages/6606/collection/TmpZd05sOHpNREF3WHpRLjY2MDY'
				},
				{
					rel: ['https://activities.api.brightspace.com/rels/activity-usage'],
					href: 'https://activities.api.testdomain.d2l/activities/6606_3000_4/usages/6606'
				},
				{
					rel: ['up', 'collection'],
					href: 'https://activities.api.testdomain.d2l/activities/6606_706000_6606/usages/6606/collection'
				},
				{
					rel: ['prev'],
					href:
						'https://activities.api.testdomain.d2l/activities/6606_706000_6606/usages/6606/collection/TmpZd05sOHpNREF3WHpZLjY2MDY'
				}
			]
		}
	],
	links: [
		{
			rel: ['self'],
			href: 'https://activities.api.testdomain.d2l/activities/6606_706000_6606/usages/6606/collection'
		},
		{
			rel: ['https://activities.api.brightspace.com/rels/activity-usage', 'up'],
			href: 'https://activities.api.testdomain.d2l/activities/6606_706000_6606/usages/6606'
		}
	]
};

export const testData = {
	collection,
	setCollectionPagingEditable: {
		'actions': [
			{
				href: 'https://305d9474-d93a-4205-9d27-101205376fcf.activities.api.dev.brightspace.com/old/activities/6606_51000_1759/usages/123171/collection',
				name: 'move-activity',
				method: 'PATCH',
				fields: [
					{
						type: 'text',
						name: 'itemToMoveId'
					},
					{
						type: 'text',
						name: 'targetId'
					},
					{
						type: 'number',
						name: 'moveAfter'
					}
				],
			},
			{
				href: 'https://305d9474-d93a-4205-9d27-101205376fcf.activities.api.dev.brightspace.com/old/activities/6606_51000_1759/usages/123171/collection/paging',
				name: 'set-collection-paging',
				method: 'PATCH',
				fields: [
					{
						type: 'radio',
						name: 'pagingType',
						value: [
							{
								title: 'All activities displayed together',
								value: 'none',
								selected: false
							},
							{
								title: '1 activity per page',
								value: 'oneactivityperpage',
								selected: true
							},
							{
								title: 'Add page break after each sub-collection',
								value: 'pagebreakaftereachsubcollection',
								selected: false
							}
						]
					}
				]
			},
		],
		'links': [
			{
				rel: [
					'self'
				],
				href: 'https://305d9474-d93a-4205-9d27-101205376fcf.activities.api.dev.brightspace.com/activities/6606_51000_1759/usages/123171/collection'
			},
			{
				rel: [
					'https://activities.api.brightspace.com/rels/activity-usage',
					'up'
				],
				href: 'https://305d9474-d93a-4205-9d27-101205376fcf.activities.api.dev.brightspace.com/old/activities/6606_51000_1759/usages/123171'
			},
			{
				rel: [
					'https://activities.api.brightspace.com/rels/collection-numbering'
				],
				href: 'https://305d9474-d93a-4205-9d27-101205376fcf.activities.api.dev.brightspace.com/old/activities/6606_51000_1759/usages/123171/collection/numbering'
			}
		],
	},
	setCollectionPagingNonEditable: {
		'actions': [
			{
				href: 'http://9fxdl33.desire2learn.d2l:44444/d2l/api/hm/activities/activities/6606_51000_25/usages/6613/collection',
				name: 'move-activity',
				method: 'PATCH',
				fields: [
					{
						type: 'text',
						name: 'itemToMoveId'
					},
					{
						type: 'text',
						name: 'targetId'
					},
					{
						type: 'number',
						name: 'moveAfter'
					}
				],
			},
		],
		'links': [
			{
				rel: [
					'self'
				],
				href: 'https://305d9474-d93a-4205-9d27-101205376fcf.activities.api.dev.brightspace.com/activities/6606_51000_1759/usages/123171/collection'
			},
			{
				rel: [
					'https://activities.api.brightspace.com/rels/activity-usage',
					'up'
				],
				href: 'https://305d9474-d93a-4205-9d27-101205376fcf.activities.api.dev.brightspace.com/old/activities/6606_51000_1759/usages/123171'
			},
			{
				rel: [
					'https://activities.api.brightspace.com/rels/collection-numbering'
				],
				href: 'https://305d9474-d93a-4205-9d27-101205376fcf.activities.api.dev.brightspace.com/old/activities/6606_51000_1759/usages/123171/collection/numbering'
			}
		],
	}
};
