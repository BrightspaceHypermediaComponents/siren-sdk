import { OrganizationAvailabilitySetEntity } from '../../src/organizations/OrganizationAvailabilitySetEntity.js';
import { testData } from './data/OrganizationAvailabilitySetEntity.js';
import * as SirenAction from '../../src/es6/SirenAction.js';

describe('OrganizationAvailabilitySetEntity', () => {
	let entity, cannotAddEntity;

	beforeEach(() => {
		const entityJson = window.D2L.Hypermedia.Siren.Parse(testData.organizationAvailabilitySetEntity);
		entity = new OrganizationAvailabilitySetEntity(entityJson);

		const cannotAddJson = window.D2L.Hypermedia.Siren.Parse(testData.cannotAdd);
		cannotAddEntity = new OrganizationAvailabilitySetEntity(cannotAddJson);
	});

	describe('Basic loading', () => {
		it('can getOrganizationHref', () => {
			expect(entity.getOrganizationHref()).to.equal('https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/6606');
		});

		it('can get Current Org Unit entity', () => {
			const actualCurrentOrgUnitEntity = entity.getCurrentOrgUnitEntity();
			expect(actualCurrentOrgUnitEntity.class).to.have.members([
				'orgunit-availability',
				'explicit',
				'current'
			]);
			expect(actualCurrentOrgUnitEntity.href).to.equal('https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/6606/availability-set/NjYwNl8xMDAwMDA1XzI1NDAwMF81/explicit/6606');
		});

		it('can getAvailabilityHrefs href', () => {
			const hrefs = entity.getAvailabilityHrefs();
			expect(hrefs.length).to.equal(2);
			expect(hrefs[0]).to.equal('https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/6606/availability-set/NjYwNl8xMDAwMDA1XzI1NDAwMF81/inherit/121147');
			expect(hrefs[1]).to.equal('https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/6606/availability-set/NjYwNl8xMDAwMDA1XzI1NDAwMF81/inherit/121147/205');
		});
	});

	describe('Add Availability Action', () => {
		let sandbox;
		let performSirenActionSpy;

		beforeEach(() => {
			sandbox = sinon.sandbox.create();
			performSirenActionSpy = sandbox.spy(SirenAction, "performSirenAction");
		});

		afterEach(() => {
			sandbox.restore();
		});

		describe('Has Action', () => {
			it('can add availability', () => {
				expect(entity.canAddAvailability()).to.be.true;
			});

			it('can add current org unit availability', () => {
				entity.addCurrentOrgUnit();
				expect(performSirenActionSpy.calledOnce).to.be.true;
			});

			it('can add explicit org unit availability', () => {
				let explicitOrgUnitId = 1234;

				entity.addExplicit(explicitOrgUnitId);
				expect(performSirenActionSpy.calledOnce).to.be.true;

				const call = performSirenActionSpy.getCall(0);
				expect(call.args.length).to.equal(3);
				const fieldsArg = call.args[2];

				const explicitOrgUnitIdField = fieldsArg.find(field => field.name === 'explicitOrgUnitId');
				expect(explicitOrgUnitIdField.value).to.equal(explicitOrgUnitId);
			});

			it('can add inherit org unit availability', () => {
				let ancestorOrgUnitId = 1234;
				let descendantOrgUnitTypeId = 20;

				entity.addInherit(ancestorOrgUnitId, descendantOrgUnitTypeId);
				expect(performSirenActionSpy.calledOnce).to.be.true;

				const call = performSirenActionSpy.getCall(0);
				expect(call.args.length).to.equal(3);
				const fieldsArg = call.args[2];

				const ancestorOrgUnitIdField = fieldsArg.find(field => field.name === 'ancestorOrgUnitId');
				expect(ancestorOrgUnitIdField.value).to.equal(ancestorOrgUnitId);

				const descendantOrgUnitTypeIdField = fieldsArg.find(field => field.name === 'descendantOrgUnitTypeId');
				expect(descendantOrgUnitTypeIdField.value).to.equal(descendantOrgUnitTypeId);
			});
		});

		describe('Does not have Action', () => {
			it('returns false for canAddAvailability function', () => {
				expect(cannotAddEntity.canAddAvailability()).to.be.false;
			});

			it('will not call performSirenAction', () => {
				cannotAddEntity.addCurrentOrgUnit();
				cannotAddEntity.addExplicit(1234);
				cannotAddEntity.addInherit(1234, 50);
				expect(performSirenActionSpy.called).to.be.false;
			});
		});
	});
});
