import { Entity } from '../../../es6/Entity';
import { Actions, Classes } from '../../../hypermedia-constants';
import { performSirenAction } from '../../../es6/SirenAction.js';

const IP_START_FIELD = 'start';
const IP_END_FIELD = 'end';

/**
 * Quiz IP restrictions subentity of a d2l Quiz.
 */
export class QuizIpRestrictionsEntity extends Entity {

	/**
	 * @returns {bool} Whether or not the edit IP restrictions type action is present
	 */

	canEditIpRestrictions() {
		return this._entity && this._entity.hasActionByName(Actions.quizzes.ipRestrictions.add);
	}

	/**
	 * @returns {object} Returns IP restriction sub entity
	 */

	getIpRestrictions() {
		if (!this._entity) {
			return;
		}

		const ipRestrictionEntities = this._entity.getSubEntitiesByClass(Classes.quizzes.ip.range);

		if (!ipRestrictionEntities || !ipRestrictionEntities.length) {
			return [{ start: '', end: '' }];
		}

		return ipRestrictionEntities.map(({ properties }, index) => {

			const { start, end } = properties;
			return {
				start,
				end,
				id: index
			};
		});
	}

	/**
	 * @returns {object} Returns IP range sub entity
	 */

	_getIpRestriction(id) {
		const ipRestrictionEntities = this._entity && this._entity.getSubEntitiesByClass(Classes.quizzes.ip.range);

		if (!ipRestrictionEntities || !ipRestrictionEntities.length) {
			return;
		}

		const entity = ipRestrictionEntities[id];

		if (!entity) {
			return;
		}

		return entity;
	}

	/**
	 * @param {string} start IP range start
	 * @param {string} end IP range end
	 * @returns {null}
	*/

	async addIpRestriction(restriction) {
		if (!this.canEditIpRestrictions()) return;

		const { start, end } = restriction;

		const action = this._entity.getActionByName(Actions.quizzes.ipRestrictions.add);
		const fields = [
			{ name: IP_START_FIELD, value: start },
			{ name: IP_END_FIELD, value: end }
		];

		await performSirenAction(this._token, action, fields);
	}

	/**
	 * @param {string} start Start of IP range to delete
	 * @param {string} end End of IP range to delete
	 * @returns {null}
	*/

	async deleteIpRestriction(id) {
		if (!this.canEditIpRestrictions()) return;

		const entity = this._getIpRestriction(id);

		if (!entity) return;

		const action = entity.getActionByName(Actions.quizzes.ipRestrictions.delete);

		await performSirenAction(this._token, action);
	}

	async updateIpRestriction(restriction) {
		if (!this.canEditIpRestrictions()) {
			return;
		}

		const { start, end } = restriction;

		const entity = this._getIpRestriction(restriction.id);

		if (!entity) {
			return;
		}

		const action = entity.getActionByName(Actions.quizzes.ipRestrictions.update);
		const fields = [
			{ name: IP_START_FIELD, value: start },
			{ name: IP_END_FIELD, value: end }
		];

		await performSirenAction(this._token, action, fields);
	}
}
