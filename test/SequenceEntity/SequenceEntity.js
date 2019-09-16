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
						orgHref[activity.index()] = activity.organizationHref();
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

		it('Check to get alternate viewer href', done => {
			const sirenSequenceRoot =  window.D2L.Hypermedia.Siren.Parse(sequenceRootMultipleTopLevel);
			const orgHref = {};
			entityFactory(SequenceEntity, '/sequenceRoot2', 'whatever', (entity) => {
				entity.onSubSequencesChange((subSequence) => {
					orgHref[subSequence.index()] = subSequence.alternateViewerHref();
				});
			}, sirenSequenceRoot);

			setTimeout(() => {
				expect(orgHref[0]).to.equal(
					'https://qa2019716994g.bspc.com/d2l/le/content/121694/Home?itemIdentifier=D2L.LE.Content.ContentObject.ModuleCO-121263'
				);
				expect(orgHref[1]).to.equal(
					'https://qa2019716994g.bspc.com/d2l/le/content/121694/Home?itemIdentifier=D2L.LE.Content.ContentObject.ModuleCO-121264'
				);
				expect(orgHref[2]).to.equal(
					'https://qa2019716994g.bspc.com/d2l/le/content/121694/Home?itemIdentifier=D2L.LE.Content.ContentObject.ModuleCO-121265'
				);
				done();
			}, 50);
		});

		it('Check completion', done => {
			const sirenSequenceRoot =  window.D2L.Hypermedia.Siren.Parse(sequenceRootMultipleTopLevel);
			const completionData = {};
			entityFactory(SequenceEntity, '/sequenceRoot2', 'whatever', (entity) => {
				entity.onSubSequencesChange((subSequence) => {
					completionData[subSequence.index()] = subSequence.completion();
				});
			}, sirenSequenceRoot);

			setTimeout(() => {
				expect(completionData[0]).deep.equal({completed: 0, total: 7, optionalTotal: 5, optionalViewed: 0, isCompleted: false});
				expect(completionData[1]).deep.equal({completed: 7, total: 7, optionalTotal: 5, optionalViewed: 0, isCompleted: true});
				expect(completionData[2]).deep.equal({completed: 4, total: 7, optionalTotal: 5, optionalViewed: 0, isCompleted: false});
				done();
			}, 50);
		});

	});

});
