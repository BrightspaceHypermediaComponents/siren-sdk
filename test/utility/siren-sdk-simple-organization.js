import { html, LitElement } from 'lit-element/lit-element.js';
import { EntityMixinLit } from '../../src/mixin/entity-mixin-lit.js';
import { OrganizationEntity } from './OrganizationEntity.js';

class SdkSirenSimpleOrganization extends EntityMixinLit(LitElement) {

	constructor() {
		super();
		this._setEntityType(OrganizationEntity);
	}

	shouldUpdate(changedProperties) {
		return super.shouldUpdate(changedProperties) && this.entity;
	}

	render() {
		return html`
			<div id="organization-name">${this.entity.name()}</div>
		`;
	}
}

window.customElements.define('siren-sdk-simple-organization', SdkSirenSimpleOrganization);
