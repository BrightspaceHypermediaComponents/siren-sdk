import './siren-sdk-organization-name.js';
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { EntityMixin } from '../../src/mixin/entity-mixin.js';
import { OrganizationEntity } from '../utility/OrganizationEntity.js';

class SdkSirenOrganizationInfo extends EntityMixin(PolymerElement) {
	static get properties() {
		return {
			id: String,
			_organizationName: String,
			_organizationCode: String,
			_semesterNameDirect: String,
			_semesterHref: String
		};
	}

	constructor() {
		super();
		this._setEntityType(OrganizationEntity);
	}

	static get is() { return 'siren-sdk-organization-info'; }

	static get observers() {
		return [
			'_onOrganizationChange(_entity)'
		];
	}

	static get template() {
		return html`
			<div id="organization-name">[[_organizationName]]</div>
			<div id="organization-code">[[_organizationCode]]</div>
			<div id="semester-name-direct">[[_semesterNameDirect]]</div>
			<siren-sdk-organization-name id="semester-name" href="[[_semesterHref]]" token="whatever"></siren-sdk-organization-name>
		`;
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

window.customElements.define(SdkSirenOrganizationInfo.is, SdkSirenOrganizationInfo);
