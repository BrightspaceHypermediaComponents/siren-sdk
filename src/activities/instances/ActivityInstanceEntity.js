import { Classes, Rels } from '../../hypermedia-constants.js';
import { Entity } from '../../es6/Entity.js';

export class ActivityInstanceEntity extends Entity {
	activityType() {
		const activityMap = {
			'https://api.brightspace.com/rels/assignment': 'Assignment',
			'https://api.brightspace.com/rels/content': 'Content',
			'https://api.brightspace.com/rels/checklist': 'Checklist',
			'https://api.brightspace.com/rels/discussion': 'Discussion',
			'https://api.brightspace.com/rels/forum': 'Discussion Forum',
			'https://api.brightspace.com/rels/topic': 'Discussion Topic',
			'https://api.brightspace.com/rels/gamemap': 'Game Map',
			'https://api.brightspace.com/rels/kA': 'Knowledge Acquisition',
			'https://api.brightspace.com/rels/material': 'Material',
			'https://api.brightspace.com/rels/quiz': 'Quiz',
			'https://api.brightspace.com/rels/survey': 'Survey',
		};

		for (const link of this._entity.links) {
			if (activityMap.hasOwnProperty(link.rel)) {
				return activityMap[link.rel];
			}
		}

		return null;
	}

	startDate() {
		return this._entity?.getSubEntityByClass(Classes.dates.startDate)?.properties?.date;
	}

	startDateType() {
		return this._entity?.getSubEntityByClass(Classes.dates.startDate)?.properties?.availabilityType;
	}

	endDate() {
		return this._entity?.getSubEntityByClass(Classes.dates.endDate)?.properties?.date;
	}

	endDateType() {
		return this._entity?.getSubEntityByClass(Classes.dates.endDate)?.properties?.availabilityType;
	}

	dueDate() {
		return this._entity?.getSubEntityByClass(Classes.dates.dueDate)?.properties?.date;
	}

	getLearnerCompletion() {
		let totalCount = 0;
		let completedCount = 0;

		// get assigned activities
		const assignedActivitiesLink = this._entity?.getLinkByRel(Rels.Activities.assignedActivites);
		const assignedActivitiesEntity = new Entity(assignedActivitiesLink?.href, this._token, this._listener);

		totalCount = assignedActivitiesEntity?.properties?.totalItemCount;

		// this should probably be async...
		for (const link of assignedActivitiesEntity.getLinksByRel('item')) {
			const assignedActivityEntity = new Entity(link.href, this._token, this._listener);
			if (assignedActivityEntity.hasSubEntityByClass('complete')) {
				completedCount++;
			}
		}

		return {
			completedCount: completedCount,
			totalCount: totalCount,
		};
	}
}
