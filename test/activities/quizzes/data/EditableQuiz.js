export const editableQuiz = {
	'properties': {
		'name': 'What a great quiz'
	},
	'class': [
		'named-entity',
		'quiz'
	],
	'actions': [
		{
			'name': 'update-name',
			'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22',
			'method': 'PATCH',
			'type': 'application/x-www-form-urlencoded',
			'fields': [
				{
					'name': 'name',
					'class': [
						'required'
					],
					'type': 'text',
					'value': 'Untitled'
				}
			]
		},
		{
			'title': 'Delete a quiz',
			'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22',
			'name': 'delete-quiz',
			'method': 'DELETE'
		},
		{
			'name': 'checkout',
			'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22',
			'method': 'POST'
		}
	],
	'links': [
		{
			'rel': [
				'self'
			],
			'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22'
		},
		{
			'rel': [
				'alternate'
			],
			'href': 'http://d2l-d6xpge1xiym.desire2learn.d2l:44444/d2l/lms/quizzing/quizzing.d2l?ou=6606&qi=22',
			'type': 'text/html'
		},
		{
			'rel': [
				'preview'
			],
			'type': 'text/html',
			'href': 'http://test.desire2learn.d2l/d2l/lms/quizzing/user/quiz_summary.d2l?ou=6606&qi=46&isprv=1&fromQB=1&bp=1'
		},
		{
			'rel': [
				'https://api.brightspace.com/rels/organization'
			],
			'href': 'https://afe99802-9130-4320-a770-8d138b941e74.organizations.api.proddev.d2l/6606'
		},
		{
			'rel': [
				'https://activities.api.brightspace.com/rels/activity-usage'
			],
			'href': 'https://afe99802-9130-4320-a770-8d138b941e74.activities.api.proddev.d2l/activities/6606_51000_22/usages/6606'
		},
		{
			'rel': [
				'https://quizzes.api.brightspace.com/rels/recommend-alignments'
			],
			'href': 'https://www.d2l.com'
		},
	],
	'entities': [
		{
			'class': [
				'shuffle',
				'checked'
			],
			'rel': [
				'https://quizzes.api.brightspace.com/rels/shuffle'
			],
			'actions': [
				{
					'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22',
					'name': 'update-shuffle',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'checkbox',
							'name': 'shuffle',
							'value': true
						}
					]
				}
			]
		},
		{
			'rel': [
				'https://quizzes.api.brightspace.com/rels/has-hints'
			],
			'class': [
				'has-hints',
				'checked'
			],
			'actions': [
				{
					'name': 'update-hints',
					'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22',
					'method': 'PATCH',
					'type': 'application/x-www-form-urlencoded',
					'fields': [
						{
							'name': 'hasHints',
							'type': 'checkbox',
							'value': true
						}
					]
				}
			]
		},
		{
			'class': [
				'disable-pager-access',
				'checked'
			],
			'rel': [
				'https://quizzes.api.brightspace.com/rels/disable-pager-access'
			],
			'actions': [
				{
					'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22',
					'name': 'update-disable-pager-access',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'checkbox',
							'name': 'disablePagerAccess',
							'value': true
						}
					]
				}
			]
		},
		{
			'class': [
				'hide-question-points',
				'checked'
			],
			'rel': [
				'https://quizzes.api.brightspace.com/rels/hide-question-points'
			],
			'actions': [
				{
					'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22',
					'name': 'update-hide-question-points',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'checkbox',
							'name': 'hideQuestionPoints',
							'value': true
						}
					]
				}
			]
		},
		{
			'class': [
				'quiz-password'
			],
			'rel': [
				'https://quizzes.api.brightspace.com/rels/quiz-password'
			],
			'properties': {
				'password': 'hello'
			},
			'actions': [
				{
					'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22',
					'name': 'update-quiz-password',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'password',
							'name': 'password',
							'value': 'hello'
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
				'https://quizzes.api.brightspace.com/rels/notification-email'
			],
			'properties': {
				'email': 'moose@d2l.com'
			},
			'actions': [
				{
					'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22',
					'name': 'update-notification-email',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'text',
							'name': 'notificationEmail',
							'value': 'moose@d2l.com'
						}
					]
				}
			]
		},
		{
			'class': [
				'prevent-moving-backwards',
				'checked'
			],
			'rel': [
				'https://quizzes.api.brightspace.com/rels/prevent-moving-backwards'
			],
			'actions': [
				{
					'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22',
					'name': 'update-prevent-moving-backwards',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'checkbox',
							'name': 'preventMovingBackwards',
							'value': true
						}
					]
				}
			]
		},
		{
			'class': [
				'deduction-percentage'
			],
			'rel': [
				'https://quizzes.api.brightspace.com/rels/deduction-percentage'
			],
			'properties': {
				'deductionPercentage': 50
			},
			'actions': [
				{
					'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22',
					'name': 'update-deduction-percentage',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'number',
							'title': 'Deduction Percentage',
							'name': 'deductionPercentage',
							'value': 50,
							'min': 0,
							'max': 100
						}
					]
				}
			]
		},
		{
			'class': [
				'auto-set-graded',
				'checked'
			],
			'rel': [
				'https://quizzes.api.brightspace.com/rels/auto-set-graded'
			],
			'actions': [
				{
					'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22',
					'name': 'update-auto-set-graded',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'checkbox',
							'name': 'autoSetGraded',
							'value': true
						}
					]
				}
			]
		},
		{
			'class': [
				'study-support-enabled',
				'checked'
			],
			'rel': [
				'https://quizzes.api.brightspace.com/rels/study-support-enabled'
			],
			'actions': [
				{
					'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22',
					'name': 'study-support-enabled',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'checkbox',
							'name': 'studySupportEnabled',
							'value': true
						}
					]
				}
			],
			'entities': [
				{
					'class': [
						'show-results-overview',
						'checked'
					],
					'rel': [
						'https://quizzes.api.brightspace.com/rels/show-results-overview'
					],
					'actions': [
						{
							'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22',
							'name': 'show-results-overview',
							'method': 'PATCH',
							'fields': [
								{
									'type': 'checkbox',
									'name': 'showResultsOverview',
									'value': true
								}
							]
						}
					]
				},
				{
					'class': [
						'suggest-content-selection'
					],
					'rel': [
						'https://quizzes.api.brightspace.com/rels/suggest-content-selection'
					],
					'properties': {
						'suggestContentSelection': '1'
					},
					'actions': [
						{
							'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22',
							'name': 'suggest-content-selection',
							'method': 'PATCH',
							'fields': [
								{
									'type': 'radio',
									'name': 'suggestContentSelection',
									'value': [
										{
											'title': 'AnyAligned',
											'value': '0',
											'selected': false
										},
										{
											'title': 'Selected',
											'value': '1',
											'selected': true
										}
									]
								}
							]
						}
					]
				},
				{
					'class': [
						'remediation-candidates'
					],
					'rel': [
						'https://quizzes.api.brightspace.com/rels/remediation-candidates'
					],
					'properties': {
						'remediationCandidates': [
							{
								'ToolId': 37000,
								'ToolObjectId': 97705
							}
						]
					},
					'actions': [
						{
							'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22',
							'name': 'remediation-candidates',
							'method': 'PATCH',
							'fields': [
								{
									'type': 'text',
									'name': 'remediationCandidates',
									'value': ['37000,97705']
								}
							]
						}
					]
				}
			],
			'links': [
				{
					'rel': [
						'https://quizzes.api.brightspace.com/rels/study-support-compatibility'
					],
					'href': 'https://test.dev.brightspace.com/d2l/api/hm/quizzes/6609/quizzes/14/studySupportCompatibility'
				}
			]
		},
		{
			'class': [
				'sync-gradebook',
				'unchecked',
				'default'
			],
			'rel': [
				'https://quizzes.api.brightspace.com/rels/sync-gradebook'
			],
			'actions': [
				{
					'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22',
					'name': 'update-sync-gradebook',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'checkbox',
							'name': 'syncGradebook',
							'value': false
						}
					]
				},
				{
					'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22',
					'name': 'update-sync-gradebook-default',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'checkbox',
							'name': 'syncGradebookDefault',
							'value': true
						}
					]
				}
			]
		},
		{
			'class': [
				'completion-tracking',
				'passing-percentage'
			],
			'rel': [
				'https://quizzes.api.brightspace.com/rels/completion-tracking'
			],
			'properties': {
				'passingPercentage': 75
			},
			'actions': [
				{
					'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22',
					'name': 'update-passing-percentage',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'number',
							'name': 'passingPercentage',
							'value': 75
						}
					]
				}
			]
		},
		{
			'class': [
				'ip-restrictions',
				'collection'
			],
			'rel': [
				'https://quizzes.api.brightspace.com/rels/ip'
			],
			'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/39/ip'
		},
		{
			'rel': [
				'https://quizzes.api.brightspace.com/rels/submission-views'
			],
			'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/39/submissionviews'
		},
		{
			'rel': [
				'https://quizzes.api.brightspace.com/rels/categories'
			],
			'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/39/categories'
		},
		{
			'class': [
				'attempts'
			],
			'rel': [
				'https://quizzes.api.brightspace.com/rels/attempts'
			],
			'href': 'https://tenantId.quizzes.api.dev.brightspace.com/123170/quizzes/1391/attempts'
		},
		{
			'class':[
				'richtext',
				'description',
				'description-is-displayed'
			],
			'rel':[
				'item',
				'https://quizzes.api.brightspace.com/rels/description'
			],
			'properties':{
				'text':'The Second quiz ever',
				'html':'The Second quiz ever'
			},
			'actions':[
				{
					'type':'application/x-www-form-urlencoded',
					'href':'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22',
					'name':'update-description',
					'method':'PATCH',
					'fields':[
						{
							'type':'text',
							'name':'description',
							'value':'The Second quiz ever'
						}
					]
				}
			]
		},
		{
			'class':[
				'richtext',
				'header',
				'header-is-displayed'
			],
			'rel':[
				'item',
				'https://quizzes.api.brightspace.com/rels/header'
			],
			'properties':{
				'text':'Top of the quiz to ya!',
				'html':'Top of the quiz to ya!'
			},
			'actions':[
				{
					'type':'application/x-www-form-urlencoded',
					'href':'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22',
					'name':'update-header',
					'method':'PATCH',
					'fields':[
						{
							'type':'text',
							'name':'header',
							'value':'Top of the quiz to ya!'
						}
					]
				}
			]
		},
		{
			'class': [
				'richtext',
				'footer',
				'footer-is-displayed'
			],
			'rel': [
				'item',
				'https://quizzes.api.brightspace.com/rels/footer'
			],
			'properties': {
				'text': 'Bottom of the quiz to ya!',
				'html': 'Bottom of the quiz to ya!'
			},
			'actions': [
				{
					'type': 'application/x-www-form-urlencoded',
					'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22',
					'name': 'update-footer',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'text',
							'name': 'footer',
							'value': 'Bottom of the quiz to ya!'
						}
					]
				}
			]
		},
		{
			'rel': ['https://quizzes.api.brightspace.com/rels/timing'],
			'href': 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22/timing'
		},
		{
			'class': [
				'has-attempts'
			],
			'rel': [
				'https://quizzes.api.brightspace.com/rels/has-attempts'
			]
		}
	]
};
