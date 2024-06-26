
import { Actions, Classes, Rels } from '../hypermedia-constants.js';
import { ActivityUsageEntity } from '../activities/ActivityUsageEntity.js';
import { AlertsEntity } from './AlertsEntity.js';
import { Entity } from '../es6/Entity.js';
import { NotificationCollectionEntity } from '../notifications/NotificationCollectionEntity.js';
import { performSirenAction } from '../es6/SirenAction.js';
import { SequenceEntity } from '../sequences/SequenceEntity.js';
import { SimpleEntity } from '../es6/SimpleEntity.js';

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
	delete: 'delete',
	trackCompletion: 'track-completion',
	doNotTrackCompeltion: 'do-not-track-completion',
	displayProgress: 'display-progress',
	doNotDisplayProgress: 'do-not-display-progress'
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

	isCompletionTracked() {
		if (this._entity && this._entity.hasActionByName(actions.trackCompletion)) {
			return false;
		} else if (this._entity && this._entity.hasActionByName(actions.doNotTrackCompeltion)) {
			return true;
		}
		return undefined;
	}

	isProgressDisplayed() {
		if (this._entity && this._entity.hasActionByName(actions.displayProgress)) {
			return false;
		} else if (this._entity && this._entity.hasActionByName(actions.doNotDisplayProgress)) {
			return true;
		}
		return undefined;
	}

	isAfterEndDate() {
		const nowDate = Date.now();
		const endDate = Date.parse(this.endDate());
		return endDate ? endDate <= nowDate : null;
	}

	startDate() {
		return this._entity && this._entity.properties && this._entity.properties.startDate;
	}

	isBeforeStartDate() {
		const nowDate = Date.now();
		const startDate = Date.parse(this.startDate());
		return startDate ? startDate > nowDate : null;
	}

	isActive() {
		return this._entity && this._entity.properties && this._entity.properties.isActive;
	}

	processedDate(hideCourseStartDate, hideCourseEndDate) {
		const nowDate = Date.now();
		const startDate = Date.parse(this.startDate());
		const endDate = Date.parse(this.endDate());
		let dateType = null;
		let date = null;

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
			date: date
		};
		return dateTime;
	}

	description() {
		let description = this._entity && this._entity.properties && this._entity.properties.description;
		if (description) {
			description = description.replace(/<br\s*\/?>/gi, '\r\n');
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

		const homepageEntity = this._entity.getSubEntityByRel(Rels.organizationHomepage);
		return homepageEntity
			&& homepageEntity.properties
			&& homepageEntity.properties.path;
	}
	filesUrl() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.Files.files)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.Files.files);
	}
	fullyQualifiedOrganizationHomepageUrl() {
		return this._getHref(Rels.organizationHomepage);
	}
	courseInfoUrl() {
		return this._getHref(Rels.courseOfferingInfoPage);
	}
	copyCoursePageUrl() {
		return this._getHref(Rels.copyCoursePage);
	}
	outcomesSettingsUrl() {
		return this._getHref(Rels.Outcomes.settings);
	}

	canChangeCourseImage() {
		return this._entity
			&& this._entity.hasActionByName(Actions.organizations.setCatalogImage);
	}

	imageEntity() {
		return this._entity && this._entity.getSubEntityByClass(Classes.courseImage.courseImage);
	}

	alertsUrl() {
		return this._getHref(rels.alerts);
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

	_getHref(rel) {
		if (!this._entity || !this._entity.hasLinkByRel(rel)) {
			return;
		}
		return this._entity.getLinkByRel(rel).href;
	}

	_ancestorsHref() {
		return this._getHref(Rels.Organizations.ancestors);
	}

	_departmentsHref() {
		return this._getHref(Rels.Organizations.departments);
	}

	_semestersHref() {
		return this._getHref(Rels.Organizations.semesters);
	}

	_componentsHref() {
		return this._getHref(Rels.Organizations.components);
	}

	_userProgressHref() {
		return this._getHref(Rels.Organizations.userProgress);
	}

	_semesterHref() {
		return this._getHref(Rels.parentSemester);
	}

	_notificationCollectionHref() {
		return this._getHref(Rels.Notifications.organizationNotifications);
	}

	onActivityUsageChange(onChange) {
		const activityUsageHref = this._activityUsageHref();
		activityUsageHref && this._subEntity(ActivityUsageEntity, activityUsageHref, onChange);
	}

	_activityUsageHref() {
		return this._getHref(Rels.Activities.activityUsage);
	}

	_getCompletionAction(enabled) {
		const actionName = enabled ? actions.trackCompletion : actions.doNotTrackCompeltion;
		return this._entity.getActionByName(actionName);
	}

	_getDisplayAction(enabled) {
		const actionName = enabled ? actions.displayProgress : actions.doNotDisplayProgress;
		return this._entity.getActionByName(actionName);
	}

	updateCompletionTracking(enabled) {
		const action = this._getCompletionAction(enabled);
		if (action) {
			return performSirenAction(this._token, action, action.fields, false);
		}
		return Promise.resolve(undefined);
	}

	updateDisplayProgress(enabled) {
		const action = this._getDisplayAction(enabled);
		if (action) {
			return performSirenAction(this._token, action, action.fields, false);
		}
		return Promise.resolve(undefined);
	}
}
