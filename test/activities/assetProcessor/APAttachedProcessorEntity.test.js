import { APAttachedProcessorEntity } from '../../../src/activities/assetProcessor/APAttachedProcessorsCollectionEntity.js';
import { disabledAttachedProcessor } from './data/DisabledProcessor.js';
import { deletableAttachedProcessor } from './data/DeletableProcessor.js';
import { enabledAttachedProcessor } from './data/EnabledProcessor.js';
import { expect } from '@open-wc/testing';
import { getFormData } from '../../utility/test-helpers.js';
import fetchMock from 'fetch-mock/esm/client.js';
import SirenParse from 'siren-parser';

describe('APAttachedProcessorEntity', () => {
	let enabledEntity, disabledEntity, deletableEntity;

	beforeEach(() => {
		enabledEntity = SirenParse(enabledAttachedProcessor);
		disabledEntity = SirenParse(disabledAttachedProcessor);
		deletableEntity = SirenParse(deletableAttachedProcessor);
	});

	afterEach(() => {
		fetchMock.reset();
	});

	describe('enabled', () => {

		it('returns true when processor is enabled', () => {
			const enabledProcessor = new APAttachedProcessorEntity(enabledEntity);
			expect(enabledProcessor.enabled()).to.be.true;
		});

		it('returns false when processor is disabled', () => {
			const disabledProcessor = new APAttachedProcessorEntity(disabledEntity);
			expect(disabledProcessor.enabled()).to.be.false;
		});

	});

	describe('canEnable', () => {

		it('returns true when processor is disabled & has enable action, false otherwise', () => {
			const enabledProcessor = new APAttachedProcessorEntity(enabledEntity);
			expect(enabledProcessor.canEnable()).to.be.false;

			const disabledProcessor = new APAttachedProcessorEntity(disabledEntity);
			expect(disabledProcessor.canEnable()).to.be.true;
		});

	});

	describe('canDisable', () => {

		it('returns true when processor is enabled & has disable action, false otherwise', () => {
			const enabledProcessor = new APAttachedProcessorEntity(enabledEntity);
			expect(enabledProcessor.canDisable()).to.be.true;

			const disabledProcessor = new APAttachedProcessorEntity(disabledEntity);
			expect(disabledProcessor.canDisable()).to.be.false;
		});

	});

	describe('canDelete', () => {

		it('returns true when processor has delete action, false otherwise', () => {
			const enabledProcessor = new APAttachedProcessorEntity(enabledEntity);
			expect(enabledProcessor.canDelete()).to.be.false;

			const disabledProcessor = new APAttachedProcessorEntity(disabledEntity);
			expect(disabledProcessor.canDelete()).to.be.false;

			const deletableProcessor = new APAttachedProcessorEntity(deletableEntity);
			expect(deletableProcessor.canDelete()).to.be.true;
		});

	});

	describe('enable', () => {

		it('updates isEnabled to true', async() => {
			fetchMock.patchOnce('https://lti.api.brightspace.com/6609/asset-processor/1', disabledEntity);
			const disabledProcessor = new APAttachedProcessorEntity(disabledEntity);

			await disabledProcessor.enable();

			const form = await getFormData(fetchMock.lastCall().request);
			expect(form.get('isEnabled')).to.equal('true');
			expect(fetchMock.called()).to.be.true;
		});

	});

	describe('disable', () => {

		it('updates isEnabled to false', async() => {
			fetchMock.patchOnce('https://lti.api.brightspace.com/6609/asset-processor/1', enabledEntity);
			const enabledProcessor = new APAttachedProcessorEntity(enabledEntity);

			await enabledProcessor.disable();

			const form = await getFormData(fetchMock.lastCall().request);
			expect(form.get('isEnabled')).to.equal('false');
			expect(fetchMock.called()).to.be.true;
		});

	});

	describe('delete', () => {

		it('deletes', async() => {
			fetchMock.deleteOnce('https://lti.api.brightspace.com/6609/asset-processor/1', deletableEntity);
			const deletableProcessor = new APAttachedProcessorEntity(deletableEntity);

			await deletableProcessor.delete();

			expect(fetchMock.called()).to.be.true;
		});

	});
});
