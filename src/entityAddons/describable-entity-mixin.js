import { dedupeMixin } from '@open-wc/dedupe-mixin';
import { performSirenAction } from '../es6/SirenAction.js';

const DescribableEntityMixinInternal = superclass => class extends superclass {

	isDescribableEntity() {
		return super.entity() && super.entity().hasClass('describable-entity');
	}

	getDescription() {
		if (this.isDescribableEntity()) {
			return super.entity().properties.description;
		}
		return;
	}

	async setDescription(description) {
		if (this.isDescribableEntity()) {
			const action = super.entity().getActionByName('update-description');
			if (!action) {
				return;
			}

			const fields = [{ name: 'description', value: description }];
			await performSirenAction(this._token, action, fields);
		}
	}
};

export const DescribableEntityMixin = dedupeMixin(DescribableEntityMixinInternal);
