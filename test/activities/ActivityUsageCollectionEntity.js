/* global fetchMock */
import { ActivityUsageCollectionEntity } from '../../src/activities/ActivityUsageCollectionEntity.js';
import { getFormData } from '../utility/test-helpers.js';
import { testData } from './data/collection.js';

describe('ActivityUsageCollectionEntity', () => {
	describe('Basic loading', () => {
		it('Loads collected items', done => {
			const entity = window.D2L.Hypermedia.Siren.Parse(testData.collection);
			const collectionEntity = new ActivityUsageCollectionEntity(entity);

			const itemEntities = [];
			collectionEntity.onItemsChange((item, index) => {
				itemEntities[index] = item;
			});
			setTimeout(() => {
				expect(itemEntities.length).to.equal(2);
				done();
			});
		});

		it('has activity-usage href for collected items', done => {
			const entity = window.D2L.Hypermedia.Siren.Parse(testData.collection);
			const collectionEntity = new ActivityUsageCollectionEntity(entity);

			const itemEntities = [];
			collectionEntity.onItemsChange((item, index) => {
				itemEntities[index] = item;
			});
			setTimeout(() => {
				const itemEntity = itemEntities[0];
				expect(itemEntity.activityUsageHref()).to.equal(
					'https://activities.api.testdomain.d2l/activities/6606_3000_6/usages/6606'
				);
				done();
			});
		});
	});

	describe('Set Collection Paging', () => {
		describe('Editable', () => {
			let entity;
			let entityJson;

			beforeEach(() => {
				entityJson = window.D2L.Hypermedia.Siren.Parse(testData.setCollectionPagingEditable);
				entity = new ActivityUsageCollectionEntity(entityJson);
			});

			afterEach(() => {
				fetchMock.reset();
			});

			it('sets canUpdatePagingType to true', () => {
				expect(entity.canUpdatePagingType()).to.be.true;
			});

			it('saves pagingType', async() => {
				fetchMock.patchOnce('https://305d9474-d93a-4205-9d27-101205376fcf.activities.api.dev.brightspace.com/old/activities/6606_51000_1759/usages/123171/collection/paging', entityJson);

				await entity.save({
					selectedPagingType: 'none'
				});

				const form = await getFormData(fetchMock.lastCall().request);
				if (!form.notSupported) {
					expect(form.get('pagingType')).to.equal('none');
				}
				expect(fetchMock.called()).to.be.true;
			});

			it('skips save if not dirty', async() => {
				await entity.save({
					selectedPagingType: 'oneactivityperpage'
				});

				expect(fetchMock.done());
			});
		});

		describe('Non Editable', () => {
			let entity;
			let entityJson;

			beforeEach(() => {
				entityJson = window.D2L.Hypermedia.Siren.Parse(testData.setCollectionPagingNonEditable);
				entity = new ActivityUsageCollectionEntity(entityJson);
			});

			afterEach(() => {
				fetchMock.reset();
			});

			it('sets canUpdatePagingType to false', () => {
				expect(entity.canUpdatePagingType()).to.be.false;
			});

			it('skips save if not editable', async() => {
				await entity.save({
					selectedPagingType: 'none'
				});

				expect(fetchMock.done());
			});
		});
	});
});
