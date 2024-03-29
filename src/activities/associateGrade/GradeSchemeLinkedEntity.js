import { Actions, Classes, Rels } from '../../hypermedia-constants.js';
import { AssociateGradeEntity } from './AssociateGradeEntity.js';
import { Entity } from '../../es6/Entity.js';
import { performSirenAction } from '../../es6/SirenAction.js';

/**
 * GradeSchemeLinkedEntity class representation of a grade scheme linked entity
 */
export class GradeSchemeLinkedEntity extends Entity {

	href() {
		if (!this._entity) {
			return;
		}
		return this._entity.getLinkByRel(Rels.Grades.scheme).href;
	}
	/**
	 * @returns {number} Grade scheme's id, will be -1 when default scheme is chosen
	 */
	schemeId() {
		return this._entity && this._entity.properties && this._entity.properties.gradeSchemeId;
	}

	canChooseScheme() {
		if (!this._entity) {
			return false;
		}
		return this._entity.hasActionByName(Actions.activities.associateGrade.chooseScheme);
	}

	isSelected() {
		if (!this._entity) {
			return false;
		}
		return this._entity.hasClass(Classes.activities.associateGrade.selected);
	}

	isDefault() {
		if (!this._entity) {
			return false;
		}
		return this._entity.hasClass(Classes.activities.associateGrade.default);
	}

	async selectScheme() {
		if (!this.canChooseScheme()) {
			return;
		}

		let entity;
		try {
			const action = this._entity.getActionByName(Actions.activities.associateGrade.chooseScheme);
			entity = await performSirenAction(this._token, action);
		} catch (e) {
			return Promise.reject(e);
		}

		if (!entity) return;
		return new AssociateGradeEntity(entity, this._token);
	}
}
