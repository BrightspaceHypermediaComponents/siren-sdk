import { performSirenAction } from '../es6/SirenAction.js';

export const NamedEntityMixin = superclass => class extends superclass {

	_isNamedEntity() {
		return super.entity() && super.entity().hasClass('named-entity');
	}

	getName() {
		if (this._isNamedEntity()) {
			return super.entity().properties.name;
		}
		return;
	}

	async setName(name) {
		if (this._isNamedEntity()) {
			const action = super.entity().getActionByName('update-name');
			if (!action) {
				return;
			}

			const fields = [{ name: 'name', value: name }];
			await performSirenAction(this._token, action, fields);
		}
	}
};
