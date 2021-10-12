export const editablePrimaryView = {
	'class': [
		'submission-view',
		'primary',
		'show-stats-class-average',
		'show-standards'
	],
	'properties': [

	],
	'entities': [
		{
			'class': [
				'richtext',
				'message'
			],
			'rel': [
				'related'
			],
			'properties': {
				'html': '<p>hello</p>'
			},
			'actions': [
				{
					'type': 'application/x-www-form-urlencoded',
					'href': '/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
					'name': 'update-message',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'text',
							'name': 'message',
							'value': '<p>hello</p>'
						}
					]
				}
			]
		},
		{
			'class': [
				'hide-show-questions',
				'hide-questions'
			],
			'rel': [
				'related'
			],
			'properties': {
			},
			'actions': [
				{
					'href': '/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
					'name': 'update-hide-show-questions',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'radio',
							'name': 'hide-show-questions',
							'value': [
								{
									'value': 'show-questions',
									'selected': false
								},
								{
									'value': 'hide-questions',
									'selected': true
								}
							]
						}
					]
				}
			],
			'entities': [
				{
					'class': [
						'show-questions',
						'incorrect-questions',
						'show-correct-answers',
						'show-question-score'
					],
					'rel': [
						'related'
					],
					'properties': {
					},
					'actions': [
						{
							'href': '/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
							'name': 'update-show-questions',
							'method': 'PATCH',
							'fields': [
								{
									'type': 'radio',
									'name': 'show-questions',
									'value': [
										{
											'value': 'all-questions',
											'selected': false
										},
										{
											'value': 'incorrect-questions',
											'selected': true
										},
										{
											'value': 'correct-questions',
											'selected': false
										}
									]
								}
							]
						},
						{
							'href': '/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
							'name': 'update-show-correct-answers',
							'method': 'PATCH',
							'fields': [
								{
									'type': 'checkbox',
									'name': 'show-correct-answers',
									'value': true
								}
							]
						},
						{
							'href': '/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
							'name': 'update-show-learner-responses',
							'method': 'PATCH',
							'fields': [
								{
									'type': 'checkbox',
									'name': 'show-learner-responses',
									'value': false
								}
							]
						},
						{
							'href': '/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
							'name': 'update-show-question-score',
							'method': 'PATCH',
							'fields': [
								{
									'type': 'checkbox',
									'name': 'show-question-score',
									'value': true
								}
							]
						}
					]
				}
			]
		}
	],
	'links': [
		{
			'rel': [
				'self'
			],
			'href': '/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123'
		}
	],
	'actions': [
		{
			'href': '/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
			'name': 'update-show-standards',
			'method': 'PATCH',
			'fields': [
				{
					'type': 'checkbox',
					'name': 'show-standards',
					'value': true
				}
			]
		},
		{
			'href': '/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
			'name': 'update-show-attempt-score',
			'method': 'PATCH',
			'fields': [
				{
					'type': 'checkbox',
					'name': 'show-attempt-score',
					'value': false
				}
			]
		},
		{
			'href': '/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
			'name': 'update-show-stats-class-average',
			'method': 'PATCH',
			'fields': [
				{
					'type': 'checkbox',
					'name': 'show-stats-class-average',
					'value': true
				}
			]
		},
		{
			'href': '/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
			'name': 'update-show-stats-score-distribution',
			'method': 'PATCH',
			'fields': [
				{
					'type': 'checkbox',
					'name': 'show-stats-score-distribution',
					'value': false
				}
			]
		}
	]
};

export const editableSecondaryView = {
	'class': [
		'submission-view',
		'secondary',
		'show-stats-class-average',
		'grade-restrictions',
		'ip-restrictions',
		'show-standards'
	],
	'entities': [
		{
			'class': [
				'release-date'
			],
			'rel': [
				'related'
			],
			'actions': [
				{
					'type': 'application/x-www-form-urlencoded',
					'href': '/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
					'name': 'update-release-date',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'radio',
							'name': 'release-date',
							'value': [
								{
									'title': 'At a specific date and time',
									'value': 'specified-date',
									'selected': false
								},
								{
									'title': 'Immediately following submission',
									'value': 'immediately-after',
									'selected': true
								}
							]
						}
					]
				}
			],
			'entities': [
				{
					'class': [
						'released-date-picker'
					],
					'rel': [
						'related'
					],
					'actions': [
						{
							'type': 'application/x-www-form-urlencoded',
							'href': '/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
							'name': 'update-released-date-picker',
							'method': 'PATCH',
							'fields': [
								{
									'type': 'datetime',
									'name': 'released-date-picker',
									'value': '2021-09-21.0909087Z'
								}
							]
						}
					]
				}
			]
		},
		{
			'class': [
				'grade-restrictions'
			],
			'rel': [
				'related'
			],
			'properties': {
				'min-grade': 0.00,
				'max-grade': 100.00
			},
			'actions': [
				{
					'href': '/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
					'name': 'update-min-max-grade',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'number',
							'name': 'min-grade',
							'value': 0
						},
						{
							'type': 'number',
							'name': 'max-grade',
							'value': 100
						}
					]
				}
			]
		},
		{
			'class': [
				'attempt-restrictions'
			],
			'rel': [
				'related'
			],
			'properties': {

			},
			'actions': [
				{
					'href': '/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
					'name': 'update-attempt-restrictions',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'checkbox',
							'name': 'attempt-restrictions',
							'value': false
						}
					]
				},
				{
					'href': '/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
					'name': 'update-attempt-restriction-number',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'radio',
							'name': 'attempt-restriction-number',
							'value': [
								{
									'title': '1',
									'value': 1,
									'selected': true
								},
								{
									'title': '2',
									'value': 2,
									'selected': false
								},
								{
									'title': '3',
									'value': 3,
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
				'time-limit'
			],
			'rel': [
				'related'
			],
			'actions': [
				{
					'href': '/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
					'name': 'update-time-limit-number',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'number',
							'name': 'time-limit-number',
							'value': 120
						}
					]
				}
			]
		},
		{
			'class': [
				'richtext',
				'message'
			],
			'rel': [
				'related'
			],
			'properties': {
				'html': '<p>hello</p>'
			},
			'actions': [
				{
					'type': 'application/x-www-form-urlencoded',
					'href': '/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
					'name': 'update-message',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'text',
							'name': 'message',
							'value': '<p>hello</p>'
						}
					]
				}
			]
		},
		{
			'class': [
				'hide-show-questions',
				'hide-questions'
			],
			'rel': [
				'related'
			],
			'actions': [
				{
					'href': '/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
					'name': 'update-hide-show-questions',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'radio',
							'name': 'hide-show-questions',
							'value': [
								{
									'value': 'show-questions',
									'selected': false
								},
								{
									'value': 'hide-questions',
									'selected': true
								}
							]
						}
					]
				}
			],
			'entities': [
				{
					'class': [
						'show-questions',
						'all-questions',
						'show-correct-answers',
						'show-question-score'
					],
					'rel': [
						'related'
					],
					'properties': {
					},
					'actions': [
						{
							'href': '/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
							'name': 'update-show-questions',
							'method': 'PATCH',
							'fields': [
								{
									'type': 'radio',
									'name': 'show-questions',
									'value': [
										{
											'value': 'all-questions',
											'selected': true
										},
										{
											'value': 'incorrect-questions',
											'selected': false
										},
										{
											'value': 'correct-questions',
											'selected': false
										}
									]
								}
							]
						},
						{
							'href': '/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
							'name': 'update-show-correct-answers',
							'method': 'PATCH',
							'fields': [
								{
									'type': 'checkbox',
									'name': 'show-correct-answers',
									'value': true
								}
							]
						},
						{
							'href': '/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
							'name': 'update-show-learner-responses',
							'method': 'PATCH',
							'fields': [
								{
									'type': 'checkbox',
									'name': 'show-learner-responses',
									'value': false
								}
							]
						},
						{
							'href': '/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
							'name': 'update-show-question-score',
							'method': 'PATCH',
							'fields': [
								{
									'type': 'checkbox',
									'name': 'show-question-score',
									'value': true
								}
							]
						}
					]
				}
			]
		}
	],
	'links': [
		{
			'rel': [
				'self'
			],
			'href': '/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123'
		}
	],
	'actions': [
		{
			'href': '/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
			'name': 'update-show-standards',
			'method': 'PATCH',
			'fields': [
				{
					'type': 'checkbox',
					'name': 'show-standards',
					'value': true
				}
			]
		},
		{
			'href': '/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
			'name': 'update-grade-restrictions',
			'method': 'PATCH',
			'fields': [
				{
					'type': 'checkbox',
					'name': 'grade-restrictions',
					'value': true
				}
			]
		},
		{
			'href': '/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
			'name': 'update-ip-restrictions',
			'method': 'PATCH',
			'fields': [
				{
					'type': 'checkbox',
					'name': 'ip-restrictions',
					'value': true
				}
			]
		},
		{
			'href': '/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
			'name': 'update-time-limit',
			'method': 'PATCH',
			'fields': [
				{
					'type': 'checkbox',
					'name': 'time-limit',
					'value': false
				}
			]
		},
		{
			'href': '/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
			'name': 'update-show-attempt-score',
			'method': 'PATCH',
			'fields': [
				{
					'type': 'checkbox',
					'name': 'show-attempt-score',
					'value': false
				}
			]
		},
		{
			'href': '/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
			'name': 'update-show-stats-class-average',
			'method': 'PATCH',
			'fields': [
				{
					'type': 'checkbox',
					'name': 'show-stats-class-average',
					'value': true
				}
			]
		},
		{
			'href': '/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
			'name': 'update-show-stats-score-distribution',
			'method': 'PATCH',
			'fields': [
				{
					'type': 'checkbox',
					'name': 'show-stats-score-distribution',
					'value': false
				}
			]
		},
		{
			'href': '/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
			'name': 'delete-submission-view',
			'method': 'DELETE'
		}
	]
};

export const nonEditablePrimaryView = {
	'class': [
		'submission-view',
		'primary',
		'show-stats-class-average',
		'show-attempt-score',
		'show-standards',
		'show-stats-score-distribution'
	],
	'properties': [

	],
	'entities': [
		{
			'class': [
				'richtext',
				'message'
			],
			'rel': [
				'related'
			],
			'properties': {
				'html': '<p>hello</p>'
			}
		},
		{
			'class': [
				'hide-show-questions',
				'hide-questions'
			],
			'rel': [
				'related'
			],
			'properties': {
			},
			'entities': [
				{
					'class': [
						'show-questions',
						'all-questions',
						'show-correct-answers',
						'show-learner-responses',
						'show-question-score'
					],
					'rel': [
						'related'
					],
					'properties': {
					},
				}
			]
		}
	],
	'links': [
		{
			'rel': [
				'self'
			],
			'href': '/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123'
		}
	]
};
