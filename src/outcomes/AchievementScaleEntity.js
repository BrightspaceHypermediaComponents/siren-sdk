import { Entity } from '../es6/Entity';
import { AchievementLevelEntity } from './AchievementLevelEntity';

export class AchievementScaleEntity extends Entity {
	onLevelChanged(onChange) {
		const levels = this._getLevels();
		levels.forEach((level, index) => {
			const onChangeWithIndex = (x) => {
				x.index = index;
				onChange(x);
			};
			level && this._subEntity(AchievementLevelEntity, level, onChangeWithIndex);
		});
	}

	_getLevels() {
		if (!this._entity) {
			return;
		}

		return this._entity.getSubEntitiesByClass(AchievementLevelEntity.class);
	}
}
