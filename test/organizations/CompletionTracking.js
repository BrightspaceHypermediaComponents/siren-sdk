import { OrganizationEntity } from '../../src/organizations/OrganizationEntity.js';

import { testData } from './data/CompletionTracking.js';

describe('OrganizationEntityCompletions', () => {
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

	describe('update actions, tracking completion, not tracking display', () => {
		let sandbox, trackingSpy, displaySpy, display;

		beforeEach(() => {
			sandbox = sinon.sandbox.create();
			display = trackingNoDisplay;
			trackingSpy = sandbox.spy(display, 'updateCompletionTracking');
			displaySpy = sandbox.spy(display, 'updateDisplayProgress');
		});

		afterEach(() => {
			sandbox.restore();
		});

		it('correct completion parameter', () => {
			display.updateCompletionTracking(false);
			expect(trackingSpy.returnValues[0]).to.be.a('promise');
		});
		it('correct progress parameter', () => {
			display.updateDisplayProgress(true);
			expect(displaySpy.returnValues[0]).to.be.a('promise');
		});
		it('incorrect parameters', () => {
			display.updateCompletionTracking(true);
			expect(trackingSpy.returnValues[0]).to.be.undefined;
		});
		it('incorrect parameters', () => {
			display.updateDisplayProgress(false);
			expect(trackingSpy.returnValues[0]).to.be.undefined;
		});
	});

	describe('update actions, tracking completion, tracking display', () => {
		let sandbox, trackingSpy, displaySpy, display;

		beforeEach(() => {
			sandbox = sinon.sandbox.create();
			display = trackingAndDisplay;
			trackingSpy = sandbox.spy(display, 'updateCompletionTracking');
			displaySpy = sandbox.spy(display, 'updateDisplayProgress');
		});

		afterEach(() => {
			sandbox.restore();
		});

		it('correct completion parameter', () => {
			display.updateCompletionTracking(false);
			expect(trackingSpy.returnValues[0]).to.be.a('promise');
		});
		it('correct progress parameter', () => {
			display.updateDisplayProgress(false);
			expect(displaySpy.returnValues[0]).to.be.a('promise');
		});
		it('incorrect parameters', () => {
			display.updateCompletionTracking(true);
			expect(trackingSpy.returnValues[0]).to.be.undefined;
		});
		it('incorrect parameters', () => {
			display.updateDisplayProgress(true);
			expect(trackingSpy.returnValues[0]).to.be.undefined;
		});
	});

	describe('update actions, not tracking completion, not tracking display', () => {
		let sandbox, trackingSpy, displaySpy, display;

		beforeEach(() => {
			sandbox = sinon.sandbox.create();
			display = noTrackingDisplay;
			trackingSpy = sandbox.spy(display, 'updateCompletionTracking');
			displaySpy = sandbox.spy(display, 'updateDisplayProgress');
		});

		afterEach(() => {
			sandbox.restore();
		});

		it('correct completion parameter', () => {
			display.updateCompletionTracking(true);
			expect(trackingSpy.returnValues[0]).to.be.a('promise');
		});
		it('correct progress parameter', () => {
			display.updateDisplayProgress(true);
			expect(displaySpy.returnValues[0]).to.be.a('promise');
		});
		it('incorrect parameters', () => {
			display.updateCompletionTracking(false);
			expect(trackingSpy.returnValues[0]).to.be.undefined;
		});
		it('incorrect parameters', () => {
			display.updateDisplayProgress(false);
			expect(trackingSpy.returnValues[0]).to.be.undefined;
		});
	});

	describe('update actions, actions missing', () => {
		let sandbox, trackingSpy, displaySpy, display;

		beforeEach(() => {
			sandbox = sinon.sandbox.create();
			display = noActions;
			trackingSpy = sandbox.spy(display, 'updateCompletionTracking');
			displaySpy = sandbox.spy(display, 'updateDisplayProgress');
		});

		afterEach(() => {
			sandbox.restore();
		});

		it('true completion parameter', () => {
			display.updateCompletionTracking(true);
			expect(trackingSpy.returnValues[0]).to.be.undefined;
		});
		it('true progress parameter', () => {
			display.updateDisplayProgress(true);
			expect(displaySpy.returnValues[0]).to.be.undefined;
		});
		it('false parameters', () => {
			display.updateCompletionTracking(false);
			expect(trackingSpy.returnValues[0]).to.be.undefined;
		});
		it('false parameters', () => {
			display.updateDisplayProgress(false);
			expect(trackingSpy.returnValues[0]).to.be.undefined;
		});
	});
});
