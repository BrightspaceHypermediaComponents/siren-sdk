import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import 'd2l-fetch/d2l-fetch.js';
window.D2L.Siren.WhitelistBehavior._testMode(true);
describe('d2l-organization-name', () => {
	var sandbox,
		component,
		component2;

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
		var organizationEntity2 = {
			properties: {
				name: 'Course Name 2',
				code: 'SCI101',
			},
			links: [{
				rel: ['https://api.brightspace.com/rels/parent-semester'],
				href: '/semester2.json'
			},
			{
				rel: ['self'],
				href: '/organization2.json'
			}]
		};
		var semesterEntity = {
			properties: {
				name: 'Semester Name'
			},
			links: [{
				rel: ['self'],
				href: '/semester.json'
			}]
		};
		var semesterEntity2 = {
			properties: {
				name: 'Semester Name 2'
			},
			links: [{
				rel: ['self'],
				href: '/semester2.json'
			}]
		};
		sandbox.stub(window.d2lfetch, 'fetch').callsFake((input) => {
			const whatToFetch = {
				'/organization.json': organizationEntity,
				'/organization2.json': organizationEntity2,
				'/semester.json': semesterEntity,
				'/semester2.json': semesterEntity2
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
	[ 'lit', 'polymer' ].forEach(mixinType => {
		describe(`Testing Swap ${mixinType}`, () => {
			let spy, spy2;
			beforeEach(done => {
				component = fixture(`no-params-${mixinType}`);
				component2 = fixture(`no-params-2-${mixinType}`);
				spy = sandbox.spy(component, '_onOrganizationChange');
				spy2 = sandbox.spy(component2, '_onOrganizationChange');

				component.token = 'whatever';
				component2.token = 'whatever';
				component.href = '/organization.json';
				component2.href = '/organization2.json';
				afterNextRender(component, done);
			});

			it('Everything works with no swap', done => {
				expect(spy).to.have.been.calledOnce;

				afterNextRender(component, () => {
					const name = component.shadowRoot.getElementById('organization-name');
					const code = component.shadowRoot.getElementById('organization-code');
					const semesterNameDirect = component.shadowRoot.getElementById('semester-name-direct');
					const semesterName = component.shadowRoot.getElementById('semester-name').shadowRoot;

					expect(name.innerHTML.replace(/<!---->/g, '')).to.be.equal('Course Name');
					expect(code.innerHTML.replace(/<!---->/g, '')).to.be.equal('SCI100');
					expect(semesterNameDirect.innerHTML.replace(/<!---->/g, '')).to.be.equal('Semester Name');
					expect(semesterName.innerHTML.replace(/<!---->/g, '')).to.be.contains('Semester Name');
					expect(component._semesterNameDirectLoaded).to.be.equal('Semester Name');
					done();
				});

			});

			it('Swap to elements', done => {
				expect(spy).to.have.been.calledOnce;
				expect(spy2).to.have.been.calledOnce;
				component.href = '/organization2.json';
				component2.href = '/organization.json';

				afterNextRender(component, () => {
					expect(spy).to.have.been.calledTwice;
					expect(spy2).to.have.been.calledTwice;
					const name = component.shadowRoot.getElementById('organization-name');
					const code = component.shadowRoot.getElementById('organization-code');
					const semesterNameDirect = component.shadowRoot.getElementById('semester-name-direct');
					const semesterName = component.shadowRoot.getElementById('semester-name').shadowRoot;

					expect(name.innerHTML.replace(/<!---->/g, '')).to.be.equal('Course Name 2');
					expect(code.innerHTML.replace(/<!---->/g, '')).to.be.equal('SCI101');
					expect(semesterNameDirect.innerHTML.replace(/<!---->/g, '')).to.be.equal('Semester Name 2');
					expect(semesterName.innerHTML.replace(/<!---->/g, '')).to.be.contains('Semester Name 2');
					done();
				});
			});
		});
		describe(`Testing No Token ${mixinType}`, () => {
			let spy, spy2;
			beforeEach(done => {
				component = fixture(`no-params-${mixinType}`);
				component2 = fixture(`no-params-2-${mixinType}`);
				spy = sandbox.spy(component, '_onOrganizationChange');
				spy2 = sandbox.spy(component2, '_onOrganizationChange');

				component.token = 'whatever';
				component.href = '/organization.json';
				component2.href = '/organization2.json';
				afterNextRender(component, done);
			});

			it('Not called if token is undefined', () => {
				expect(spy).to.have.been.calledOnce;
				expect(spy2).to.have.not.been.called;
			});
		});
	});
});
