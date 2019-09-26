import 'd2l-fetch/d2l-fetch.js';
import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import '../utility/siren-sdk-pending-container.js';

window.D2L.Siren.WhitelistBehavior._testMode(true);

describe('PendingContainer', function() {

	// this.timeout(180000);

	let sandbox;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();

		var organizationEntity = {
			properties: {
				name: 'Course Name',
				code: 'SCI100',
			},
			links: [{
				rel: ['https://api.brightspace.com/rels/parent-semester'],
				href: '/semester.json'
			},
			{
				rel: ['self'],
				href: '/organization.json'
			}]
		};

		sandbox.stub(window.d2lfetch, 'fetch', (input) => {
			const whatToFetch = {
				'/organization.json': organizationEntity
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

	it('waits for children', async() => {
		const el = await fixture(html`
				<siren-sdk-pending-container href='/organization.json' token="whatever"></siren-sdk-pending-container>
			`);

		expect(el).shadowDom.to.equal(`
				<div>Loading...</div>
				<siren-sdk-simple-organization hidden="" href="/organization.json" token="whatever"></siren-sdk-simple-organization>
			`);

		await oneEvent(el, 'pending-resolved');

		expect(el).shadowDom.to.equal(`
				<div hidden="">Loading...</div>
				<siren-sdk-simple-organization href="/organization.json" token="whatever"></siren-sdk-simple-organization>
			`);
	});

});
