'use strict';

import { Entity } from '../es6/Entity.js';
import { SimpleEntity } from '../es6/SimpleEntity.js';
import { Rels, Classes, Actions } from '../hypermedia-constants';
import { NotificationCollectionEntity } from '../notifications/NotificationCollectionEntity';
import { SequenceEntity } from '../sequences/SequenceEntity.js';
export const classes = {
	course: 'course',
	active: 'active',
	inactive: 'inactive'
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

	startDate() {
		return this._entity && this._entity.properties && this._entity.properties.startDate;
	}

	isActive() {
		return this._entity && this._entity.properties && this._entity.properties.isActive;
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

	onSemesterChange(onChange) {
		const semesterHref = this._semesterHref();
		// _subEntity builds new sub entity and allows this object to track it.
		// So all sub entities are dispose when this object is disposed.
		semesterHref && this._subEntity(OrganizationEntity, semesterHref, onChange);
	}

	onImageChange(onChange) {
		const image = this.imageEntity();
		const imageHref = image && image.href;
		imageHref && this._subEntity(SimpleEntity, imageHref, onChange);
	}

	onNotificationsChange(onChange) {
		const notificationsHref = this._notificationCollectionHref();
		notificationsHref && this._subEntity(NotificationCollectionEntity, notificationsHref, onChange);
	}

	onSequenceChange(onChange) {
		const sequenceLink = this.sequenceLink();
		sequenceLink && this._subEntity(SequenceEntity, sequenceLink, onChange);
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
}
