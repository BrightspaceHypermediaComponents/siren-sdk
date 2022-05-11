import { Classes } from '../../../hypermedia-constants.js';
import { Entity } from '../../../es6/Entity.js';

/**
 * QuizSubmissionViewLinkedEntity class representation of a d2l Submission View linked entity.
 */
export class QuizSubmissionViewLinkedEntity extends Entity {
	href() {
		return this._entity && this._entity.href;
	}

	isPrimaryView() {
		return this._entity && this._entity.hasClass(Classes.quizzes.submissionView.primary);
	}
}
