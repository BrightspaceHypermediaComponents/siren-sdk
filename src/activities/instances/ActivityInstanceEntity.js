import { Classes } from '../../../hypermedia-constants.js';
import { Entity } from '../../../es6/Entity.js';

export class ActivityInstanceEntity extends Entity {
	activityType() {
		const activityMap = {
			'https://api.brightspace.com/rels/Assignment': 'Assignment',
			'https://api.brightspace.com/rels/Content': 'Content',
			'https://api.brightspace.com/rels/Checklist': 'Checklist',
			'https://api.brightspace.com/rels/Discussion': 'Discussion',
			'https://api.brightspace.com/rels/Forum': 'Discussion Forum',
			'https://api.brightspace.com/rels/Topic': 'Discussion Topic',
			'https://api.brightspace.com/rels/GameMap': 'Game Map',
			'https://api.brightspace.com/rels/KA': 'Knowledge Acquisition',
			'https://api.brightspace.com/rels/Material': 'Material',
			'https://api.brightspace.com/rels/Quiz': 'Quiz',
			'https://api.brightspace.com/rels/Survey': 'Survey',
		};

		for (const link of this._entity.Links) {
			if (activityMap.hasOwnProperty(link.Rel)) {
				return activityMap[link.Rel];
			}
		}

		return null;
	}

	startDate() {
		return this._entity?.getSubEntitiesByClass(Classes.dates.startDate)?.startDate;
	}

	startDateType() {
		return this._entity?.getSubEntitiesByClass(Classes.dates.startDateType)?.startDateType;
	}

	endDate() {
		return this._entity?.getSubEntitiesByClass(Classes.dates.endDate)?.endDate;
	}

	endDateType() {
		return this._entity?.getSubEntitiesByClass(Classes.dates.endDate)?.endDateType;
	}

	dueDate() {
		return this._entity?.getSubEntitiesByClass(Classes.dates.dueDate)?.date;
	}
}
