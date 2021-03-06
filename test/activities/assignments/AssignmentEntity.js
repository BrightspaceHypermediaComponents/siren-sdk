/* global fetchMock */

import { AssignmentEntity } from '../../../src/activities/assignments/AssignmentEntity.js';
import { nonEditableAssignment } from './data/NonEditableAssignment.js';
import { editableAssignment } from './data/EditableAssignment.js';
import { getFormData } from '../../utility/test-helpers.js';

describe('AssignmentEntity', () => {
	var editableEntity, nonEditableEntity;

	beforeEach(() => {
		nonEditableEntity = window.D2L.Hypermedia.Siren.Parse(nonEditableAssignment);
		editableEntity = window.D2L.Hypermedia.Siren.Parse(editableAssignment);
	});

	afterEach(() => {
		fetchMock.reset();
	});

	describe('Basic loading', () => {
		it('reads name', () => {
			var assignmentEntity = new AssignmentEntity(nonEditableEntity);
			expect(assignmentEntity.name()).to.equal('Extra Special Assignment');
		});
	});

	describe('Editable', () => {
		it('sets canEditName to true', () => {
			var assignmentEntity = new AssignmentEntity(editableEntity);
			expect(assignmentEntity.canEditName()).to.be.true;
		});
	});

	describe('Non Editable', () => {
		it('sets canEditName to false', () => {
			var assignmentEntity = new AssignmentEntity(nonEditableEntity);
			expect(assignmentEntity.canEditName()).to.be.false;
		});
	});

	describe('Equals', () => {
		it('return true when equal', () => {
			var assignmentEntity = new AssignmentEntity(editableEntity);
			expect(assignmentEntity.equals({
				name: 'Extra Special Assignment',
				instructions: '<p>These are your instructions</p>',
				submissionType: undefined,
				completionType: String(0),
				isAnonymous: false,
				annotationToolsAvailable: true,
				isIndividualAssignmentType: false,
				groupTypeId: '314',
				filesSubmissionLimit: 'unlimited',
				defaultScoringRubricId: '-1'
			})).to.be.true;
		});

		it('return false when not equal', () => {
			var assignmentEntity = new AssignmentEntity(editableEntity);
			expect(assignmentEntity.equals({
				name: 'Extra Special Assignment',
				instructions: '<p>These are your instructions</p>',
				submissionType: undefined,
				completionType: String(0),
				isAnonymous: false,
				annotationToolsAvailable: true,
				isIndividualAssignmentType: true,
				filesSubmissionLimit: 'unlimited'
			})).to.be.false;
		});

		it('ignores props that are not set', () => {
			var assignmentEntity = new AssignmentEntity(editableEntity);
			expect(assignmentEntity.equals({
				name: 'Extra Special Assignment',
				instructions: '<p>These are your instructions</p>',
				submissionType: undefined,
				annotationToolsAvailable: true,
				isIndividualAssignmentType: false,
				groupTypeId: '314',
				defaultScoringRubricId: '-1'
			})).to.be.true;
		});
	});

	describe('Saves', () => {
		it('saves name and instructions', async() => {
			fetchMock.patchOnce('https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7', editableEntity);

			var assignmentEntity = new AssignmentEntity(editableEntity);

			await assignmentEntity.save({
				name: 'New name',
				instructions: 'New instructions'
			});

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('name')).to.equal('New name');
				expect(form.get('instructions')).to.equal('New instructions');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('saves empty instructions', async() => {
			fetchMock.patchOnce('https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7', editableEntity);

			var assignmentEntity = new AssignmentEntity(editableEntity);

			await assignmentEntity.save({
				name: 'New name',
				instructions: ''
			});

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('name')).to.equal('New name');
				expect(form.get('instructions')).to.equal('');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('skips save if not dirty', async() => {
			var assignmentEntity = new AssignmentEntity(editableEntity);

			await assignmentEntity.save({
				name: 'Extra Special Assignment',
				instructions: '<p>These are your instructions</p>'
			});

			expect(fetchMock.done());
		});

		it('skips save if not editable', async() => {
			var assignmentEntity = new AssignmentEntity(nonEditableEntity);

			await assignmentEntity.save({
				name: 'New name',
				instructions: 'New instructions'
			});

			expect(fetchMock.done());
		});
	});

	describe('Deletion', () => {
		it('Delete assignment', async() => {
			fetchMock.deleteOnce('https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7', editableEntity);

			var assignmentEntity = new AssignmentEntity(editableEntity);

			await assignmentEntity.delete();
			expect(fetchMock.called()).to.be.true;
		});
	});

	describe('Cancel Create', () => {
		it('Cancel Creating assignment', async() => {
			fetchMock.deleteOnce('https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7?isCancel=1', editableEntity);

			var assignmentEntity = new AssignmentEntity(editableEntity);

			await assignmentEntity.cancelCreate();
			expect(fetchMock.called()).to.be.true;
		});
	});
	describe('FilesPerSubmission', () => {
		it('Can Edit FilesPerSubmission', () => {
			var assignmentEntity = new AssignmentEntity(editableEntity);
			expect(assignmentEntity.canEditFilesSubmissionLimit()).to.be.true;
		});
		it('equals to unlimited', () => {
			var assignmentEntity = new AssignmentEntity(editableEntity);
			expect(assignmentEntity.filesSubmissionLimit()).to.equal('unlimited');
		});
		it('set files per submission', async() => {
			fetchMock.patchOnce('https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7', editableEntity);
			var assignmentEntity = new AssignmentEntity(editableEntity);
			await assignmentEntity.setFilesSubmissionLimit('onefilepersubmission');
			expect(fetchMock.called()).to.be.true;
		});

	});

	describe('SubmissionsRule', () => {
		it('Can Edit SubmissionsRule', () => {
			var assignmentEntity = new AssignmentEntity(editableEntity);
			expect(assignmentEntity.canEditSubmissionsRule()).to.be.true;
		});
		it('equals to keepall', () => {
			var assignmentEntity = new AssignmentEntity(editableEntity);
			expect(assignmentEntity.submissionsRule()).to.equal('keepall');
		});
		it('set files per submission', async() => {
			fetchMock.patchOnce('https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7', editableEntity);
			var assignmentEntity = new AssignmentEntity(editableEntity);
			await assignmentEntity.setSubmissionsRule('onlyone');
			expect(fetchMock.called()).to.be.true;
		});

	});
	describe('NotificationEmail', () => {
		it('Can Edit notificaiton email', () => {
			var assignmentEntity = new AssignmentEntity(editableEntity);
			expect(assignmentEntity.canEditNotificationEmail()).to.be.true;
		});
		it('read notificaiton email', () => {
			var assignmentEntity = new AssignmentEntity(editableEntity);
			expect(assignmentEntity.notificationEmail()).to.equal('test@d2l.com');
		});
		it('set notificaiton email', async() => {
			fetchMock.patchOnce('https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7', editableEntity);
			var assignmentEntity = new AssignmentEntity(editableEntity);
			await assignmentEntity.setNotificationEmail('test1@d2l.com');
			expect(fetchMock.called()).to.be.true;
		});

	});
});
