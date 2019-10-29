import { html, LitElement } from 'lit-element/lit-element.js';
import { EntityMixinLit } from '../../src/mixin/entity-mixin-lit.js';
import { SirenAction } from '../../src/es6/SirenAction.js';

class SirenActionTestComponent extends EntityMixinLit(LitElement) {
	performSirenAction(action, fields, immediate) {
		SirenAction.performSirenAction(action, fields, immediate);
	}

	render() {
		return html`
			<div id="test">Test Component</div>
		`;
	}
}
customElements.define('siren-action-test-component', SirenActionTestComponent);
