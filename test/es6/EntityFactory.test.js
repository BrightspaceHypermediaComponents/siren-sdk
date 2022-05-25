import { entityFactory } from '../../src/es6/EntityFactory.js';
import { expect } from '@open-wc/testing';
import { Nothing } from '../nothing-entity.js';
import sinon from 'sinon';

window.D2L.Siren.WhitelistBehavior._testMode(true);
describe('Entityfactory', () => {

	describe('errors', () => {
		let sandbox;

		beforeEach(() => {
			sandbox = sinon.createSandbox();

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

