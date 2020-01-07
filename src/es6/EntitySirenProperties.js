'use strict';

/**
 * Abstract Entity class to help create entity classes.
 */
export class EntitySirenProperties {
	/**
	 * Checks to see if the entity has className attached.
	 * @param {*} className Class name you want to see if the entity has attached to it.
	 */
	hasClass(className) {
		return this._entity && this._entity.hasClass(className);
	}
	/**
	 * Get the action with an Action name that is attached to the entity
	 * @param {*} actionName Action name to get the action attached to the entity.
	 */
	getActionByName(actionName) {
		if (!this._entity || !this._entity.hasActionByName(actionName)) {
			return;
		}

		return this._entity.getActionByName(actionName);
	}
}
