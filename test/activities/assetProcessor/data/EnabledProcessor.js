export const enabledAttachedProcessor = {
	'class': [
		'asset-processor-attached-processor'
	],
	'rel': [
		'https://lti.api.brightspace.com/rels/asset-processor-attached-processor'
	],
	'properties': {
		'externalDeploymentId': '65AE4832-5255-4806-804F-09D39945015E',
		'deploymentName': 'Deployment',
		'assetProcessorId': 1,
		'title': 'Processor 1',
		'settingsLinkId': 10,
		'settingsLaunchRoute': '',
		'eulaLaunchRoute': '',
		'isEnabled': true,
		'isExternalResource': false,
		'width': 300,
		'height': 399,
	},
	'actions': [
		{
			'href': 'https://lti.api.brightspace.com/6609/asset-processor/1',
			'name': 'disable-asset-processor',
			'method': 'PATCH',
			'fields': [
				{
					'type': 'checkbox',
					'name': 'isEnabled',
					'value': false
				}
			]
		}
	]
};
