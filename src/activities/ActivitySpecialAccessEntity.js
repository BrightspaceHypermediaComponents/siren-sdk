import { Entity } from '../es6/Entity.js';

/**
 * ActivitySpecialAccess: class representation of special access for an activity
 */
export class ActivitySpecialAccessEntity extends Entity {
	/**
	 * @returns {bool} Is activity restricted to users with special access.
	 */
	isRestricted() {
		return this._entity && this._entity.properties && this._entity.properties.isRestricted;
	}

	/**
	 * @returns {number} How many users have special access.
	 */
	userCount() {
		return this._entity && this._entity.properties && this._entity.properties.userCount;
	}

	/**
	 * @returns {string|null} URL to manage special access dialog.
	 */
	url() {
		return this._entity && this._entity.properties && this._entity.properties.url;
	}
}
