/* global fetchMock */

import { getFormData } from '../utility/test-helpers.js';
import { OrganizationEntity } from '../../src/organizations/OrganizationEntity.js';

import { testData } from './data/CompletionTracking.js';

describe('Completion tracking', () => {
	let trackingNoDisplay, trackingAndDisplay, noTrackingDisplay, noActions;

	beforeEach(() => {
		const trackingNoDisplayJson = window.D2L.Hypermedia.Siren.Parse(testData.trackingNoDisplay);
		trackingNoDisplay = new OrganizationEntity(trackingNoDisplayJson);

		const trackingAndDisplayJson = window.D2L.Hypermedia.Siren.Parse(testData.trackingAndDisplay);
		trackingAndDisplay = new OrganizationEntity(trackingAndDisplayJson);

		const noTrackingJson = window.D2L.Hypermedia.Siren.Parse(testData.noTracking);
		noTrackingDisplay = new OrganizationEntity(noTrackingJson);

		const noActionsJson = window.D2L.Hypermedia.Siren.Parse(testData.noActions);
		noActions = new OrganizationEntity(noActionsJson);
	});
	describe('properties working', () => {
		it('tracking, no display, completion', () => {
			expect(trackingNoDisplay.isProgressDisplayed()).to.be.false;
		});
		it('tracking, no display, progress', () => {
			expect(trackingNoDisplay.isProgressDisplayed()).to.be.false;
		});
		it('tracking with display, completion', () => {
			expect(trackingAndDisplay.isCompletionTracked()).to.be.true;
		});
		it('tracking with display, progress', () => {
			expect(trackingAndDisplay.isProgressDisplayed()).to.be.true;
		});
		it('no tracking, no display, completion', () => {
			expect(noTrackingDisplay.isCompletionTracked()).to.be.false;
		});
		it('no tracking, no display, progress', () => {
			expect(noTrackingDisplay.isCompletionTracked()).to.be.false;
		});
		it('actions missing, completion', () => {
			expect(noActions.isCompletionTracked()).to.be.undefined;
		});
		it('actions missing, progress', () => {
			expect(noActions.isProgressDisplayed()).to.be.undefined;
		});
	});

	describe('checking update calls', () => {

		beforeEach(() => {
			fetchMock.put('http://api.x.io/do/not/track/completion', {});
			fetchMock.put('http://api.x.io/track/completion', {});
			fetchMock.put('http://api.x.io/do/not/display/progress', {});
			fetchMock.put('http://api.x.io/display/progress', {});
		});

		afterEach(() => {
			fetchMock.reset();
		});

		describe('Entity has matching siren action', () => {

			async function validateApiCalls(actionResult, url, formFieldName, formFieldValue) {
				expect(actionResult).to.be.a('object');
				expect(fetchMock.called(url)).to.be.true;
				const calls = fetchMock.calls();
				expect(calls.length).to.be.equal(1);
				const form = await getFormData(calls[0].request);
				if (!form.notSupported) {
					// safari has limitation. cannot validate form data.
					expect(form.get(formFieldName)).to.equal(formFieldValue);
				}
			}

			it('do not track completion', async() => {
				const organization = trackingNoDisplay;
				const resp = await organization.updateCompletionTracking(false);
				await validateApiCalls(resp, 'http://api.x.io/do/not/track/completion', 'track', 'false');
			});

			it('track completion', async() => {
				const organization = noTrackingDisplay;
				const resp = await organization.updateCompletionTracking(true);
				await validateApiCalls(resp, 'http://api.x.io/track/completion', 'track', 'true');
			});

			it('do not display progress', async() => {
				const organization = trackingAndDisplay;
				const resp = await organization.updateDisplayProgress(false);
				await validateApiCalls(resp, 'http://api.x.io/do/not/display/progress', 'enable', 'false');
			});

			it('display progress', async() => {
				const organization = trackingNoDisplay;
				const resp = await organization.updateDisplayProgress(true);
				await validateApiCalls(resp, 'http://api.x.io/display/progress', 'enable', 'true');
			});
		});

		describe('Entity does not have matching siren action', () => {
			it('do not track completion', async() => {
				const organization = trackingNoDisplay;
				const resp = await organization.updateCompletionTracking(true);
				expect(resp).to.be.equal(undefined);
				expect(fetchMock.called()).to.be.false;
			});

			it('track completion', async() => {
				const organization = noTrackingDisplay;
				const resp = await organization.updateCompletionTracking(false);
				expect(resp).to.be.equal(undefined);
				expect(fetchMock.called()).to.be.false;
			});

			it('do not display progress', async() => {
				const organization = trackingAndDisplay;
				const resp = await organization.updateDisplayProgress(true);
				expect(resp).to.be.equal(undefined);
				expect(fetchMock.called()).to.be.false;
			});

			it('display progress', async() => {
				const organization = noTrackingDisplay;
				const resp = await organization.updateDisplayProgress(false);
				expect(resp).to.be.equal(undefined);
				expect(fetchMock.called()).to.be.false;
			});
		});
	});
});
