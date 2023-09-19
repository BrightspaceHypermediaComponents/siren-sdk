const collection = {
	properties: {
		"pageSize": 1,
		"totalItemCount": 33,
		"itemsLoaded": 33
	},
	class: [
		'instance',
		'collection',
		'activities'
	],
	entities: [
		{
			"class": [
				"activity",
				"instance"
			  ],
			"href": "https://fake-tenant-id.activities.api.dev.brightspace.com/activities/2",
			"rel": [
			  "https://activities.api.brightspace.com/rels/activity"
			]
		},
	],
	links: [
		{
			rel: [
				"self"
			],
			href: "https://fake-tenant-id.activities.api.dev.brightspace.com/activities/InstanceCollection/1"
		},
		{
			rel: [
				"https://activities.api.brightspace.com/rels/activity"
			],
			href: "https://fake-tenant-id.activities.api.dev.brightspace.com/activities/1"
		}
	]
};

export const testData = {
	
};
