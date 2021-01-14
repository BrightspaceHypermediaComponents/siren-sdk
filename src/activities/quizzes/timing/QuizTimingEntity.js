import { Entity } from '../../../es6/Entity';
import { Actions, Classes } from '../../../hypermedia-constants';
import { performSirenAction } from '../../../es6/SirenAction.js';

/**
 * A QuizTiming subentity of a d2l Quiz.
 */
export class QuizTimingEntity extends Entity {
	/**
	 * @returns {bool} Whether or not the edit timing type action is present
	 */
	canEditTiming() {
		return this._entity && this._entity.hasActionByName(Actions.quizzes.timing.updateType);
	}

	timingTypes() {
		const action = this._entity && this._entity.getActionByName(Actions.quizzes.timing.updateType);
		if (!action) return;
		const field = action.getFieldByName('timingType');
		if (!field) return;
		return field.value;
	}

	isTimingEnforced() {
		return this._entity && this._entity.hasSubEntityByClass(Classes.quizzes.timing.enforced);
	}

	submissionLateType() {
		const entity = this.getEnforcedTimingSubEntity();
		if (!entity) return;
		const action = entity.getActionByName(Actions.quizzes.timing.updateLateTypeId);
		if (!action) return;
		const field = action.getFieldByName('submissionLateTypeId');
		if (!field) return;
		return field.value;
	}

	getEnforcedTimingSubEntity() {
		return this._entity && this._entity.getSubEntityByClass(Classes.quizzes.timing.enforced);
	}

	getRecommendedTimingSubEntity() {
		return this._entity && this._entity.getSubEntityByClass(Classes.quizzes.timing.recommended);
	}

	enforcedTimeLimit() {
		const entity = this.getEnforcedTimingSubEntity();
		if (!entity) return;
		return entity.properties && entity.properties.timeLimit;
	}

	enforcedGraceLimit() {
		const entity = this.getEnforcedTimingSubEntity();
		if (!entity) return;
		return entity.properties && entity.properties.graceLimit;
	}

	extendedDeadlineOptions() {
		const entity = this.getEnforcedTimingSubEntity();
		if (!entity) return;
		const subEntity = entity.getSubEntityByClass(Classes.quizzes.timing.automaticZero);
		if (!subEntity) return;
		const action = subEntity.getActionByName(Actions.quizzes.timing.updateTimingLateData);
		if (!action) return;
		const field = action.getFieldByName('submissionLateData');
		if (!field) return;
		return field.value;
	}

	isAutomaticZero() {
		const entity = this.getEnforcedTimingSubEntity();
		if (!entity) return;
		return entity.hasSubEntityByClass('automatic-zero');
	}

	showClock() {
		const entity = this.getRecommendedTimingSubEntity();
		if (!entity) return;
		return entity.hasClass(Classes.quizzes.timing.showClock);
	}

	showClockTitle() {
		const entity = this.getRecommendedTimingSubEntity();
		if (!entity) return;
		const action = entity.getActionByName('update-timing-has-timer');
		if (!action) return;
		const field = action.getFieldByName('hasTimer');
		if (!field) return;
		return field.title;
	}

	recommendedTimeLimit() {
		const entity = this.getRecommendedTimingSubEntity();
		if (!entity) return;
		return entity.properties && entity.properties.timeLimit;
	}

	async setExtendedDeadline(data) {
		if (!this.canEditTiming()) return;
		const entity = this.getEnforcedTimingSubEntity();
		if (!entity) return;
		const subEntity = entity.getSubEntityByClass('automatic-zero');
		const action = subEntity.getActionByName(Actions.quizzes.timing.updateTimingLateData);
		const fields = [
			{ name: 'submissionLateData', value: data }
		];
		await performSirenAction(this._token, action, fields);
	}

	async setGracePeriod(data) {
		if (!this.canEditTiming()) return;
		const entity = this.getEnforcedTimingSubEntity();
		if (!entity) return;
		const action = entity.getActionByName(Actions.quizzes.timing.updateTimingGraceLimit);
		const fields = [
			{ name: 'graceLimit', value: data }
		];
		await performSirenAction(this._token, action, fields);
	}

	async setTimeLimit(data) {
		if (!this.canEditTiming()) return;
		var entity;
		this.isTimingEnforced() ? entity = this.getRecommendedTimingSubEntity() : entity = this.getRecommendedTimingSubEntity();
		if (!entity) return;
		const action = entity.getActionByName(Actions.quizzes.timing.updateTimeLimit);
		const fields = [
			{ name: 'timeLimit', value: data }
		];
		await performSirenAction(this._token, action, fields);
	}
	async setTimingType(data) {
		if (!this.canEditTiming()) return;
		const action = this._entity.getActionByName(Actions.quizzes.timing.updateType);
		const fields = [
			{ name: 'timingType', value: data }
		];
		await performSirenAction(this._token, action, fields);
	}

	async setExceededTimeLimitBehaviour(data) {
		if (!this.canEditTiming()) return;

		const entity = this.getEnforcedTimingSubEntity();
		if (!entity) return;
		const action = entity.getActionByName(Actions.quizzes.timing.updateLateTypeId);
		const fields = [
			{ name: 'submissionLateTypeId', value: data }
		];
		await performSirenAction(this._token, action, fields);
	}
}
