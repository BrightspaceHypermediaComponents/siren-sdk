import { Actions, Classes } from '../../../hypermedia-constants.js';
import { Entity } from '../../../es6/Entity.js';
import { performSirenAction } from '../../../es6/SirenAction.js';

/**
 * A QuizTiming sub-entity of a D2L Quiz.
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

	canEditTimeLimit() {
		const entity = this.timingType();
		return entity && entity.hasActionByName(Actions.quizzes.timing.updateTimeLimit);
	}

	canEditTimingTimeLimit() {
		const entity = this.getTimerSettingsSubEntity();
		return !!entity?.hasActionByName(Actions.quizzes.timing.updateTimeLimit);
	}

	canEditTimeLimitType() {
		return !!this.getTimerSettingsSubEntity()?.hasActionByName(Actions.quizzes.timing.updateTimeLimitType);
	}

	canEditQuizStartType() {
		return !!this.getTimerSettingsSubEntity()?.hasActionByName(Actions.quizzes.timing.updateQuizStartType);
	}

	canToggleSetTimeLimit() {
		return !!this.getTimerSettingsSubEntity()?.hasActionByName(Actions.quizzes.timing.toggleSetTimeLimit);
	}

	timingType() {
		return this.isTimingEnforced() ? this.getEnforcedTimingSubEntity() : this.getRecommendedTimingSubEntity();
	}

	timingTypes() {
		const action = this._entity && this._entity.getActionByName(Actions.quizzes.timing.updateType);
		if (!action) return;
		const field = action.getFieldByName('timingType');
		if (!field) return;
		return field.value;
	}

	timeLimitTypes() {
		const entity = this.getTimerSettingsSubEntity();
		if (!entity) return;
		const action = entity.getActionByName(Actions.quizzes.timing.updateTimeLimitType);
		if (!action) return;
		return action.getFieldByName('timeLimitType')?.value;
	}

	quizStartTypes() {
		const entity = this.getTimerSettingsSubEntity();
		if (!entity) return;
		const action = entity.getActionByName(Actions.quizzes.timing.updateQuizStartType);
		if (!action) return;
		return action.getFieldByName('startType')?.value;
	}

	isTimingEnforced(data) {
		const enforcedClass = Classes.quizzes.timing.enforced;
		if (data) return data === enforcedClass;
		return this.hasClass(enforcedClass);
	}

	isNoTimeLimit(data) {
		const noTimeLimitClass = Classes.quizzes.timing.noTimeLimit;
		if (data) return data === noTimeLimitClass;
		return this.hasClass(noTimeLimitClass);
	}

	isAutoSubmit(data) {
		const autoSubmitClass = Classes.quizzes.timing.autosubmit;
		if (data) return data === autoSubmitClass;
		const entity = this.getTimerSettingsSubEntity();
		if (!entity) return false;
		return entity.hasClass(autoSubmitClass);
	}

	isMarkedExceededTime(data) {
		const markExceedTimeClass = Classes.quizzes.timing.markexceedtime;
		if (data) return data === markExceedTimeClass;
		const entity = this.getTimerSettingsSubEntity();
		if (!entity) return false;
		return entity.hasClass(markExceedTimeClass);
	}

	isRecommended(data) {
		const recommendedClass = Classes.quizzes.timing.recommended;
		if (data) return data === recommendedClass;
		return this.hasClass(recommendedClass);
	}

	isUseLateLimit(data) {
		const useLateLimitClass = Classes.quizzes.timing.useLateLimit;
		if (data) return data === useLateLimitClass;
		const entity = this.getEnforcedTimingSubEntity();
		if (!entity) return;
		return entity.hasClass(useLateLimitClass);
	}

	isSynchronous(data) {
		const synchronousClass = Classes.quizzes.timing.start.synchronous;
		if (data) return data === synchronousClass;
		const entity = this.getTimerSettingsSubEntity();
		return entity.hasClass(synchronousClass);
	}

	isAsynchronous(data) {
		const asynchronousClass = Classes.quizzes.timing.start.asynchronous;
		if (data) return data === asynchronousClass;
		const entity = this.getTimerSettingsSubEntity();
		return entity.hasClass(asynchronousClass);
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

	getExtendedDeadline() {
		const entity = this.getAutomaticZeroSubEntity();
		if (entity && entity.hasProperty('submissionLateData')) {
			return entity.properties.submissionLateData.value;
		}
	}

	getEnforcedTimingSubEntity() {
		return this._entity && this._entity.getSubEntityByClass(Classes.quizzes.timing.enforced);
	}

	getRecommendedTimingSubEntity() {
		return this._entity && this._entity.getSubEntityByClass(Classes.quizzes.timing.recommended);
	}

	getTimerSettingsSubEntity() {
		return this._entity?.getSubEntityByClass(Classes.quizzes.timing.withTimeLimitType);
	}

	getAutomaticZeroSubEntity() {
		const entity = this.getEnforcedTimingSubEntity();
		if (!entity) return;
		return entity.getSubEntityByClass(Classes.quizzes.timing.automaticZero);
	}

	enforcedTimeLimit(data) {
		const entity = this.getEnforcedTimingSubEntity();
		if (!entity || !entity.hasProperty('timeLimit')) return;

		if (data) {
			return {
				...entity.properties.timeLimit,
				value: data
			};
		}
		return entity.properties.timeLimit;
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

	recommendedTimeLimit(data) {
		const entity = this.getRecommendedTimingSubEntity();
		if (!entity || !entity.hasProperty('timeLimit')) return;

		if (data) {
			return {
				...entity.properties.timeLimit,
				value: data
			};
		}
		return entity.properties.timeLimit;
	}

	timingTimeLimit(data) {
		const entity = this.getTimerSettingsSubEntity();
		if (!entity?.hasProperty('timeLimit')) return;

		if (data) {
			return {
				...entity.properties.timeLimit,
				value: data
			};
		}
		return entity.properties.timeLimit;
	}

	minTimingTimeLimit() {
		const field = this.getTimerSettingsTimeLimitField();
		if (!field) return;
		return field.min;
	}

	maxTimingTimeLimit() {
		const field = this.getTimerSettingsTimeLimitField();
		if (!field) return;
		return field.max;
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

	getTimerSettingsTimeLimitField() {
		const entity = this.getTimerSettingsSubEntity();
		if (!entity) return;
		const action = entity.getActionByName(Actions.quizzes.timing.updateTimeLimit);
		if (!action) return;
		return action.getFieldByName('timeLimit');
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

	getSubmissionLateTypeIdTitle() {
		const entity = this.getEnforcedTimingSubEntity();
		if (entity && entity.hasProperty('submissionLateTypeId')) {
			return entity.properties.submissionLateTypeId.title;
		}
	}

	async setExtendedDeadline(data) {
		if (!this.canEditExtendedDeadline()) return;
		const entity = this.getAutomaticZeroSubEntity();
		if (!entity) return;
		const action = entity.getActionByName(Actions.quizzes.timing.updateTimingLateData);
		const fields = [
			{ name: 'submissionLateData', value: data }
		];

		const returnedEntity = await performSirenAction(this._token, action, fields);
		if (!returnedEntity) return;
		return new QuizTimingEntity(returnedEntity, this._token);
	}

	async setGracePeriod(data) {
		if (!this.canEditGracePeriod()) return;
		const entity = this.getEnforcedTimingSubEntity();
		if (!entity) return;
		const action = entity.getActionByName(Actions.quizzes.timing.updateTimingGraceLimit);
		const fields = [
			{ name: 'graceLimit', value: data }
		];

		const returnedEntity = await performSirenAction(this._token, action, fields);
		if (!returnedEntity) return;
		return new QuizTimingEntity(returnedEntity, this._token);
	}

	async setTimeLimit(data) {
		const entity = this.timingType();
		if (!entity) return;
		if (!this.canEditTimeLimit()) return;
		const action = entity.getActionByName(Actions.quizzes.timing.updateTimeLimit);
		const fields = [
			{ name: 'timeLimit', value: data }
		];

		const returnedEntity = await performSirenAction(this._token, action, fields);
		if (!returnedEntity) return;
		return new QuizTimingEntity(returnedEntity, this._token);
	}

	async setTimingTimeLimit(data) {
		const entity = this.getTimerSettingsSubEntity();
		if (!entity) return;
		if (!this.canEditTimingTimeLimit()) return;
		const action = entity.getActionByName(Actions.quizzes.timing.updateTimeLimit);
		const fields = [
			{ name: 'timeLimit', value: data }
		];

		const returnedEntity = await performSirenAction(this._token, action, fields);
		if (!returnedEntity) return;
		return new QuizTimingEntity(returnedEntity, this._token);
	}

	async setTimingType(data) {
		if (!this.canEditTiming()) return;
		const action = this._entity.getActionByName(Actions.quizzes.timing.updateType);
		const fields = [
			{ name: 'timingType', value: data }
		];

		const returnedEntity = await performSirenAction(this._token, action, fields);
		if (!returnedEntity) return;
		return new QuizTimingEntity(returnedEntity, this._token);
	}

	async setExceededTimeLimitBehaviour(data) {
		if (!this.canEditExceededTimeLimitBehaviour()) return;
		const entity = this.getEnforcedTimingSubEntity();
		if (!entity) return;
		const action = entity.getActionByName(Actions.quizzes.timing.updateLateTypeId);
		const fields = [
			{ name: 'submissionLateTypeId', value: data }
		];

		const returnedEntity = await performSirenAction(this._token, action, fields);
		if (!returnedEntity) return;
		return new QuizTimingEntity(returnedEntity, this._token);
	}

	async setShowClock(data) {
		if (!this.canEditShowClock()) return;
		const entity = this.getRecommendedTimingSubEntity();
		if (!entity) return;
		const action = entity.getActionByName(Actions.quizzes.timing.updateHasTimer);
		const fields = [
			{ name: 'hasTimer', value: data }
		];

		const returnedEntity = await performSirenAction(this._token, action, fields);
		if (!returnedEntity) return;
		return new QuizTimingEntity(returnedEntity, this._token);
	}

	async setTimeLimitType(data) {
		if (!this.canEditTimeLimitType()) return;
		const entity = this.getTimerSettingsSubEntity();
		if (!entity) return;
		const action = entity.getActionByName(Actions.quizzes.timing.updateTimeLimitType);
		const fields = [
			{ name: 'timeLimitType', value: data }
		];
		const returnedEntity = await performSirenAction(this._token, action, fields);
		if (!returnedEntity) return;
		return new QuizTimingEntity(returnedEntity, this._token);
	}

	async toggleSetTimeLimit(data) {
		if (!this.canToggleSetTimeLimit()) return;
		const entity = this.getTimerSettingsSubEntity();
		if (!entity) return;
		const action = entity.getActionByName(Actions.quizzes.timing.toggleSetTimeLimit);
		const fields = [
			{
				name: 'hasTimeLimit',
				value: data
			}
		];
		const returnedEntity = await performSirenAction(this._token, action, fields);
		if (!returnedEntity) return;
		return new QuizTimingEntity(returnedEntity, this._token);
	}

	async setQuizStartType(data) {
		if (!this.canEditQuizStartType()) return;
		const entity = this.getTimerSettingsSubEntity();
		if (!entity) return;
		const action = entity.getActionByName(Actions.quizzes.timing.updateQuizStartType);
		const fields = [
			{ name: 'startType', value: data }
		];
		const returnedEntity = await performSirenAction(this._token, action, fields);
		if (!returnedEntity) return;
		return new QuizTimingEntity(returnedEntity, this._token);
	}
}
