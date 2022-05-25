import { expect } from '@open-wc/testing';
import { OrganizationAvailabilitySetEntity } from '../../src/organizations/OrganizationAvailabilitySetEntity.js';
import sinon from 'sinon';
import SirenParse from 'siren-parser';
import { testData } from './data/OrganizationAvailabilitySetEntity.js';

describe('OrganizationAvailabilitySetEntity', () => {
	let entity, cannotAddEntity;

	beforeEach(() => {
		const entityJson = SirenParse(testData.organizationAvailabilitySetEntity);
		entity = new OrganizationAvailabilitySetEntity(entityJson);

		const cannotAddJson = SirenParse(testData.cannotAdd);
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
		describe('Has Action', () => {
			let sandbox, addCurrentOrgUnitSpy, addExplicitSpy, addInheritSpy;

			beforeEach(() => {
				sandbox = sinon.createSandbox();
				addCurrentOrgUnitSpy = sandbox.spy(entity, 'addCurrentOrgUnit');
				addExplicitSpy = sandbox.spy(entity, 'addExplicit');
				addInheritSpy = sandbox.spy(entity, 'addInherit');
			});

			afterEach(() => {
				sandbox.restore();
			});

			it('can add availability', () => {
				expect(entity.canAddAvailability()).to.be.true;
			});

			it('returns a promise when adding the current org unit', () => {
				entity.addCurrentOrgUnit();
				expect(addCurrentOrgUnitSpy.returnValues[0]).to.be.a('promise');
			});

			it('returns a promise when adding an explicit org unit', () => {
				entity.addExplicit(1234);
				expect(addExplicitSpy.returnValues[0]).to.be.a('promise');
			});

			it('returns a promise when adding an inherited org unit', () => {
				entity.addInherit(1234, 20);
				expect(addInheritSpy.returnValues[0]).to.be.a('promise');
			});
		});

		describe('Does not have Action', () => {
			let sandbox, addCurrentOrgUnitSpy, addExplicitSpy, addInheritSpy;

			beforeEach(() => {
				sandbox = sinon.createSandbox();
				addCurrentOrgUnitSpy = sandbox.spy(cannotAddEntity, 'addCurrentOrgUnit');
				addExplicitSpy = sandbox.spy(cannotAddEntity, 'addExplicit');
				addInheritSpy = sandbox.spy(cannotAddEntity, 'addInherit');
			});

			afterEach(() => {
				sandbox.restore();
			});

			it('returns false for canAddAvailability function', () => {
				expect(cannotAddEntity.canAddAvailability()).to.be.false;
			});

			it('returns undefined if attempting to add availability', () => {
				cannotAddEntity.addCurrentOrgUnit();
				expect(addCurrentOrgUnitSpy.returnValues[0]).to.be.undefined;

				cannotAddEntity.addExplicit(1234);
				expect(addExplicitSpy.returnValues[0]).to.be.undefined;

				cannotAddEntity.addInherit(1234, 50);
				expect(addInheritSpy.returnValues[0]).to.be.undefined;
			});
		});
	});
});
