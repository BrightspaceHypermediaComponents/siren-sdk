import { EnrollmentEntity } from '../../src/enrollments/EnrollmentEntity.js';
import { expect } from '@open-wc/testing';
import SirenParse from 'siren-parser';

describe('EnrollmentEntity', () => {
	let enrollmentEntity, action;

	beforeEach(() => {

		action = {
			name: 'unpin-course',
			method: 'PUT',
			href: '/enrollments/users/169/organizations/1'
		};

		const entity = SirenParse({
			class: ['pinned', 'enrollment'],
			entities: [
				{
					class: ['enrollment'],
					rel: ['https://api.brightspace.com/rels/enrollment'],
					href: 'enrollments/1.json'
				},
				{
					class: ['enrollment'],
					rel: ['https://api.brightspace.com/rels/enrollment'],
					href: 'enrollments/1.json'
				}
			],
			rel: ['https://api.brightspace.com/rels/user-enrollment'],
			actions: [action],
			links: [{
				rel: ['https://api.brightspace.com/rels/organization'],
				href: 'organizations.json'
			}, {
				rel: ['self'],
				href: '/enrollments/users/169/organizations/1'
			}, {
				rel: ['https://activities.api.brightspace.com/rels/user-activity-usage'],
				href: 'userActivityUsage.json'
			}]
		});
		enrollmentEntity = new EnrollmentEntity(entity);
	});

	describe('Tests for Propreties', () => {
		it('Return correct organizationHref', () => {
			expect(enrollmentEntity.organizationHref()).to.equal('organizations.json');
		});

		it('Return correct userActivityUsageUrl', () => {
			expect(enrollmentEntity.userActivityUsageUrl()).to.equal('userActivityUsage.json');
		});

		it('Should have class pinned', () => {
			expect(enrollmentEntity.pinned()).to.equal(true);
		});

		it('Should have pin action', () => {
			const pinAction = enrollmentEntity.pinAction();
			expect(pinAction.name).to.equal(action.name);
			expect(pinAction.method).to.equal(action.method);
			expect(pinAction.href).to.equal(action.href);
		});

		it('Should have two enrollments', () => {
			const enrollments = enrollmentEntity.enrollments();
			expect(enrollments.length).to.equal(2);
			expect(enrollments[0].class).to.contains('enrollment');
			expect(enrollments[1].class).to.contains('enrollment');
			expect(enrollments[0].href).to.equal('enrollments/1.json');
			expect(enrollments[1].href).to.equal('enrollments/1.json');
		});
	});
});
