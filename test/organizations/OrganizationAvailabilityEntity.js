import { OrganizationAvailabilityEntity } from '../../src/organizations/OrganizationAvailabilityEntity.js';
import { testData } from './data/OrganizationAvailabilityEntity.js';

describe('OrganizationAvailabilityEntity', () => {
	let currentEntity, explicitEntity, inheritEntity,
		inheritWithDescendentTypeEntity, cannotDeleteEntity;

	beforeEach(() => {
		const currentAvailabilityJson = window.D2L.Hypermedia.Siren.Parse(testData.current);
		currentEntity = new OrganizationAvailabilityEntity(currentAvailabilityJson);

		const explicitAvailabilityJson = window.D2L.Hypermedia.Siren.Parse(testData.explicit);
		explicitEntity = new OrganizationAvailabilityEntity(explicitAvailabilityJson);

		const inheritAvailabilityJson = window.D2L.Hypermedia.Siren.Parse(testData.inherit);
		inheritEntity = new OrganizationAvailabilityEntity(inheritAvailabilityJson);

		const inheritWithDescendentTypeAvailabilityJson = window.D2L.Hypermedia.Siren.Parse(testData.inheritWithDescendentType);
		inheritWithDescendentTypeEntity = new OrganizationAvailabilityEntity(inheritWithDescendentTypeAvailabilityJson);

		const cannotDeleteJson = window.D2L.Hypermedia.Siren.Parse(testData.cannotDelete);
		cannotDeleteEntity = new OrganizationAvailabilityEntity(cannotDeleteJson);
	});

	describe('Basic loading', () => {
		it('can getOrganizationHref', () => {
			expect(currentEntity.getOrganizationHref()).to.equal('https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/121147');
			expect(explicitEntity.getOrganizationHref()).to.equal('https://1b0a911c-2d9e-45e1-8091-5cfb7de38a95.organizations.api.proddev.d2l/6606');
		});
	});

	describe('isExplicit / isInherit', () => {
		it('current org unit entity is explicit', () => {
			expect(currentEntity.isExplicitAvailability()).to.be.true;
			expect(currentEntity.isInheritAvailability()).to.be.false;
		});
		it('explicit entity is explicit', () => {
			expect(explicitEntity.isExplicitAvailability()).to.be.true;
			expect(explicitEntity.isInheritAvailability()).to.be.false;
		});
		it('inherit entity is inherit', () => {
			expect(inheritEntity.isExplicitAvailability()).to.be.false;
			expect(inheritEntity.isInheritAvailability()).to.be.true;
		});
		it('inherit (with descendent type) is inherit', () => {
			expect(inheritWithDescendentTypeEntity.isExplicitAvailability()).to.be.false;
			expect(inheritWithDescendentTypeEntity.isInheritAvailability()).to.be.true;
		});
	});

	describe('getCurrentTypeName', () => {
		it('gets typeName of current entity', () => {
			expect(currentEntity.getCurrentTypeName()).to.equal('Department');
		});
		it('gets typeName of explicit entity', () => {
			expect(explicitEntity.getCurrentTypeName()).to.equal('Organization');
		});
		it('gets typeName of inherit entity', () => {
			expect(inheritEntity.getCurrentTypeName()).to.equal('Department');
		});
		it('gets typeName of inherit (with descendent type) entity', () => {
			expect(inheritWithDescendentTypeEntity.getCurrentTypeName()).to.equal('Department');
		});
	});

	describe('getDescendentTypeName', () => {
		it('can getDescendentTypeName', () => {
			expect(inheritWithDescendentTypeEntity.getDescendentTypeName()).to.equal('College');
		});
		it('cannot get descendent type name as it doesn\'t exist', () => {
			expect(explicitEntity.getDescendentTypeName()).to.be.undefined;
		});
	});

	describe('Delete Availability Action', () => {
		it('can delete availability', () => {
			expect(explicitEntity.canDelete()).to.be.true;
		});
		it('cannot delete availability', () => {
			expect(cannotDeleteEntity.canDelete()).to.be.false;
		});
	});
});
