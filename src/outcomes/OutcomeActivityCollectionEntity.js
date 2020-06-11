import { Entity } from '../es6/Entity';
import { AchievementScaleEntity } from './AchievementScaleEntity';
import { OutcomeActivityEntity } from './OutcomeActivityEntity';

export class OutcomeActivityCollectionEntity extends Entity {
	static get links() {
		return {
			defaultAchievementScale: 'default-achievement-scale'
		};
	}

	onActivityChanged(onChange) {
		const activities = this._getOutcomeActivities();
		activities.forEach((activity, index) => {
			const onChangeWithIndex = (a) => {
				a.index = index;
				onChange(a);
			};
			activity && this._subEntity(OutcomeActivityEntity, activity, onChangeWithIndex);
		});
	}

	onDefaultScaleChanged(onChange) {
		const href = this._defaultScaleHref();
		href && this._subEntity(AchievementScaleEntity, href, onChange);
	}

	_defaultScaleHref() {
		if (!this._entity || !this._entity.hasLinkByRel(OutcomeActivityCollectionEntity.links.defaultAchievementScale)) {
			return;
		}

		return this._entity.getLinkByRel(OutcomeActivityCollectionEntity.links.defaultAchievementScale).href;
	}

	_getOutcomeActivities() {
		if (!this._entity) {
			return;
		}

		return this._entity.getSubEntitiesByClass(OutcomeActivityEntity.class);
	}
}
