import { Entity } from '../es6/Entity';
import { SelflessEntity } from '../es6/SelflessEntity';

export class DemonstrationEntity extends Entity {
	static get class() { return 'demonstration'; }

	static get classes() {
		return {
			assessed: 'assessed'
		};
	}

	getDateAssessed() {
		return this._entity && this._entity.properties && this._entity.properties.dateAssessed;
	}

	getDemonstratedLevel() {
		if (!this._entity) {
			return;
		}

		const levelEntity = this._entity.getSubEntityByClasses([DemonstratableLevelEntity.class, DemonstratableLevelEntity.classes.selected]);
		return new DemonstratableLevelEntity(this, levelEntity);
	}
}

export class DemonstratableLevelEntity extends SelflessEntity {
	static get class() { return 'demonstratable-level'; }

	static get classes() {
		return {
			selected: 'selected'
		};
	}

	getLevelId() {
		return this._entity && this._entity.properties && this._entity.properties.levelId;
	}
}
