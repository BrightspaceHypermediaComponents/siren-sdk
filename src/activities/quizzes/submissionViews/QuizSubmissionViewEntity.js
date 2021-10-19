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

	async deleteSubmissionView() {
		const action = this._entity.getActionByName(Actions.quizzes.submissionView.deleteSubmissionView);
		await performSirenAction(this._token, action);
	}

	isPrimaryView() {
		return this._entity && this._entity.hasClass(Classes.quizzes.submissionView.primary);
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

	message() {
		const subEntity = this._messageSubEntity();
		if (!subEntity) return;
		const isMessageRichtext = this.isMessageRichtext();
		return isMessageRichtext ? subEntity.properties.html : subEntity.properties.text;
	}

	isMessageRichtext() {
		const subEntity = this._messageSubEntity();
		return subEntity && subEntity.hasClass(Classes.quizzes.submissionView.message.richtext);
	}

	async setMessage(value) {
		const action = this._entity.getActionByName(Actions.quizzes.submissionView.message.updateMessage);
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
			.getFieldByName(Classes.quizzes.submissionView.showQuestions.showQuestions)
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
		return subEntity && subEntity.hasActionByName(Actions.quizzes.submissionView.updateReleaseDate);
	}

	releaseDate() {
		const subEntity = this._releaseDateSubEntity();
		return subEntity && subEntity.properties.date;
	}

	async setReleaseDate(value) {
		const action = this._entity.getActionByName(Actions.quizzes.submissionView.updateReleaseDate);
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
}
