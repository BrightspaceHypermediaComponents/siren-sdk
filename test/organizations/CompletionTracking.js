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

	// describe('update actions, tracking completion, no display', () => {
	// 	let sandbox, trackingSpy, displaySpy, organization;

	// 	beforeEach(() => {
	// 		sandbox = sinon.sandbox.create();
	// 		organization = trackingNoDisplay;
	// 		trackingSpy = sandbox.spy(organization, 'updateCompletionTracking');
	// 		displaySpy = sandbox.spy(organization, 'updateDisplayProgress');
	// 	});

	// 	afterEach(() => {
	// 		sandbox.restore();
	// 	});

	// 	it('correct completion parameter', () => {
	// 		organization.updateCompletionTracking(false);
	// 		expect(trackingSpy.returnValues[0]).to.be.a('promise');
	// 	});
	// 	it('correct progress parameter', () => {
	// 		organization.updateDisplayProgress(true);
	// 		expect(displaySpy.returnValues[0]).to.be.a('promise');
	// 	});
	// 	it('incorrect completion parameter', () => {
	// 		organization.updateCompletionTracking(true);
	// 		expect(trackingSpy.returnValues[0]).to.be.a('promise');
	// 	});
	// 	it('incorrect progress parameters', () => {
	// 		organization.updateDisplayProgress(false);
	// 		expect(displaySpy.returnValues[0]).to.be.a('promise');
	// 	});
	// });

	// describe('update actions, tracking completion, tracking display', () => {
	// 	let sandbox, trackingSpy, displaySpy, organization;

	// 	beforeEach(() => {
	// 		sandbox = sinon.sandbox.create();
	// 		organization = trackingAndDisplay;
	// 		trackingSpy = sandbox.spy(organization, 'updateCompletionTracking');
	// 		displaySpy = sandbox.spy(organization, 'updateDisplayProgress');
	// 	});

	// 	afterEach(() => {
	// 		sandbox.restore();
	// 	});

	// 	it('correct completion parameter', () => {
	// 		organization.updateCompletionTracking(false);
	// 		expect(trackingSpy.returnValues[0]).to.be.a('promise');
	// 	});
	// 	it('correct progress parameter', () => {
	// 		organization.updateDisplayProgress(false);
	// 		expect(displaySpy.returnValues[0]).to.be.a('promise');
	// 	});
	// 	it('incorrect completion parameter', () => {
	// 		organization.updateCompletionTracking(true);
	// 		expect(trackingSpy.returnValues[0]).to.be.a('promise');
	// 	});
	// 	it('incorrect progress parameter', () => {
	// 		organization.updateDisplayProgress(true);
	// 		expect(displaySpy.returnValues[0]).to.be.a('promise');
	// 	});
	// });

	// describe('update actions, not tracking completion, no display', () => {
	// 	let sandbox, trackingSpy, displaySpy, organization;

	// 	beforeEach(() => {
	// 		sandbox = sinon.sandbox.create();
	// 		organization = noTrackingDisplay;
	// 		trackingSpy = sandbox.spy(organization, 'updateCompletionTracking');
	// 		displaySpy = sandbox.spy(organization, 'updateDisplayProgress');
	// 	});

	// 	afterEach(() => {
	// 		sandbox.restore();
	// 	});

	// 	it('correct completion parameter', () => {
	// 		organization.updateCompletionTracking(true);
	// 		expect(trackingSpy.returnValues[0]).to.be.a('promise');
	// 	});
	// 	it('correct progress parameter', async() => {
	// 		await organization.updateDisplayProgress(true);
	// 		//const resp = displaySpy.returnValues[0];
	// 		//expect(resp).to.equal(undefined);
	// 	});
	// 	it('incorrect completion parameter', () => {
	// 		organization.updateCompletionTracking(false);
	// 		expect(trackingSpy.returnValues[0]).to.be.a('promise');
	// 	});
	// 	it('incorrect progress parameter', async() => {
	// 		await organization.updateDisplayProgress(false);
	// 		const resp = displaySpy.returnValues[0];
	// 		expect(resp[0]).to.equal(undefined);
	// 	});
	// });

	// describe('update actions, actions missing', () => {
	// 	let sandbox, trackingSpy, displaySpy, organization;

	// 	beforeEach(() => {
	// 		sandbox = sinon.sandbox.create();
	// 		organization = noActions;
	// 		trackingSpy = sandbox.spy(organization, 'updateCompletionTracking');
	// 		displaySpy = sandbox.spy(organization, 'updateDisplayProgress');
	// 	});

	// 	afterEach(() => {
	// 		sandbox.restore();
	// 	});

	// 	it('true completion parameter', async() => {
	// 		await organization.updateCompletionTracking(true);
	// 		const resp = trackingSpy.returnValues[0];
	// 		expect(resp[0]).to.equal(undefined);
	// 	});
	// 	it('true progress parameter', async() => {
	// 		await organization.updateDisplayProgress(true);
	// 		const resp = displaySpy.returnValues[0];
	// 		expect(resp[0]).to.equal(undefined);
	// 	});
	// 	it('false parameters', () => {
	// 		organization.updateCompletionTracking(false);
	// 		const resp = trackingSpy.returnValues[0];
	// 		expect(resp[0]).to.equal(undefined);
	// 	});
	// 	it('false parameters', () => {
	// 		organization.updateDisplayProgress(false);
	// 		const resp = displaySpy.returnValues[0];
	// 		expect(resp[0]).to.equal(undefined);
	// 	});
	// });

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
				checkFetchCalls(true, false, false, false);
				expect(resp).to.be.a('object');
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
