import { Entity } from '../es6/Entity';

export class CompetenciesEntity extends Entity {
	associatedCount() {
		if (!this._entity || !this._entity.properties) {
			return;
		}

		return this._entity.properties.associatedCount;
	}

	dialogUrl() {
		if (!this._entity || !this._entity.properties) {
			return;
		}

		return this._entity.properties.dialogUrl;
	}
}
