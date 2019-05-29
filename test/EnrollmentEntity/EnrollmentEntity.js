/* global describe it expect*/
import { EnrollmentEntity } from '../../src/enrollments/EnrollmentEntity';

describe('EnrollmentEntity', () => {
	var sandbox, enrollmentEntity, action;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();

		action = {
			name: 'unpin-course',
			method: 'PUT',
			href: '/enrollments/users/169/organizations/1'
		};

		var entity = window.D2L.Hypermedia.Siren.Parse({
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

	afterEach(() => {
		sandbox.restore();
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
			var pinAction = enrollmentEntity.pinAction();
			expect(pinAction.name).to.equal(action.name);
			expect(pinAction.method).to.equal(action.method);
			expect(pinAction.href).to.equal(action.href);
		});

		it('Should have two enrollments', () => {
			var enrollments = enrollmentEntity.enrollments();
			expect(enrollments.length).to.equal(2);
			expect(enrollments[0].class).to.contains('enrollment');
			expect(enrollments[1].class).to.contains('enrollment');
			expect(enrollments[0].href).to.equal('enrollments/1.json');
			expect(enrollments[1].href).to.equal('enrollments/1.json');
		});
	});

	describe('Tests for onChange functions', () => {
		it('Should have onOrganizationChange called', done => {
			var onChangeStub = sinon.stub();
			enrollmentEntity.onOrganizationChange(onChangeStub);
			setTimeout(() => {
				expect(onChangeStub).to.be.called.once;
				done();
			}, 50);
		});

		it('Should have onUserActivityUsageChange called', done => {
			var onChangeStub = sinon.stub();
			enrollmentEntity.onUserActivityUsageChange(onChangeStub);
			setTimeout(() => {
				expect(onChangeStub).to.be.called.once;
				done();
			}, 50);
		});
	});
});
