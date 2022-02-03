import 'd2l-fetch/d2l-fetch.js';
import { html, fixture, expect } from '@open-wc/testing';
import { AsyncStateEvent } from '@brightspace-ui/core/helpers/asyncStateEvent.js';

window.D2L.Siren.WhitelistBehavior._testMode(true);

async function load(el, href) {
	let loaded;
	const asyncStateEventType = (new AsyncStateEvent()).type;
	const loading = new Promise(function(resolve) {
		loaded = resolve;
	});

	async function wait(e) {
		const promise = e.detail.promise;
		await promise;
		el.removeEventListener(asyncStateEventType, wait);
		loaded();
	}

	el.addEventListener(asyncStateEventType, wait);
	el.href = href;

	await loading;
}

describe('Simple Entity Mixin Test', function() {

	// this.timeout(180000);

	let sandbox,
		organizationEntityUpdated;

	beforeEach(() => {
		sandbox = sinon.createSandbox();

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

		organizationEntityUpdated = {
			properties: {
				name: 'Course Name Updated',
				code: 'SCI101',
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

		sandbox.stub(window.d2lfetch, 'fetch').callsFake((input) => {
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

	it('renders a name', async() => {
		const el = await fixture(html`
				<siren-sdk-simple-organization token="whatever"></siren-sdk-simple-organization>
			`);

		await load(el, '/organization.json');

		expect(el).shadowDom.to.equal(`
				<div id="organization-name">Course Name</div>
			`);
	});

	it('updates a name', async() => {
		const el = await fixture(html`
				<siren-sdk-simple-organization token="whatever"></siren-sdk-simple-organization>
			`);

		await load(el, '/organization.json');

		expect(el).shadowDom.to.equal(`
				<div id="organization-name">Course Name</div>
			`);

		const updatedEntity = window.D2L.Hypermedia.Siren.Parse(organizationEntityUpdated);
		await window.D2L.Siren.EntityStore.update('/organization.json', el.token, updatedEntity);
		await el.updateComplete;

		expect(el).shadowDom.to.equal(`
				<div id="organization-name">Course Name Updated</div>
			`);
	});
});
