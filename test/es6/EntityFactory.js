import { entityFactory } from '../../src/es6/EntityFactory.js';
import { Nothing } from '../nothing-entity.js';

/* global describe it expect sinon*/
window.D2L.Siren.WhitelistBehavior._testMode(true);
describe('Entityfactory', () => {

	describe('errors', () => {
		var sandbox;

		beforeEach(() => {
			sandbox = sinon.sandbox.create();

			sandbox.stub(window.d2lfetch, 'fetch').callsFake(() => {

				return Promise.resolve({
					ok: false,
					status: 404
				}
				);
			});
		});

		afterEach(() => {
			sandbox.restore();
		});
		it('bubbles to onchange', done => {
			entityFactory(Nothing, 'http://localhost/not/a/valid/thing', 'wutsatoken', (entity, err) => {
				expect(entity).to.be.null;
				expect(err).to.be.not.null;
				expect(err).to.be.equal(404);
				done();
			});

		});
	});
});

