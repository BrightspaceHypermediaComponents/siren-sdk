import { expect } from '@open-wc/testing';
import { PresentationEntity } from '../../src/presentation/PresentationEntity.js';

function createPresentationEntity(propertyValue) {
	return {
		properties: {
			HideCourseStartDate: propertyValue,
			HideCourseEndDate: propertyValue,
			ShowCourseCode: propertyValue,
			ShowSemester: propertyValue,
			ShowDropboxUnreadFeedback: propertyValue,
			ShowPendingEnrollmentRequests: propertyValue,
			ShowUnattemptedQuizzes: propertyValue,
			ShowUngradedQuizAttempts: propertyValue,
			ShowUnreadDiscussionMessages: propertyValue,
			ShowUnreadDropboxSubmissions: propertyValue
		}
	};
}

function assertPropertyValues(presentationEntity, expectedValue) {
	expect(presentationEntity.hideCourseStartDate()).to.equal(expectedValue);
	expect(presentationEntity.hideCourseEndDate()).to.equal(expectedValue);
	expect(presentationEntity.showOrganizationCode()).to.equal(expectedValue);
	expect(presentationEntity.showSemesterName()).to.equal(expectedValue);
	expect(presentationEntity.showDropboxUnreadFeedback()).to.equal(expectedValue);
	expect(presentationEntity.showPendingEnrollmentRequests()).to.equal(expectedValue);
	expect(presentationEntity.showUnattemptedQuizzes()).to.equal(expectedValue);
	expect(presentationEntity.showUngradedQuizAttempts()).to.equal(expectedValue);
	expect(presentationEntity.showUnreadDiscussionMessages()).to.equal(expectedValue);
	expect(presentationEntity.showUnreadDropboxSubmissions()).to.equal(expectedValue);
}

describe('PresentationEntity', () => {
	describe('Tests for actions', () => {

		[true, false].forEach(expectedValue => {
			it(`should return ${expectedValue} for all properties`, () => {
				const presentationEntity = new PresentationEntity(createPresentationEntity(expectedValue));
				assertPropertyValues(presentationEntity, expectedValue);
			});
		});

		it('should return undefined for missing properties', () => {
			const presentationEntity = new PresentationEntity({});
			assertPropertyValues(presentationEntity, undefined);
		});
	});
});
