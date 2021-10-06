import { Actions, Classes } from '../../../hypermedia-constants';
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

	isPrimaryView() {
		return this._entity && this._entity.hasClass(Classes.quizzes.submissionView.primary);
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
		return subEntity && subEntity.properties.text;
	}

	messageHtml() {
		const subEntity = this._messageSubEntity();
		return subEntity && subEntity.properties.html;
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

	_showQuestionsSubEntity() {
		const subEntity = this._hideShowQuestionsSubEntity();
		return subEntity && subEntity.getSubEntityByClass(Classes.quizzes.submissionView.showQuestions.showQuestions);
	}
}
