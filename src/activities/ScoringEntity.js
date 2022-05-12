import { Entity } from '../es6/Entity.js';
import { Actions } from '../hypermedia-constants.js';
import { performSirenAction } from '../es6/SirenAction.js';

/**
 * ScoringEntity class representation of an activity's scoreOutOf subentity
 */
export class ScoringEntity extends Entity {
	/**
	 * @returns {string} Activitiy's scoreOutOf
	 */
	scoreOutOf() {
		return this._entity && this._entity.properties && this._entity.properties.scoreOutOf;
	}

	/**
	 * @returns {string} Activity's grade maxPoints, if there is a grade association
	 */
	gradeMaxPoints() {
		return this._entity && this._entity.properties && this._entity.properties.gradeMaxPoints;
	}

	/**
	 * @returns {bool} Activity's grade maxPoints is set by an autoPoints (distributed points) grade category
	 */
	autoPoints() {
		return this._entity && this._entity.properties && this._entity.properties.autoPoints;
	}

	/**
	 * @returns {Number} Activity's grade object ID, if there is a grade association
	 */
	gradeObjectId() {
		return this._entity && this._entity.properties && this._entity.properties.gradeObjectId;
	}

	/**
	 * @returns {bool} Whether or not the update score out of action is present
	 */
	canUpdateScoring() {
		return this._entity && this._entity.hasActionByName(Actions.activities.scoreOutOf.update);
	}

	equals(scoring) {
		return this.gradeMaxPoints() === scoring.gradeMaxPoints;
	}

	_getUpdateAction() {
		return this.canUpdateScoring() && this._entity.getActionByName(Actions.activities.scoreOutOf.update);
	}

	_getUpdateFieldName() {
		const updateAction = this._getUpdateAction();
		if (!updateAction) {
			return;
		}
		return updateAction.fields[0].name;
	}

	async save(scoring) {
		if (!scoring || !this.canUpdateScoring()) {
			return;
		}

		if (scoring.gradeMaxPoints !== this.gradeMaxPoints()) {
			const fields = [{ name: this._getUpdateFieldName(), value: scoring.gradeMaxPoints || '' }];
			return await performSirenAction(this._token, this._getUpdateAction(), fields);
		}
	}
}
