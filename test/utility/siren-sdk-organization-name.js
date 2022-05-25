import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { EntityMixin } from '../../src/mixin/entity-mixin.js';
import { OrganizationEntity } from '../utility/OrganizationEntity.js';

class SdkSirenOrganizationName extends EntityMixin(PolymerElement) {
	static get properties() {
		return {
			_organizationName: String
		};
	}

	constructor() {
		super();
		this._setEntityType(OrganizationEntity);
	}

	static get is() { return 'siren-sdk-organization-name'; }

	static get observers() {
		return [
			'_onOrganizationChange(_entity)'
		];
	}

	static get template() {
		return html`
			[[_organizationName]]
		`;
	}

	_onOrganizationChange(organization) {
		this._organizationName = organization.name();
	}

}

window.customElements.define(SdkSirenOrganizationName.is, SdkSirenOrganizationName);
