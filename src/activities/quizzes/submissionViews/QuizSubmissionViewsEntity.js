import { Actions } from '../../../hypermedia-constants';
import { Entity } from '../../../es6/Entity';
import { performSirenAction } from '../../../es6/SirenAction.js';
import { QuizSubmissionViewEntity } from './QuizSubmissionViewEntity';

/**
 * QuizSubmissionViewsEntity class representation of a d2l Submission Views collection.
 */
export class QuizSubmissionViewsEntity extends Entity {
	canAddView() {
		return this._entity && this._entity.hasActionByName(Actions.quizzes.submissionViews.add);
	}

	async addView() {
		if (!this.canAddView) return;
		const action = this._entity.getActionByName(Actions.quizzes.submissionViews.add);
		const returnedEntity = await performSirenAction(this._token, action);
		if (!returnedEntity) return;
		return new QuizSubmissionViewEntity(returnedEntity, this._token);
	}

	linkedSubmissionViews() {
		return this._entity && this._entity.getSubEntitiesByRel('item');
	}
}
