import { Classes } from '../../../hypermedia-constants.js';
import { Entity } from '../../../es6/Entity.js';

export class ActivityInstanceEntity extends Entity {
	activityType() {
		
	}

	startDate() {
		const availabilityStartDate = this._entity && this._entity.entities && this._entity.getSubEntitiesByClass(Classes.dates.startDate);
		return availabilityStartDate && availabilityStartDate.startDate;
	}

	startDateType() {
		const availabilityStartDate = this._entity && this._entity.entities && this._entity.getSubEntitiesByClass(Classes.dates.startDate);
		return availabilityStartDate && availabilityStartDate.startDateType;
	}

	endDate() {
		const availabilityEndDate = this._entity && this._entity.entities && this._entity.getSubEntitiesByClass(Classes.dates.startDate);
		return availabilityEndDate && availabilityEndDate.endDate;
	}

	endDateType() {
		const availabilityEndDate = this._entity && this._entity.entities && this._entity.getSubEntitiesByClass(Classes.dates.startDate);
		return availabilityEndDate && availabilityEndDate.endDateType;
	}

	dueDate() {
		const dueDate = this._entity && this._entity.entities && this._entity.getSubEntitiesByClass(Classes.dates.dueDate);
		return dueDate && dueDate.date;
	}
}
