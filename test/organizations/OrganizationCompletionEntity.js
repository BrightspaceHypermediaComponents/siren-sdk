import { OrganizationEntity } from '../../src/organizations/OrganizationEntity.js';
import { testData } from './data/OrganizationCompletionEntity.js';

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
			expect(trackingNoDisplay.getCompletionAction(true)).to.be.undefined;
			expect(trackingNoDisplay.getCompletionAction(false).name).to.equal('do-not-track-completion');
		});
		it('tracking with display', () => {
			expect(trackingAndDisplay.getCompletionAction(true)).to.be.undefined;
			expect(trackingAndDisplay.getCompletionAction(false).name).to.equal('do-not-track-completion');
		});
		it('no tracking, no display', () => {
			expect(noTrackingDisplay.getCompletionAction(true).name).to.equal('track-completion');
			expect(noTrackingDisplay.getCompletionAction(false)).to.be.undefined;
		});
		it('no actions', () => {
			expect(noActions.getCompletionAction(true)).to.be.undefined;
			expect(noActions.getCompletionAction(false)).to.be.undefined;
		});
	});

	describe('organization get display action', () => {
		it('tracking, no display', () => {
			expect(trackingNoDisplay.getDisplayAction(true).name).to.equal('display-progress');
			expect(trackingNoDisplay.getDisplayAction(false)).to.be.undefined;
		});
		it('tracking with display', () => {
			expect(trackingAndDisplay.getDisplayAction(true)).to.be.undefined;
			expect(trackingAndDisplay.getDisplayAction(false).name).to.equal('do-not-display-progress');
		});
		it('no tracking, no display', () => {
			expect(noTrackingDisplay.getDisplayAction(true).name).to.equal('display-progress');
			expect(noTrackingDisplay.getDisplayAction(false)).to.be.undefined;
		});
		it('no actions', () => {
			expect(noActions.getDisplayAction(true)).to.be.undefined;
			expect(noActions.getDisplayAction(false)).to.be.undefined;
		});
	});
});
