import { AssignmentEntity } from '../../../src/activities/assignments/AssignmentEntity.js';
import { editableAssignment } from './data/EditableAssignment.js';
import { expect } from '@open-wc/testing';
import fetchMock from 'fetch-mock/esm/client.js';
import { getFormData } from '../../utility/test-helpers.js';
import { nonEditableAssignment } from './data/NonEditableAssignment.js';
import SirenParse from 'siren-parser';

describe('AssignmentEntity', () => {
	let editableEntity, nonEditableEntity;

	beforeEach(() => {
		nonEditableEntity = SirenParse(nonEditableAssignment);
		editableEntity = SirenParse(editableAssignment);
	});

	afterEach(() => {
		fetchMock.reset();
	});

	describe('Basic loading', () => {
		it('reads name', () => {
			const assignmentEntity = new AssignmentEntity(nonEditableEntity);
			expect(assignmentEntity.name()).to.equal('Extra Special Assignment');
		});
	});

	describe('Editable', () => {
		it('sets canEditName to true', () => {
			const assignmentEntity = new AssignmentEntity(editableEntity);
			expect(assignmentEntity.canEditName()).to.be.true;
		});
	});

	describe('Non Editable', () => {
		it('sets canEditName to false', () => {
			const assignmentEntity = new AssignmentEntity(nonEditableEntity);
			expect(assignmentEntity.canEditName()).to.be.false;
		});
	});

	describe('Equals', () => {
		it('return true when equal', () => {
			const assignmentEntity = new AssignmentEntity(editableEntity);
			expect(assignmentEntity.equals({
				name: 'Extra Special Assignment',
				instructions: '<p>These are your instructions</p>',
				submissionType: undefined,
				completionType: String(0),
				allowableFileType: String(undefined),
				isAnonymous: false,
				annotationToolsAvailable: true,
				assignmentType: 'group',
				groupTypeId: '314',
				filesSubmissionLimit: 'unlimited',
				defaultScoringRubricId: null,
				allowedSubmissionTypesForAssetProcessor: [ 0, 1, 4 ],
			})).to.be.true;
		});

		it('return false when not equal', () => {
			const assignmentEntity = new AssignmentEntity(editableEntity);
			expect(assignmentEntity.equals({
				name: 'Extra Special Assignment',
				instructions: '<p>These are your instructions</p>',
				submissionType: undefined,
				completionType: String(0),
				allowableFileType: String(undefined),
				isAnonymous: false,
				annotationToolsAvailable: true,
				assignmentType: 'individual',
				filesSubmissionLimit: 'unlimited'
			})).to.be.false;
		});

		it('ignores props that are not set', () => {
			const assignmentEntity = new AssignmentEntity(editableEntity);
			expect(assignmentEntity.equals({
				name: 'Extra Special Assignment',
				instructions: '<p>These are your instructions</p>',
				submissionType: undefined,
				allowableFileType: String(undefined),
				annotationToolsAvailable: true,
				assignmentType: 'group',
				groupTypeId: '314',
				defaultScoringRubricId: null
			})).to.be.true;
		});
	});

	describe('Saves', () => {
		it('saves name and instructions', async() => {
			fetchMock.patchOnce('https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7', editableEntity);

			const assignmentEntity = new AssignmentEntity(editableEntity);

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

			const assignmentEntity = new AssignmentEntity(editableEntity);

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

		it('saves allowable file type', async() => {
			fetchMock.patchOnce('https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7', editableEntity);

			const assignmentEntity = new AssignmentEntity(editableEntity);

			await assignmentEntity.save({
				allowableFileType: '2',
			});

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('allowableFileType')).to.equal('2');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('saves custom allowable file type', async() => {
			fetchMock.patchOnce('https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7', editableEntity);

			const assignmentEntity = new AssignmentEntity(editableEntity);

			await assignmentEntity.save({
				allowableFileType: '5',
				customAllowableFileTypes: '.pdf,.html'
			});

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('allowableFileType')).to.equal('5');
				expect(form.get('customAllowableFileTypes')).to.equal('.pdf,.html');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('saves anonymous marking', async() => {
			fetchMock.patchOnce('https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7', editableEntity);

			const assignmentEntity = new AssignmentEntity(editableEntity);

			await assignmentEntity.save({
				isAnonymous: true
			});

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('isAnonymous')).to.equal('true');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('saves default scoring rubric', async() => {
			fetchMock.patchOnce('https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7', editableEntity);

			const assignmentEntity = new AssignmentEntity(editableEntity);

			await assignmentEntity.save({
				defaultScoringRubricId: 123
			});

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('defaultScoringRubricId')).to.equal('123');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('saves notification email', async() => {
			fetchMock.patchOnce('https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7', editableEntity);

			const assignmentEntity = new AssignmentEntity(editableEntity);

			await assignmentEntity.save({
				notificationEmail: 'a@a.com'
			});

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('notificationEmail')).to.equal('a@a.com');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('saves completion type', async() => {
			fetchMock.patchOnce('https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7', editableEntity);

			const assignmentEntity = new AssignmentEntity(editableEntity);

			await assignmentEntity.save({
				completionType: '2'
			});

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('completionType')).to.equal('2');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('saves submissions rule', async() => {
			fetchMock.patchOnce('https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7', editableEntity);

			const assignmentEntity = new AssignmentEntity(editableEntity);

			await assignmentEntity.save({
				submissionsRule: 'onlyone'
			});

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('submissionsRule')).to.equal('onlyone');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('saves file submissions limit', async() => {
			fetchMock.patchOnce('https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7', editableEntity);

			const assignmentEntity = new AssignmentEntity(editableEntity);

			await assignmentEntity.save({
				filesSubmissionLimit: 'onefilepersubmission'
			});

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('filesSubmissionLimit')).to.equal('onefilepersubmission');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('saves annotations', async() => {
			fetchMock.patchOnce('https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7', editableEntity);

			const assignmentEntity = new AssignmentEntity(editableEntity);

			await assignmentEntity.save({
				annotationToolsAvailable: false
			});

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('annotationToolsAvailability')).to.equal('false');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('saves custom allowable file type', async() => {
			fetchMock.patchOnce('https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7', editableEntity);

			const assignmentEntity = new AssignmentEntity(editableEntity);

			await assignmentEntity.save({
				allowableFileType: '5',
				customAllowableFileTypes: '.pdf,.html'
			});

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('allowableFileType')).to.equal('5');
				expect(form.get('customAllowableFileTypes')).to.equal('.pdf,.html');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('skips save if not dirty', async() => {
			const assignmentEntity = new AssignmentEntity(editableEntity);

			await assignmentEntity.save({
				name: 'Extra Special Assignment',
				instructions: '<p>These are your instructions</p>'
			});

			expect(fetchMock.done());
		});

		it('skips save if not editable', async() => {
			const assignmentEntity = new AssignmentEntity(nonEditableEntity);

			await assignmentEntity.save({
				name: 'New name',
				instructions: 'New instructions',
				allowableFileType: '5',
				customAllowableFileTypes: '.pdf,.html',
				annotationToolsAvailable: false,
				filesSubmissionLimit: 'onefilepersubmission',
				submissionsRule: 'onlyone',
				notificationEmail: 'a@a.com',
				defaultScoringRubricId: 123,
				isAnonymous: true,
			});

			expect(fetchMock.done());
		});

		it('combines multiple actions into a single request', async() => {
			fetchMock.patchOnce('https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7', editableEntity);

			const assignmentEntity = new AssignmentEntity(editableEntity);

			await assignmentEntity.save({
				name: 'New name',
				instructions: 'New instructions',
				allowableFileType: '5',
				customAllowableFileTypes: '.pdf,.html',
				annotationToolsAvailable: false,
				filesSubmissionLimit: 'onefilepersubmission',
				submissionsRule: 'onlyone',
				notificationEmail: 'a@a.com',
				defaultScoringRubricId: 123,
				isAnonymous: true,
			});

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('name')).to.equal('New name');
				expect(form.get('instructions')).to.equal('New instructions');
				expect(form.get('allowableFileType')).to.equal('5');
				expect(form.get('customAllowableFileTypes')).to.equal('.pdf,.html');
				expect(form.get('filesSubmissionLimit')).to.equal('onefilepersubmission');
				expect(form.get('submissionsRule')).to.equal('onlyone');
				expect(form.get('notificationEmail')).to.equal('a@a.com');
				expect(form.get('defaultScoringRubricId')).to.equal('123');
				expect(form.get('isAnonymous')).to.equal('true');
			}
			expect(fetchMock.called()).to.be.true;
		});
	});

	describe('Deletion', () => {
		it('Delete assignment', async() => {
			fetchMock.deleteOnce('https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7', editableEntity);

			const assignmentEntity = new AssignmentEntity(editableEntity);

			await assignmentEntity.delete();
			expect(fetchMock.called()).to.be.true;
		});
	});

	describe('Cancel Create', () => {
		it('Cancel Creating assignment', async() => {
			fetchMock.deleteOnce('https://f5aa43d7-c082-485c-84f5-4808147fe98a.assignments.api.dev.brightspace.com/123065/folders/7?isCancel=1', editableEntity);

			const assignmentEntity = new AssignmentEntity(editableEntity);

			await assignmentEntity.cancelCreate();
			expect(fetchMock.called()).to.be.true;
		});
	});
	describe('FilesPerSubmission', () => {
		it('Can Edit FilesPerSubmission', () => {
			const assignmentEntity = new AssignmentEntity(editableEntity);
			expect(assignmentEntity.canEditFilesSubmissionLimit()).to.be.true;
		});
		it('equals to unlimited', () => {
			const assignmentEntity = new AssignmentEntity(editableEntity);
			expect(assignmentEntity.filesSubmissionLimit()).to.equal('unlimited');
		});
	});

	describe('SubmissionsRule', () => {
		it('Can Edit SubmissionsRule', () => {
			const assignmentEntity = new AssignmentEntity(editableEntity);
			expect(assignmentEntity.canEditSubmissionsRule()).to.be.true;
		});
		it('equals to keepall', () => {
			const assignmentEntity = new AssignmentEntity(editableEntity);
			expect(assignmentEntity.submissionsRule()).to.equal('keepall');
		});
	});
	describe('NotificationEmail', () => {
		it('Can Edit notificaiton email', () => {
			const assignmentEntity = new AssignmentEntity(editableEntity);
			expect(assignmentEntity.canEditNotificationEmail()).to.be.true;
		});
		it('read notificaiton email', () => {
			const assignmentEntity = new AssignmentEntity(editableEntity);
			expect(assignmentEntity.notificationEmail()).to.equal('test@d2l.com');
		});
	});
	describe('getAssignmentTypeSelectedGroupCategoryId', () => {
		it('returns group categoryId when entities exist', () => {
			const assignmentEntity = new AssignmentEntity(editableEntity);
			expect(assignmentEntity.getAssignmentTypeSelectedGroupCategoryId()).to.equal(1234);
		});
		it('returns null when no groupCategoryId exists', () => {
			const assignmentEntity = new AssignmentEntity(nonEditableEntity);
			expect(assignmentEntity.getAssignmentTypeSelectedGroupCategoryId()).to.be.null;
		});
	});
});
