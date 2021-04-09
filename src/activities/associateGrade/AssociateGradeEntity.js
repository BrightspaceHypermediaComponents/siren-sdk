import { Entity } from '../../es6/Entity';
import { Actions } from '../../hypermedia-constants';
import { performSirenAction } from '../../es6/SirenAction.js';

/**
 * AssociateGrade entity of an activity.
 */
export class AssociateGradeEntity extends Entity {
	canEditGradebookStatus() {
		return this._entity && this._entity.hasActionByName(Actions.activities.associateGrade.gradebookStatus);
	}

	async setGradebookStatus(newStatus) {
		if (!this.canEditGradebookStatus()) return;

		const action = this._entity.getActionByName(Actions.activities.associateGrade.gradebookStatus);

		const fields = [{ name: 'gradebookStatus', value: newStatus }];

		await performSirenAction(this._token, action, fields);
	}
}
