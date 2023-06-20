import { Actions, Classes } from '../hypermedia-constants.js';
import { Entity } from '../es6/Entity.js';
import { performSirenActions } from '../es6/SirenAction.js';

export class ActivityEntity extends Entity {
	_nameEntity() {
		return this._entity?.getSubEntityByRel(Classes.activities.activityName);
	}

	name() {
		return this._nameEntity()?.properties?.name;
	}

	canUpdateName() {
		const nameEntity = this._nameEntity();
		if (!nameEntity) {
			return false;
		}
		return nameEntity.hasActionByName(Actions.activities.updateName);
	}

	_hasFieldValueChanged(currentValue, initialValue) {
		return currentValue !== initialValue;
	}

	/**
	 * @summary Formats action and fields if activity name has changed and user has edit permission
	 * @param {object} activity the activity that's being modified
	 * @returns {object} the appropriate action/fields to update
	 */
	_formatUpdateNameAction(activity) {
		const { name } = activity || {};

		if (!name) return;
		if (!this._hasFieldValueChanged(name, this.name())) return;
		if (!this.canUpdateName()) return;

		const action = this._nameEntity().getActionByName(Actions.activities.updateName);
		const fields = [
			{ name: 'name', value: name }
		];

		return { action, fields };
	}

	/**
	 * @summary Checks if activity entity has changed, primarily used for dirty check
	 * @param {object} activity the activity that's being modified
	 */
	equals(activity) {
		const diffs = [
			[activity.name, this.name()]
		];

		for (const [current, initial] of diffs) {
			if (current !== initial) {
				return false;
			}
		}

		return true;
	}

	/**
	 * @summary Fires all the formatted siren actions collectively
	 * @param {object} activity the activity that's being modified
	 */
	async save(activity) {
		if (!activity) return;

		const updateNameAction = this._formatUpdateNameAction(activity);

		const sirenActions = [
			updateNameAction
		];

		await performSirenActions(this._token, sirenActions);
	}
}
