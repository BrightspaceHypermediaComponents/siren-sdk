import {
	contentRemixEntityData,
	contentRemixEntityDataMinimal,
	contentRemixEntityDataWithCPlus,
	contentRemixEntityDataWithoutAction,
	contentRemixEntityDataWithoutClass
} from './data/TestContentRemixEntity.js';
import { ContentRemixEntity } from '../../../src/activities/content/ContentRemixEntity.js';
import { expect } from '@open-wc/testing';
import SirenParse from 'siren-parser';

describe('ContentRemixEntity', () => {
	describe('Basic Properties', () => {
		let entity;

		beforeEach(() => {
			const entityJson = SirenParse(contentRemixEntityData);
			entity = new ContentRemixEntity(entityJson, 'fake-token');
		});

		it('gets characterLimit', () => {
			expect(entity.characterLimit).to.equal(6000);
		});

		it('gets actions', () => {
			expect(entity.actions).to.be.an('array');
			expect(entity.actions).to.have.lengthOf(1);
			expect(entity.actions[0].name).to.equal('simplify-content');
		});

		it('returns null characterLimit when not present', () => {
			const entityJson = SirenParse(contentRemixEntityDataMinimal);
			const minimalEntity = new ContentRemixEntity(entityJson, 'fake-token');
			expect(minimalEntity.characterLimit).to.be.null;
		});
	});

	describe('Content Remix Basic Capabilities', () => {
		describe('when entity has remix-page class and simplify-content action', () => {
			let entity;
			let cPlusEntity;

			beforeEach(() => {
				const entityJson = SirenParse(contentRemixEntityData);
				entity = new ContentRemixEntity(entityJson, 'fake-token');

				const cPlusEntityJson = SirenParse(contentRemixEntityDataWithCPlus);
				cPlusEntity = new ContentRemixEntity(cPlusEntityJson, 'fake-token');
			});

			it('canPerformContentRemix returns true', () => {
				expect(entity.canPerformContentRemix()).to.be.true;
				expect(cPlusEntity.canPerformContentRemix()).to.be.true;
			});

			it('isContentRemixEnabled returns true', () => {
				expect(entity.isContentRemixEnabled()).to.be.true;
				expect(cPlusEntity.isContentRemixEnabled()).to.be.true;
			});

			it('canRemixWithCPlus returns true', () => {
				expect(entity.canRemixWithCPlus()).to.be.false;
				expect(cPlusEntity.canRemixWithCPlus()).to.be.true;
			});
		});

		describe('when entity lacks simplify-content action', () => {
			let entity;

			beforeEach(() => {
				const entityJson = SirenParse(contentRemixEntityDataWithoutAction);
				entity = new ContentRemixEntity(entityJson, 'fake-token');
			});

			it('canPerformContentRemix returns false', () => {
				expect(entity.canPerformContentRemix()).to.be.false;
			});

			it('isContentRemixEnabled returns true (has remix-page class)', () => {
				expect(entity.isContentRemixEnabled()).to.be.true;
			});
		});

		describe('when entity lacks remix-page class', () => {
			let entity;

			beforeEach(() => {
				const entityJson = SirenParse(contentRemixEntityDataWithoutClass);
				entity = new ContentRemixEntity(entityJson, 'fake-token');
			});

			it('canPerformContentRemix returns true (has action)', () => {
				expect(entity.canPerformContentRemix()).to.be.true;
			});

			it('isContentRemixEnabled returns false', () => {
				expect(entity.isContentRemixEnabled()).to.be.false;
			});
		});

		describe('when entity has no capabilities', () => {
			let entity;

			beforeEach(() => {
				const entityJson = SirenParse(contentRemixEntityDataMinimal);
				entity = new ContentRemixEntity(entityJson, 'fake-token');
			});

			it('canPerformContentRemix returns false', () => {
				expect(entity.canPerformContentRemix()).to.be.false;
			});

			it('isContentRemixEnabled returns false', () => {
				expect(entity.isContentRemixEnabled()).to.be.false;
			});
		});
	});

	describe('_formatContentRemixAction', () => {
		let entity;

		beforeEach(() => {
			const entityJson = SirenParse(contentRemixEntityDataWithCPlus);
			entity = new ContentRemixEntity(entityJson, 'fake-token');
		});

		it('formats action with all parameters', () => {
			const params = {
				originalHtmlContent: '<p>Test content</p>',
				textComplexity: 'simple',
				customInstructions: 'Make it shorter',
				detectedLang: 'en',
				sessionId: 'session-123',
				generationId: 'gen-456',
				iterationNumber: 1,
				sourceIndex: 0,
				topicId: 'topic-789',
				applyCPlusElements: true
			};

			const result = entity._formatContentRemixAction(params);

			expect(result).to.have.property('action');
			expect(result).to.have.property('fields');
			expect(result.action.name).to.equal('simplify-content');
			expect(result.fields).to.have.lengthOf(10);

			const fieldNames = result.fields.map(f => f.name);
			expect(fieldNames).to.include.members([
				'originalHtmlContent',
				'textComplexity',
				'customInstructions',
				'detectedLang',
				'sessionId',
				'generationId',
				'iterationNumber',
				'sourceIndex',
				'topicId',
				'applyCPlusElements'
			]);
		});

		it('formats action with partial parameters', () => {
			const params = {
				originalHtmlContent: '<p>Test content</p>',
				textComplexity: 'simple'
			};

			const result = entity._formatContentRemixAction(params);

			expect(result.fields).to.have.lengthOf(2);
			expect(result.fields[0]).to.deep.equal({ name: 'originalHtmlContent', value: '<p>Test content</p>' });
			expect(result.fields[1]).to.deep.equal({ name: 'textComplexity', value: 'simple' });
		});

		it('excludes null and undefined parameters', () => {
			const params = {
				originalHtmlContent: '<p>Test content</p>',
				textComplexity: null,
				customInstructions: undefined,
				detectedLang: 'en'
			};

			const result = entity._formatContentRemixAction(params);

			expect(result.fields).to.have.lengthOf(2);
			const fieldNames = result.fields.map(f => f.name);
			expect(fieldNames).to.include.members(['originalHtmlContent', 'detectedLang']);
			expect(fieldNames).to.not.include.members(['textComplexity', 'customInstructions']);
		});

		it('includes zero values', () => {
			const params = {
				iterationNumber: 0,
				sourceIndex: 0
			};

			const result = entity._formatContentRemixAction(params);

			expect(result.fields).to.have.lengthOf(2);
			expect(result.fields[0]).to.deep.equal({ name: 'iterationNumber', value: 0 });
			expect(result.fields[1]).to.deep.equal({ name: 'sourceIndex', value: 0 });
		});

		it('returns null when action is not available', () => {
			const entityJson = SirenParse(contentRemixEntityDataWithoutAction);
			const entityWithoutAction = new ContentRemixEntity(entityJson, 'fake-token');

			const params = {
				originalHtmlContent: '<p>Test content</p>'
			};

			const result = entityWithoutAction._formatContentRemixAction(params);
			expect(result).to.be.null;
		});
	});

	describe('performContentRemix', () => {
		let entity;

		beforeEach(() => {
			const entityJson = SirenParse(contentRemixEntityDataWithCPlus);
			entity = new ContentRemixEntity(entityJson, 'fake-token');
		});

		it('returns early when remixParams is null', async() => {
			const result = await entity.performContentRemix(null);
			expect(result).to.be.undefined;
		});

		it('returns early when remixParams is undefined', async() => {
			const result = await entity.performContentRemix(undefined);
			expect(result).to.be.undefined;
		});

		it('returns early when cannot perform content remix', async() => {
			const entityJson = SirenParse(contentRemixEntityDataWithoutAction);
			const entityWithoutAction = new ContentRemixEntity(entityJson, 'fake-token');

			const params = {
				originalHtmlContent: '<p>Test content</p>'
			};

			const result = await entityWithoutAction.performContentRemix(params);
			expect(result).to.be.undefined;
		});

		it('handles abort signal when already aborted', async() => {
			const abortController = new AbortController();
			abortController.abort();

			const params = {
				originalHtmlContent: '<p>Test content</p>'
			};

			try {
				await entity.performContentRemix(params, abortController.signal);
				expect.fail('Should have thrown an error');
			} catch (error) {
				expect(error.message).to.equal('The operation was aborted.');
			}
		});
	});

	describe('AbortSignal handling', () => {
		let entity;

		beforeEach(() => {
			const entityJson = SirenParse(contentRemixEntityDataWithCPlus);
			entity = new ContentRemixEntity(entityJson, 'fake-token');
		});

		it('passes abort signal to performSirenAction', async() => {
			const abortController = new AbortController();
			const params = {
				originalHtmlContent: '<p>Test content</p>',
				textComplexity: 'simple'
			};

			// This test verifies that the abort signal is properly passed through
			// The actual abort behavior is tested in SirenAction.test.js
			try {
				// Start the operation and immediately abort
				const promise = entity.performContentRemix(params, abortController.signal);
				abortController.abort();
				await promise;
				expect.fail('Should have thrown an error');
			} catch (error) {
				expect(error.message).to.equal('The operation was aborted.');
			}
		});

		it('works without abort signal', async() => {
			const params = {
				originalHtmlContent: '<p>Test content</p>',
				textComplexity: 'simple'
			};

			try {
				await entity.performContentRemix(params);
			} catch (error) {
				expect(error.message).to.not.equal('The operation was aborted.');
			}
		});

		it('handles null abort signal gracefully', async() => {
			const params = {
				originalHtmlContent: '<p>Test content</p>',
				textComplexity: 'simple'
			};

			try {
				await entity.performContentRemix(params, null);
			} catch (error) {
				expect(error.message).to.not.equal('The operation was aborted.');
			}
		});

		it('handles undefined abort signal gracefully', async() => {
			const params = {
				originalHtmlContent: '<p>Test content</p>',
				textComplexity: 'simple'
			};

			try {
				await entity.performContentRemix(params, undefined);
			} catch (error) {
				expect(error.message).to.not.equal('The operation was aborted.');
			}
		});

		it('abort signal aborted after creation but before call', async() => {
			const abortController = new AbortController();
			const params = {
				originalHtmlContent: '<p>Test content</p>',
				textComplexity: 'simple'
			};

			abortController.abort();

			try {
				await entity.performContentRemix(params, abortController.signal);
				expect.fail('Should have thrown an error');
			} catch (error) {
				expect(error.message).to.equal('The operation was aborted.');
			}
		});

		it('abort signal during execution', async() => {
			const abortController = new AbortController();
			const params = {
				originalHtmlContent: '<p>Test content</p>',
				textComplexity: 'simple'
			};

			const promise = entity.performContentRemix(params, abortController.signal);

			setTimeout(() => abortController.abort(), 0);

			try {
				await promise;
				expect.fail('Should have thrown an error');
			} catch (error) {
				expect(error.message.toLowerCase()).to.include('abort');
			}
		});
	});
});
