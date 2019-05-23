export const sequenceRoot = {
	class: [
		'sequence',
		'sequence-description'
	],
	properties: {
		title: 'LP1'
	},
	entities: [{
		class: [
			'sequence',
			'sequence-description'
		],
		properties: {
			title: 'top level module'
		},
		entities: [{
			class: [
				'sequenced-activity'
			],
			rel: [
				'item'
			],
			properties: {
				title: '20th-Century French Theatre'
			},
			entities: [{
				class: [
					'activity',
					'link-activity',
					'link-plain'
				],
				rel: [
					'about',
					'item'
				],
				properties: {
					title: '20th-Century French Theatre'
				},
				entities: [{
					class: [
						'completion',
						'incomplete'
					],
					rel: [
						'item',
						'https://api.brightspace.com/rels/completion'
					],
					links: [{
						rel: [
							'alternate'
						],
						href: '/activity/1/completion'
					}]
				}],
				actions: [{
					href: '/activity/1/view-activity',
					name: 'view-activity',
					method: 'POST'
				}, {
					href: '/activity/1/view-activity-duration',
					name: 'view-activity-duration',
					method: 'PUT'
				}, {
					href: '/activity/1/set-last-viewed-content-object',
					name: 'set-last-viewed-content-object',
					method: 'POST'
				}],
				links: [{
					rel: [
						'about'
					],
					href: '/about/activity/1'
				}, {
					class: [
						'view'
					],
					rel: [
						'alternate'
					],
					href: '/view/activity/1'
				}, {
					rel: [
						'https://api.brightspace.com/rels/organization',
						'alternate'
					],
					href: '/organization/1'
				}]
			}],
			links: [{
				rel: [
					'self',
					'describes'
				],
				href: '/activity/1'
			}, {
				rel: [
					'https://api.brightspace.com/rels/organization'
				],
				href: './learning-path/1'
			}, {
				rel: [
					'next'
				],
				href: '/activity/2'
			}, {
				rel: [
					'https://sequences.api.brightspace.com/rels/default-return-url'
				],
				type: 'text/html',
				href: '/activity/1/homepage'
			}, {
				rel: [
					'https://sequences.api.brightspace.com/rels/sequence-viewer-application'
				],
				type: 'text/html',
				href: '/activity/1/sequence-viewer-application'
			}, {
				rel: [
					'alternate'
				],
				type: 'text/html',
				href: '/organization/1/homepage'
			}, {
				rel: [
					'up'
				],
				href: '/sequence/1'
			}]
		}, {
			class: [
				'sequenced-activity'
			],
			rel: [
				'item'
			],
			properties: {
				title: 'Accounting 1200-01'
			},
			entities: [{
				class: [
					'activity',
					'link-activity',
					'link-plain'
				],
				rel: [
					'about',
					'item'
				],
				properties: {
					title: 'Accounting 1200-01'
				},
				entities: [{
					class: [
						'completion',
						'incomplete'
					],
					rel: [
						'item',
						'https://api.brightspace.com/rels/completion'
					],
					links: [{
						rel: [
							'alternate'
						],
						href: '/activity/2/completion'
					}]
				}],
				actions: [{
					href: '/activity/2/view-activity',
					name: 'view-activity',
					method: 'POST'
				}, {
					href: '/activity/2/view-activity-duration',
					name: 'view-activity-duration',
					method: 'PUT'
				}, {
					href: '/activity/2/set-last-viewed-content-object',
					name: 'set-last-viewed-content-object',
					method: 'POST'
				}],
				links: [{
					rel: [
						'about'
					],
					href: '/activity/2/about'
				}, {
					class: [
						'view'
					],
					rel: [
						'alternate'
					],
					href: '/activity/2/View'
				}, {
					rel: [
						'https://api.brightspace.com/rels/organization',
						'alternate'
					],
					href: '/organization/2'
				}]
			}],
			links: [{
				rel: [
					'self',
					'describes'
				],
				href: '/activity/2'
			}, {
				rel: [
					'https://api.brightspace.com/rels/organization'
				],
				href: '/learningpath/1'
			}, {
				rel: [
					'prev'
				],
				href: '/activity/1'
			}, {
				rel: [
					'https://sequences.api.brightspace.com/rels/default-return-url'
				],
				type: 'text/html',
				href: '/activity/2/default-return-url'
			}, {
				rel: [
					'https://sequences.api.brightspace.com/rels/sequence-viewer-application'
				],
				type: 'text/html',
				href: '/activity/2/sequence-viewer-application'
			}, {
				rel: [
					'alternate'
				],
				type: 'text/html',
				href: '/activity/2/View'
			}, {
				rel: [
					'up'
				],
				href: '/sequence/1'
			}]
		}],
		links: [{
			rel: [
				'self',
				'describes'
			],
			href: '/sequence/1'
		}, {
			rel: [
				'https://api.brightspace.com/rels/organization'
			],
			href: '/learningpath/1'
		}, {
			rel: [
				'https://sequences.api.brightspace.com/rels/default-return-url'
			],
			type: 'text/html',
			href: '/learningpath/1/homepage'
		}, {
			rel: [
				'https://sequences.api.brightspace.com/rels/sequence-viewer-application'
			],
			type: 'text/html',
			href: '/learningpath/1/sequence-viewer-application'
		}, {
			rel: [
				'alternate'
			],
			type: 'text/html',
			href: '/learningpath/1/homepage'
		}, {
			rel: [
				'up'
			],
			href: '/sequenceRoot'
		}],
		rel: [
			'item'
		]
	}],
	links: [{
		rel: [
			'self',
			'describes'
		],
		href: '/sequenceRoot'
	}]
};
