/**
`d2l-organization-name`

Polymer-based web component for a organization name.

@demo demo/d2l-organization-name/d2l-organization-name-demo.html Organization Name
*/
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { EntityMixin } from '../../mixin/entity-mixin.js';
import { OrganizationEntity } from '../utility/OrganizationEntity.js';
import './siren-sdk-organization-name.js';

/**
 * @customElement
 * @polymer
 */
class SdkSirenOrganizationInfo extends EntityMixin(PolymerElement) {
	constructor() {
		super();
		this._setEntityType(OrganizationEntity);
	}

	static get template() {
		return html`
			<div id="organization-name">[[_organizationName]]</div>
			<div id="organization-code">[[_organizationCode]]</div>
			<div id="semester-name-direct">[[_semesterNameDirect]]</div>
			<siren-sdk-organization-name id="semester-name" href="[[_semesterHref]]" token="whatever"></siren-sdk-organization-name>
		`;
	}
	static get properties() {
		return {
			id: String,
			_organizationName: String,
			_organizationCode: String,
			_semesterNameDirect: String,
			_semesterHref: String
		};
	}

	static get observers() {
		return [
			'_onOrganizationChange(_entity)'
		];
	}

	static get is() { return 'siren-sdk-organization-info'; }

	_onOrganizationChange(organization) {
		this._organizationName = organization.name();
		this._organizationCode = organization.code();
		this._semesterHref = organization._semesterHref();
		organization.onSemesterChange((semester) => {
			this._semesterNameDirect = semester.name();
		});
	}
}

window.customElements.define(SdkSirenOrganizationInfo.is, SdkSirenOrganizationInfo);
