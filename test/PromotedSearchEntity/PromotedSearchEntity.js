/* global describe it expect*/
import { PromotedSearchEntity } from '../../src/promotedSearch/PromotedSearchEntity.js';

describe('PromotedSearchEntity', () => {
	var entity, action;

	beforeEach(() => {
		entity = window.D2L.Hypermedia.Siren.Parse({
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
			var searchEntity = new PromotedSearchEntity(entity);
			expect(searchEntity.actions()[0].name).to.equal(action[0].name);
		});

		it('Return correct action href', () => {
			var searchEntity = new PromotedSearchEntity(entity);
			expect(searchEntity.actions()[1].href).to.equal(action[1].href);
		});

		it('Return correct action title', () => {
			var searchEntity = new PromotedSearchEntity(entity);
			expect(searchEntity.actions()[1].title).to.equal(action[1].title);
		});

		it('Return correct action title', () => {
			var searchEntity = new PromotedSearchEntity(entity);
			expect(searchEntity.actions()[0].method).to.equal(action[0].method);
		});

		it('Return correct number of action', () => {
			var searchEntity = new PromotedSearchEntity(entity);
			expect(searchEntity.actions().length).to.equal(2);
		});
	});

	describe('Tests for Propreties', () => {
		it('Return correct UserEnrollmentsSearchType', () => {
			var searchEntity = new PromotedSearchEntity(entity);
			expect(searchEntity.userEnrollmentsSearchType()).to.equal('BySemester');
		});
	});

});
