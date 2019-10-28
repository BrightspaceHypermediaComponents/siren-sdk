import { html, LitElement } from 'lit-element/lit-element.js';
import { EntityMixinLit } from '../../src/mixin/entity-mixin-lit.js';
import { SirenUtil } from '../../src/es6/SirenUtil.js';

class SirenUtilTestComponent extends EntityMixinLit(LitElement) {
	performSirenAction(action, fields, immediate) {
		SirenUtil.performSirenAction(action, fields, immediate);
	}

	render() {
		return html`
			<div id="test">Test Component</div>
		`;
	}
}
customElements.define('siren-util-test-component', SirenUtilTestComponent);
