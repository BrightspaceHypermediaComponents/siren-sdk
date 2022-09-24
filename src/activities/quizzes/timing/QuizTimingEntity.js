import { Actions, Classes } from '../../../hypermedia-constants.js';
import { Entity } from '../../../es6/Entity.js';
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

	canEditTimeLimit() {
		const entity = this.timingType();
		return entity && entity.hasActionByName(Actions.quizzes.timing.updateTimeLimit);
	}

	canEditTimeLimitType() {
		return this.getTimeLimitTypesSubEntity()?.hasActionByName(Actions.quizzes.timing.updateTimeLimitType);
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
		const entity = this.getTimeLimitTypesSubEntity();
		if (!entity) return;
		const action = entity.getActionByName(Actions.quizzes.timing.updateTimeLimitType);
		if (!action) return;
		return action.getFieldByName('timeLimitType')?.value;
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

	isWithTimeLimitType(data) {
		const timeLimitTypeClass = Classes.quizzes.timing.withTimeLimitType;
		if (data) return data === timeLimitTypeClass;
		return this.getTimeLimitTypesSubEntity()?.hasClass(timeLimitTypeClass);
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

	getTimeLimitTypesSubEntity() {
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
		const entity = this.getTimeLimitTypesSubEntity();
		if (!entity) return;
		const action = entity.getActionByName(Actions.quizzes.timing.updateTimeLimitType);
		const fields = [
			{ name: 'timeLimitType', value: data }
		];
		const returnedEntity = await performSirenAction(this._token, action, fields);
		if (!returnedEntity) return;
		return new QuizTimingEntity(returnedEntity, this._token);
	}
}
