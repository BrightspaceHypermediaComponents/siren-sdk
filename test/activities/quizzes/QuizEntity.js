/* global fetchMock */

import { QuizEntity } from '../../../src/activities/quizzes/QuizEntity.js';
import { nonEditableQuiz } from './data/NoneditableQuiz';
import { editableQuiz } from './data/EditableQuiz.js';
import { getFormData } from '../../utility/test-helpers.js';

describe('QuizEntity', () => {
	var editableEntity, nonEditableEntity;

	beforeEach(() => {
		nonEditableEntity = window.D2L.Hypermedia.Siren.Parse(nonEditableQuiz);
		editableEntity = window.D2L.Hypermedia.Siren.Parse(editableQuiz);
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
				allowHints: true,
				disableRightClick: true,
				disablePagerAndAlerts: true,
				password: 'hello'
			};
		});

		it('return true when equal', () => {
			var quizEntity = new QuizEntity(editableEntity);
			expect(quizEntity.equals(modifiedEntity)).to.be.true;
		});

		it('return false when name not equal', () => {
			var quizEntity = new QuizEntity(editableEntity);
			modifiedEntity.name = 'This is a terrible quiz';
			expect(quizEntity.equals(modifiedEntity)).to.be.false;
		});

		it('return false when hints not equal', () => {
			var quizEntity = new QuizEntity(editableEntity);
			modifiedEntity.allowHints = false;
			expect(quizEntity.equals(modifiedEntity)).to.be.false;
		});

		it('return false when disable right click not equal', () => {
			var quizEntity = new QuizEntity(editableEntity);
			modifiedEntity.disableRightClick = false;
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

	describe('save', () => {
		it('saves', async() => {
			fetchMock.patchOnce('https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22', editableEntity);

			var quizEntity = new QuizEntity(editableEntity);

			await quizEntity.save({
				name: 'New name',
				allowHints: false,
				disableRightClick: false,
				disablePagerAndAlerts: true,
				password: 'super-secret'
			});

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('name')).to.equal('New name');
				expect(form.get('allowHints')).to.equal('false');
				expect(form.get('disableRightClick')).to.equal('false');
				expect(form.get('disablePagerAndAlerts')).to.equal('true');
				expect(form.get('password')).to.equal('super-secret');
			}

			expect(fetchMock.called()).to.be.true;
		});

		it('skips save if not dirty', async() => {
			var quizEntity = new QuizEntity(editableEntity);

			await quizEntity.save({
				name: 'What a great quiz',
				allowHints: true,
				disableRightClick: true,
				disablePagerAndAlerts: true,
				password: 'hello'
			});

			expect(fetchMock.done());
		});

		it('skips save if not editable', async() => {
			var quizEntity = new QuizEntity(nonEditableEntity);

			await quizEntity.save({
				name: 'What a great quiz',
				allowHints: true,
				disableRightClick: true,
				disablePagerAndAlerts: true,
				password: 'hello'
			});

			expect(fetchMock.done());
		});
	});
});
