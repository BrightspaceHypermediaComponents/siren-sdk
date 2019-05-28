import { UserActivityUsageEntity } from '../../src/enrollments/UserActivityUsageEntity.js';

describe('UserActivityUsageEntity', () => {

	describe('Tests for _sirenClassProperty', () => {
		it('Read a date', () => {
			var entity =  window.D2L.Hypermedia.Siren.Parse({
				entities: [
					{
						class: [
							'date',
							'due-date'
						],
						rel: [
							'https://api.brightspace.com/rels/date'
						],
						properties: {
							date: '2100-08-01T04:00:00.000Z'
						}
					}
				]
			});
			var userActivityUsageEntity = new UserActivityUsageEntity(entity);
			expect(userActivityUsageEntity._sirenClassProperty(entity, 'due-date')).to.equal('2100-08-01T04:00:00.000Z');
		});

		it('Read a duration', () => {
			var entity =  window.D2L.Hypermedia.Siren.Parse({
				entities: [
					{
						class: [
							'duration',
							'due-date'
						],
						rel: [
							'https://api.brightspace.com/rels/date'
						],
						properties: {
							seconds: 6
						}
					}
				]
			});
			var userActivityUsageEntity = new UserActivityUsageEntity(entity);
			expect(userActivityUsageEntity._sirenClassProperty(entity, 'due-date')).to.equal(6);

		});

		it('Read a completion', () => {
			var entity =  window.D2L.Hypermedia.Siren.Parse({
				entities: [
					{
						class: [
							'completion',
							'due-date'
						],
						entities: [
							{
								class: [
									'completion-date',
									'date'
								],
								rel: [
									'https://api.brightspace.com/rels/date'
								],
								properties: {
									date: '2100-08-01T04:00:00.000Z'
								}
							}
						],
						rel: [
							'https://api.brightspace.com/rels/date'
						]
					}
				]
			});
			var userActivityUsageEntity = new UserActivityUsageEntity(entity);
			expect(userActivityUsageEntity._sirenClassProperty(entity, 'due-date')).to.equal('2100-08-01T04:00:00.000Z');

		});
	});

});
