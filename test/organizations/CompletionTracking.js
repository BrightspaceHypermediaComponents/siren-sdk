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
		it('tracking, no display', () => {
			expect(trackingNoDisplay.isCompletionTracked).to.be.true;
			expect(trackingNoDisplay.isProgressDisplayed).to.be.false;
		});
		it('tracking with display', () => {
			expect(trackingAndDisplay.isCompletionTracked).to.be.true;
			expect(trackingAndDisplay.isProgressDisplayed).to.be.true;
		});
		it('no tracking, no display', () => {
			expect(noTrackingDisplay.isCompletionTracked).to.be.false;
			expect(noTrackingDisplay.isProgressDisplayed).to.be.false;
		});
		it('actions missing', () => {
			expect(noActions.isCompletionTracked).to.be.undefined;
			expect(noActions.isProgressDisplayed).to.be.undefined;
		});
	});

	describe('organization get completion action', () => {
		it('tracking, no display', () => {
			expect(trackingNoDisplay._getCompletionAction(true)).to.be.undefined;
			expect(trackingNoDisplay._getCompletionAction(false).name).to.equal('do-not-track-completion');
		});
		it('tracking with display', () => {
			expect(trackingAndDisplay._getCompletionAction(true)).to.be.undefined;
			expect(trackingAndDisplay._getCompletionAction(false).name).to.equal('do-not-track-completion');
		});
		it('no tracking, no display', () => {
			expect(noTrackingDisplay._getCompletionAction(true).name).to.equal('track-completion');
			expect(noTrackingDisplay._getCompletionAction(false)).to.be.undefined;
		});
		it('no actions', () => {
			expect(noActions._getCompletionAction(true)).to.be.undefined;
			expect(noActions._getCompletionAction(false)).to.be.undefined;
		});
	});

	describe('organization get display action', () => {
		it('tracking, no display', () => {
			expect(trackingNoDisplay._getDisplayAction(true).name).to.equal('display-progress');
			expect(trackingNoDisplay._getDisplayAction(false)).to.be.undefined;
		});
		it('tracking with display', () => {
			expect(trackingAndDisplay._getDisplayAction(true)).to.be.undefined;
			expect(trackingAndDisplay._getDisplayAction(false).name).to.equal('do-not-display-progress');
		});
		it('no tracking, no display', () => {
			expect(noTrackingDisplay._getDisplayAction(true).name).to.equal('display-progress');
			expect(noTrackingDisplay._getDisplayAction(false)).to.be.undefined;
		});
		it('no actions', () => {
			expect(noActions._getDisplayAction(true)).to.be.undefined;
			expect(noActions._getDisplayAction(false)).to.be.undefined;
		});
	});

	describe('update actions', () => {
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

		describe('tracking completion, not tracking display', () => {
			it('correct parameters', () => {
				display.updateCompletionTracking(false);
				display.updateDisplayProgress(true);
				expect(trackingSpy.returnValues[0]).to.be.a('promise');
				expect(displaySpy.returnValues[0]).to.be.a('promise');
			});
			it('incorrect parameters', () => {
				display.updateCompletionTracking(true);
				display.updateDisplayProgress(false);
				expect(trackingSpy.returnValues[0]).to.be.undefined;
				expect(displaySpy.returnValues[0]).to.be.undefined;
			});
		});
	});

	describe('update actions', () => {
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

		describe('tracking completion, tracking display', () => {
			it('correct parameters', () => {
				display.updateCompletionTracking(false);
				display.updateDisplayProgress(false);
				expect(trackingSpy.returnValues[0]).to.be.a('promise');
				expect(displaySpy.returnValues[0]).to.be.a('promise');
			});
			it('incorrect parameters', () => {
				display.updateCompletionTracking(true);
				display.updateDisplayProgress(true);
				expect(trackingSpy.returnValues[0]).to.be.undefined;
				expect(displaySpy.returnValues[0]).to.be.undefined;
			});
		});
	});

	describe('update actions', () => {
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

		describe('not tracking completion, not tracking display', () => {
			it('correct parameters', () => {
				display.updateCompletionTracking(true);
				display.updateDisplayProgress(true);
				expect(trackingSpy.returnValues[0]).to.be.a('promise');
				expect(displaySpy.returnValues[0]).to.be.a('promise');
			});
			it('incorrect parameters', () => {
				display.updateCompletionTracking(false);
				display.updateDisplayProgress(false);
				expect(trackingSpy.returnValues[0]).to.be.undefined;
				expect(displaySpy.returnValues[0]).to.be.undefined;
			});
		});
	});

	describe('update actions', () => {
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

		describe('actions missing', () => {
			it('true parameters', () => {
				display.updateCompletionTracking(true);
				display.updateDisplayProgress(true);
				expect(trackingSpy.returnValues[0]).to.be.undefined;
				expect(displaySpy.returnValues[0]).to.be.undefined;
			});
			it('false parameters', () => {
				display.updateCompletionTracking(false);
				display.updateDisplayProgress(false);
				expect(trackingSpy.returnValues[0]).to.be.undefined;
				expect(displaySpy.returnValues[0]).to.be.undefined;
			});
		});
	});
});
