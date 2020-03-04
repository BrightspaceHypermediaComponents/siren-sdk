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
					'item',
					'https://grades.api.brightspace.com/rels/grade'
				],
				'actions': [
					{
						'href': 'https://9caa9c10-0175-4c56-84e5-fc2bca4d8a52.activities.api.proddev.d2l/activities/6606_2000_11/usages/6609/associate-grade',
						'name': 'associate-grade',
						'method': 'POST',
						'fields': [
							{
								'type': 'hidden',
								'name': 'gradeItemId',
								'value': 20
							}
						]
					}
				],
				'links': [
					{
						'rel': [
							'https://grades.api.brightspace.com/rels/grade'
						],
						'href': 'https://9caa9c10-0175-4c56-84e5-fc2bca4d8a52.grades.api.proddev.d2l/organizations/6609/grades/20'
					}
				]
			},
			{
				'class': [
					'grade-category'
				],
				'rel': [
					'item',
					'https://grades.api.brightspace.com/rels/grade-category'
				],
				'entities': [
					{
						'class': [
							'current-association',
							'grade-candidate'
						],
						'rel': [
							'item',
							'https://grades.api.brightspace.com/rels/grade'
						],
						'actions': [
							{
								'href': 'https://9caa9c10-0175-4c56-84e5-fc2bca4d8a52.activities.api.proddev.d2l/activities/6606_2000_11/usages/6609/associate-grade',
								'name': 'associate-grade',
								'method': 'POST',
								'fields': [
									{
										'type': 'hidden',
										'name': 'gradeItemId',
										'value': 5024
									}
								]
							}
						],
						'links': [
							{
								'rel': [
									'https://grades.api.brightspace.com/rels/grade'
								],
								'href': 'https://9caa9c10-0175-4c56-84e5-fc2bca4d8a52.grades.api.proddev.d2l/organizations/6609/grades/5024'
							}
						]
					}
				],
				'links': [
					{
						'rel': [
							'https://grades.api.brightspace.com/rels/grade-category'
						],
						'href': 'https://9caa9c10-0175-4c56-84e5-fc2bca4d8a52.grades.api.proddev.d2l/organizations/6609/grade-categories/5010'
					}
				]
			},
			{
				'class': [
					'grade-candidate'
				],
				'rel': [
					'item',
					'https://grades.api.brightspace.com/rels/grade'
				],
				'actions': [
					{
						'href': 'https://9caa9c10-0175-4c56-84e5-fc2bca4d8a52.activities.api.proddev.d2l/activities/6606_2000_11/usages/6609/associate-grade',
						'name': 'associate-grade',
						'method': 'POST',
						'fields': [
							{
								'type': 'hidden',
								'name': 'gradeItemId',
								'value': 6024
							}
						]
					}
				],
				'links': [
					{
						'rel': [
							'https://grades.api.brightspace.com/rels/grade'
						],
						'href': 'https://9caa9c10-0175-4c56-84e5-fc2bca4d8a52.grades.api.proddev.d2l/organizations/6609/grades/6024'
					}
				]
			}
		],
		'links': [
			{
				'rel': [
					'self'
				],
				'href': 'https://9caa9c10-0175-4c56-84e5-fc2bca4d8a52.activities.api.proddev.d2l/activities/6606_2000_11/usages/6609/grade-candidates?gradeTypes=5&includeGradesWithDirectRubrics=0'
			}
		]
	}
};
