import { entityFactory } from '../../src/es6/EntityFactory.js';
import { Nothing } from '../nothing-entity.js';

/* global describe it expect sinon*/
window.D2L.Siren.WhitelistBehavior._testMode(true);
describe('Entityfactory', () => {

	describe('errors', () => {
		it('bubbles to onchange', done => {
			entityFactory(Nothing, 'http://localhost:8000/not/a/valid/thing', 'wutsatoken', (entity, err) => {
				expect(entity).to.be.null;
				expect(err).to.be.not.null;
				expect(err).to.be.equal(404);
				done();
			});

		});
	});
});

