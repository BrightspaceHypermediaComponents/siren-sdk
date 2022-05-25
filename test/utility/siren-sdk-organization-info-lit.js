import './siren-sdk-organization-name-lit.js';
import { html, LitElement } from 'lit';
import { EntityMixinLit } from '../../src/mixin/entity-mixin-lit.js';
import { OrganizationEntity } from '../utility/OrganizationEntity.js';

class SdkSirenOrganizationInfoLit extends EntityMixinLit(LitElement) {

	static get properties() {
		return {
			_organizationName: { type: String },
			_organizationCode: { type: String },
			_semesterNameDirect: { type: String },
			_semesterHref: { type: String }
		};
	}

	constructor() {
		super();
		this._setEntityType(OrganizationEntity);
		this._semesterNameDirectLoaded = null;
	}

	render() {
		return html`
			<div id="organization-name">${this._organizationName}</div>
			<div id="organization-code">${this._organizationCode}</div>
			<div id="semester-name-direct">${this._semesterNameDirect}</div>
			<siren-sdk-organization-name id="semester-name" href="${this._semesterHref}" token="whatever"></siren-sdk-organization-name>
		`;
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onOrganizationChange(entity);
			super._entity = entity;
		}
	}

	_onOrganizationChange(organization) {
		this._organizationName = organization.name();
		this._organizationCode = organization.code();
		this._semesterHref = organization._semesterHref();
		organization.onSemesterChange((semester) => {
			this._semesterNameDirect = semester.name();
		});

		organization.subEntitiesLoaded().then(() => {
			this._semesterNameDirectLoaded = this._semesterNameDirect;
		});
	}
}

window.customElements.define('siren-sdk-organization-info-lit', SdkSirenOrganizationInfoLit);
