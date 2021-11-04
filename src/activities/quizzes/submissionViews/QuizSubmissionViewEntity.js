import { Actions, Classes } from '../../../hypermedia-constants';
import { performSirenAction, performSirenActions } from '../../../es6/SirenAction.js';
import { Entity } from '../../../es6/Entity';

const SHOW_QUESTION_TYPES = [
	Classes.quizzes.submissionView.showQuestions.allQuestions,
	Classes.quizzes.submissionView.showQuestions.incorrectQuestions,
	Classes.quizzes.submissionView.showQuestions.correctQuestions
];

/**
 * QuizSubmissionViewEntity class representation of a d2l Submission View entity.
 */
export class QuizSubmissionViewEntity extends Entity {
	canUpdateAttemptRestrictions() {
		return this._entity && this._entity.hasActionByName(Actions.quizzes.submissionView.updateAttemptRestrictions);
	}

	canUpdateIpRestrictions() {
		return this._entity && this._entity.hasActionByName(Actions.quizzes.submissionView.updateIpRestrictions);
	}

	canDeleteSubmissionView() {
		return this._entity && this._entity.hasActionByName(Actions.quizzes.submissionView.deleteSubmissionView);
	}

	canUpdateShowStandards() {
		return this._entity && this._entity.hasActionByName(Actions.quizzes.submissionView.updateShowStandards);
	}

	canUpdateShowAttemptScore() {
		return this._entity && this._entity.hasActionByName(Actions.quizzes.submissionView.updateShowAttemptScore);
	}

	canUpdateShowStatsClassAverage() {
		return this._entity && this._entity.hasActionByName(Actions.quizzes.submissionView.updateShowStatsClassAverage);
	}

	canUpdateShowStatsScoreDistribution() {
		return this._entity && this._entity.hasActionByName(Actions.quizzes.submissionView.updateShowStatsScoreDistribution);
	}

	canUpdateTimeLimit() {
		return this._entity && this._entity.hasActionByName(Actions.quizzes.submissionView.updateTimeLimit);
	}

	attemptRestrictions() {
		return this._entity && this._entity.hasClass(Classes.quizzes.submissionView.attemptRestrictions);
	}

	ipRestrictions() {
		return this._entity && this._entity.hasClass(Classes.quizzes.submissionView.ipRestrictions);
	}

	timeLimit() {
		return this._entity && this._entity.hasClass(Classes.quizzes.submissionView.timeLimit);
	}

	async deleteSubmissionView() {
		const action = this._entity.getActionByName(Actions.quizzes.submissionView.deleteSubmissionView);
		await performSirenAction(this._token, action);
	}

	isPrimaryView() {
		return this._entity && this._entity.hasClass(Classes.quizzes.submissionView.primary);
	}

	async setAttemptRestrictions(value) {
		const action = this._entity.getActionByName(Actions.quizzes.submissionView.updateAttemptRestrictions);
		const fields = [
			{ name: 'restrictAttempts', value }
		];

		const returnedEntity = await performSirenAction(this._token, action, fields);
		if (!returnedEntity) return;
		return new QuizSubmissionViewEntity(returnedEntity, this._token);
	}

	async setIpRestrictions(value) {
		const action = this._entity.getActionByName(Actions.quizzes.submissionView.updateIpRestrictions);
		const fields = [
			{ name: 'ipRestrictions', value }
		];

		const returnedEntity = await performSirenAction(this._token, action, fields);
		if (!returnedEntity) return;
		return new QuizSubmissionViewEntity(returnedEntity, this._token);
	}

	async setShowAttemptScore(value) {
		const action = this._entity.getActionByName(Actions.quizzes.submissionView.updateShowAttemptScore);
		const fields = [
			{ name: 'showAttemptScore', value }
		];

		const returnedEntity = await performSirenAction(this._token, action, fields);
		if (!returnedEntity) return;
		return new QuizSubmissionViewEntity(returnedEntity, this._token);
	}

	async setShowStatsClassAverage(value) {
		const action = this._entity.getActionByName(Actions.quizzes.submissionView.updateShowStatsClassAverage);
		const fields = [
			{ name: 'showStatsClassAverage', value }
		];

		const returnedEntity = await performSirenAction(this._token, action, fields);
		if (!returnedEntity) return;
		return new QuizSubmissionViewEntity(returnedEntity, this._token);
	}

	async setShowStatsScoreDistribution(value) {
		const action = this._entity.getActionByName(Actions.quizzes.submissionView.updateShowStatsScoreDistribution);
		const fields = [
			{ name: 'showStatsScoreDistribution', value }
		];

		const returnedEntity = await performSirenAction(this._token, action, fields);
		if (!returnedEntity) return;
		return new QuizSubmissionViewEntity(returnedEntity, this._token);
	}

	async setTimeLimit(value) {
		const action = this._entity.getActionByName(Actions.quizzes.submissionView.updateTimeLimit);
		const fields = [
			{ name: 'timeLimit', value }
		];

		const returnedEntity = await performSirenAction(this._token, action, fields);
		if (!returnedEntity) return;
		return new QuizSubmissionViewEntity(returnedEntity, this._token);
	}

	showStandards() {
		return this._entity && this._entity.hasClass(Classes.quizzes.submissionView.showStandards);
	}

	showAttemptScore() {
		return this._entity && this._entity.hasClass(Classes.quizzes.submissionView.showAttemptScore);
	}

	showStatsClassAverage() {
		return this._entity && this._entity.hasClass(Classes.quizzes.submissionView.showStatsClassAverage);
	}

	showStatsScoreDistribution() {
		return this._entity && this._entity.hasClass(Classes.quizzes.submissionView.showStatsScoreDistribution);
	}

	/** MESSAGE SUB-ENTITY */
	canUpdateMessage() {
		const subEntity = this._messageSubEntity();
		return subEntity && subEntity.hasActionByName(Actions.quizzes.submissionView.message.updateMessage);
	}

	messageText() {
		const subEntity = this._messageSubEntity();
		if (!subEntity) return;
		return subEntity.properties.text;
	}

	messageHtml() {
		const subEntity = this._messageSubEntity();
		if (!subEntity) return;
		return subEntity.properties.html;
	}

	isMessageRichtext() {
		const subEntity = this._messageSubEntity();
		return subEntity && subEntity.hasClass(Classes.quizzes.submissionView.message.richtext);
	}

	async setMessage(value) {
		const subEntity = this._messageSubEntity();
		const action = subEntity.getActionByName(Actions.quizzes.submissionView.message.updateMessage);
		const fields = [
			{ name: 'message', value }
		];

		const returnedEntity = await performSirenAction(this._token, action, fields);
		if (!returnedEntity) return;
		return new QuizSubmissionViewEntity(returnedEntity, this._token);
	}

	_messageSubEntity() {
		return this._entity && this._entity.getSubEntityByClass(Classes.quizzes.submissionView.message.message);
	}

	/** HIDE SHOW QUESTIONS SUB-ENTITY */
	canUpdateHideShowQuestions() {
		const subEntity = this._hideShowQuestionsSubEntity();
		return subEntity && subEntity.hasActionByName(Actions.quizzes.submissionView.hideShowQuestions.updateHideShowQuestions);
	}

	hideQuestions() {
		const subEntity = this._hideShowQuestionsSubEntity();
		return subEntity && subEntity.hasClass(Classes.quizzes.submissionView.hideShowQuestions.hideQuestions);
	}

	async setHideShowQuestions(value) {
		const action = this._hideShowQuestionsSubEntity().getActionByName(Actions.quizzes.submissionView.hideShowQuestions.updateHideShowQuestions);
		const fields = [
			{ name: 'hideShowQuestions', value }
		];

		const returnedEntity = await performSirenAction(this._token, action, fields);
		if (!returnedEntity) return;
		return new QuizSubmissionViewEntity(returnedEntity, this._token);
	}

	_hideShowQuestionsSubEntity() {
		return this._entity && this._entity.getSubEntityByClass(Classes.quizzes.submissionView.hideShowQuestions.hideShowQuestions);
	}

	/** SHOW QUESTIONS SUB-ENTITY */
	canUpdateShowCorrectAnswers() {
		const subEntity = this._showQuestionsSubEntity();
		return subEntity && subEntity.hasActionByName(Actions.quizzes.submissionView.showQuestions.updateShowCorrectAnswers);
	}

	canUpdateShowLearnerResponses() {
		const subEntity = this._showQuestionsSubEntity();
		return subEntity && subEntity.hasActionByName(Actions.quizzes.submissionView.showQuestions.updateShowLearnerResponses);
	}

	canUpdateShowQuestions() {
		const subEntity = this._showQuestionsSubEntity();
		return subEntity && subEntity.hasActionByName(Actions.quizzes.submissionView.showQuestions.updateShowQuestions);
	}

	canUpdateShowQuestionScore() {
		const subEntity = this._showQuestionsSubEntity();
		return subEntity && subEntity.hasActionByName(Actions.quizzes.submissionView.showQuestions.updateShowQuestionScore);
	}

	async setShowQuestions(showQuestions) {
		const actionAndFields = this._formatShowQuestionsAction(showQuestions);

		const returnedEntity = await performSirenAction(this._token, actionAndFields.action, actionAndFields.fields);
		if (!returnedEntity) return;
		return new QuizSubmissionViewEntity(returnedEntity, this._token);
	}

	async setShowQuestionsAndCorrectAnswers(showQuestions, showCorrectAnswers) {
		const sirenActions = [
			this._formatShowQuestionsAction(showQuestions),
			this._formatShowCorrectAnswersAction(showCorrectAnswers)
		];

		const returnedEntities = await performSirenActions(this._token, sirenActions);
		if (!returnedEntities || returnedEntities.length === 0) return;

		// The two actions should be combined to be 1 promise, so only 1 entity should be expected to be returned here
		return new QuizSubmissionViewEntity(returnedEntities[0], this._token);
	}

	async setShowCorrectAnswers(showCorrectAnswers) {
		const actionAndFields = this._formatShowCorrectAnswersAction(showCorrectAnswers);

		const returnedEntity = await performSirenAction(this._token, actionAndFields.action, actionAndFields.fields);
		if (!returnedEntity) return;
		return new QuizSubmissionViewEntity(returnedEntity, this._token);
	}

	async setShowLearnerResponses(value) {
		const subEntity = this._showQuestionsSubEntity();
		const action = subEntity.getActionByName(Actions.quizzes.submissionView.showQuestions.updateShowLearnerResponses);
		const fields = [
			{ name: 'showLearnerResponses', value }
		];

		const returnedEntity = await performSirenAction(this._token, action, fields);
		if (!returnedEntity) return;
		return new QuizSubmissionViewEntity(returnedEntity, this._token);
	}

	async setShowQuestionScore(value) {
		const subEntity = this._showQuestionsSubEntity();
		const action = subEntity.getActionByName(Actions.quizzes.submissionView.showQuestions.updateShowQuestionScore);
		const fields = [
			{ name: 'showQuestionScore', value }
		];

		const returnedEntity = await performSirenAction(this._token, action, fields);
		if (!returnedEntity) return;
		return new QuizSubmissionViewEntity(returnedEntity, this._token);
	}

	showCorrectAnswers() {
		const subEntity = this._showQuestionsSubEntity();
		return subEntity && subEntity.hasClass(Classes.quizzes.submissionView.showQuestions.showCorrectAnswers);
	}

	showLearnerResponses() {
		const subEntity = this._showQuestionsSubEntity();
		return subEntity && subEntity.hasClass(Classes.quizzes.submissionView.showQuestions.showLearnerResponses);
	}

	showQuestionScore() {
		const subEntity = this._showQuestionsSubEntity();
		return subEntity && subEntity.hasClass(Classes.quizzes.submissionView.showQuestions.showQuestionScore);
	}

	showQuestionsType() {
		const subEntity = this._showQuestionsSubEntity();
		return subEntity && SHOW_QUESTION_TYPES.find(questionType => subEntity.hasClass(questionType));
	}

	showQuestionsOptions() {
		const canUpdate = this.canUpdateShowQuestions();
		if (!canUpdate) return;
		const values = this._showQuestionsSubEntity()
			.getActionByName(Actions.quizzes.submissionView.showQuestions.updateShowQuestions)
			.getFieldByName('showQuestions')
			.value;
		return values;
	}

	_formatShowCorrectAnswersAction(showCorrectAnswers) {
		const action = this._showQuestionsSubEntity().getActionByName(Actions.quizzes.submissionView.showQuestions.updateShowCorrectAnswers);
		const fields = [
			{ name: 'showCorrectAnswers', value: showCorrectAnswers }
		];
		return { action, fields };
	}

	_formatShowQuestionsAction(showQuestions) {
		const action = this._showQuestionsSubEntity().getActionByName(Actions.quizzes.submissionView.showQuestions.updateShowQuestions);
		const fields = [
			{ name: 'showQuestions', value: showQuestions }
		];
		return { action, fields };
	}

	_showQuestionsSubEntity() {
		const subEntity = this._hideShowQuestionsSubEntity();
		return subEntity && subEntity.getSubEntityByClass(Classes.quizzes.submissionView.showQuestions.showQuestions);
	}

	/** RELEASE DATE SUB-ENTITY */
	canUpdateReleaseDate() {
		const subEntity = this._releaseDateSubEntity();
		return subEntity && subEntity.hasActionByName(Actions.quizzes.submissionView.releaseDate.updateReleaseDate);
	}

	releaseDate() {
		const subEntity = this._releaseDateSubEntity();
		return subEntity && subEntity.properties.date;
	}

	async setReleaseDate(value) {
		const subEntity = this._releaseDateSubEntity();
		const action = subEntity.getActionByName(Actions.quizzes.submissionView.releaseDate.updateReleaseDate);
		const fields = [
			{ name: 'releaseDate', value }
		];

		const returnedEntity = await performSirenAction(this._token, action, fields);
		if (!returnedEntity) return;
		return new QuizSubmissionViewEntity(returnedEntity, this._token);
	}

	_releaseDateSubEntity() {
		return this._entity && this._entity.getSubEntityByClass(Classes.quizzes.submissionView.releaseDate);
	}

	/** TIME LIMIT SUB-ENTITY */
	canUpdateTimeLimitNumber() {
		const subEntity = this._timeLimitSubEntity();
		return subEntity && subEntity.hasActionByName(Actions.quizzes.submissionView.timeLimit.updateTimeLimitNumber);
	}

	timeLimitNumber() {
		const subEntity = this._timeLimitSubEntity();
		const value = subEntity && subEntity.properties.value;
		const result = { value };

		if (!this.canUpdateTimeLimitNumber()) return result;
		const action = subEntity.getActionByName(Actions.quizzes.submissionView.timeLimit.updateTimeLimitNumber);
		const field = action.getFieldByName('timeLimitNumber');
		if (!field) return result;
		result.min = field.min;
		result.max = field.max;

		return result;
	}

	async setTimeLimitNumber(value) {
		const subEntity = this._timeLimitSubEntity();
		const action = subEntity.getActionByName(Actions.quizzes.submissionView.timeLimit.updateTimeLimitNumber);
		const fields = [
			{ name: 'timeLimitNumber', value }
		];

		const returnedEntity = await performSirenAction(this._token, action, fields);
		if (!returnedEntity) return;
		return new QuizSubmissionViewEntity(returnedEntity, this._token);
	}

	_timeLimitSubEntity() {
		return this._entity && this._entity.getSubEntityByClass(Classes.quizzes.submissionView.timeLimit);
	}

	/** ATTEMPT RESTRICTIONS SUB-ENTITY */
	canUpdateAttemptRestrictionNumber() {
		const subEntity = this._attemptRestrictionsSubEntity();
		return subEntity && subEntity.hasActionByName(Actions.quizzes.submissionView.attemptRestrictions.updateAttemptRestrictionNumber);
	}

	canUpdateGradeRestrictions() {
		const subEntity = this._attemptRestrictionsSubEntity();
		return subEntity && subEntity.hasActionByName(Actions.quizzes.submissionView.attemptRestrictions.updateGradeRestrictions);
	}

	attemptRestrictionNumber() {
		const subEntity = this._attemptRestrictionsSubEntity();
		return subEntity && subEntity.properties.value;
	}

	gradeRestrictions() {
		const subEntity = this._attemptRestrictionsSubEntity();
		return subEntity && subEntity.hasClass(Classes.quizzes.submissionView.gradeRestrictions);
	}

	attemptRestrictionsOptions() {
		const canUpdate = this.canUpdateAttemptRestrictionNumber();
		if (!canUpdate) return;
		const values = this._attemptRestrictionsSubEntity()
			.getActionByName(Actions.quizzes.submissionView.attemptRestrictions.updateAttemptRestrictionNumber)
			.getFieldByName('attemptRestrictionNumber')
			.value;
		return values;
	}

	async setAttemptRestrictionNumber(value) {
		const subEntity = this._attemptRestrictionsSubEntity();
		const action = subEntity.getActionByName(Actions.quizzes.submissionView.attemptRestrictions.updateAttemptRestrictionNumber);
		const fields = [
			{ name: 'attemptRestrictionNumber', value }
		];

		const returnedEntity = await performSirenAction(this._token, action, fields);
		if (!returnedEntity) return;
		return new QuizSubmissionViewEntity(returnedEntity, this._token);
	}

	async setGradeRestrictions(value) {
		const subEntity = this._attemptRestrictionsSubEntity();
		const action = subEntity.getActionByName(Actions.quizzes.submissionView.attemptRestrictions.updateGradeRestrictions);
		const fields = [
			{ name: 'restrictGrades', value }
		];

		const returnedEntity = await performSirenAction(this._token, action, fields);
		if (!returnedEntity) return;
		return new QuizSubmissionViewEntity(returnedEntity, this._token);
	}

	_attemptRestrictionsSubEntity() {
		return this._entity && this._entity.getSubEntityByClass(Classes.quizzes.submissionView.attemptRestrictions);
	}

	/** GRADE RESTRICTIONS SUB-ENTITY */
	canUpdateGradeRestrictionsMinMaxGrade() {
		const subEntity = this._gradeRestrictionsSubEntity();
		return subEntity && subEntity.hasActionByName(Actions.quizzes.submissionView.gradeRestrictions.updateMinMaxGrade);
	}

	gradeRestrictionsMinMaxGrade() {
		const subEntity = this._gradeRestrictionsSubEntity();
		if (!subEntity) return;

		if (this.canUpdateGradeRestrictionsMinMaxGrade()) {
			const action = subEntity.getActionByName(Actions.quizzes.submissionView.gradeRestrictions.updateMinMaxGrade);

			const minGradeField = action.getFieldByName('minGrade');
			const maxGradeField = action.getFieldByName('maxGrade');
			return {
				'min-grade': minGradeField,
				'max-grade': maxGradeField
			};
		} else {
			return {
				'min-grade': { value: subEntity.properties['min-grade'] },
				'max-grade': { value: subEntity.properties['max-grade'] }
			};
		}
	}

	async setMinMaxGrade(min, max) {
		const subEntity = this._gradeRestrictionsSubEntity();
		const action = subEntity.getActionByName(Actions.quizzes.submissionView.gradeRestrictions.updateMinMaxGrade);
		const fields = [
			{ name: 'minGrade', min },
			{ name: 'maxGrade', max }
		];

		const returnedEntity = await performSirenAction(this._token, action, fields);
		if (!returnedEntity) return;
		return new QuizSubmissionViewEntity(returnedEntity, this._token);
	}

	_gradeRestrictionsSubEntity() {
		const subEntity = this._attemptRestrictionsSubEntity();
		return subEntity && subEntity.getSubEntityByClass(Classes.quizzes.submissionView.gradeRestrictions);
	}

	/** SHOW STANDARDS SUB-ENTITY */
	isStandardsSupported() {
		return this._entity && !!this._showStandardsSubEntity();
	}

	async setShowStandards(value) {
		const action = this._entity.getActionByName(Actions.quizzes.submissionView.showStandards);
		const fields = [
			{ name: 'showStandards', value }
		];

		const returnedEntity = await performSirenAction(this._token, action, fields);
		if (!returnedEntity) return;
		return new QuizSubmissionViewEntity(returnedEntity, this._token);
	}

	_showStandardsSubEntity() {
		return this._entity && this._entity.getSubEntityByClass(Classes.quizzes.submissionView.showStandards);
	}
}
