import { OrganizationAvailabilityEntity } from '../../src/organizations/OrganizationEntity.js';
import { testData } from './data/OrganizationCompletionEntity.js';

describe('OrganizationEntity', () => {
	let trackingNoDisplay, trackingAndDisplay, noTrackingDisplay, noActions;

	beforeEach(() => {
		const trackingNoDisplayJson = window.D2L.Hypermedia.Siren.Parse(testData.trackingNoDisplay);
		trackingNoDisplay = new OrganizationAvailabilityEntity(trackingNoDisplayJson);

		const trackingAndDisplayJson = window.D2L.Hypermedia.Siren.Parse(testData.trackingAndDisplay);
		trackingAndDisplay = new OrganizationAvailabilityEntity(trackingAndDisplayJson);

		const noTrackingJson = window.D2L.Hypermedia.Siren.Parse(testData.noTracking);
		noTrackingDisplay = new OrganizationAvailabilityEntity(noTrackingJson);

		const noActionsJson = window.D2L.Hypermedia.Siren.Parse(testData.noActions);
		noActions = new OrganizationAvailabilityEntity(noActionsJson);
	});

	describe('properties working', () => {
		it('tracking, no display', () => {
			expect(trackingNoDisplay.isCompletionTracking).to.be.true;
			expect(trackingNoDisplay.isProgressDisplayed).to.be.false;
		});
		it('tracking with display', () => {
			expect(trackingAndDisplay.isCompletionTracking).to.be.true;
			expect(trackingAndDisplay.isProgressDisplayed).to.be.true;
		});
		it('no tracking, no display', () => {
			expect(noTrackingDisplay.isCompletionTracking).to.be.false;
			expect(noTrackingDisplay.isProgressDisplayed).to.be.false;
		});
		it('actions missing', () => {
			expect(noTrackingDisplay.isCompletionTracking).to.be.undefined;
			expect(noTrackingDisplay.isProgressDisplayed).to.be.undefined;
		});
	});

	describe('organization get completion action', () => {
	});

	describe('organization get display action', () => {
	});

	describe('properties matching actions', () => {
	});
});
