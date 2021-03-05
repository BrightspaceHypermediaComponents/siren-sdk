import { Entity } from '../es6/Entity';

/**
 * ActivityScoreOutOf: class representation of the score-out-of for an activity
 */

export class ActivityScoreOutOfEntity extends Entity {

	scoreOutOf() {
		return this._entity && this._entity.properties && this._entity.properties.scoreOutOf;
	}
}
