export const testData = {
	gradeEntity: {
		weighted: {
			'class': [
				'grade'
			],
			'properties': {
				'name': 'Numeric type inside category',
				'baseWeight': 10,
				'maxPoints': 100
			},
			'entities': [
				{
					'class': [
						'weight',
						'weighted'
					],
					'rel': [
						'https://grades.api.brightspace.com/rels/weight'
					],
					'properties': {
						'weight': 5
					}
				}
			],
			'links': [
				{
					'rel': [
						'self'
					],
					'href': 'https://9caa9c10-0175-4c56-84e5-fc2bca4d8a52.grades.api.proddev.d2l/organizations/6609/grades/5024'
				},
				{
					'rel': [
						'https://api.brightspace.com/rels/organization'
					],
					'href': 'https://9caa9c10-0175-4c56-84e5-fc2bca4d8a52.organizations.api.proddev.d2l/6609'
				}
			],
			'rel': [
				'item',
				'https://grades.api.brightspace.com/rels/grade'
			]
		},
		points: {
			'class': [
				'grade'
			],
			'properties': {
				'name': 'Numeric type',
				'maxPoints': 15
			},
			'links': [
				{
					'rel': [
						'self'
					],
					'href': 'https://9caa9c10-0175-4c56-84e5-fc2bca4d8a52.grades.api.proddev.d2l/organizations/6614/grades/5026'
				},
				{
					'rel': [
						'https://api.brightspace.com/rels/organization'
					],
					'href': 'https://9caa9c10-0175-4c56-84e5-fc2bca4d8a52.organizations.api.proddev.d2l/6614'
				}
			],
			'rel': [
				'item',
				'https://grades.api.brightspace.com/rels/grade'
			]
		},
		category: {
			'class': [
				'grade-category'
			],
			'properties': {
				'name': 'Category 1'
			},
			'links': [
				{
					'rel': [
						'self'
					],
					'href': 'https://9caa9c10-0175-4c56-84e5-fc2bca4d8a52.grades.api.proddev.d2l/organizations/6609/grade-categories/5008'
				},
				{
					'rel': [
						'https://api.brightspace.com/rels/organization'
					],
					'href': 'https://9caa9c10-0175-4c56-84e5-fc2bca4d8a52.organizations.api.proddev.d2l/6609'
				}
			]
		}
	}
};
