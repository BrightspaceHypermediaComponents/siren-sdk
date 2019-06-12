/* global describe it expect*/
import { SequenceEntity } from '../../src/sequences/SequenceEntity.js';
import { sequenceRoot, sequenceRootMultipleTopLevel } from './data/sequenceRoot.js';
import { entityFactory } from '../../src/es6/EntityFactory.js';

describe('SequenceEntity', () => {

	describe('Read through the chain from root', () => {

		it('Check to get activity organization href from root', done => {
			const sirenSequenceRoot =  window.D2L.Hypermedia.Siren.Parse(sequenceRoot);
			const orgHref = {};
			entityFactory(SequenceEntity, '/sequenceRoot', 'whatever', (entity) => {
				entity.onSubSequencesChange((subSequence) => {
					subSequence.onSequencedActivityChange((activity) => {
						orgHref[activity.index()] = activity.organizationHrefs().pop();
					});
				});
			}, sirenSequenceRoot);

			setTimeout(() => {
				expect(orgHref[0]).to.equal('/organization/1');
				expect(orgHref[1]).to.equal('/organization/2');
				done();
			}, 50);
		});

		it('Check to get multiple subModules', done => {
			const sirenSequenceRoot =  window.D2L.Hypermedia.Siren.Parse(sequenceRootMultipleTopLevel);
			const orgHref = {};
			entityFactory(SequenceEntity, '/sequenceRoot2', 'whatever', (entity) => {
				entity.onSubSequencesChange((subSequence) => {
					orgHref[subSequence.index()] = subSequence.title();
				});
			}, sirenSequenceRoot);

			setTimeout(() => {
				expect(orgHref[0]).to.equal('Section 1');
				expect(orgHref[1]).to.equal('Section 2');
				expect(orgHref[2]).to.equal('Section 3');
				done();
			}, 50);
		});

		it('Check to get sequence Viewer Application Href', done => {
			const sirenSequenceRoot =  window.D2L.Hypermedia.Siren.Parse(sequenceRootMultipleTopLevel);
			const orgHref = {};
			entityFactory(SequenceEntity, '/sequenceRoot2', 'whatever', (entity) => {
				entity.onSubSequencesChange((subSequence) => {
					orgHref[subSequence.index()] = subSequence.sequenceViewerApplicationHref();
				});
			}, sirenSequenceRoot);

			setTimeout(() => {
				expect(orgHref[0]).to.equal('/sequenceViewerApplicationHref/1');
				expect(orgHref[1]).to.equal('/sequenceViewerApplicationHref/2');
				expect(orgHref[2]).to.equal('/sequenceViewerApplicationHref/3');
				done();
			}, 50);
		});

	});

});
