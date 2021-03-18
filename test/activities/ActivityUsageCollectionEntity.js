import { ActivityUsageCollectionEntity } from '../../src/activities/ActivityUsageCollectionEntity.js';
import { collection } from './data/collection.js';

describe('ActivityUsageCollectionEntity', () => {
	describe('Basic loading', () => {
		it('Loads collected items', done => {
			const entity = window.D2L.Hypermedia.Siren.Parse(collection);
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
			const entity = window.D2L.Hypermedia.Siren.Parse(collection);
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
				expect(itemEntities[1].activityUsageHref()).to.equal(
					'https://activities.api.testdomain.d2l/activities/6606_3000_4/usages/6606'
				);
				done();
			});
		});
	});
});
