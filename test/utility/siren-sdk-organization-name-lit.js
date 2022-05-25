import { html, LitElement } from 'lit';
import { EntityMixinLit } from '../../src/mixin/entity-mixin-lit.js';
import { OrganizationEntity } from '../utility/OrganizationEntity.js';

class SdkSirenOrganizationNameLit extends EntityMixinLit(LitElement) {
	static get properties() {
		return {
			_organizationName: { type: String }
		};
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			super._entity = entity;
			this._onOrganizationChange(entity);
		}
	}

	constructor() {
		super();
		this._setEntityType(OrganizationEntity);
	}

	render() {
		return html`
			${this._organizationName}
		`;
	}

	_onOrganizationChange(organization) {
		this._organizationName = organization.name();
	}

}

window.customElements.define('siren-sdk-organization-name-lit', SdkSirenOrganizationNameLit);
