import { performSirenAction } from '../es6/SirenAction.js';

export const DescribableEntityMixin = superclass => class extends superclass {

	_isDescribableEntity() {
		return super.entity() && super.entity().hasClass('describable-entity');
	}

	getDescription() {
		if (this._isDescribableEntity()) {
			return super.entity().properties.description;
		}
		return;
	}

	async setDescription(description) {
		if (this._isDescribableEntity()) {
			const action = super.entity().getActionByName('update-description');
			if (!action) {
				return;
			}

			const fields = [{ name: 'description', value: description }];
			await performSirenAction(this._token, action, fields);
		}
	}
};
