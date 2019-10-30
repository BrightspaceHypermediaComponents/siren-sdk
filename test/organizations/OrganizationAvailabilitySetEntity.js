import { OrganizationAvailabilitySetEntity } from '../../src/organizations/OrganizationAvailabilitySetEntity.js';
import { testData } from './data/OrganizationAvailabilitySetEntity.js';

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

		it('can getEntitiesExcludingCurrentOrgUnit href', () => {
			const entities = entity.getEntitiesExcludingCurrentOrgUnit();
			expect(entities.length).to.equal(2);
			expect(entities[0].href).to.equal('https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/6606/availability-set/NjYwNl8xMDAwMDA1XzI1NDAwMF81/inherit/121147');
			expect(entities[1].href).to.equal('https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/6606/availability-set/NjYwNl8xMDAwMDA1XzI1NDAwMF81/inherit/121147/205');
		});
	});

	describe('Add Availability Action', () => {
		it('can add availability', () => {
			expect(entity.canAddAvailability()).to.be.true;
		});
		it('cannot add availability', () => {
			expect(cannotAddEntity.canAddAvailability()).to.be.false;
		});
	});
});
