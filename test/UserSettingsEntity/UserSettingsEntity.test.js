import { expect } from '@open-wc/testing';
import SirenParse from 'siren-parser';
import { UserSettingsEntity } from '../../src/userSettings/UserSettingsEntity.js';

describe('UserSettingsEntity', () => {
	let entity, action;

	beforeEach(() => {
		entity = SirenParse({
			'properties': {
				'MostRecentEnrollmentsSearchType': 'None',
				'MostRecentEnrollmentsSearchName': 'search-my-enrollments'
			},
			'rel': [
				'https://api.brightspace.com/rels/user-settings'
			],
			'links': [
				{
					'rel': [
						'https://api.brightspace.com/rels/widget-settings'
					],
					'href': '../data/presentation'
				},
				{
					'rel': [
						'self'
					],
					'href': '../data/user-settings'
				}
			],
			'actions': [
				{
					'href': '../data/user-settings',
					'name': 'update-user-settings',
					'method': 'PUT'
				}
			]
		});
	});

	describe('Tests for userSettingsHref', () => {
		it('Return correct href', () => {
			const userSettings = new UserSettingsEntity(entity);
			expect(userSettings.userSettingsHref()).to.equal('../data/presentation');
		});
	});

	describe('Tests for userSettingsAction', () => {
		beforeEach(() => {
			action = {
				'href': '../data/user-settings',
				'name': 'update-user-settings',
				'method': 'PUT'
			};
		});

		it('Return correct Action href', () => {
			const userSettings = new UserSettingsEntity(entity);
			expect(userSettings.userSettingsAction().href).to.equal(action.href);
		});

		it('Return correct Action name', () => {
			const userSettings = new UserSettingsEntity(entity);
			expect(userSettings.userSettingsAction().name).to.equal(action.name);
		});

		it('Return correct Action method', () => {
			const userSettings = new UserSettingsEntity(entity);
			expect(userSettings.userSettingsAction().method).to.equal(action.method);
		});
	});

	describe('Tests for Propreties', () => {
		it('Return correct mostRecentEnrollmentsSearchName', () => {
			const userSettings = new UserSettingsEntity(entity);
			expect(userSettings.mostRecentEnrollmentsSearchName()).to.equal('search-my-enrollments');
		});

		it('Return correct mostRecentEnrollmentsSearchType', () => {
			const userSettings = new UserSettingsEntity(entity);
			expect(userSettings.mostRecentEnrollmentsSearchType()).to.equal('None');
		});
	});

});
