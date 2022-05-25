import { entityFactory } from '../../src/es6/EntityFactory.js';
import { expect } from '@open-wc/testing';
import { Rels } from '../../src/hypermedia-constants.js';
import { root } from '../../src/root/root.js';
import sinon from 'sinon';

window.D2L.Siren.WhitelistBehavior._testMode(true);
describe('root', () => {
	let sandbox;

	beforeEach(() => {
		sandbox = sinon.createSandbox();
		const rootResponse = {
			'properties': { },
			'classes': [],
			'entities': [],
			'links': [
				{
					'rel': ['https://api.brightspace.com/rels/enrollments'],
					'href': '/enrollments.json'
				},
				{
					'rel': ['self'],
					'href': '/root.json'
				}, {
					'rel': [Rels.organization],
					'href': '/organization.json'
				}
			]
		};
		const organizationResponse = {
			'class': ['active', 'organization'],
			'properties': { 'name': 'siren sdk org', 'code': null, 'startDate': null, 'endDate': null, 'isActive': true, 'description': null },
			'entities': [
				{
					'class': ['color'], 'rel': ['https://api.brightspace.com/rels/color'],
					'properties': { 'hexString': '#E57231', 'description': '' }
				},
				{
					'class': ['course-image'],
					'rel': ['https://api.brightspace.com/rels/organization-image'],
					'href': '/6606/image?version=%2fimages%2f1f487d9b-c8ba-4e60-8d78-c0489e365d73'
				},
				{
					'class': ['relative-uri'],
					'rel': ['item', 'https://api.brightspace.com/rels/organization-homepage'],
					'properties': { 'path': '/homepage.json' }
				}],
			'links': [	{
				'rel': ['self'],
				'href': '/organization.json'
			},
			{
				'rel': ['https://api.brightspace.com/rels/organization-homepage'],
				'href': 'https://fully-qualified.brightspace.com/homepage.json'
			}
			]
		};
		sandbox.stub(window.d2lfetch, 'fetch').callsFake((input) => {
			const whatToFetch = {
				'/root.json': rootResponse,
				'/organization.json': organizationResponse
			};
			return Promise.resolve({
				ok: true,
				json: () => { return Promise.resolve(whatToFetch[input]); }
			});
		});
	});

	afterEach(() => {
		sandbox.restore();
	});
	it('serializes', async() => {
		const entities = {};
		await new Promise(resolve => {

			entityFactory(root, '/root.json', 'token', (entity) => {
				entities['root'] = entity;
				entity.organization((orgEntity) => {
					entities['organization'] = orgEntity;
					resolve();
				});
			});
		});
		expect(entities).to.have.property('root');
		expect(entities).to.have.property('organization');
		expect(entities.organization.fullyQualifiedOrganizationHomepageUrl()).to.be.equal('https://fully-qualified.brightspace.com/homepage.json');
	});
});
