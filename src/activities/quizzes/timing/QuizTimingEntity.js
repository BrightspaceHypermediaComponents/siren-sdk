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

	canEditExtendedDeadline() {
		const entity = this.getAutomaticZeroSubEntity();
		return entity && entity.hasActionByName(Actions.quizzes.timing.updateTimingLateData);
	}

	canEditGracePeriod() {
		const entity = this.getEnforcedTimingSubEntity();
		return entity && entity.hasActionByName(Actions.quizzes.timing.updateTimingGraceLimit);
	}

	canEditExceededTimeLimitBehaviour() {
		const entity = this.getEnforcedTimingSubEntity();
		return entity && entity.hasActionByName(Actions.quizzes.timing.updateLateTypeId);
	}

	canEditShowClock() {
		const entity = this.getRecommendedTimingSubEntity();
		return entity && entity.hasActionByName(Actions.quizzes.timing.updateHasTimer);
	}

	timingTypes() {
		const action = this._entity && this._entity.getActionByName(Actions.quizzes.timing.updateType);
		if (!action) return;
		const field = action.getFieldByName('timingType');
		if (!field) return;
		return field.value;
	}

	isTimingEnforced(data) {
		const enforcedClass = Classes.quizzes.timing.enforced;
		if (data) return data === enforcedClass;
		return this.hasClass(enforcedClass);
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

	getAutomaticZeroSubEntity() {
		const entity = this.getEnforcedTimingSubEntity();
		if (!entity) return;
		return entity.getSubEntityByClass(Classes.quizzes.timing.automaticZero);
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
		const entity = this.getAutomaticZeroSubEntity();
		if (!entity) return;
		const action = entity.getActionByName(Actions.quizzes.timing.updateTimingLateData);
		if (!action) return;
		const field = action.getFieldByName('submissionLateData');
		if (!field) return;
		return field.value;
	}

	isAutomaticZero(data) {
		const automaticZeroClass = Classes.quizzes.timing.automaticZero;
		if (data) return data === automaticZeroClass;
		const entity = this.getEnforcedTimingSubEntity();
		if (!entity) return;
		return entity.hasClass(automaticZeroClass);
	}

	showClock() {
		const entity = this.getRecommendedTimingSubEntity();
		if (!entity) return;
		return entity.hasClass(Classes.quizzes.timing.showClock);
	}

	recommendedTimeLimit() {
		const entity = this.getRecommendedTimingSubEntity();
		if (!entity) return;
		return entity.properties && entity.properties.timeLimit;
	}

	minRecommendedTimeLimit() {
		const field = this.getRecommendedTimeLimitField();
		if (!field) return;
		return field.min;
	}

	maxRecommendedTimeLimit() {
		const field = this.getRecommendedTimeLimitField();
		if (!field) return;
		return field.max;
	}

	minEnforcedTimeLimit() {
		const field = this.getEnforcedTimeLimitField();
		if (!field) return;
		return field.min;
	}

	maxEnforcedTimeLimit() {
		const field = this.getEnforcedTimeLimitField();
		if (!field) return;
		return field.max;
	}

	minEnforcedGraceLimit() {
		const field = this.getEnforcedGraceLimitField();
		if (!field) return;
		return field.min;
	}

	maxEnforcedGraceLimit() {
		const field = this.getEnforcedGraceLimitField();
		if (!field) return;
		return field.max;
	}

	getRecommendedTimeLimitField() {
		const entity = this.getRecommendedTimingSubEntity();
		if (!entity) return;
		const action = entity.getActionByName(Actions.quizzes.timing.updateTimeLimit);
		if (!action) return;
		return action.getFieldByName('timeLimit');
	}

	getEnforcedTimeLimitField() {
		const entity = this.getEnforcedTimingSubEntity();
		if (!entity) return;
		const action = entity.getActionByName(Actions.quizzes.timing.updateTimeLimit);
		if (!action) return;
		return action.getFieldByName('timeLimit');
	}

	getEnforcedGraceLimitField() {
		const entity = this.getEnforcedTimingSubEntity();
		if (!entity) return;
		const action = entity.getActionByName(Actions.quizzes.timing.updateTimingGraceLimit);
		if (!action) return;
		return action.getFieldByName('graceLimit');
	}

	async setExtendedDeadline(data) {
		if (!this.canEditExtendedDeadline()) return;
		const entity = this.getAutomaticZeroSubEntity();
		if (!entity) return;
		const action = entity.getActionByName(Actions.quizzes.timing.updateTimingLateData);
		const fields = [
			{ name: 'submissionLateData', value: data }
		];
		await performSirenAction(this._token, action, fields);
	}

	async setGracePeriod(data) {
		if (!this.canEditGracePeriod()) return;
		const entity = this.getEnforcedTimingSubEntity();
		if (!entity) return;
		const action = entity.getActionByName(Actions.quizzes.timing.updateTimingGraceLimit);
		const fields = [
			{ name: 'graceLimit', value: data }
		];
		await performSirenAction(this._token, action, fields);
	}

	async setTimeLimit(data) {
		var entity;
		entity = this.isTimingEnforced() ? this.getEnforcedTimingSubEntity() : this.getRecommendedTimingSubEntity() ;
		if (!entity) return;
		if (!entity.hasActionByName(Actions.quizzes.timing.updateTimeLimit)) return;
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
		if (!this.canEditExceededTimeLimitBehaviour()) return;
		const entity = this.getEnforcedTimingSubEntity();
		if (!entity) return;
		const action = entity.getActionByName(Actions.quizzes.timing.updateLateTypeId);
		const fields = [
			{ name: 'submissionLateTypeId', value: data }
		];
		await performSirenAction(this._token, action, fields);
	}
	async toggleShowClock(data) {
		if (!this.canEditShowClock()) return;
		const entity = this.getRecommendedTimingSubEntity();
		if (!entity) return;
		const action = entity.getActionByName(Actions.quizzes.timing.updateHasTimer);
		const fields = [
			{ name: 'hasTimer', value: data }
		];
		await performSirenAction(this._token, action, fields);
	}
}
