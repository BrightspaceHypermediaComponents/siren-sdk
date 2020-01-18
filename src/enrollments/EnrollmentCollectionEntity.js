import { Entity } from '../es6/Entity.js';
import { Rels, Actions } from '../hypermedia-constants';
import { EnrollmentEntity } from './EnrollmentEntity';

const rels = {
	myLearning: 'https://api.brightspace.com/rels/my-learning'
};

/**
 * A collection of sub entities pointing to distinct enrollments
 */
export class EnrollmentCollectionEntity extends Entity {
	/**
	 * @returns list of string represented hrefs pointing to siren entities
	 */
	enrollmentsHref() {
		if (!this._entity || !this._entity.getSubEntitiesByRel) {
			return;
		}
		const enrollmentEntities = this._entity.getSubEntitiesByRel(Rels.userEnrollment);
		return enrollmentEntities.map(e => e.href).filter(href => href);
	}

	onEnrollmentsChange(onChange) {
		const enrollments = this.enrollmentsHref();

		enrollments.forEach((entity, index) => {
			const onChangeWithIndex = collectedEnrollment => {
				onChange(collectedEnrollment, index);
			};
			entity && this._subEntity(EnrollmentEntity, entity, onChangeWithIndex);
		});
	}

	searchMyPinnedEnrollmentsAction() {
		return this.getActionByName(Actions.enrollments.searchMyPinnedEnrollments);
	}

	searchMyEnrollmentsAction() {
		return this.getActionByName(Actions.enrollments.searchMyEnrollments);
	}

	getEnrollmentEntities() {
		return this._entity.getSubEntitiesByClass('enrollment');
	}

	hasMoreEnrollments() {
		return this._entity.hasLinkByRel('next');
	}

	getNextEnrollmentHref() {
		if (!this.hasMoreEnrollments()) {
			return;
		}

		return this._entity.getLinkByRel('next').href;
	}

	hasMyLearning() {
		return this._entity.hasLinkByRel(rels.myLearning);
	}

	getMyLearningHref() {
		if (!this.hasMyLearning()) {
			return;
		}

		return this._entity.getLinkByRel(rels.myLearning).href;
	}

	getSearchEnrollmentsActions() {
		return this._entity.getActionByName(Actions.enrollments.searchMyEnrollments);
	}

	onEnrollmentEntityChange(url, OnChange) {
		url && this._subEntity(EnrollmentEntity, url, OnChange);
	}
}
