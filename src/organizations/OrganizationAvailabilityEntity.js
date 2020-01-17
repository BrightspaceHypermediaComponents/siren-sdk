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
		return this.hasClass(Classes.organizationAvailability.explicit);
	}

	isInheritAvailability() {
		return this.hasClass(Classes.organizationAvailability.inherit);
	}

	getCurrentTypeName() {
		const currentTypeEntity = this._entity.getSubEntityByClasses([
			Classes.organizationAvailability.orgUnitType,
			Classes.organizationAvailability.current
		]);
		return currentTypeEntity && currentTypeEntity.properties && currentTypeEntity.properties.name;
	}

	getDescendantTypeName() {
		const descendantTypeEntity = this._entity.getSubEntityByClasses([
			Classes.organizationAvailability.orgUnitType,
			Classes.organizationAvailability.descendant
		]);
		return descendantTypeEntity && descendantTypeEntity.properties && descendantTypeEntity.properties.name;
	}

	delete() {
		const action = this.canDelete() && this.getActionByName(Actions.organizations.deleteItem);
		if (!action) {
			return;
		}
		return performSirenAction(this._token, action).then(() => {
			this.dispose();
		});
	}
}
