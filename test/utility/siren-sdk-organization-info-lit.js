import { html, LitElement } from 'lit-element/lit-element.js';
import { EntityMixinLit } from '../../src/mixin/entity-mixin-lit.js';
import { OrganizationEntity } from '../utility/OrganizationEntity.js';
import './siren-sdk-organization-name-lit.js';

class SdkSirenOrganizationInfoLit extends EntityMixinLit(LitElement) {

	static get properties() {
		return {
			_organizationName: { type: String },
			_organizationCode: { type: String },
			_semesterNameDirect: { type: String },
			_semesterHref: { type: String }
		};
	}

	set entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onOrganizationChange(entity);
			super.entity = entity;
		}
	}

	constructor() {
		super();
		this._setEntityType(OrganizationEntity);
	}

	render() {
		return html`
			<div id="organization-name">${this._organizationName}</div>
			<div id="organization-code">${this._organizationCode}</div>
			<div id="semester-name-direct">${this._semesterNameDirect}</div>
			<siren-sdk-organization-name id="semester-name" href="${this._semesterHref}" token="whatever"></siren-sdk-organization-name>
		`;
	}

	_onOrganizationChange(organization) {
		this._organizationName = organization.name();
		this._organizationCode = organization.code();
		this._semesterHref = organization._semesterHref();
		organization.onSemesterChange((semester) => {
			this._semesterNameDirect = semester.name();
		});
	}
}

window.customElements.define('siren-sdk-organization-info-lit', SdkSirenOrganizationInfoLit);
