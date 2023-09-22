const instance_collection = {
	class: [
		'instance-collection'
	],
	entities: [
		{
			class: [
				'collected-object'
			  ],
			properties: {
				SortOrder: 2.0,
				Completion: 'Required'
            }
		},
		{
			class: [
				'collected-object'
			  ],
			properties: {
				SortOrder: 3.0,
				Completion: 'Required'
            }
		},
		{
			class: [
				'collected-object'
			  ],
			properties: {
				SortOrder: 4.0,
				Completion: 'Optional'
            }
		},
	],
	links: [
		{
			rel: [
				'self'
			],
			href: 'https://ec1ee987-fd66-4dff-af57-41aab1e6238f.activities.api.dev.brightspace.com/InstanceCollection/639'
		}
	]
};

export const testData = {
	instance_collection
};
