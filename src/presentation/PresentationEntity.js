import { Entity } from '../es6/Entity.js';
/**
 * A collection of sub entities pointing to distinct enrollments
 */
export class PresentationEntity extends Entity {
	/**
	 * @returns list of string represented hrefs pointing to siren entities
	 */
	hideCourseStartDate() {
		return this._entity && this._entity.properties && this._entity.properties.HideCourseStartDate;
	}

	hideCourseEndDate() {
		return this._entity && this._entity.properties && this._entity.properties.HideCourseEndDate;
	}

	showOrganizationCode() {
		return this._entity && this._entity.properties && this._entity.properties.ShowCourseCode;
	}

	showSemesterName() {
		return this._entity && this._entity.properties && this._entity.properties.ShowSemester;
	}

	showDropboxUnreadFeedback() {
		return this._entity && this._entity.properties && this._entity.properties.ShowDropboxUnreadFeedback;
	}

	showUnattemptedQuizzes() {
		return this._entity && this._entity.properties && this._entity.properties.ShowUnattemptedQuizzes;
	}

	showUngradedQuizAttempts() {
		return this._entity && this._entity.properties && this._entity.properties.ShowUngradedQuizAttempts;
	}

	showUnreadDiscussionMessages() {
		return this._entity && this._entity.properties && this._entity.properties.ShowUnreadDiscussionMessages;
	}

	showUnreadDropboxSubmissions() {
		return this._entity && this._entity.properties && this._entity.properties.ShowUnreadDropboxSubmissions;
	}
}
