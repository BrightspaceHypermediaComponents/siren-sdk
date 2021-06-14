import { Entity } from '../../es6/Entity.js';
import { Classes, Actions, Rels } from '../../hypermedia-constants.js';
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

	async selectScheme() {
		if (!this.canChooseScheme()) {
			return;
		}

		const action = this._entity.getActionByName(Actions.activities.associateGrade.chooseScheme);
		await performSirenAction(this._token, action);
	}
}
