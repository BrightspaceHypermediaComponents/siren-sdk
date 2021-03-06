export const testData = {
	gradeCandidateEntity: {
		grade: {
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
		gradeWithoutAssociateAction: {
			'class': [
				'grade-candidate'
			],
			'rel': [
				'item',
				'https://grades.api.brightspace.com/rels/grade'
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
		categoryWithGrade: {
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
		gradeUsedInActivityUsage: {
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
					'href': 'http://vlx1-mdulat.desire2learn.d2l:44444/d2l/api/hm/grades/organizations/6609/grades/6064'
				}
			]
		},
		newGradeCandidateWithCategory: {
			'class': [
				'new-grade-candidate'
			],
			'rel': [
				'item'
			],
			'actions': [
				{
					'href': 'https://9caa9c10-0175-4c56-84e5-fc2bca4d8a52.activities.api.proddev.d2l/activities/6606_2000_4/usages/6609',
					'name': 'save',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'text',
							'name': 'gradeName',
							'value': ''
						},
						{
							'type': 'number',
							'name': 'scoreOutOf',
							'value': ''
						},
						{
							'type': 'hidden',
							'name': 'replaceGradeItem',
							'value': true
						},
						{
							'type': 'hidden',
							'name': 'categoryId',
							'value': '5002'
						}
					]
				}
			],
			'links': [
				{
					'rel': [
						'https://grades.api.brightspace.com/rels/grade-category'
					],
					'href': 'https://9caa9c10-0175-4c56-84e5-fc2bca4d8a52.grades.api.proddev.d2l/organizations/6609/grade-categories/5002'
				}
			]
		},
		newGradeCandidateWithoutCategory: {
			'class': [
				'new-grade-candidate'
			],
			'rel': [
				'item'
			],
			'actions': [
				{
					'href': 'https://9caa9c10-0175-4c56-84e5-fc2bca4d8a52.activities.api.proddev.d2l/activities/6606_2000_4/usages/6609',
					'name': 'save',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'text',
							'name': 'gradeName',
							'value': ''
						},
						{
							'type': 'number',
							'name': 'scoreOutOf',
							'value': ''
						},
						{
							'type': 'hidden',
							'name': 'replaceGradeItem',
							'value': true
						},
						{
							'type': 'hidden',
							'name': 'categoryId',
							'value': ''
						}
					]
				}
			]
		}
	}
};
