export const testData = {
	filesHomeEntityEditable: {
		'links': [
			{
				'rel': [
					'self'
				],
				'href': 'https://b4b1eaba-26aa-4017-b37c-33e22649e477.files.api.proddev.d2l/121213'
			}
		],
		'actions': [
			{
				'type': 'multipart/form-data',
				'title': 'Upload file',
				'href': 'https://b4b1eaba-26aa-4017-b37c-33e22649e477.files.api.proddev.d2l/121213/upload',
				'name': 'upload-file',
				'method': 'POST'
			},
			{
				'title': 'File Preview Location',
				'href': 'https://b4b1eaba-26aa-4017-b37c-33e22649e477.files.api.proddev.d2l/121213/preview-location',
				'name': 'file-preview-location',
				'method': 'GET',
				'fields': [
					{
						'type': 'text',
						'name': 'fileId'
					},
					{
						'type': 'text',
						'name': 'fileSystemType'
					}
				]
			}
		]
	}
};
