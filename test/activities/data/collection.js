export const collection = {
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
