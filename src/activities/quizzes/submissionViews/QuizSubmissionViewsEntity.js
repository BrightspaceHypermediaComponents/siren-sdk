import { Actions } from '../../../hypermedia-constants';
import { Entity } from '../../../es6/Entity';

/**
 * QuizSubmissionViewsEntity class representation of a d2l Submission Views collection.
 */
export class QuizSubmissionViewsEntity extends Entity {
	canAddView() {
		return this.hasActionByName(Actions.quizzes.submissionViews.add);
	}
}
