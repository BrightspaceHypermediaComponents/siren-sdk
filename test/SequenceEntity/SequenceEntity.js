/* global describe it expect*/
import { SequenceEntity } from '../../src/sequences/SequenceEntity.js';
import { sequenceRoot } from './data/sequenceRoot.js';
import { entityFactory } from '../../src/es6/EntityFactory.js';

describe('SequenceEntity', () => {

	describe('Read through the chain from root', () => {

		it('Check to get activity organization href from root', done => {
			const sirenSequenceRoot =  window.D2L.Hypermedia.Siren.Parse(sequenceRoot);
			const orgHref = {};
			entityFactory(SequenceEntity, '/sequenceRoot', 'whatever', (entity) => {
				entity.onSubSequencesChange((subSequence) => {
					subSequence.onSequencedActivityChange((activity) => {
						orgHref[activity.self()] = activity.organizationHrefs().pop();
					});
				});
			}, sirenSequenceRoot);

			setTimeout(() => {
				expect(orgHref['/activity/1']).to.equal('/organization/1');
				expect(orgHref['/activity/2']).to.equal('/organization/2');
				done();
			}, 50);
		});

	});

});
