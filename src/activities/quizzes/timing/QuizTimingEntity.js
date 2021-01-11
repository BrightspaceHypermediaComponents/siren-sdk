import { Entity } from '../../../es6/Entity';
import { Actions } from '../../../hypermedia-constants';
import { performSirenAction } from '../../../es6/SirenAction.js';

/**
 * A QuizTiming subentity of a d2l Quiz.
 */
export class QuizTimingEntity extends Entity {
	/**
	 * @returns {bool} Whether or not the edit timing type action is present
	 */
	canEditTiming() {
		return this._entity && this._entity.hasActionByName(Actions.quizzes.timing.type);
	}

	timingTypes() {
		const action = this._entity && this._entity.getActionByName(Actions.quizzes.timing.type);
		if (!action) return;
		const field = action.getFieldByName('timingType');
		if (!field) return;
		return field.value;
	}

	async setTimingType(data) {
		if (!this.canEditTiming()) return;

		const action = this._entity.getActionByName(Actions.quizzes.timing.type);
		const fields = [
			{ name: 'timingType', value: data }
		];
		await performSirenAction(this._token, action, fields);
	}
}
