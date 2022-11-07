import { Actions } from '../hypermedia-constants.js';
import { Entity } from '../es6/Entity.js';
import { performSirenActions } from '../es6/SirenAction.js';

const UNEVAL_AS_ZERO = 'unevalAsZero';
const ALLOW_MULTIPLE = 'allowMultiple';
const CALCULATION_METHOD = 'calculationMethod';

export class ActivityEvaluationEntity extends Entity {

	/** @returns {bool} Whether or not the update evaluation out of action is present*/
	canUpdateEvaluation() {
		return this._entity && this._entity.hasActionByName(Actions.activities.evaluation.updateEvaluation);
	}

	getUpdateEvaluationAction() {
		if (!this.canUpdateEvaluation()) return;
		return this._entity.getActionByName(Actions.activities.evaluation.updateEvaluation);
	}

	/** @returns {bool} Whether or not the update evaluation has the correct field */
	hasEvaluationFieldByName(name) {
		const updateEvalAction = this.getUpdateEvaluationAction();
		if (!updateEvalAction) return;

		return updateEvalAction.hasFieldByName(name);
	}

	getEvaluationFieldByName(name) {
		const updateEvalAction = this.getUpdateEvaluationAction();
		if (!updateEvalAction) return;

		if (!this.hasEvaluationFieldByName(name)) return;

		return updateEvalAction.getFieldByName(name).value;
	}

	hasUnevalAsZero() {
		return this.hasEvaluationFieldByName(UNEVAL_AS_ZERO);
	}

	getUnevalAsZero() {
		return this.getEvaluationFieldByName(UNEVAL_AS_ZERO);
	}

	hasAllowMultiple() {
		return this.hasEvaluationFieldByName(ALLOW_MULTIPLE);
	}

	getAllowMultiple() {
		return this.getEvaluationFieldByName(ALLOW_MULTIPLE);
	}

	hasCalculationMethod() {
		return this.hasEvaluationFieldByName(CALCULATION_METHOD);
	}

	getCalculationMethods() {
		return this.getEvaluationFieldByName(CALCULATION_METHOD);
	}

	getCalculationMethodSelection() {
		const options = this.getCalculationMethods();
		const selected = options?.find(option => option?.selected);
		return selected?.value || '';
	}

	_formatEvaluationField(fieldName, value) {
		return { name: fieldName, value: value };
	}

	async save(evaluation) {
		if (!evaluation) {
			return;
		}

		const action = this.getUpdateEvaluationAction();
		if (!action) {
			return;
		}

		const fields = [
			this._formatEvaluationField(ALLOW_MULTIPLE, evaluation.allowMultiple),
			this._formatEvaluationField(UNEVAL_AS_ZERO, evaluation.unevalAsZero),
			this._formatEvaluationField(CALCULATION_METHOD, evaluation.calculationMethods),
		];

		const sirenActions = [{ action, fields }];

		await performSirenActions(this._token, sirenActions);
	}

}
