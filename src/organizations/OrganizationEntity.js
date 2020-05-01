import { Entity } from '../es6/Entity.js';
import { SimpleEntity } from '../es6/SimpleEntity.js';
import { AlertsEntity } from './AlertsEntity.js';
import { Rels, Classes, Actions } from '../hypermedia-constants';
import { NotificationCollectionEntity } from '../notifications/NotificationCollectionEntity';
import { SequenceEntity } from '../sequences/SequenceEntity.js';
import { ActivityUsageEntity } from '../activities/ActivityUsageEntity.js';
import { performSirenAction } from '../es6/SirenAction';

export const classes = {
	active: 'active',
	course: 'course',
	courseOffering: 'course-offering',
	inactive: 'inactive',
	learningPath: 'learning-path',
};

export const rels = {
	alerts: 'https://api.brightspace.com/rels/notification-alerts'
};

const actions = {
	delete: 'delete'
};

/**
 * OrganizationEntity class representation of a d2l organization. TODO: expand on what an organization is
 */
export class OrganizationEntity extends Entity {
	// Entity has a constructor that is called from the factory to keep track of what is required to be cleaned.
	name() {
		return this._entity && this._entity.properties && this._entity.properties.name;
	}

	code() {
		return this._entity && this._entity.properties && this._entity.properties.code;
	}

	endDate() {
		return this._entity && this._entity.properties && this._entity.properties.endDate;
	}

	isAfterEndDate() {
		var nowDate = Date.now();
		var endDate = Date.parse(this.endDate());
		return endDate ? endDate <= nowDate : null;
	}

	startDate() {
		return this._entity && this._entity.properties && this._entity.properties.startDate;
	}

	isBeforeStartDate() {
		var nowDate = Date.now();
		var startDate = Date.parse(this.startDate());
		return startDate ? startDate > nowDate : null;
	}

	isActive() {
		return this._entity && this._entity.properties && this._entity.properties.isActive;
	}

	processedDate(hideCourseStartDate, hideCourseEndDate) {
		var nowDate = Date.now();
		var startDate = Date.parse(this.startDate());
		var endDate = Date.parse(this.endDate());
		var dateType = null;
		var date = null;

		if (startDate > nowDate) {
			dateType = 'startsAt';
			date = new Date(startDate);
			if (hideCourseStartDate) {
				return null;
			}
		} else if (endDate < nowDate) {
			dateType = 'ended';
			date = new Date(endDate);
			if (hideCourseEndDate) {
				return null;
			}
		} else if (endDate >= nowDate) {
			dateType = 'endsAt';
			date = new Date(endDate);
			if (hideCourseEndDate) {
				return null;
			}
		} else {
			return null;
		}

		const dateTime = {
			type: dateType,
			date: date,
			beforeStartDate: startDate ? startDate > nowDate : null,  // To delete, use isBeforeStartDate()
			afterEndDate: endDate ? endDate <= nowDate : null         // To delete, use isAfterEndDate()
		};
		return dateTime;
	}

	description() {
		let description = this._entity && this._entity.properties && this._entity.properties.description;
		if (description) {
			description = description.replace(/<[^>]*>/g, '');
		}
		return description;
	}

	sequenceLink() {
		return this._entity && this._entity.hasLinkByRel('https://api.brightspace.com/rels/sequence') &&
		this._entity.getLinkByRel('https://api.brightspace.com/rels/sequence').href;
	}

	organizationHomepageUrl() {
		if (!this._entity || !this._entity.hasSubEntityByRel(Rels.organizationHomepage)) {
			return;
		}

		var homepageEntity = this._entity.getSubEntityByRel(Rels.organizationHomepage);
		return homepageEntity
			&& homepageEntity.properties
			&& homepageEntity.properties.path;
	}
	fullyQualifiedOrganizationHomepageUrl() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.organizationHomepage)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.organizationHomepage).href;
	}
	courseInfoUrl() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.courseOfferingInfoPage)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.courseOfferingInfoPage).href;
	}

	canChangeCourseImage() {
		return this._entity
			&& this._entity.hasActionByName(Actions.organizations.setCatalogImage);
	}

	imageEntity() {
		return this._entity && this._entity.getSubEntityByClass(Classes.courseImage.courseImage);
	}

	alertsUrl() {
		if (!this._entity || !this._entity.hasLinkByRel(rels.alerts)) {
			return;
		}

		return this._entity.getLinkByRel(rels.alerts).href;
	}

	onAlertsChange(onChange) {
		const alertsHref = this.alertsUrl();
		alertsHref && this._subEntity(AlertsEntity, alertsHref, onChange);
	}

	onSemesterChange(onChange) {
		const semesterHref = this._semesterHref();
		// _subEntity builds new sub entity and allows this object to track it.
		// So all sub entities are dispose when this object is disposed.
		semesterHref && this._subEntity(OrganizationEntity, semesterHref, onChange);
	}

	onImageChange(onChange) {
		const image = this.imageEntity();
		image && this._subEntity(SimpleEntity, image, onChange);
	}

	onNotificationsChange(onChange) {
		const notificationsHref = this._notificationCollectionHref();
		notificationsHref && this._subEntity(NotificationCollectionEntity, notificationsHref, onChange);
	}

	onSequenceChange(onChange) {
		const sequenceLink = this.sequenceLink();
		sequenceLink && this._subEntity(SequenceEntity, sequenceLink, onChange);
	}

	canDelete() {
		return this._entity.hasActionByName(actions.delete);
	}

	async delete() {
		const action = this.canDelete() && this._entity.getActionByName(actions.delete);
		if (!action) {
			return;
		}

		await performSirenAction(this._token, action);
	}

	_semesterHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.parentSemester)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.parentSemester).href;
	}

	_notificationCollectionHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.Notifications.organizationNotifications)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.Notifications.organizationNotifications).href;
	}

	onActivityUsageChange(onChange) {
		const activityUsageHref = this._activityUsageHref();
		activityUsageHref && this._subEntity(ActivityUsageEntity, activityUsageHref, onChange);
	}

	_activityUsageHref() {
		const rel = Rels.Activities.activityUsage;
		if (!this._entity || !this._entity.hasLinkByRel(rel)) {
			return;
		}

		return this._entity.getLinkByRel(rel).href;
	}
}
