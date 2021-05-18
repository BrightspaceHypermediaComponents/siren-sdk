import { Classes } from '../../../hypermedia-constants';
import { Entity } from '../../../es6/Entity';

export class ActivityTypeEntity extends Entity {
	name() {
		return this._entity && this._entity.properties && this._entity.properties.name;
	}

	type() {
		return this._entity && this._entity.properties && this._entity.properties.type;
	}

	isGrouping() {
		return this._entity && this._entity.hasClass(Classes.quizzes.types.grouping);
	}

	isQuestion() {
		return this._entity && this._entity.hasClass(Classes.quizzes.types.question);
	}

	isExternal() {
		return this._entity && this._entity.hasClass(Classes.quizzes.types.external);
	}
}
