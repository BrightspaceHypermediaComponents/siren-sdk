import { expect } from '@open-wc/testing';
import SirenParse from 'siren-parser';
import { UserActivityUsageEntity } from '../../src/enrollments/UserActivityUsageEntity.js';

describe('UserActivityUsageEntity', () => {

	describe('Tests for _sirenClassProperty', () => {
		it('Read a date', () => {
			const entity = SirenParse({
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
			const userActivityUsageEntity = new UserActivityUsageEntity(entity);
			expect(userActivityUsageEntity._sirenClassProperty(entity, 'due-date')).to.equal('2100-08-01T04:00:00.000Z');
		});

		it('Read a duration', () => {
			const entity = SirenParse({
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
			const userActivityUsageEntity = new UserActivityUsageEntity(entity);
			expect(userActivityUsageEntity._sirenClassProperty(entity, 'due-date')).to.equal(6);

		});

		it('Read a completion', () => {
			const entity = SirenParse({
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
			const userActivityUsageEntity = new UserActivityUsageEntity(entity);
			expect(userActivityUsageEntity._sirenClassProperty(entity, 'due-date')).to.equal('2100-08-01T04:00:00.000Z');

		});
	});

});
