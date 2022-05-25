import { expect } from '@open-wc/testing';
import { OrganizationAvailabilityEntity } from '../../src/organizations/OrganizationAvailabilityEntity.js';
import sinon from 'sinon';
import SirenParse from 'siren-parser';
import { testData } from './data/OrganizationAvailabilityEntity.js';

describe('OrganizationAvailabilityEntity', () => {
	let currentEntity, explicitEntity, inheritEntity,
		inheritWithDescendantTypeEntity, cannotDeleteEntity;

	beforeEach(() => {
		const currentAvailabilityJson = SirenParse(testData.current);
		currentEntity = new OrganizationAvailabilityEntity(currentAvailabilityJson);

		const explicitAvailabilityJson = SirenParse(testData.explicit);
		explicitEntity = new OrganizationAvailabilityEntity(explicitAvailabilityJson);

		const inheritAvailabilityJson = SirenParse(testData.inherit);
		inheritEntity = new OrganizationAvailabilityEntity(inheritAvailabilityJson);

		const inheritWithDescendantTypeAvailabilityJson = SirenParse(testData.inheritWithDescendantType);
		inheritWithDescendantTypeEntity = new OrganizationAvailabilityEntity(inheritWithDescendantTypeAvailabilityJson);

		const cannotDeleteJson = SirenParse(testData.cannotDelete);
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
		it('inherit (with descendant type) is inherit', () => {
			expect(inheritWithDescendantTypeEntity.isExplicitAvailability()).to.be.false;
			expect(inheritWithDescendantTypeEntity.isInheritAvailability()).to.be.true;
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
		it('gets typeName of inherit (with descendant type) entity', () => {
			expect(inheritWithDescendantTypeEntity.getCurrentTypeName()).to.equal('Department');
		});
	});

	describe('getDescendantTypeName', () => {
		it('can getDescendantTypeName', () => {
			expect(inheritWithDescendantTypeEntity.getDescendantTypeName()).to.equal('College');
		});
		it('cannot get descendant type name as it doesn\'t exist', () => {
			expect(explicitEntity.getDescendantTypeName()).to.be.undefined;
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

	describe('Delete Availability Action', () => {
		describe('Has Action', () => {
			let sandbox, deleteExplicitEntitySpy, deleteInheritEntitySpy, deleteInheritWithDescendantTypeEntitySpy;

			beforeEach(() => {
				sandbox = sinon.createSandbox();
				deleteExplicitEntitySpy = sandbox.spy(explicitEntity, 'delete');
				deleteInheritEntitySpy = sandbox.spy(inheritEntity, 'delete');
				deleteInheritWithDescendantTypeEntitySpy = sandbox.spy(inheritWithDescendantTypeEntity, 'delete');
			});

			afterEach(() => {
				sandbox.restore();
			});

			it('can delete availability', () => {
				expect(explicitEntity.canDelete()).to.be.true;
				expect(inheritEntity.canDelete()).to.be.true;
				expect(inheritWithDescendantTypeEntity.canDelete()).to.be.true;
			});

			it('returns a promise when calling delete()', () => {
				explicitEntity.delete();
				expect(deleteExplicitEntitySpy.returnValues[0]).to.be.a('promise');

				inheritEntity.delete();
				expect(deleteInheritEntitySpy.returnValues[0]).to.be.a('promise');

				inheritWithDescendantTypeEntity.delete();
				expect(deleteInheritWithDescendantTypeEntitySpy.returnValues[0]).to.be.a('promise');
			});
		});

		describe('Does not have Action', () => {
			let sandbox, deleteCannotDeleteEntitySpy;

			beforeEach(() => {
				sandbox = sinon.createSandbox();
				deleteCannotDeleteEntitySpy = sandbox.spy(cannotDeleteEntity, 'delete');
			});

			afterEach(() => {
				sandbox.restore();
			});

			it('returns false for canDelete function', () => {
				expect(cannotDeleteEntity.canDelete()).to.be.false;
			});

			it('returns undefined if attempting to delete availability', () => {
				cannotDeleteEntity.delete();
				expect(deleteCannotDeleteEntitySpy.returnValues[0]).to.be.undefined;
			});
		});
	});
});
