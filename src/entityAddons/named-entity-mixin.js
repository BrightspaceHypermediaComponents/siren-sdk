import { dedupeMixin } from '@open-wc/dedupe-mixin';
import { performSirenAction } from '../es6/SirenAction.js';

const NamedEntityMixinInternal = superclass => class extends superclass {

	isNamedEntity() {
		return super.entity() && super.entity().hasClass('named-entity');
	}

	getName() {
		if (this.isNamedEntity()) {
			return super.entity().properties.name;
		}
		return;
	}

	async setName(name) {
		if (this.isNamedEntity()) {
			const action = super.entity().getActionByName('update-name');
			if (!action) {
				return;
			}

			const fields = [{ name: 'name', value: name }];
			await performSirenAction(this._token, action, fields);
		}
	}
};

export const NamedEntityMixin = dedupeMixin(NamedEntityMixinInternal);
