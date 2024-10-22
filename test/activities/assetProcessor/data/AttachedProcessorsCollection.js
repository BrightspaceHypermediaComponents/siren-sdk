export const attachedProcessorsCollection = {
	'class': [
		'collection',
		'asset-processor-attached-processors'
	],
	'entities': [
		{
			'class': [
				'asset-processor-attached-processor'
			],
			'rel': [
				'item'
			],
			'properties': {
				'externalDeploymentId': '65AE4832-5255-4806-804F-09D39945015E',
				'deploymentName': 'My deployment 1',
				'assetProcessorId': 1,
				'title': 'Processor 1',
				'settingsLinkId': 10, //may not need
				'settingsLaunchRoute': '',
				'eulaLaunchRoute': '', //instructors wont 'use' this link
				'isEnabled': true, //for instructors to turn back 'on' when off, and offer a 'disable/delete' flow
				'isExternalResource': false, //iframe vs new window
				'width': 300, //only for iframe
				'height': 399, //only for iframe
			}
		},
		{
			'class': [
				'asset-processor-attached-processor'
			],
			'rel': [
				'item'
			],
			'properties': {
				'externalDeploymentId': '3FFC3FA2-084E-4608-9B00-7D9259894739',
				'deploymentName': 'My deployment 2',
				'assetProcessorId': 2,
				'title': 'Processor 2',
				'settingsLinkId': 11,
				'settingsLaunchRoute': '/d2l/lti/settingsExample', //lms route to handle auth
				'eulaLaunchRoute': '', //instructors wont 'use' this link. Do we need it here?
				'isEnabled': true, //for instructors to turn back 'on' when off, and offer a 'disable/delete' flow
				'isExternalResource': false, //iframe vs new window
				'width': 300, //only for iframe
				'height': 399, //only for iframe
			}
		},
		{
			'class': [
				'asset-processor-attached-processor'
			],
			'rel': [
				'item'
			],
			'properties': {
				'externalDeploymentId': '3FFC3FA2-084E-4608-9B00-7D9259894739',
				'deploymentName': 'My deployment 2',
				'assetProcessorId': 2,
				'title': 'Processor 3',
				'settingsLinkId': 12,
				'settingsLaunchRoute': '',
				'eulaLaunchRoute': '', //instructors wont 'use' this link
				'isEnabled': true, //for instructors to turn back 'on' when off, and offer a 'disable/delete' flow
				'isExternalResource': false, //iframe vs new window
				'width': 300, //only for iframe
				'height': 399, //only for iframe
			}
		}
	]
};
