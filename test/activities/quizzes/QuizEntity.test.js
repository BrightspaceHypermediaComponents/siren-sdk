import { editableQuiz } from './data/EditableQuiz.js';
import { expect } from '@open-wc/testing';
import fetchMock from 'fetch-mock/esm/client.js';
import { getFormData } from '../../utility/test-helpers.js';
import { nonEditableQuiz } from './data/NoneditableQuiz.js';
import { QuizEntity } from '../../../src/activities/quizzes/QuizEntity.js';
import SirenParse from 'siren-parser';
import { workingCopyQuiz } from './data/WorkingCopyQuiz.js';

describe('QuizEntity', () => {
	let editableEntity, nonEditableEntity, workingCopyEntity;

	beforeEach(() => {
		nonEditableEntity = SirenParse(nonEditableQuiz);
		editableEntity = SirenParse(editableQuiz);
		workingCopyEntity = SirenParse(workingCopyQuiz);
	});

	afterEach(() => {
		fetchMock.reset();
	});

	describe('Basic loading', () => {
		it('reads name', () => {
			const quizEntity = new QuizEntity(nonEditableEntity);
			expect(quizEntity.name()).to.equal('What a great quiz');
		});
	});

	describe('Equals', () => {
		let modifiedEntity;

		beforeEach(() => {
			modifiedEntity = {
				name: 'What a great quiz',
				shuffle: true,
				allowHints: true,
				disablePagerAndAlerts: true,
				password: 'hello',
				notificationEmail: 'moose@d2l.com',
				preventMovingBackwards: true,
				deductionPercentage: 50,
				autoSetGraded: true,
				syncGradebook: false,
				syncGradebookDefault: true,
				description: 'The Second quiz ever',
				header: 'Top of the quiz to ya!',
				footer: 'Bottom of the quiz to ya!',
				passingPercentage: 75,
				studySupportEnabled: true,
				showResultsOverview: true,
				suggestContent: '1',
				remediationCandidates: [{
					ToolId: 37000,
					ToolObjectId: 97705
				}]
			};
		});

		it('returns true when equal', () => {
			const quizEntity = new QuizEntity(editableEntity);
			expect(quizEntity.equals(modifiedEntity)).to.be.true;
		});

		it('returns false when name not equal', () => {
			const quizEntity = new QuizEntity(editableEntity);
			modifiedEntity.name = 'This is a terrible quiz';
			expect(quizEntity.equals(modifiedEntity)).to.be.false;
		});

		it('returns false when shuffle not equal', () => {
			const quizEntity = new QuizEntity(editableEntity);
			modifiedEntity.shuffle = false;
			expect(quizEntity.equals(modifiedEntity)).to.be.false;
		});

		it('returns false when hints not equal', () => {
			const quizEntity = new QuizEntity(editableEntity);
			modifiedEntity.allowHints = false;
			expect(quizEntity.equals(modifiedEntity)).to.be.false;
		});

		it('returns false when notificationEmail not equal', () => {
			const quizEntity = new QuizEntity(editableEntity);
			modifiedEntity.notificationEmail = 'wrong-email';
			expect(quizEntity.equals(modifiedEntity)).to.be.false;
		});

		it('returns false when preventMovingBackwards is not equal', () => {
			const quizEntity = new QuizEntity(editableEntity);
			modifiedEntity.preventMovingBackwards = false;
			expect(quizEntity.equals(modifiedEntity)).to.be.false;
		});

		it('returns false when deductionPercentage not equal', () => {
			const quizEntity = new QuizEntity(editableEntity);
			modifiedEntity.deductionPercentage = 25;
			expect(quizEntity.equals(modifiedEntity)).to.be.false;
		});

		it('returns true even when autoSetGraded not equal', () => {
			const quizEntity = new QuizEntity(editableEntity);
			modifiedEntity.autoSetGraded = false;
			expect(quizEntity.equals(modifiedEntity)).to.be.true;
		});

		it('returns false when syncGradebook not equal', () => {
			const quizEntity = new QuizEntity(editableEntity);
			modifiedEntity.syncGradebook = true;
			expect(quizEntity.equals(modifiedEntity)).to.be.false;
		});

		it('returns false when syncGradebookDefault not equal', () => {
			const quizEntity = new QuizEntity(editableEntity);
			modifiedEntity.syncGradebookDefault = false;
			expect(quizEntity.equals(modifiedEntity)).to.be.false;
		});

		it('returns false when passingPercentage not equal', () => {
			const quizEntity = new QuizEntity(editableEntity);
			modifiedEntity.passingPercentage = 50;
			expect(quizEntity.equals(modifiedEntity)).to.be.false;
		});

		it('returns false when description not equal', () => {
			const quizEntity = new QuizEntity(editableEntity);
			modifiedEntity.description = 'New Description!';
			expect(quizEntity.equals(modifiedEntity)).to.be.false;
		});

		it('returns false when header not equal', () => {
			const quizEntity = new QuizEntity(editableEntity);
			modifiedEntity.header = 'New Header!';
			expect(quizEntity.equals(modifiedEntity)).to.be.false;
		});

		it('returns false when footer not equal', () => {
			const quizEntity = new QuizEntity(editableEntity);
			modifiedEntity.footer = 'New Footer!';
			expect(quizEntity.equals(modifiedEntity)).to.be.false;
		});

		it('returns false when studySupportEnabled not equal', () => {
			const quizEntity = new QuizEntity(editableEntity);
			modifiedEntity.studySupportEnabled = false;
			expect(quizEntity.equals(modifiedEntity)).to.be.false;
		});

		it('returns false when showResultsOverview not equal', () => {
			const quizEntity = new QuizEntity(editableEntity);
			modifiedEntity.showResultsOverview = false;
			expect(quizEntity.equals(modifiedEntity)).to.be.false;
		});
		it('returns false when suggestContent not equal', () => {
			const quizEntity = new QuizEntity(editableEntity);
			modifiedEntity.suggestContent = '0';
			expect(quizEntity.equals(modifiedEntity)).to.be.false;
		});
		it('returns false when remediationCandidates not equal', () => {
			const quizEntity = new QuizEntity(editableEntity);
			modifiedEntity.remediationCandidates = [{
				ToolId: 37000,
				ToolObjectId: 97706
			}];
			expect(quizEntity.equals(modifiedEntity)).to.be.false;
		});
	});

	describe('name', () => {
		describe('canEditName', () => {
			it('returns true when name is editable', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.canEditName()).to.be.true;
			});

			it('returns false when name is not editable', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.canEditName()).to.be.false;
			});
		});
	});

	describe('shuffle', () => {
		describe('canEditShuffle', () => {
			it('returns true when shuffle is editable', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.canEditShuffle()).to.be.true;
			});

			it('returns false when shuffle is not editable', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.canEditShuffle()).to.be.false;
			});
		});

		describe('isShuffleEnabled', () => {
			it('returns true when isShuffleEnabled is true', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.isShuffleEnabled()).to.be.true;
			});

			it('returns false when isShuffleEnabled is false', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.isShuffleEnabled()).to.be.false;
			});
		});
	});

	describe('hints', () => {
		describe('canEditHints', () => {
			it('returns true when hints are editable', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.canEditHints()).to.be.true;
			});

			it('returns false when hints are not editable', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.canEditHints()).to.be.false;
			});
		});

		describe('getHintsToolEnabled', () => {
			it('returns true when hints are enabled', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.getHintsToolEnabled()).to.be.true;
			});

			it('returns false when hints are not enabled', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.getHintsToolEnabled()).to.be.false;
			});
		});
	});

	describe('disablePagerAndAlerts', () => {
		describe('canEditDisablePagerAndAlerts', () => {
			it('returns true when disable pager and alerts is editable', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.canEditDisablePagerAndAlerts()).to.be.true;
			});

			it('returns false when disable pager and alerts is not editable', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.canEditDisablePagerAndAlerts()).to.be.false;
			});
		});

		describe('isDisablePagerAndAlertsEnabled', () => {
			it('returns true when isDisablePagerAndAlertsEnabled is true', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.isDisablePagerAndAlertsEnabled()).to.be.true;
			});

			it('returns false when isDisablePagerAndAlertsEnabled is false', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.isDisablePagerAndAlertsEnabled()).to.be.false;
			});
		});
	});

	describe('passwords', () => {
		describe('canEditPassword', () => {
			it('returns true when password is editable', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.canEditPassword()).to.be.true;
			});

			it('returns false when password is not editable', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.canEditPassword()).to.be.false;
			});
		});

		describe('password', () => {
			it('can read password from an editable entity', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.password()).to.equal('hello');
			});

			it('can read password from a non-editable entity', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.password()).to.equal('hello');
			});
		});
	});

	describe('notificationEmail', () => {
		describe('canEditNotificationEmail', () => {
			it('returns true when notificationEmail is editable', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.canEditNotificationEmail()).to.be.true;
			});

			it('returns false when notificationEmail is not editable', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.canEditNotificationEmail()).to.be.false;
			});
		});

		describe('notificationEmail', () => {
			it('can read notificationEmail from an editable entity', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.notificationEmail()).to.equal('moose@d2l.com');
			});

			it('can read notificationEmail from a non-editable entity', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.notificationEmail()).to.equal('moose@d2l.com');
			});
		});
	});

	describe('deductionPercentage', () => {
		describe('canEditDeductionPercentage', () => {
			it('returns true when deductionPercentage is editable', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.canEditDeductionPercentage()).to.be.true;
			});

			it('returns false when deductionPercentage is not editable', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.canEditDeductionPercentage()).to.be.false;
			});
		});

		describe('deductionPercentage', () => {
			it('can read deductionPercentage from an editable entity', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.deductionPercentage()).to.equal(50);
			});

			it('can read deductionPercentage from a non-editable entity', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.deductionPercentage()).to.equal(50);
			});
		});
	});

	describe('preventMovingBackwards', () => {
		describe('canEditPreventMovingBackwards', () => {
			it('returns true when prevent moving backwards is editable', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.canEditPreventMovingBackwards()).to.be.true;
			});

			it('returns false when prevent moving backwards is not editable', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.canEditPreventMovingBackwards()).to.be.false;
			});
		});

		describe('isPreventMovingBackwardsEnabled', () => {
			it('returns true when isPreventMovingBackwardsEnabled is true', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.isPreventMovingBackwardsEnabled()).to.be.true;
			});

			it('returns false when isPreventMovingBackwardsEnabled is false', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.isPreventMovingBackwardsEnabled()).to.be.false;
			});
		});
	});

	describe('description', () => {
		describe('canEditDescription', () => {
			it('returns true when description is editable', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.canEditDescription()).to.be.true;
			});

			it('returns false when description are not editable', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.canEditDescription()).to.be.false;
			});
		});
		describe('descriptionIsDisplayed', () => {
			it('returns true when descriptionIsDisplayed is true', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.descriptionIsDisplayed()).to.be.true;
			});

			it('returns false when descriptionIsDisplayed is false', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.descriptionIsDisplayed()).to.be.false;
			});
		});
	});

	describe('header', () => {
		describe('canEditHeader', () => {
			it('returns true when header is editable', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.canEditHeader()).to.be.true;
			});

			it('returns false when header are not editable', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.canEditHeader()).to.be.false;
			});
		});
		describe('headerIsDisplayed', () => {
			it('returns true when headerIsDisplayed is true', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.headerIsDisplayed()).to.be.true;
			});

			it('returns false when headerIsDisplayed is false', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.headerIsDisplayed()).to.be.false;
			});
		});
	});

	describe('footer', () => {
		describe('canEditFooter', () => {
			it('returns true when footer is editable', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.canEditFooter()).to.be.true;
			});

			it('returns false when footer are not editable', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.canEditFooter()).to.be.false;
			});
		});
		describe('footerIsDisplayed', () => {
			it('returns true when footerIsDisplayed is true', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.footerIsDisplayed()).to.be.true;
			});

			it('returns false when footerIsDisplayed is false', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.footerIsDisplayed()).to.be.false;
			});
		});
	});

	describe('save', () => {
		it('saves', async() => {
			fetchMock.patchOnce('https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22', editableEntity);

			const quizEntity = new QuizEntity(editableEntity);

			await quizEntity.save({
				name: 'New name',
				shuffle: false,
				allowHints: false,
				disablePagerAndAlerts: false,
				password: 'super-secret',
				notificationEmail: 'modifiedMoose@d2l.com',
				preventMovingBackwards: false,
				deductionPercentage: 10,
				autoSetGraded: false,
				syncGradebook: true,
				syncGradebookDefault: false,
				description: 'New description',
				header: 'New header',
				footer: 'New footer',
				passingPercentage: 30,
				studySupportEnabled: false,
				showResultsOverview: false,
				suggestContent: '0',
				remediationCandidates: [{
					ToolId: 37000,
					ToolObjectId: 97706
				}]
			});

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('name')).to.equal('New name');
				expect(form.get('shuffle')).to.equal('false');
				expect(form.get('allowHints')).to.equal('false');
				expect(form.get('disablePagerAndAlerts')).to.equal('false');
				expect(form.get('password')).to.equal('super-secret');
				expect(form.get('notificationEmail')).to.equal('modifiedMoose@d2l.com');
				expect(form.get('preventMovingBackwards')).to.equal('false');
				expect(form.get('deductionPercentage')).to.equal('10');
				expect(form.get('autoSetGraded')).to.equal('false');
				expect(form.get('syncGradebook')).to.equal('true');
				expect(form.get('syncGradebookDefault')).to.equal('false');
				expect(form.get('description')).to.equal('New description');
				expect(form.get('header')).to.equal('New header');
				expect(form.get('footer')).to.equal('New footer');
				expect(form.get('passingPercentage')).to.equal('30');
				expect(form.get('studySupportEnabled')).to.equal('false');
				expect(form.get('showResultsOverview')).to.equal(null); // not included when studySupportEnabled is false
				expect(form.get('suggestContent')).to.equal(null); // not included when studySupportEnabled is false
				expect(form.get('remediationCandidates')).to.equal(null); // not included when studySupportEnabled is false
			}

			expect(fetchMock.called()).to.be.true;
		});

		it('skips save if not dirty', async() => {
			const quizEntity = new QuizEntity(editableEntity);

			await quizEntity.save({
				name: 'What a great quiz',
				shuffle: true,
				allowHints: true,
				disablePagerAndAlerts: true,
				password: 'hello',
				notificationEmail: 'moose@d2l.com',
				preventMovingBackwards: true,
				deductionPercentage: 50,
				autoSetGraded: true,
				syncGradebook: false,
				syncGradebookDefault: true,
				description: 'The Second quiz ever',
				header: 'Top of the quiz to ya!',
				footer: 'Bottom of the quiz to ya!',
				passingPercentage: 75,
				studySupportEnabled: true,
				showResultsOverview: true,
				suggestContent: '1',
				remediationCandidates: [{
					ToolId: 37000,
					ToolObjectId: 97705
				}]
			});

			expect(fetchMock.done());
		});

		it('skips save if not editable', async() => {
			const quizEntity = new QuizEntity(nonEditableEntity);

			await quizEntity.save({
				name: 'some-name',
				shuffle: false,
				allowHints: false,
				disablePagerAndAlerts: false,
				password: 'super-secret',
				notificationEmail: 'modifiedMoose@d2l.com',
				preventMovingBackwards: false,
				deductionPercentage: 10,
				autoSetGraded: false,
				syncGradebook: true,
				syncGradebookDefault: false,
				description: 'New and improved Description!',
				header: 'Even better Header!',
				footer: 'Even better Footer!',
				passingPercentage: 50,
				studySupportEnabled: false
			});

			expect(fetchMock.done());
		});
	});

	describe('delete', () => {
		it('delete quiz', async() => {
			fetchMock.deleteOnce('https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22', editableEntity);

			const quizEntity = new QuizEntity(editableEntity);

			await quizEntity.delete();
			expect(fetchMock.called()).to.be.true;
		});

		it('cannot delete quiz', async() => {
			const quizEntity = new QuizEntity(nonEditableEntity);
			await quizEntity.delete();
			expect(fetchMock.done());
		});
	});

	describe('previewQuiz', () => {
		describe('previewHref', () => {
			const testPreviewHref = 'http://test.desire2learn.d2l/d2l/lms/quizzing/user/quiz_summary.d2l?ou=6606&qi=46&isprv=1&fromQB=1&bp=1';
			it('can read previewHref from an editable entity', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.previewHref()).to.equal(testPreviewHref);
			});

			it('returns undefined if previewHref is not available', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.previewHref()).to.be.undefined;
			});
		});

		describe('canPreviewQuiz', () => {
			it('returns true when quiz preview is available', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.canPreviewQuiz()).to.be.true;
			});

			it('returns false when quiz preview is not available', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.canPreviewQuiz()).to.be.false;
			});
		});

	});

	describe('ipRestrictions', () => {
		describe('ipRestrictionsHref', () => {
			const expectedHref = 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/39/ip';
			it('can read ipRestrictionsHref from an entity', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.ipRestrictionsHref()).to.equal(expectedHref);
			});
		});
	});

	describe('submissionViews', () => {
		describe('submissionViewsHref', () => {
			const expectedHref = 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/39/submissionviews';
			it('can read submissionViewsHref from an entity', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.submissionViewsHref()).to.equal(expectedHref);
			});
		});
	});

	describe('Has Attempts Completed', () => {
		it('Quiz has attempts completed', () => {
			// editableEntity has has-attempts sub-entity
			const quizEntity = new QuizEntity(editableEntity);
			expect(quizEntity.hasAttemptsCompleted()).to.be.true;
		});

		it('Quiz has no attempts completed', () => {
			// nonEditableEntity does not have has-attempts sub-entity
			const quizEntity = new QuizEntity(nonEditableEntity);
			expect(quizEntity.hasAttemptsCompleted()).to.be.false;
		});
	});

	describe('categories', () => {
		describe('categoriesHref', () => {
			const expectedHref = 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/39/categories';
			it('can read categoriesHref from an entity', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.categoriesHref()).to.equal(expectedHref);
			});
		});
	});

	describe('autoSetGraded', () => {
		describe('canEditAutoSetGraded', () => {
			it('returns true when auto set graded is editable', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.canEditAutoSetGraded()).to.be.true;
			});

			it('returns false when auto set graded is not editable', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.canEditAutoSetGraded()).to.be.false;
			});
		});

		describe('isAutoSetGradedEnabled', () => {
			it('returns true when isAutoSetGraded is true', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.isAutoSetGradedEnabled()).to.be.true;
			});

			it('returns false when isAutoSetGraded is false', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.isAutoSetGradedEnabled()).to.be.false;
			});
		});
	});

	describe('studySupportEnabled', () => {
		describe('canEditstudySupportEnabled', () => {
			it('returns true when studySupportEnabled is editable', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.canEditStudySupportEnabled()).to.be.true;
			});

			it('returns false when studySupportEnabled is not editable', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.canEditStudySupportEnabled()).to.be.false;
			});
		});

		describe('isStudySupportEnabled', () => {
			it('returns true when isStudySupportEnabled is true', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.isStudySupportEnabled()).to.be.true;
			});

			it('returns false when isStudySupportEnabled is false', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.isStudySupportEnabled()).to.be.false;
			});
		});

		describe('showResultsOverview', () => {
			it('returns true when showResultsOverview is true', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.showResultsOverview()).to.be.true;
			});

			it('returns undefined when showResultsOverview is undefined', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.showResultsOverview()).to.be.undefined;
			});
		});

		describe('suggestContent', () => {
			it('returns 1 when suggestContent is 1', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.suggestContent()).to.equal('1');
			});

			it('returns undefined when suggestContent is undefined', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.suggestContent()).to.be.undefined;
			});
		});

		describe('remediationCandidates', () => {
			it('returns object when remediationCandidates contains an object', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.remediationCandidates()).to.deep.include({
					ToolId: 37000,
					ToolObjectId: 97705
				});
			});

			it('returns undefined when remediationCandidates is undefined', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.remediationCandidates()).to.be.undefined;
			});
		});

		describe('studySupportCompatibility', () => {
			const href = 'https://test.dev.brightspace.com/d2l/api/hm/quizzes/6609/quizzes/14/studySupportCompatibility';
			it('can read studySupportCompatibility href when quiz is editable', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.studySupportCompatibilityHref()).to.equal(href);
			});

			it('returns undefined if studySupportCompatibility is not available', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.studySupportCompatibilityHref()).to.be.undefined;
			});
		});
	});

	describe('syncGradebook', () => {
		describe('canEditSyncGradebook', () => {
			it('returns true when sync gradebook is editable', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.canEditSyncGradebook()).to.be.true;
			});

			it('returns false when sync gradebook is not editable', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.canEditSyncGradebook()).to.be.false;
			});
		});

		describe('isSyncGradebookEnabled', () => {
			it('returns false when isSyncGradebookEnabled is false', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.isSyncGradebookEnabled()).to.be.false;
			});

			it('returns true when isSyncGradebookEnabled is true', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.isSyncGradebookEnabled()).to.be.true;
			});
		});

		describe('isSyncGradebookDefault', () => {
			it('returns false when isSyncGradebookDefault is false', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.isSyncGradebookDefault()).to.be.false;
			});

			it('returns true when isSyncGradebookDefault is true', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.isSyncGradebookDefault()).to.be.true;
			});
		});
	});

	describe('completionTracking', () => {
		describe('canEditPassingPercentage', () => {
			it('returns true when passing percentage is editable', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.canEditPassingPercentage()).to.be.true;
			});

			it('returns false when passing percentage is not editable', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.canEditPassingPercentage()).to.be.false;
			});
		});

		describe('properties', () => {
			it('can read completion type and passing percentage from an editable entity', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.isPassingPercentageType()).to.be.true;
				expect(quizEntity.passingPercentage()).to.equal(75);
			});

			it('can read completion type and passing percentage from a non-editable entity', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.isPassingPercentageType()).to.be.false;
				expect(quizEntity.passingPercentage()).to.equal(null);
			});
		});
	});

	describe('timing href', () => {
		const href = 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22/timing';
		describe('timingHref', () => {
			it('can read timing href when quiz is editable', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.timingHref()).to.equal(href);
			});

			it('can read timing href when quiz is not editable', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.timingHref()).to.equal(href);
			});
		});
	});

	describe('activityUsage href', async() => {
		const href = 'https://afe99802-9130-4320-a770-8d138b941e74.activities.api.proddev.d2l/activities/6606_51000_22/usages/6606';
		describe('activityUsageHref', () => {
			it('can read activity-usage href when quiz is editable', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.activityUsageHref()).to.equal(href);
			});

			it('can read activity-usage href when quiz is not editable', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.activityUsageHref()).to.equal(href);
			});
		});
	});

	describe('working copy actions', async() => {
		describe('checkout', () => {
			it('can checkout quiz working copy', async() => {
				fetchMock.postOnce('https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22', workingCopyEntity);

				const quizEntity = new QuizEntity(editableEntity);

				await quizEntity.checkout();
				expect(fetchMock.called()).to.be.true;
			});

			it('can checkout if already a working copy', async() => {
				fetchMock.postOnce('https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22', workingCopyEntity);
				const quizEntity = new QuizEntity(workingCopyEntity);
				await quizEntity.checkout();
				expect(fetchMock.called()).to.be.true;
			});

			it('cannot checkout a non editable entity', async() => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				await quizEntity.checkout();
				expect(fetchMock.done());
			});
		});

		describe('checkin', () => {
			it('can checkin a working copy', async() => {
				fetchMock.postOnce('https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22?workingCopyId=12345', editableEntity);

				const quizEntity = new QuizEntity(workingCopyEntity);
				await quizEntity.checkin();
				expect(fetchMock.called()).to.be.true;
			});

			it('cannot checkin a non working copy', async() => {
				const quizEntity = new QuizEntity(editableEntity);
				await quizEntity.checkin();
				expect(fetchMock.done());
			});

			it('cannot checkin a non editable entity', async() => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				await quizEntity.checkin();
				expect(fetchMock.done());
			});
		});
	});

	describe('recommendAlignments', () => {
		describe('Has recommend alignments endpoint', () => {
			it('returns value when topic has reccomend alignment url', () => {
				const quizEntity = new QuizEntity(editableEntity);
				expect(quizEntity.recommendAlignmentsEndpoint()).to.equal('https://www.d2l.com');
			});

			it('Does not have recommend alignments endpoint', () => {
				const quizEntity = new QuizEntity(nonEditableEntity);
				expect(quizEntity.recommendAlignmentsEndpoint()).to.be.undefined;
			});
		});
	});
});
