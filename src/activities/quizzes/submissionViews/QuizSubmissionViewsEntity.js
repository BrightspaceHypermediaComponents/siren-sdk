import { Actions } from '../../../hypermedia-constants';
import { Entity } from '../../../es6/Entity';

/**
 * A QuizSubmissionViews subentity of a d2l Quiz.
 */
export class QuizSubmissionViewsEntity extends Entity {
	canAddView() {
		return this.hasActionByName(Actions.quizzes.submissionViews.add);
	}
}
