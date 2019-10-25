'use strict';

import { Entity } from '../es6/Entity.js';
import { Rels, Classes, Actions } from '../hypermedia-constants';
import { OrganizationEntity } from './OrganizationEntity.js';

/**
 * OrganizationAvailabilitySetEntity class representation of a d2l OrgUnitAvailabilitySet.
 */
export class OrganizationAvailabilitySetEntity extends Entity {
	_getCurrentOrgUnitAvailabilityHref() {
		const currentOrganizationHref = this.getOrganizationHref();
		const currentOrgUnitId = currentOrganizationHref.substr(currentOrganizationHref.lastIndexOf("/") + 1);
		const selfHref = this._entity.getLinkByRel('self').href;
		return selfHref + '/explicit/' + currentOrgUnitId;
	}

	getCurrentOrgUnitAvailability() {
		const currentOrgUnitAvailabilityHref = this._getCurrentOrgUnitAvailabilityHref();
		return this.getAvailabilityEntities().find(e => e.href === currentOrgUnitAvailabilityHref);
	}

	getAvailabilityEntities() {
		return this._entity.getSubEntitiesByClass(Classes.organizationAvailability.orgUnitAvailability);
	}

	getAvailabilityEntitiesWithoutCurrentOrgUnit() {
		const currentOrgUnitAvailabilityHref = this._getCurrentOrgUnitAvailabilityHref();
		return this.getAvailabilityEntities().filter( e => e.href !== currentOrgUnitAvailabilityHref);
	}

	getOrganizationHref() {
		if (this._entity.hasLinkByRel( Rels.organization)) {
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