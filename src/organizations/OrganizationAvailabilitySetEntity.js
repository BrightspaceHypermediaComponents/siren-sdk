'use strict';

import { Entity } from '../es6/Entity.js';
import { Rels, Classes, Actions } from '../hypermedia-constants';
import { OrganizationEntity } from './OrganizationEntity.js';

/**
 * OrganizationAvailabilitySetEntity class representation of a d2l OrgUnitAvailabilitySet.
 */
export class OrganizationAvailabilitySetEntity extends Entity {
	getCurrentOrgUnitEntity() {
		return this._entity.getSubEntityByClass(Classes.organizationAvailability.current);
	}

	_getAvailabilityEntities() {
		return this._entity.getSubEntitiesByClass(Classes.organizationAvailability.orgUnitAvailability);
	}

	getEntitiesExcludingCurrentOrgUnit() {
		return this._getAvailabilityEntities().filter(e => !e.hasClass(Classes.organizationAvailability.current));
	}

	getOrganizationHref() {
		if (this._entity.hasLinkByRel(Rels.organization)) {
			return this._entity.getLinkByRel(Rels.organization).href;
		}
	}

	canAddAvailability() {
		return this._entity
			&& this._entity.hasActionByName(Actions.organizations.createExplicitAvailabilityItem)
			&& this._entity.hasActionByName(Actions.organizations.createInheritedAvailabilityItem);
	}

	onOrganizationChange(onChange) {
		const organizationHref = this.getOrganizationHref();
		organizationHref && this._subEntity(OrganizationEntity, organizationHref, onChange);
	}
}
