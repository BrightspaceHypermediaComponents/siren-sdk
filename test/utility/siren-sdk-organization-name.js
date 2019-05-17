import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { EntityMixin } from '../../src/mixin/entity-mixin.js';
import { OrganizationEntity } from '../utility/OrganizationEntity.js';

/**
 * @customElement
 * @polymer
 */
class SdkSirenOrganizationName extends EntityMixin(PolymerElement) {
	constructor() {
		super();
		this._setEntityType(OrganizationEntity);
	}

	static get template() {
		return html`
			[[_organizationName]]
		`;
	}
	static get properties() {
		return {
			_organizationName: String
		};
	}

	static get observers() {
		return [
			'_onOrganizationChange(_entity)'
		];
	}

	static get is() { return 'siren-sdk-organization-name'; }

	_onOrganizationChange(organization) {
		this._organizationName = organization.name();
	}

}

window.customElements.define(SdkSirenOrganizationName.is, SdkSirenOrganizationName);
