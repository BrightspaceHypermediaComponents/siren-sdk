export const editablePrimaryView = {
	class: [
		'submission-view',
		'primary',
		'show-stats-class-average',
		'show-standards'
	],
	properties: [],
	entities: [
		{
			class: ['richtext', 'message'],
			rel: ['related'],
			properties: {
				text: 'hello',
				html: '<p>hello</p>'
			},
			actions: [
				{
					type: 'application/x-www-form-urlencoded',
					href:
						'/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
					name: 'update-message',
					method: 'PATCH',
					fields: [
						{
							type: 'text',
							name: 'message',
							value: '<p>hello</p>'
						}
					]
				}
			]
		},
		{
			class: ['hide-show-questions', 'hide-questions'],
			rel: ['related'],
			properties: {},
			actions: [
				{
					href:
						'/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
					name: 'update-hide-show-questions',
					method: 'PATCH',
					fields: [
						{
							type: 'radio',
							name: 'hideShowQuestions',
							value: [
								{
									value: 'show-questions',
									selected: false
								},
								{
									value: 'hide-questions',
									selected: true
								}
							]
						}
					]
				}
			],
			entities: [
				{
					class: [
						'show-questions',
						'incorrect-questions',
						'show-correct-answers',
						'show-question-score'
					],
					rel: ['related'],
					properties: {},
					actions: [
						{
							href:
								'/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
							name: 'update-show-questions',
							method: 'PATCH',
							fields: [
								{
									type: 'radio',
									name: 'showQuestions',
									value: [
										{
											value: 'all-questions',
											selected: false
										},
										{
											value: 'incorrect-questions',
											selected: true
										},
										{
											value: 'correct-questions',
											selected: false
										}
									]
								}
							]
						},
						{
							href:
								'/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
							name: 'update-show-correct-answers',
							method: 'PATCH',
							fields: [
								{
									type: 'checkbox',
									name: 'showCorrectAnswers',
									value: true
								}
							]
						},
						{
							href:
								'/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
							name: 'update-show-learner-responses',
							method: 'PATCH',
							fields: [
								{
									type: 'checkbox',
									name: 'showLearnerResponses',
									value: false
								}
							]
						},
						{
							href:
								'/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
							name: 'update-show-question-score',
							method: 'PATCH',
							fields: [
								{
									type: 'checkbox',
									name: 'showQuestionScore',
									value: true
								}
							]
						}
					]
				}
			]
		},
		{
			class: ['show-standards'],
			rel: ['related']
		}
	],
	links: [
		{
			rel: ['self'],
			href:
				'/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123'
		}
	],
	actions: [
		{
			href:
				'/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
			name: 'update-show-standards',
			method: 'PATCH',
			fields: [
				{
					type: 'checkbox',
					name: 'showStandards',
					value: true
				}
			]
		},
		{
			href:
				'/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
			name: 'update-show-attempt-score',
			method: 'PATCH',
			fields: [
				{
					type: 'checkbox',
					name: 'showAttemptScore',
					value: false
				}
			]
		},
		{
			href:
				'/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
			name: 'update-show-stats-class-average',
			method: 'PATCH',
			fields: [
				{
					type: 'checkbox',
					name: 'showStatsClassAverage',
					value: true
				}
			]
		},
		{
			href:
				'/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
			name: 'update-show-stats-score-distribution',
			method: 'PATCH',
			fields: [
				{
					type: 'checkbox',
					name: 'showStatsScoreDistribution',
					value: false
				}
			]
		}
	]
};

export const nonEditablePrimaryView = {
	class: [
		'submission-view',
		'primary',
		'show-stats-class-average',
		'show-attempt-score',
		'show-standards',
		'show-stats-score-distribution'
	],
	properties: [],
	entities: [
		{
			class: ['richtext', 'message'],
			rel: ['related'],
			properties: {
				text: 'hello',
				html: '<p>hello</p>'
			}
		},
		{
			class: ['hide-show-questions', 'hide-questions'],
			rel: ['related'],
			properties: {},
			entities: [
				{
					class: [
						'show-questions',
						'all-questions',
						'show-correct-answers',
						'show-learner-responses',
						'show-question-score'
					],
					rel: ['related'],
					properties: {}
				}
			]
		},
		{
			class: ['show-standards'],
			rel: ['related']
		}
	],
	links: [
		{
			rel: ['self'],
			href:
				'/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123'
		}
	]
};

export const editableSecondaryView = {
	class: [
		'submission-view',
		'secondary',
		'show-stats-class-average',
		'attempt-restrictions',
		'ip-restrictions',
		'show-standards',
		'time-limit'
	],
	entities: [
		{
			class: ['release-date'],
			rel: ['https://api.brightspace.com/rels/date'],
			properties: {
				date: '2021-01-03T04:59:59.000Z',
				localizedDate: '2021-01-04T21:00:00.000'
			},
			actions: [
				{
					type: 'application/x-www-form-urlencoded',
					href:
						'/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
					name: 'update-release-date',
					method: 'PATCH',
					fields: [
						{
							type: 'text',
							name: 'releaseDate',
							value: '2021-01-03T04:59:59.000Z'
						}
					]
				}
			]
		},
		{
			class: ['subview-name'],
			rel: ['related'],
			properties: {
				name: 'Sample View'
			},
			actions: [
				{
					href: '/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
					name: 'update-subview-name',
					method: 'PATCH',
					fields: [
						{
							type: 'text',
							name: 'subviewName',
							value: 'Sample View'
						}
					]
				}
			]
		},
		{
			class: ['attempt-restrictions', 'grade-restrictions'],
			rel: ['related'],
			properties: {
				value: 1
			},
			actions: [
				{
					href:
						'/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
					name: 'update-attempt-restriction-number',
					method: 'PATCH',
					fields: [
						{
							type: 'radio',
							name: 'attemptRestrictionNumber',
							value: [
								{
									value: 1,
									selected: true
								},
								{
									value: 2,
									selected: false
								},
								{
									value: 3,
									selected: false
								}
							]
						}
					]
				},
				{
					href:
						'/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
					name: 'update-grade-restrictions',
					method: 'PATCH',
					fields: [
						{
							type: 'checkbox',
							name: 'restrictGrades',
							value: true
						}
					]
				}
			],
			entities: [
				{
					class: ['grade-restrictions'],
					rel: ['related'],
					properties: {
						'min-grade': 0.0,
						'max-grade': 100.0
					},
					actions: [
						{
							href:
								'/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
							name: 'update-min-max-grade',
							method: 'PATCH',
							fields: [
								{
									type: 'number',
									name: 'minGrade',
									value: 0,
									min: 0,
									max: 100
								},
								{
									type: 'number',
									name: 'maxGrade',
									value: 100,
									min: 0,
									max: 100
								}
							]
						}
					]
				}
			]
		},
		{
			class: ['time-limit'],
			rel: ['related'],
			properties: {
				value: 120
			},
			actions: [
				{
					href:
						'/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
					name: 'update-time-limit-number',
					method: 'PATCH',
					fields: [
						{
							type: 'number',
							name: 'timeLimitNumber',
							value: 120,
							min: 1,
							max: 9999
						}
					]
				}
			]
		},
		{
			class: ['richtext', 'message'],
			rel: ['related'],
			properties: {
				text: 'hello',
				html: '<p>hello</p>'
			},
			actions: [
				{
					type: 'application/x-www-form-urlencoded',
					href:
						'/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
					name: 'update-message',
					method: 'PATCH',
					fields: [
						{
							type: 'text',
							name: 'message',
							value: '<p>hello</p>'
						}
					]
				}
			]
		},
		{
			class: ['hide-show-questions', 'hide-questions'],
			rel: ['related'],
			actions: [
				{
					href:
						'/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
					name: 'update-hide-show-questions',
					method: 'PATCH',
					fields: [
						{
							type: 'radio',
							name: 'hideShowQuestions',
							value: [
								{
									value: 'show-questions',
									selected: false
								},
								{
									value: 'hide-questions',
									selected: true
								}
							]
						}
					]
				}
			],
			entities: [
				{
					class: [
						'show-questions',
						'all-questions',
						'show-correct-answers',
						'show-question-score'
					],
					rel: ['related'],
					properties: {},
					actions: [
						{
							href:
								'/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
							name: 'update-show-questions',
							method: 'PATCH',
							fields: [
								{
									type: 'radio',
									name: 'showQuestions',
									value: [
										{
											value: 'all-questions',
											selected: true
										},
										{
											value: 'incorrect-questions',
											selected: false
										},
										{
											value: 'correct-questions',
											selected: false
										}
									]
								}
							]
						},
						{
							href:
								'/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
							name: 'update-show-correct-answers',
							method: 'PATCH',
							fields: [
								{
									type: 'checkbox',
									name: 'showCorrectAnswers',
									value: true
								}
							]
						},
						{
							href:
								'/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
							name: 'update-show-learner-responses',
							method: 'PATCH',
							fields: [
								{
									type: 'checkbox',
									name: 'showLearnerResponses',
									value: false
								}
							]
						},
						{
							href:
								'/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
							name: 'update-show-question-score',
							method: 'PATCH',
							fields: [
								{
									type: 'checkbox',
									name: 'showQuestionScore',
									value: true
								}
							]
						}
					]
				}
			]
		},
		{
			class: ['show-standards'],
			rel: ['related']
		},
		{
			class: ['ip-restrictions'],
			rel: ['related']
		}
	],
	links: [
		{
			rel: ['self'],
			href:
				'/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123'
		}
	],
	actions: [
		{
			href:
				'/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
			name: 'update-show-standards',
			method: 'PATCH',
			fields: [
				{
					type: 'checkbox',
					name: 'showStandards',
					value: true
				}
			]
		},
		{
			href:
				'/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
			name: 'update-attempt-restrictions',
			method: 'PATCH',
			fields: [
				{
					type: 'checkbox',
					name: 'restrictAttempts',
					value: true
				}
			]
		},
		{
			href:
				'/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
			name: 'update-ip-restrictions',
			method: 'PATCH',
			fields: [
				{
					type: 'checkbox',
					name: 'ipRestrictions',
					value: true
				}
			]
		},
		{
			href:
				'/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
			name: 'update-time-limit',
			method: 'PATCH',
			fields: [
				{
					type: 'checkbox',
					name: 'timeLimit',
					value: true
				}
			]
		},
		{
			href:
				'/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
			name: 'update-show-attempt-score',
			method: 'PATCH',
			fields: [
				{
					type: 'checkbox',
					name: 'showAttemptScore',
					value: false
				}
			]
		},
		{
			href:
				'/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
			name: 'update-show-stats-class-average',
			method: 'PATCH',
			fields: [
				{
					type: 'checkbox',
					name: 'showStatsClassAverage',
					value: true
				}
			]
		},
		{
			href:
				'/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
			name: 'update-show-stats-score-distribution',
			method: 'PATCH',
			fields: [
				{
					type: 'checkbox',
					name: 'showStatsScoreDistribution',
					value: false
				}
			]
		},
		{
			href:
				'/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123',
			name: 'delete-submission-view',
			method: 'DELETE'
		}
	]
};

export const nonEditableSecondaryView = {
	class: [
		'submission-view',
		'secondary',
		'show-stats-class-average',
		'attempt-restrictions',
		'ip-restrictions',
		'show-standards',
		'time-limit'
	],
	entities: [
		{
			class: ['release-date'],
			rel: ['https://api.brightspace.com/rels/date'],
			properties: {
				date: '2021-01-03T04:59:59.000Z',
				localizedDate: '2021-01-04T21:00:00.000'
			}
		},
		{
			class: ['attempt-restrictions', 'grade-restrictions'],
			rel: ['related'],
			properties: {
				value: 1
			},
			entities: [
				{
					class: ['grade-restrictions'],
					rel: ['related'],
					properties: {
						'min-grade': 0.0,
						'max-grade': 100.0
					}
				}
			]
		},
		{
			class: ['subview-name'],
			rel: ['related'],
			properties: {
				name: 'Sample View'
			}
		},
		{
			class: ['time-limit'],
			rel: ['related'],
			properties: {
				value: 120
			}
		},
		{
			class: ['richtext', 'message'],
			rel: ['related'],
			properties: {
				text: 'hello',
				html: '<p>hello</p>'
			}
		},
		{
			class: ['hide-show-questions', 'hide-questions'],
			rel: ['related'],
			entities: [
				{
					class: [
						'show-questions',
						'all-questions',
						'show-correct-answers',
						'show-question-score'
					],
					rel: ['related'],
					properties: {}
				}
			]
		},
		{
			class: ['show-standards'],
			rel: ['related']
		},
		{
			class: ['ip-restrictions'],
			rel: ['related']
		}
	],
	links: [
		{
			rel: ['self'],
			href:
				'/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123'
		}
	]
};
