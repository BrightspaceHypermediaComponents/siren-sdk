import { html, LitElement } from 'lit-element/lit-element.js';
import { PendingContainer } from '../../src/mixin/pending-container.js';
import './siren-sdk-simple-organization.js';

class SdkSirenPendingContainer extends PendingContainer(LitElement) {
	static get properties() {
		return {
			/**
			 * Href for the embedded entity
			 */
			href: {
				type: String,
				reflect: true
			},
			/**
			 * Token JWT Token for brightspace | a function that returns a JWT token for brightspace | null (defaults to cookie authentication in a browser)
			 */
			token: { type: String },
		};
	}

	render() {
		return html`
			<div ?hidden="${!this.hasPendingChildren}">Loading...</div>
			<siren-sdk-simple-organization ?hidden="${this.hasPendingChildren}" href="${this.href}" token="${this.token}"></siren-sdk-simple-organization>
		`;
	}
}

window.customElements.define('siren-sdk-pending-container', SdkSirenPendingContainer);
