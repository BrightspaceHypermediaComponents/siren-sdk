export const editableAssignment = {
	'class': [
		'assignment'
	],
	'properties': {
		'name': 'Extra Special Assignment'
	},
	'entities': [
		{
			'class': [
				'submissions-rule'
			],
			'rel': [
				'https://assignments.api.brightspace.com/rels/submissions-rule'
			],
			'properties': {
				'rule': {
					'title': 'All submissions are kept',
					'value': 'keepall'
				}
			},
			'actions': [
				{
					'href': 'https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7',
					'name': 'update-submissions-rule',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'radio',
							'name': 'submissionsRule',
							'value': [
								{
									'title': 'All submissions are kept',
									'value': 'keepall',
									'selected': true
								},
								{
									'title': 'Only one submission allowed',
									'value': 'onlyone',
									'selected': false
								},
								{
									'title': 'Only the most recent submission is kept',
									'value': 'overwritesubmissions',
									'selected': false
								}
							]
						}
					]
				}
			]
		},
		{
			'rel': [
				'https://assignments.api.brightspace.com/rels/anonymous-marking'
			],
			'actions': [
				{
					'href': 'https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7',
					'name': 'update-anonymous-marking',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'checkbox',
							'name': 'isAnonymous',
							'value': false
						}
					]
				}
			]
		},
		{
			'class': [
				'date',
				'due-date'
			],
			'rel': [
				'https://api.brightspace.com/rels/date'
			],
			'properties': {
				'date': '2020-01-22T04:59:00.000Z'
			}
		},
		{
			'class': [
				'annotations',
				'enabled'
			],
			'rel': [
				'https://assignments.api.brightspace.com/rels/annotations'
			],
			'actions': [
				{
					'href': 'https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7',
					'name': 'update-annotation-tools-availability',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'checkbox',
							'name': 'annotationToolsAvailability',
							'value': true
						}
					]
				}
			]
		},
		{
			'class': [
				'richtext',
				'instructions',
				'annotated'
			],
			'rel': [
				'item',
				'https://assignments.api.brightspace.com/rels/instructions'
			],
			'properties': {
				'text': 'These are your instructions',
				'html': '<p>These are your instructions</p>'
			},
			'actions': [
				{
					'type': 'application/x-www-form-urlencoded',
					'href': 'https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7',
					'name': 'update-instructions',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'text',
							'name': 'instructions',
							'value': '<p>These are your instructions</p>'
						}
					]
				}
			]
		},
		{
			'class': [
				'folder-type',
				'group'
			],
			'rel': [
				'https://assignments.api.brightspace.com/rels/folder-type'
			],
			'properties': {
				'groupName': 'Project 1',
				'informationText': 'Create new groups in the Groups tool.'
			},
			'entities': [
				{
					'class': [
						'groups-homepage'
					],
					'rel': [
						'https://assignments.api.brightspace.com/rels/groups-homepage'
					],
					'properties': {
						'url': 'https://qa2020521349g.bspc.com/d2l/lms/group/group_list.d2l?ou=123065'
					}
				}
			],
			'actions': [
				{
					'href': 'https://5f3ff1d7-b202-4a7a-acd4-2a91bd8cdafb.assignments.api.dev.brightspace.com/6609/folders/11',
					'name': 'update-folder-type',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'radio',
							'name': 'folderType',
							'value': [
								{
									'title': 'Individual',
									'value': 2,
									'selected': false
								},
								{
									'title': 'Group',
									'value': 1,
									'selected': true
								}
							]
						}
					]
				},
				{
					'href': 'https://ce6a9031-de13-4f58-bfdf-e88412930452.assignments.api.dev.brightspace.com/123065/folders/7',
					'name': 'update-group-type',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'radio',
							'name': 'groupTypeId',
							'value': [
								{
									'title': 'Project 1',
									'value': 314,
									'selected': true
								},
								{
									'title': 'Project 2',
									'value': 315,
									'selected': false
								},
								{
									'title': 'Project 3',
									'value': 316,
									'selected': false
								}
							]
						},
						{
							'type': 'hidden',
							'name': 'folderType',
							'value': 1
						}
					]
				}
			]
		},
		{
			'class': [
				'files-submission-limit'
			],
			'rel': [
				'https://assignments.api.brightspace.com/rels/files-submission-limit'
			],
			'properties': {
				'limit': 'unlimited'
			},
			'actions': [
				{
					'href': 'https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7',
					'name': 'update-files-submission-limit',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'radio',
							'name': 'filesSubmissionLimit',
							'value': [
								{
									'title': 'Unlimited',
									'value': 'unlimited',
									'selected': true
								},
								{
									'title': 'OneFilePerSubmission',
									'value': 'onefilepersubmission',
									'selected': false
								}
							]
						}
					]
				}
			]
		},
		{
			'class': [
				'submissions-rule'
			],
			'rel': [
				'https://assignments.api.brightspace.com/rels/submissions-rule'
			],
			'properties': {
				'rule': {
					'title': 'All submissions are kept',
					'value': 'keepall'
				}
			},
			'actions': [
				{
					'href': 'https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7',
					'name': 'update-submissions-rule',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'radio',
							'name': 'submissionsRule',
							'value': [
								{
									'title': 'All submissions are kept',
									'value': 'keepall',
									'selected': true
								},
								{
									'title': 'Only one submission allowed',
									'value': 'onlyone',
									'selected': false
								},
								{
									'title': 'Only the most recent submission is kept',
									'value': 'overwritesubmissions',
									'selected': false
								}
							]
						}
					]
				}
			]
		},
		{
			'class': [
				'notification-email'
			],
			'rel': [
				'https://assignments.api.brightspace.com/rels/notification-email'
			],
			'properties': {
				'email': 'test@d2l.com'
			},
			'actions': [
				{
					'href': 'https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7',
					'name': 'update-notification-email',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'text',
							'name': 'notificationEmail',
							'value': 'test@d2l.com'
						}
					]
				}
			]
		},
	],
	'actions': [
		{
			'href': 'https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7',
			'name': 'update-completion-type',
			'method': 'PATCH',
			'fields': [
				{
					'type': 'radio',
					'title': 'Completion Type',
					'name': 'completionType',
					'value': [
						{
							'title': 'Automatically on submission',
							'value': 0,
							'selected': true
						},
						{
							'title': 'Manually by learners',
							'value': 2,
							'selected': false
						},
						{
							'title': 'Automatically on evaluation',
							'value': 3,
							'selected': false
						},
						{
							'title': 'Automatically on due date',
							'value': 1,
							'selected': false
						}
					]
				}
			]
		},
		{
			'href': 'https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7',
			'name': 'update-default-scoring-rubric',
			'method': 'PATCH',
			'fields': [
				{
					'type': 'text',
					'name': 'defaultScoringRubricId',
					'value': '-1'
				}
			]
		},
		{
			'href': 'https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7',
			'name': 'update-allowable-file-type',
			'method': 'PATCH',
			'fields': [
				{
					'type': 'radio',
					'title': 'Allowable File Types',
					'name': 'allowableFileType',
					'value': [
						{
							'title': 'No Restrictions',
							'value': 0,
							'selected': true
						},
						{
							'title': 'PDF Only',
							'value': 1,
							'selected': false
						},
						{
							'title': 'Annotatable Files',
							'value': 2,
							'selected': false
						},
						{
							'title': 'Files that can be previewed without conversion',
							'value': 3,
							'selected': false
						},
						{
							'title': 'Images and Videos',
							'value': 4,
							'selected': false
						},
						{
							'title': 'Custom File Types',
							'value': 5,
							'selected': false
						}
					]
				}
			]
		},
		{
			'href': 'https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7',
			'name': 'update-custom-allowable-file-type',
			'method': 'PATCH',
			'fields': [
				{
					'type': 'text',
					'name': 'customAllowableFileTypes'
				}
			]
		},
		{
			'class': [
				'required'
			],
			'href': 'https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7',
			'name': 'update-name',
			'method': 'PATCH',
			'fields': [
				{
					'type': 'text',
					'name': 'name',
					'value': 'Folder 1'
				}
			]
		},
		{
			'href': 'https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7',
			'name': 'update-max-grade-point',
			'method': 'PATCH',
			'fields': [
				{
					'type': 'number',
					'name': 'outOf',
					'value': 10.000000000
				}
			]
		},
		{
			'class': [
				'link-attachment'
			],
			'type': 'application/x-www-form-urlencoded',
			'title': 'Edit an assignment folder with defaults',
			'href': 'https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7',
			'name': 'quick-create-folder',
			'method': 'PUT',
			'fields': [
				{
					'class': [
						'required'
					],
					'type': 'text',
					'title': 'Folder name',
					'name': 'name',
					'value': 'Folder 1'
				},
				{
					'type': 'text',
					'title': 'Instructions',
					'name': 'instructions',
					'value': '<p>These are your instructions updated again</p>'
				}
			]
		},
		{
			'title': 'Delete an assignment folder',
			'href': 'https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7',
			'name': 'delete-folder',
			'method': 'DELETE'
		},
		{
			'title': 'Cancel creating assignment folder',
			'href': 'https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7?isCancel=1',
			'name': 'cancel-folder',
			'method': 'DELETE'
		}
	],
	'links': [
		{
			'rel': [
				'self'
			],
			'href': 'https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7'
		},
		{
			'rel': [
				'https://activities.api.brightspace.com/rels/activity-usage'
			],
			'href': 'https://f5aa43d7-c082-485c-84f5-4808147fe98a.activities.api.dev.brightspace.com/activities/6606_2000_7/usages/123065'
		},
	],
	'rel': [
		'https://assignments.api.brightspace.com/rels/assignment'
	]
};
