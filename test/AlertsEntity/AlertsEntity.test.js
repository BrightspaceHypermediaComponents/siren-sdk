import { AlertsEntity } from '../../src/organizations/AlertsEntity.js';
import { expect } from '@open-wc/testing';
import SirenParse from 'siren-parser';

describe('AlertsEntity', () => {
	var hasUnreadEntity, noUnreadEntity;

	beforeEach(() => {
		hasUnreadEntity = SirenParse({
			'properties': {
				'hasUnread': true
			},
			'links': [{
				'rel': ['self'],
				'href': 'alerts.json'
			}]
		});

		noUnreadEntity = SirenParse({
			'properties': {
				'hasUnread': false
			},
			'links': [{
				'rel': ['self'],
				'href': 'alerts.json'
			}]
		});
	});

	describe('Tests for Propreties', () => {
		it('Has Unread', () => {
			var entity = new AlertsEntity(hasUnreadEntity);
			expect(entity.hasUnread()).to.equal(true);
		});

		it('No Unread', () => {
			var entity = new AlertsEntity(noUnreadEntity);
			expect(entity.hasUnread()).to.equal(false);
		});
	});
});
