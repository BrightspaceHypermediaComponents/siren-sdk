/* global fetchMock */

//import { getFormData } from '../utility/test-helpers.js';
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
			expect(trackingNoDisplay.isProgressDisplayed).to.be.false;
		});
		it('tracking, no display, progress', () => {
			expect(trackingNoDisplay.isProgressDisplayed).to.be.false;
		});
		it('tracking with display, completion', () => {
			expect(trackingAndDisplay.isCompletionTracked).to.be.true;
		});
		it('tracking with display, progress', () => {
			expect(trackingAndDisplay.isProgressDisplayed).to.be.true;
		});
		it('no tracking, no display, completion', () => {
			expect(noTrackingDisplay.isCompletionTracked).to.be.false;
		});
		it('no tracking, no display, progress', () => {
			expect(noTrackingDisplay.isCompletionTracked).to.be.false;
		});
		it('actions missing, completion', () => {
			expect(noActions.isCompletionTracked).to.be.undefined;
		});
		it('actions missing, progress', () => {
			expect(noActions.isProgressDisplayed).to.be.undefined;
		});
	});

	function checkFetchCalls(doNotTrack, track, doNotDisplay, displayed) {
		expect(fetchMock.called('http://api.x.io/do/not/track/completion')).to.equal(doNotTrack);
		expect(fetchMock.called('http://api.x.io/track/completion')).to.equal(track);
		expect(fetchMock.called('http://api.x.io/do/not/display/progress')).to.equal(doNotDisplay);
		expect(fetchMock.called('http://api.x.io/display/progress')).to.equal(displayed);
	}

	function setupMock() {
		fetchMock.put('http://api.x.io/do/not/track/completion', {});
		fetchMock.put('http://api.x.io/track/completion', {});
		fetchMock.put('http://api.x.io/do/not/display/progress', {});
		fetchMock.put('http://api.x.io/display/progress', {});
	}

	describe('checking update calls', () => {

		afterEach(() => {
			fetchMock.reset();
		});

		describe('correct parameters', () => {
			it('do not track completion', async() => {
				const organization = trackingNoDisplay;
				setupMock();

				const resp = await organization.updateCompletionTracking(false);
				expect(resp).to.be.a('object');
				checkFetchCalls(true, false, false, false);
				const calls = fetchMock.calls();
				expect(calls.length).to.be.equal(1);
				const form = await getFormData(calls[0].request);
				expect(form.get('track')).to.equal('false')
			});

			it('track completion', async() => {
				const organization = noTrackingDisplay;
				setupMock();

				const resp = await organization.updateCompletionTracking(true);

				checkFetchCalls(false, true, false, false);
				expect(resp).to.be.a('object');
			});

			it('do not display progress', async() => {
				const organization = trackingAndDisplay;
				setupMock();

				const resp = await organization.updateDisplayProgress(false);

				checkFetchCalls(false, false, true, false);
				expect(resp).to.be.a('object');
			});

			it('display progress', async() => {
				const organization = noTrackingDisplay;
				setupMock();

				const resp = await organization.updateDisplayProgress(true);

				checkFetchCalls(false, false, false, true);
				expect(resp).to.be.a('object');
			});
		});

		describe('incorrect parameters', () => {
			it('do not track completion', async() => {
				const organization = trackingNoDisplay;
				setupMock();

				const resp = await organization.updateCompletionTracking(true);
				expect(resp).to.be.equal(undefined);
				expect(fetchMock.called()).to.be.false;
			});

			it('track completion', async() => {
				const organization = noTrackingDisplay;
				setupMock();

				const resp = await organization.updateCompletionTracking(false);
				expect(resp).to.be.equal(undefined);
				expect(fetchMock.called()).to.be.false;
			});

			it('do not display progress', async() => {
				const organization = trackingAndDisplay;
				setupMock();

				const resp = await organization.updateDisplayProgress(true);
				expect(resp).to.be.equal(undefined);
				expect(fetchMock.called()).to.be.false;
			});

			it('display progress', async() => {
				const organization = noTrackingDisplay;
				setupMock();

				const resp = await organization.updateDisplayProgress(false);
				expect(resp).to.be.equal(undefined);
				expect(fetchMock.called()).to.be.false;
			});
		});
	});
});
