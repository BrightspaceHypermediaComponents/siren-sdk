'use strict';

import { Entity } from '../es6/Entity.js';
import { Actions, Classes, Rels } from '../hypermedia-constants';
import { OrganizationEntity } from './OrganizationEntity.js';

/**
 * OrganizationAvailabilityEntity class representation of a d2l OrgUnitAvailability.
 */
export class OrganizationAvailabilityEntity extends Entity {
	canDeleteAvailability() {
		return this._entity.hasActionByName(Actions.organizations.deleteItem);
	}

	onOrganizationChange(onChange) {
		const organizationHref = this.getOrganizationHref();
		organizationHref && this._subEntity(OrganizationEntity, organizationHref, onChange);
	}

	getOrganizationHref() {
		return this._entity.getLinkByRel(Rels.organization);
	}

	isExplicitAvailability() {
		return this._entity.hasClass(Classes.organizationAvailability.explicit);
	}

	isInheritAvailability() {
		return this._entity.hasClass(Classes.organizationAvailability.inherit);
	}

	getCurrentTypeName() {
		const currentTypeEntity = this._entity.getSubEntityByClasses([
			Classes.organizationAvailability.orgUnitType,
			Classes.organizationAvailability.current
		]);
		return currentTypeEntity && currentTypeEntity.properties && currentTypeEntity.properties.name;
	}

	getDescendentTypeName() {
		const descendentTypeEntity = this._entity.getSubEntityByClasses([
			Classes.organizationAvailability.orgUnitType,
			Classes.organizationAvailability.descendent
		]);
		return descendentTypeEntity && descendentTypeEntity.properties && descendentTypeEntity.properties.name;
	}
}
