/* global describe it expect*/
import { AlertsEntity } from '../../src/organizations/AlertsEntity.js';

describe('AlertsEntity', () => {
	var hasUnreadEntity, noUnreadEntity;

	beforeEach(() => {
		hasUnreadEntity = window.D2L.Hypermedia.Siren.Parse({
			'properties': {
				'hasUnread': true
			},
			'links': [{
				'rel': ['self'],
				'href': 'alerts.json'
			}]
		});

		noUnreadEntity = window.D2L.Hypermedia.Siren.Parse({
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
