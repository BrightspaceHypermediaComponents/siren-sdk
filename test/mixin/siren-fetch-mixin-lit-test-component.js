import { html, LitElement } from 'lit-element/lit-element.js';
import { EntityMixinLit } from '../../src/mixin/entity-mixin-lit.js';
import { SirenFetchMixinLit } from '../../src/mixin/siren-fetch-mixin-lit.js';

class SirenFetchMixinLitTestComponent extends SirenFetchMixinLit(EntityMixinLit(LitElement)) {
	render() {
		return html`
			<div id="test">Test Component</div>
		`;
	}
}
customElements.define('siren-fetch-mixin-lit-test-component', SirenFetchMixinLitTestComponent);
