export const testData = {
	activityUsageEntityEditable: {
		'class': [
			'assignment-activity',
			'draft-published-entity',
			'draft',
			'ai-content-enabled'
		],
		'entities': [
			{
				'class': [
					'score-out-of'
				],
				'rel': [
					'https://activities.api.brightspace.com/rels/score-out-of'
				],
				'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/activities/activities/6606_2000_31/usages/6609/scoring'
			},
			{
				'rel': [
					'https://activities.api.brightspace.com/rels/release-conditions-dialog-opener'
				],
				'properties': {
					'url': '/d2l/le/conditionalRelease/6609/dialog/dropboxes/31/openDialog'
				}
			},
			{
				'class': [
					'dates'
				],
				'rel': [
					'https://api.brightspace.com/rels/date'
				],
				'actions': [
					{
						'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/activities/activities/6606_2000_31/usages/6609',
						'name': 'update',
						'method': 'PATCH',
						'fields': [
							{
								'type': 'text',
								'name': 'startDate',
								'value': ''
							},
							{
								'type': 'text',
								'name': 'dueDate',
								'value': '2019-12-26T04:59:00.000Z'
							},
							{
								'type': 'text',
								'name': 'endDate',
								'value': ''
							}
						]
					}
				]
			},
			{
				'class': [
					'due-date',
					'date'
				],
				'rel': [
					'https://api.brightspace.com/rels/date'
				],
				'properties': {
					'date': '2019-12-26T04:59:00.000Z',
					'localizedDate': '2019-12-25T23:59:00.000'
				},
				'actions': [
					{
						'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/activities/activities/6606_2000_31/usages/6609',
						'name': 'update',
						'method': 'PATCH',
						'fields': [
							{
								'type': 'text',
								'name': 'dueDate',
								'value': '2019-12-26T04:59:00.000Z'
							}
						]
					}
				]
			}
		],
		'links': [
			{
				'rel': [
					'https://activities.api.brightspace.com/rels/activity',
					'self'
				],
				'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/activities/activities/5'
			},
			{
				'rel': [
					'https://activities.api.brightspace.com/rels/activity-usage',
					'self'
				],
				'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/activities/activities/6606_2000_31/usages/6609'
			},
			{
				'rel': [
					'https://activities.api.brightspace.com/rels/activity-usage',
					'create-form'
				],
				'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/activities/activities/6606_2000_31/usages/6609?mode=creating'
			},
			{
				'rel': [
					'https://activities.api.brightspace.com/rels/user-activity-usage',
					'https://activities.api.brightspace.com/rels/my-activity-usage'
				],
				'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/activities/activities/6606_2000_31/usages/6609/users/169'
			},
			{
				'rel': [
					'https://activities.api.brightspace.com/rels/evaluation'
				],
				'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/activities/activities/6606_2000_31/usages/6609/evaluation'
			},
			{
				'rel': [
					'https://activities.api.brightspace.com/rels/evaluation-status'
				],
				'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/activities/activities/6606_2000_31/usages/6609/evaluation-status'
			},
			{
				'rel': [
					'https://api.brightspace.com/rels/dismiss'
				],
				'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/activities/activities/6606_2000_31/usages/6609/dismiss-info'
			},
			{
				'rel': [
					'https://api.brightspace.com/rels/organization'
				],
				'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/organizations/6609'
			},
			{
				'rel': [
					'https://api.brightspace.com/rels/assignment',
					'https://api.brightspace.com/rels/specialization'
				],
				'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/assignments/6609/folders/31'
			},
			{
				'rel': [
					'https://grades.api.brightspace.com/rels/grade'
				],
				'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/grades/organizations/6609/grades/6064'
			},
			{
				'rel': [
					'https://conditions.api.brightspace.com/rels/conditions'
				],
				'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/conditions/activity-usage/TmpZd05sOHlNREF3WHpNeC42NjA5'
			},
			{
				'rel': [
					'https://activities.api.brightspace.com/rels/grade-candidates'
				],
				'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/activities/activities/6606_2000_31/usages/6609/grade-candidates'
			},
			{
				'rel': [
					'https://alignments.api.brightspace.com/rels/alignments'
				],
				'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/alignments/activity-usage/6609?ActivityBatchId=6606_2000_31'
			},
			{
				'rel': [
					'https://alignments.api.brightspace.com/rels/legacy-competencies'
				],
				'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/alignments/activity-usage/6606/legacy-competencies?ActivityBatchId=6606_2000_7'
			},
			{
				'rel': [
					'https://activities.api.brightspace.com/rels/associations'
				],
				'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/activities/activities/6606_2000_31/usages/6609/associations'
			},
			{
				'rel': [
					'https://activities.api.brightspace.com/rels/direct-associations'
				],
				'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/activities/activities/6606_2000_31/usages/6609/associations?direct=1'
			},
			{
				'rel': [
					'https://activities.api.brightspace.com/rels/indirect-associations'
				],
				'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/activities/activities/6606_2000_31/usages/6609/associations?indirect=1'
			},
			{
				'rel': [
					'https://activities.api.brightspace.com/rels/special-access'
				],
				'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/activities/activities/6606_2000_31/usages/6609/special-access'
			},
			{
				'rel': [
					'https://outcomes.api.brightspace.com/rels/ou-outcome-set-collection'
				],
				'href': 'https://12a61d15-f4c4-4360-960e-c4fdd5bf27a6.outcomes.api.dev.brightspace.com/outcome-sets/ou/6609'
			}
		],
		'actions': [
			{
				'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/assignments/6609/folders/31/setDraft/0',
				'name': 'set-published',
				'method': 'POST'
			},
			{
				'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/assignments/6609/folders/31/draft',
				'name': 'update-draft',
				'method': 'PUT',
				'fields': [
					{
						'type': 'checkbox',
						'name': 'draft',
						'value': true
					}
				]
			},
			{
				'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/activities/activities/6606_2000_31/usages/6609/start-add-new',
				'name': 'start-add-new',
				'method': 'POST'
			}
		]
	},
	activityUsageEntityReadOnly: {
		'class': [
			'assignment-activity',
			'draft-published-entity',
			'draft'
		],
		'entities': [
			{
				'class': [
					'score-out-of'
				],
				'rel': [
					'https://activities.api.brightspace.com/rels/score-out-of'
				],
				'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/activities/activities/6606_2000_31/usages/6609/scoring'
			},
			{
				'class': [
					'due-date',
					'date'
				],
				'rel': [
					'https://api.brightspace.com/rels/date'
				],
				'properties': {
					'date': '2019-12-26T04:59:00.000Z',
					'localizedDate': '2019-12-25T23:59:00.000'
				}
			}
		],
		'links': [
			{
				'rel': [
					'https://activities.api.brightspace.com/rels/activity',
					'self'
				],
				'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/activities/activities/5'
			},
			{
				'rel': [
					'https://activities.api.brightspace.com/rels/activity-usage',
					'self'
				],
				'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/activities/activities/6606_2000_31/usages/6609'
			},
			{
				'rel': [
					'https://activities.api.brightspace.com/rels/user-activity-usage',
					'https://activities.api.brightspace.com/rels/my-activity-usage'
				],
				'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/activities/activities/6606_2000_31/usages/6609/users/169'
			},
			{
				'rel': [
					'https://activities.api.brightspace.com/rels/evaluation-status'
				],
				'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/activities/activities/6606_2000_31/usages/6609/evaluation-status'
			},
			{
				'rel': [
					'https://api.brightspace.com/rels/dismiss'
				],
				'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/activities/activities/6606_2000_31/usages/6609/dismiss-info'
			},
			{
				'rel': [
					'https://api.brightspace.com/rels/organization'
				],
				'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/organizations/6609'
			},
			{
				'rel': [
					'https://api.brightspace.com/rels/assignment',
					'https://api.brightspace.com/rels/specialization'
				],
				'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/assignments/6609/folders/31'
			},
			{
				'rel': [
					'https://grades.api.brightspace.com/rels/grade'
				],
				'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/grades/organizations/6609/grades/6064'
			},
			{
				'rel': [
					'https://conditions.api.brightspace.com/rels/conditions'
				],
				'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/conditions/activity-usage/TmpZd05sOHlNREF3WHpNeC42NjA5'
			}
		]
	}
};
