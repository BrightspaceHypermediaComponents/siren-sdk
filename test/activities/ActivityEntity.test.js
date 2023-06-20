import { ActivityEntity } from '../../src/activities/ActivityEntity.js';
import { expect } from '@open-wc/testing';
import fetchMock from 'fetch-mock/esm/client.js';
import { getFormData } from '../utility/test-helpers.js';
import SirenParse from 'siren-parser';
import { testData } from './data/ActivityEntity.js';

describe('ActivityEntity', () => {
	let entity, readonlyEntity, entityJson;

	beforeEach(() => {
		entityJson = SirenParse(testData.activityEntityEditable);
		entity = new ActivityEntity(entityJson);

		const readonlyJson = SirenParse(testData.activityEntityReadOnly);
		readonlyEntity = new ActivityEntity(readonlyJson);
	});

	describe('Name', () => {
		describe('Can edit', () => {
			it('gets name', () => {
				expect(entity.name()).to.equal('Sample Activity Name');
			});

			it('can edit name', () => {
				expect(entity.canUpdateName()).to.be.true;
			});
		});

		describe('Can NOT edit', () => {
			it('gets name', () => {
				expect(readonlyEntity.name()).to.equal('Sample Activity Name');
			});

			it('can NOT edit name', () => {
				expect(readonlyEntity.canUpdateName()).to.be.false;
			});
		});
	});

	describe('Saves', () => {

		afterEach(() => {
			fetchMock.reset();
		});

		describe('name', () => {
			it('saves name', async() => {
				fetchMock.patchOnce('https://d53287c1-ad48-4c2e-a0a7-bd53c3029e95.activities.api.dev.brightspace.com/activities/5', entityJson);

				await entity.save({
					name: 'New Name'
				});

				const form = await getFormData(fetchMock.lastCall().request);
				if (!form.notSupported) {
					expect(form.get('name')).to.equal('New Name');
				}
				expect(fetchMock.called()).to.be.true;
			});

			it('skips save if not dirty', async() => {
				await entity.save({
					name: 'Sample Activity Name'
				});

				expect(fetchMock.done());
			});

			it('skips save if not editable', async() => {
				await readonlyEntity.save({
					name: 'New Name'
				});

				expect(fetchMock.done());
			});
		});
	});

	describe('Equals', () => {
		it('return true when equal', () => {
			expect(entity.equals({
				name: 'Sample Activity Name'
			})).to.be.true;
		});

		it('return false when not equal', () => {
			expect(entity.equals({
				name: 'New Name'
			})).to.be.false;
		});
	});
});
