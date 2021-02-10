/* global fetchMock */

import { QuizEntity } from '../../../src/activities/quizzes/QuizEntity.js';
import { editableQuiz } from './data/EditableQuiz.js';
import { forkedWorkingCopyQuiz } from './data/ForkedWorkingCopyQuiz.js';
import { getFormData } from '../../utility/test-helpers.js';
import { nonEditableQuiz } from './data/NoneditableQuiz';
import { workingCopyQuiz } from './data/WorkingCopyQuiz';

describe('QuizEntity', () => {
	var editableEntity, nonEditableEntity, workingCopyEntity;

	beforeEach(() => {
		nonEditableEntity = window.D2L.Hypermedia.Siren.Parse(nonEditableQuiz);
		editableEntity = window.D2L.Hypermedia.Siren.Parse(editableQuiz);
		workingCopyEntity = window.D2L.Hypermedia.Siren.Parse(workingCopyQuiz);
	});

	afterEach(() => {
		fetchMock.reset();
	});

	describe('Basic loading', () => {
		it('reads name', () => {
			var quizEntity = new QuizEntity(nonEditableEntity);
			expect(quizEntity.name()).to.equal('What a great quiz');
		});
	});

	describe('Equals', () => {
		var modifiedEntity;

		beforeEach(() => {
			modifiedEntity = {
				name: 'What a great quiz',
				shuffle: true,
				allowHints: true,
				disableRightClick: true,
				disablePagerAndAlerts: true,
				password: 'hello',
				notificationEmail: 'moose@d2l.com',
				preventMovingBackwards: true,
				autoSetGraded: true,
				description: 'The Second quiz ever',
				header: 'Top of the quiz to ya!'
			};
		});

		it('returns true when equal', () => {
			var quizEntity = new QuizEntity(editableEntity);
			expect(quizEntity.equals(modifiedEntity)).to.be.true;
		});

		it('returns false when name not equal', () => {
			var quizEntity = new QuizEntity(editableEntity);
			modifiedEntity.name = 'This is a terrible quiz';
			expect(quizEntity.equals(modifiedEntity)).to.be.false;
		});

		it('returns false when shuffle not equal', () => {
			var quizEntity = new QuizEntity(editableEntity);
			modifiedEntity.shuffle = false;
			expect(quizEntity.equals(modifiedEntity)).to.be.false;
		});

		it('returns false when hints not equal', () => {
			var quizEntity = new QuizEntity(editableEntity);
			modifiedEntity.allowHints = false;
			expect(quizEntity.equals(modifiedEntity)).to.be.false;
		});

		it('returns false when disable right click not equal', () => {
			var quizEntity = new QuizEntity(editableEntity);
			modifiedEntity.disableRightClick = false;
			expect(quizEntity.equals(modifiedEntity)).to.be.false;
		});

		it('returns false when notificationEmail not equal', () => {
			var quizEntity = new QuizEntity(editableEntity);
			modifiedEntity.notificationEmail = 'wrong-email';
			expect(quizEntity.equals(modifiedEntity)).to.be.false;
		});

		it('returns false when preventMovingBackwards is not equal', () => {
			var quizEntity = new QuizEntity(editableEntity);
			modifiedEntity.preventMovingBackwards = false;
			expect(quizEntity.equals(modifiedEntity)).to.be.false;
		});

		it('returns false when autoSetGraded not equal', () => {
			var quizEntity = new QuizEntity(editableEntity);
			modifiedEntity.autoSetGraded = false;
			expect(quizEntity.equals(modifiedEntity)).to.be.false;
		});

		it('returns false when description not equal', () => {
			var quizEntity = new QuizEntity(editableEntity);
			modifiedEntity.description = 'New Description!';
			expect(quizEntity.equals(modifiedEntity)).to.be.false;
		});

		it('returns false when header not equal', () => {
			var quizEntity = new QuizEntity(editableEntity);
			modifiedEntity.header = 'New Header!';
			expect(quizEntity.equals(modifiedEntity)).to.be.false;
		});
	});

	describe('name', () => {
		describe('canEditName', () => {
			it('returns true when name is editable', () => {
				var quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.canEditName()).to.be.true;
			});

			it('returns false when name is not editable', () => {
				var quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.canEditName()).to.be.false;
			});
		});
	});

	describe('shuffle', () => {
		describe('canEditShuffle', () => {
			it('returns true when shuffle is editable', () => {
				var quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.canEditShuffle()).to.be.true;
			});

			it('returns false when shuffle is not editable', () => {
				var quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.canEditShuffle()).to.be.false;
			});
		});

		describe('isShuffleEnabled', () => {
			it('returns true when isShuffleEnabled is true', () => {
				var quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.isShuffleEnabled()).to.be.true;
			});

			it('returns false when isShuffleEnabled is false', () => {
				var quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.isShuffleEnabled()).to.be.false;
			});
		});
	});

	describe('hints', () => {
		describe('canEditHints', () => {
			it('returns true when hints are editable', () => {
				var quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.canEditHints()).to.be.true;
			});

			it('returns false when hints are not editable', () => {
				var quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.canEditHints()).to.be.false;
			});
		});

		describe('getHintsToolEnabled', () => {
			it('returns true when hints are enabled', () => {
				var quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.getHintsToolEnabled()).to.be.true;
			});

			it('returns false when hints are not enabled', () => {
				var quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.getHintsToolEnabled()).to.be.false;
			});
		});
	});

	describe('disableRightClick', () => {
		describe('canEditDisableRightClick', () => {
			it('returns true when disable right click is editable', () => {
				var quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.canEditDisableRightClick()).to.be.true;
			});

			it('returns false when disable right click is not editable', () => {
				var quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.canEditDisableRightClick()).to.be.false;
			});
		});

		describe('isDisableRightClickEnabled', () => {
			it('returns true when isDisableRightClick is true', () => {
				var quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.isDisableRightClickEnabled()).to.be.true;
			});

			it('returns false when isDisableRightClick is false', () => {
				var quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.isDisableRightClickEnabled()).to.be.false;
			});
		});
	});

	describe('disablePagerAndAlerts', () => {
		describe('canEditDisablePagerAndAlerts', () => {
			it('returns true when disable pager and alerts is editable', () => {
				var quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.canEditDisablePagerAndAlerts()).to.be.true;
			});

			it('returns false when disable pager and alerts is not editable', () => {
				var quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.canEditDisablePagerAndAlerts()).to.be.false;
			});
		});

		describe('isDisablePagerAndAlertsEnabled', () => {
			it('returns true when isDisablePagerAndAlertsEnabled is true', () => {
				var quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.isDisablePagerAndAlertsEnabled()).to.be.true;
			});

			it('returns false when isDisablePagerAndAlertsEnabled is false', () => {
				var quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.isDisablePagerAndAlertsEnabled()).to.be.false;
			});
		});
	});

	describe('passwords', () => {
		describe('canEditPassword', () => {
			it('returns true when password is editable', () => {
				var quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.canEditPassword()).to.be.true;
			});

			it('returns false when password is not editable', () => {
				var quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.canEditPassword()).to.be.false;
			});
		});

		describe('password', () => {
			it('can read password from an editable entity', () => {
				var quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.password()).to.equal('hello');
			});

			it('can read password from a non-editable entity', () => {
				var quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.password()).to.equal('hello');
			});
		});
	});

	describe('notificationEmail', () => {
		describe('canEditNotificationEmail', () => {
			it('returns true when notificationEmail is editable', () => {
				var quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.canEditNotificationEmail()).to.be.true;
			});

			it('returns false when notificationEmail is not editable', () => {
				var quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.canEditNotificationEmail()).to.be.false;
			});
		});

		describe('notificationEmail', () => {
			it('can read notificationEmail from an editable entity', () => {
				var quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.notificationEmail()).to.equal('moose@d2l.com');
			});

			it('can read notificationEmail from a non-editable entity', () => {
				var quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.notificationEmail()).to.equal('moose@d2l.com');
			});
		});
	});

	describe('preventMovingBackwards', () => {
		describe('canEditPreventMovingBackwards', () => {
			it('returns true when prevent moving backwards is editable', () => {
				var quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.canEditPreventMovingBackwards()).to.be.true;
			});

			it('returns false when prevent moving backwards is not editable', () => {
				var quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.canEditPreventMovingBackwards()).to.be.false;
			});
		});

		describe('isPreventMovingBackwardsEnabled', () => {
			it('returns true when isPreventMovingBackwardsEnabled is true', () => {
				var quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.isPreventMovingBackwardsEnabled()).to.be.true;
			});

			it('returns false when isPreventMovingBackwardsEnabled is false', () => {
				var quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.isPreventMovingBackwardsEnabled()).to.be.false;
			});
		});
	});

	describe('description', () => {
		describe('canEditDescription', () => {
			it('returns true when description is editable', () => {
				var quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.canEditDescription()).to.be.true;
			});

			it('returns false when description are not editable', () => {
				var quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.canEditDescription()).to.be.false;
			});
		});
		describe('descriptionIsDisplayed', () => {
			it('returns true when descriptionIsDisplayed is true', () => {
				var quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.descriptionIsDisplayed()).to.be.true;
			});

			it('returns false when descriptionIsDisplayed is false', () => {
				var quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.descriptionIsDisplayed()).to.be.false;
			});
		});
	});

	describe('header', () => {
		describe('canEditHeader', () => {
			it('returns true when header is editable', () => {
				var quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.canEditHeader()).to.be.true;
			});

			it('returns false when header are not editable', () => {
				var quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.canEditHeader()).to.be.false;
			});
		});
		describe('headerIsDisplayed', () => {
			it('returns true when headerIsDisplayed is true', () => {
				var quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.headerIsDisplayed()).to.be.true;
			});

			it('returns false when headerIsDisplayed is false', () => {
				var quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.headerIsDisplayed()).to.be.false;
			});
		});
	});

	describe('save', () => {
		it('saves', async() => {
			fetchMock.patchOnce('https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22', editableEntity);

			var quizEntity = new QuizEntity(editableEntity);

			await quizEntity.save({
				name: 'New name',
				shuffle: false,
				allowHints: false,
				disableRightClick: false,
				disablePagerAndAlerts: false,
				password: 'super-secret',
				notificationEmail: 'modifiedMoose@d2l.com',
				preventMovingBackwards: false,
				autoSetGraded: false,
				description: 'New description',
				header: 'New header'
			});

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('name')).to.equal('New name');
				expect(form.get('shuffle')).to.equal('false');
				expect(form.get('allowHints')).to.equal('false');
				expect(form.get('disableRightClick')).to.equal('false');
				expect(form.get('disablePagerAndAlerts')).to.equal('false');
				expect(form.get('password')).to.equal('super-secret');
				expect(form.get('notificationEmail')).to.equal('modifiedMoose@d2l.com');
				expect(form.get('preventMovingBackwards')).to.equal('false');
				expect(form.get('autoSetGraded')).to.equal('false');
				expect(form.get('description')).to.equal('New description');
				expect(form.get('header')).to.equal('New header');
			}

			expect(fetchMock.called()).to.be.true;
		});

		it('skips save if not dirty', async() => {
			var quizEntity = new QuizEntity(editableEntity);

			await quizEntity.save({
				name: 'What a great quiz',
				shuffle: true,
				allowHints: true,
				disableRightClick: true,
				disablePagerAndAlerts: true,
				password: 'hello',
				notificationEmail: 'moose@d2l.com',
				preventMovingBackwards: true,
				autoSetGraded: true,
				description: 'The Second quiz ever',
				header: 'Top of the quiz to ya!'
			});

			expect(fetchMock.done());
		});

		it('skips save if not editable', async() => {
			var quizEntity = new QuizEntity(nonEditableEntity);

			await quizEntity.save({
				name: 'some-name',
				shuffle: false,
				allowHints: false,
				disableRightClick: false,
				disablePagerAndAlerts: false,
				password: 'super-secret',
				notificationEmail: 'modifiedMoose@d2l.com',
				preventMovingBackwards: false,
				autoSetGraded: false,
				description: 'New and improved Description!',
				header: 'Even better Header!'
			});

			expect(fetchMock.done());
		});
	});

	describe('delete', () => {
		it('delete quiz', async() => {
			fetchMock.deleteOnce('https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22', editableEntity);

			var quizEntity = new QuizEntity(editableEntity);

			await quizEntity.delete();
			expect(fetchMock.called()).to.be.true;
		});

		it('cannot delete quiz', async() => {
			var quizEntity = new QuizEntity(nonEditableEntity);
			await quizEntity.delete();
			expect(fetchMock.done());
		});
	});

	describe('previewQuiz', () => {
		describe('previewHref', () => {
			const testPreviewHref = 'http://test.desire2learn.d2l/d2l/lms/quizzing/user/quiz_summary.d2l?ou=6606&qi=46&isprv=1&fromQB=1&bp=1';
			it('can read previewHref from an editable entity', () => {
				var quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.previewHref()).to.equal(testPreviewHref);
			});

			it('returns undefined if previewHref is not available', () => {
				var quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.previewHref()).to.be.undefined;
			});
		});

		describe('canPreviewQuiz', () => {
			it('returns true when quiz preview is available', () => {
				var quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.canPreviewQuiz()).to.be.true;
			});

			it('returns false when quiz preview is not available', () => {
				var quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.canPreviewQuiz()).to.be.false;
			});
		});

	});

	describe('ipRestrictions', () => {
		describe('ipRestrictionsHref', () => {
			const expectedHref = 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/39/ip';
			it('can read ipRestrictionsHref from an entity', () => {
				var quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.ipRestrictionsHref()).to.equal(expectedHref);
			});
		});
	});

	describe('autoSetGraded', () => {
		describe('canEditAutoSetGraded', () => {
			it('returns true when auto set graded is editable', () => {
				var quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.canEditAutoSetGraded()).to.be.true;
			});

			it('returns false when auto set graded is not editable', () => {
				var quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.canEditAutoSetGraded()).to.be.false;
			});
		});

		describe('isAutoSetGradedEnabled', () => {
			it('returns true when isAutoSetGraded is true', () => {
				var quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.isAutoSetGradedEnabled()).to.be.true;
			});

			it('returns false when isAutoSetGraded is false', () => {
				var quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.isAutoSetGradedEnabled()).to.be.false;
			});
		});
	});

	describe('timing href', () => {
		const href = 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22/timing?workingCopyId=1234';
		describe('timingHref', () => {
			it('can read timing href when quiz is editable', () => {
				var quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.timingHref()).to.equal(href);
			});

			it('can read timing href when quiz is not editable', () => {
				var quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.timingHref()).to.equal(href);
			});
		});
	});

	describe('checkout', () => {
		it('can checkout quiz working copy', async() => {
			fetchMock.getOnce('https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22?', workingCopyEntity);

			var quizEntity = new QuizEntity(editableEntity);

			await quizEntity.checkout();
			expect(fetchMock.called()).to.be.true;
		});

		it('cannot checkout if already a working copy', async() => {
			var quizEntity = new QuizEntity(workingCopyEntity);
			await quizEntity.checkout();
			expect(fetchMock.done());
		});

		it('cannot checkout', async() => {
			var quizEntity = new QuizEntity(nonEditableEntity);
			await quizEntity.checkout();
			expect(fetchMock.done());
		});
	});

	describe('working copy actions', () => {
		var forkedWorkingCopyEntity;

		beforeEach(() => {
			forkedWorkingCopyEntity = window.D2L.Hypermedia.Siren.Parse(forkedWorkingCopyQuiz);
		});

		describe('fork', () => {
			it('can fork quiz', async() => {
				fetchMock.postOnce('https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22', forkedWorkingCopyEntity);

				var quizEntity = new QuizEntity(workingCopyEntity);

				await quizEntity.fork();
				expect(fetchMock.called()).to.be.true;
			});

			it('can fork quiz from forked entity', async() => {
				fetchMock.postOnce('https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22', forkedWorkingCopyEntity);

				var quizEntity = new QuizEntity(forkedWorkingCopyEntity);

				await quizEntity.fork();
				expect(fetchMock.called()).to.be.true;
			});

			it('cannot fork from non working copy entity', async() => {
				var quizEntity = new QuizEntity(editableEntity);
				await quizEntity.fork();
				expect(fetchMock.done());
			});

			it('cannot fork from non editable entity', async() => {
				var quizEntity = new QuizEntity(nonEditableEntity);
				await quizEntity.fork();
				expect(fetchMock.done());
			});
		});

		describe('merge', () => {
			it('can merge quiz', async() => {
				fetchMock.postOnce('https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22', workingCopyEntity);

				var quizEntity = new QuizEntity(forkedWorkingCopyEntity);

				await quizEntity.merge();
				expect(fetchMock.called()).to.be.true;
			});

			it('cannot merge quiz from root working copy entity', async() => {
				var quizEntity = new QuizEntity(workingCopyEntity);
				await quizEntity.merge();
				expect(fetchMock.done());
			});

			it('cannot merge from non working copy entity', async() => {
				var quizEntity = new QuizEntity(editableEntity);
				await quizEntity.merge();
				expect(fetchMock.done());
			});

			it('cannot merge from non editable entity', async() => {
				var quizEntity = new QuizEntity(nonEditableEntity);
				await quizEntity.merge();
				expect(fetchMock.done());
			});
		});

		describe('checkin', () => {
			it('can checkin quiz', async() => {
				fetchMock.postOnce('https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22', editableEntity);

				var quizEntity = new QuizEntity(workingCopyEntity);

				await quizEntity.checkin();
				expect(fetchMock.called()).to.be.true;
			});

			it('cannot checkin quiz from forked entity', async() => {
				var quizEntity = new QuizEntity(forkedWorkingCopyEntity);
				await quizEntity.checkin();
				expect(fetchMock.done());
			});

			it('cannot checkin quiz from non working copy entity', async() => {
				var quizEntity = new QuizEntity(editableEntity);
				await quizEntity.checkin();
				expect(fetchMock.done());
			});

			it('cannot checkin from non editable entity', async() => {
				var quizEntity = new QuizEntity(nonEditableEntity);
				await quizEntity.checkin();
				expect(fetchMock.done());
			});
		});
	});
});
