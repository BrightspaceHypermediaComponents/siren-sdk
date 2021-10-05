import { Classes } from '../../../hypermedia-constants';
import { Entity } from '../../../es6/Entity';

/**
 * QuizSubmissionViewEntity class representation of a d2l Submission View entity.
 */
export class QuizSubmissionViewEntity extends Entity {
	isPrimaryView() {
		return this._entity && this._entity.hasClass(Classes.quizzes.submissionView.primary);
	}
}
