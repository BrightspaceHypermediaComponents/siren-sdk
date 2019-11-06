'use strict';

import { Entity } from '../es6/Entity.js';
import { OrganizationEntity } from './OrganizationEntity.js';
import { performSirenAction } from '../es6/SirenAction.js';
import { Actions, Classes, Rels } from '../hypermedia-constants';

/**
 * OrganizationAvailabilityEntity class representation of a d2l OrgUnitAvailability.
 */
export class OrganizationAvailabilityEntity extends Entity {
	canDelete() {
		return this._entity.hasActionByName(Actions.organizations.deleteItem);
	}

	onOrganizationChange(onChange) {
		const organizationHref = this.getOrganizationHref();
		organizationHref && this._subEntity(OrganizationEntity, organizationHref, onChange);
	}

	getOrganizationHref() {
		if (this._entity.hasLinkByRel(Rels.organization)) {
			return this._entity.getLinkByRel(Rels.organization).href;
		}
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

	async delete() {
		const action = this.canDelete() && this._entity.getActionByName(Actions.organizations.deleteItem);
		if (!action) {
			return;
		}
		await performSirenAction(this._token, action);
	}
}
