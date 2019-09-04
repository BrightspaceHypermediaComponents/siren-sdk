import { entityFactory } from '../../src/es6/EntityFactory';
import { Nothing } from '../nothing-entity';

/* global describe it expect sinon*/
window.D2L.Siren.WhitelistBehavior._testMode(true);
describe('Entityfactory', () => {

	describe('errors', () => {
		it('bubbles to onchange', done => {
			entityFactory(Nothing, 'http://notadomain.superbadtld', 'wutsatoken', (entity, error) => {
				expect(entity).to.be.null;
				expect(error).to.be.not.null;
				expect(error.message).to.be.equal('Failed to fetch');
				done();
			});
		});
	});
});

