import { expect } from '@open-wc/testing';
import { PromotedSearchEntity } from '../../src/promotedSearch/PromotedSearchEntity.js';
import SirenParse from 'siren-parser';

describe('PromotedSearchEntity', () => {
	let entity, action;

	beforeEach(() => {
		entity = SirenParse({
			'properties':{
				'UserEnrollmentsSearchType':'BySemester'
			},
			'actions':[{
				'title':'Alpha',
				'href':'../data/my-enrollments-00',
				'name':'00',
				'method':'GET'
			}, {
				'title':'Omega',
				'href':'../data/my-enrollments-10',
				'name':'10',
				'method':'GET'
			}]
		});
	});

	describe('Tests for actions', () => {
		beforeEach(() => {
			action = [{
				'title':'Alpha',
				'href':'../data/my-enrollments-00',
				'name':'00',
				'method':'GET'
			}, {
				'title':'Omega',
				'href':'../data/my-enrollments-10',
				'name':'10',
				'method':'GET'
			}];
		});

		it('Return correct action name', () => {
			const searchEntity = new PromotedSearchEntity(entity);
			expect(searchEntity.actions()[0].name).to.equal(action[0].name);
		});

		it('Return correct action href', () => {
			const searchEntity = new PromotedSearchEntity(entity);
			expect(searchEntity.actions()[1].href).to.equal(action[1].href);
		});

		it('Return correct action title', () => {
			const searchEntity = new PromotedSearchEntity(entity);
			expect(searchEntity.actions()[1].title).to.equal(action[1].title);
		});

		it('Return correct action method', () => {
			const searchEntity = new PromotedSearchEntity(entity);
			expect(searchEntity.actions()[0].method).to.equal(action[0].method);
		});

		it('Return correct number of action', () => {
			const searchEntity = new PromotedSearchEntity(entity);
			expect(searchEntity.actions().length).to.equal(2);
		});
	});

	describe('Tests for Propreties', () => {
		it('Return correct UserEnrollmentsSearchType', () => {
			const searchEntity = new PromotedSearchEntity(entity);
			expect(searchEntity.userEnrollmentsSearchType()).to.equal('BySemester');
		});
	});

});
