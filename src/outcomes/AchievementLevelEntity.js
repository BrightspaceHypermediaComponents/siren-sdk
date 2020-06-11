import { Entity } from '../es6/Entity';

export class AchievementLevelEntity extends Entity {
	static get class() { return 'level-of-achievement'; }

	getColor() {
		return this._entity && this._entity.properties && this._entity.properties.color;
	}

	getLevelId() {
		return this._entity && this._entity.properties && this._entity.properties.levelId;
	}

	getName() {
		return this._entity && this._entity.properties && this._entity.properties.name;
	}

	getSortOrder() {
		return this._entity && this._entity.properties && this._entity.properties.sortOrder;
	}
}
