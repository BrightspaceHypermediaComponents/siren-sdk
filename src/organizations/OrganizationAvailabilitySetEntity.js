import { Actions, Classes, Rels } from '../hypermedia-constants.js';
import { Entity } from '../es6/Entity.js';
import { OrganizationEntity } from './OrganizationEntity.js';
import { performSirenAction } from '../es6/SirenAction.js';

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

	getAvailabilityHrefs() {
		return this._getAvailabilityEntities()
			.filter(e => !e.hasClass(Classes.organizationAvailability.current))
			.map(e => e.href);
	}

	getOrganizationHref() {
		if (this._entity.hasLinkByRel(Rels.organization)) {
			return this._entity.getLinkByRel(Rels.organization).href;
		}
	}

	canAddAvailability() {
		return this._entity
			&& this._entity.hasActionByName(Actions.organizations.createExplicitAvailabilityItem)
			&& this._entity.hasActionByName(Actions.organizations.createInheritedAvailabilityItem)
			&& this._entity.hasActionByName(Actions.organizations.createCurrentOrgUnitAvailabilityItem);
	}

	onOrganizationChange(onChange) {
		const organizationHref = this.getOrganizationHref();
		organizationHref && this._subEntity(OrganizationEntity, organizationHref, onChange);
	}

	addExplicit(explicitOrgUnitId) {
		const action = this.canAddAvailability() && this.getActionByName(Actions.organizations.createExplicitAvailabilityItem);
		if (!action) {
			return;
		}
		const fields = [{ name: 'explicitOrgUnitId', value: explicitOrgUnitId }];
		return performSirenAction(this._token, action, fields);
	}

	addInherit(ancestorOrgUnitId, descendantOrgUnitTypeId) {
		const action = this.canAddAvailability() && this._entity.getActionByName(Actions.organizations.createInheritedAvailabilityItem);
		if (!action) {
			return;
		}
		const fields = [{ name: 'ancestorOrgUnitId', value: ancestorOrgUnitId }];
		if (descendantOrgUnitTypeId) {
			fields.push({ name: 'descendantOrgUnitTypeId', value: descendantOrgUnitTypeId });
		}
		return performSirenAction(this._token, action, fields);
	}

	addCurrentOrgUnit() {
		const action = this.canAddAvailability() && this.getActionByName(Actions.organizations.createCurrentOrgUnitAvailabilityItem);
		if (!action) {
			return;
		}
		return performSirenAction(this._token, action);
	}
}
