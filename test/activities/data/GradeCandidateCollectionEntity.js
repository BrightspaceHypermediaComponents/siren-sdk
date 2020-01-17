export const testData = {
	gradeCandidateCollectionEntity: {
		'class': [
			'collection',
			'grade-candidates'
		],
		'entities': [
			{
				'class': [
					'grade-candidate'
				],
				'rel': [
					'item'
				],
				'properties': {
					'name': 'Assignment 1 Grade',
					'maxPoints': '30'
				},
				'actions': [
					{
						'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/activities/activities/6606_2000_1/usages/6609/associate-grade',
						'name': 'associate-grade',
						'method': 'POST',
						'fields': [
							{
								'type': 'hidden',
								'name': 'gradeItemId',
								'value': '5006'
							}
						]
					}
				],
				'links': [
					{
						'rel': [
							'https://grades.api.brightspace.com/rels/grade'
						],
						'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/grades/organizations/6609/grades/5006'
					}

				]
			},
			{
				'class': [
					'grade-candidate'
				],
				'rel': [
					'item'
				],
				'properties': {
					'name': 'Assignment 2 Grade',
					'maxPoints': '30'
				},
				'actions': [
					{
						'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/activities/activities/6606_2000_1/usages/6609/associate-grade',
						'name': 'associate-grade',
						'method': 'POST',
						'fields': [
							{
								'type': 'hidden',
								'name': 'gradeItemId',
								'value': '5007'
							}
						]
					}
				],
				'links': [
					{
						'rel': [
							'https://grades.api.brightspace.com/rels/grade'
						],
						'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/grades/organizations/6609/grades/5007'
					}
				]
			}
		],
		'links': [
			{
				'rel': [
					'self'
				],
				'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/activities/activities/6606_2000_1/usages/6609/grade-candidates'
			}
		]
	}
};
