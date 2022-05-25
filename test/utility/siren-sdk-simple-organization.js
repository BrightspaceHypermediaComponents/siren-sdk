import { html, LitElement } from 'lit';
import { EntityMixinLit } from '../../src/mixin/entity-mixin-lit.js';
import { OrganizationEntity } from './OrganizationEntity.js';

class SdkSirenSimpleOrganization extends EntityMixinLit(LitElement) {

	constructor() {
		super();
		this._setEntityType(OrganizationEntity);
	}

	shouldUpdate(changedProperties) {
		return super.shouldUpdate(changedProperties) && this._entity;
	}

	render() {
		return html`
			<div id="organization-name">${this._entity.name()}</div>
		`;
	}
}

window.customElements.define('siren-sdk-simple-organization', SdkSirenSimpleOrganization);
