import { Entity } from '../es6/Entity.js';

export class CompetenciesEntity extends Entity {
	associatedCount() {
		if (!this._entity || !this._entity.properties) {
			return;
		}

		return this._entity.properties.associatedCount;
	}

	unevaluatedCount() {
		if (!this._entity || !this._entity.properties) {
			return;
		}

		return this._entity.properties.unevaluatedCount;
	}

	dialogUrl() {
		if (!this._entity || !this._entity.properties) {
			return;
		}

		return this._entity.properties.dialogUrl;
	}
}
