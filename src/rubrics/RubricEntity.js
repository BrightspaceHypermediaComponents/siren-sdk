import { Classes } from '../hypermedia-constants.js';
import { Entity } from '../es6/Entity.js';

export class RubricEntity extends Entity {
	name() {
		return this._entity && this._entity.properties && this._entity.properties.name;
	}
	rubricId() {
		return this._entity && this._entity.properties && this._entity.properties.rubricId;
	}
	isTextOnly() {
		return this._entity && this._entity.hasClass(Classes.rubrics.text);
	}
}
