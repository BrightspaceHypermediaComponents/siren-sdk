import { Entity } from '../../es6/Entity';
import { Actions, Rels, Classes } from '../../hypermedia-constants';
import { performSirenAction } from '../../es6/SirenAction';

/** Bridge entity from legacy <-> hypermedia. */
export class LegacyConditions extends Entity {

	conditions() {

		if (!this._entity) {
			return [];
		}

		return this._entity
			.getSubEntitiesByRel('item')
			.filter(entity => entity.hasClass(Classes.conditions.legacyCondition))
			.map(entity => ({ id: entity.properties.conditionId, text: entity.title }));
	}

	/** @returns {bool} Whether the attach existing dialog opener sub entity is present. */
	canAttachExisting() {

		if (!this._entity) {
			return false;
		}

		return this._entity.hasSubEntityByRel(Rels.Conditions.attachDialogOpener);
	}

	/** @returns {string} Attach existing dialog url */
	attachExistingDialogUrl() {

		const entity = this._entity.getSubEntityByRel(Rels.Conditions.attachDialogOpener);
		return entity ? entity.properties.url : undefined;
	}

	/** @returns {String} Attach existing open button text*/
	attachExistingOpenButtonText() {

		const entity = this._entity.getSubEntityByRel(Rels.Conditions.attachDialogOpener);
		return entity ? entity.title : undefined;
	}

	/** @returns {String} Attach existing dialog title */
	attachExistingDialogTitle() {

		const entity = this._entity.getSubEntityByRel(Rels.Conditions.attachDialogOpener);
		return entity ? entity.properties.dialogTitle : undefined;
	}

	/** @returns {String} Attach existing positive button text */
	attachExistingPositiveButtonText() {

		const entity = this._entity.getSubEntityByRel(Rels.Conditions.attachDialogOpener);
		return entity ? entity.properties.positiveText : undefined;
	}

	/** @returns {String} Attach existing negative button text */
	attachExistingNegativeButtonText() {

		const entity = this._entity.getSubEntityByRel(Rels.Conditions.attachDialogOpener);
		return entity ? entity.properties.negativeText : undefined;
	}

	/** @returns {bool} Whether the create new dialog opener sub entity is present. */
	canCreateNew() {

		if (!this._entity) {
			return false;
		}

		return this._entity.hasSubEntityByRel(Rels.Conditions.createDialogOpener);
	}

	/** @returns {string} Create new dialog url */
	createNewDialogUrl() {

		const entity = this._entity.getSubEntityByRel(Rels.Conditions.createDialogOpener);
		return entity ? entity.properties.url : undefined;
	}

	/** @returns {String} Create new open button text*/
	createNewOpenButtonText() {

		const entity = this._entity.getSubEntityByRel(Rels.Conditions.createDialogOpener);
		return entity ? entity.title : undefined;
	}

	/** @returns {String} Create new dialog title */
	createNewDialogTitle() {

		const entity = this._entity.getSubEntityByRel(Rels.Conditions.createDialogOpener);
		return entity ? entity.properties.dialogTitle : undefined;
	}

	/** @returns {String} Create new positive button text */
	createNewPositiveButtonText() {

		const entity = this._entity.getSubEntityByRel(Rels.Conditions.createDialogOpener);
		return entity ? entity.properties.positiveText : undefined;
	}

	/** @returns {String} Create new negative button text */
	createNewNegativeButtonText() {

		const entity = this._entity.getSubEntityByRel(Rels.Conditions.createDialogOpener);
		return entity ? entity.properties.negativeText : undefined;
	}

	/** @returns {bool} Whether operator can be edited */
	canEditOperator() {

		if (!this._entity) {
			return false;
		}

		return this._entity.hasSubEntityByRel(Rels.Conditions.operators);
	}

	/** @returns {Array} Operator options */
	operatorOptions() {

		const entity = this._entity.getSubEntityByRel(Rels.Conditions.operators);
		return entity ? entity.properties.options : undefined;
	}

	/** @returns {bool} Whether they can save. */
	canSave() {

		if (!this._entity) {
			return false;
		}

		return this._entity.hasActionByName(Actions.conditions.legacyReplace);
	}

	/** Saves. */
	async save(changes) {

		if (!this._entity) {
			return;
		}

		const action = this._entity.getActionByName(Actions.conditions.legacyReplace);
		if (!action) {
			return;
		}

		const fields = [{ name: 'changes', value: changes }];

		await performSirenAction(this._token, action, fields);
	}
}
