/* global fetchMock */

import { getFormData } from '../utility/test-helpers.js';
import { performSirenAction, performSirenActions } from '../../src/es6/SirenAction.js';
import { sirenActionTestData } from './data/SirenAction.js';

describe('SirenAction', () => {
	afterEach(() => {
		fetchMock.reset();
	});

	describe('performSirenAction', () => {
		it('sends form-urlencoded', async() => {
			fetchMock.postOnce('http://api.x.io/orders/42/items', {});

			await performSirenAction('token', sirenActionTestData.itemsPost1, [{ name: 'productCode', value: '12345' }]);

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('orderNumber')).to.equal('42');
				expect(form.get('productCode')).to.equal('12345');
			}
			expect(fetchMock.called()).to.be.true;
		});

		describe('Siren ActionQueue Enqueue', () => {
			let sandbox, actionQueueSpy;

			beforeEach(() => {
				sandbox = sinon.createSandbox();
				actionQueueSpy = sandbox.spy(window.D2L.Siren.ActionQueue, 'enqueue');
			});

			afterEach(() => {
				sandbox.restore();
			});

			it('enqueues, and does not execute immediately', async() => {
				fetchMock.postOnce('http://api.x.io/orders/42/items', {});
				await performSirenAction('token', sirenActionTestData.itemsPost1, [{ name: 'productCode', value: '12345' }], false);
				expect(actionQueueSpy.callCount).to.equal(1);
				expect(fetchMock.called()).to.be.true;
			});

			it('does not enqueue, and executes immediately', async() => {
				fetchMock.postOnce('http://api.x.io/orders/42/items', {});
				await performSirenAction('token', sirenActionTestData.itemsPost1, [{ name: 'productCode', value: '12345' }], true);
				expect(actionQueueSpy.callCount).to.equal(0);
				expect(fetchMock.called()).to.be.true;
			});
		});
	});

	describe('performSirenActions', () => {
		let AFitemsPost1, AFitemPatch1, AFitemPatch2, AFitemDelete1;

		beforeEach(() => {
			AFitemsPost1 = { action: sirenActionTestData.itemsPost1, fields: [{ name: 'productCode', value: '10000' }] };
			AFitemPatch1 = { action: sirenActionTestData.itemPatch1, fields: [{ name: 'productCode', value: '20000'}] };
			AFitemPatch2 = { action: sirenActionTestData.itemPatch2, fields: [{ name: 'quantity', value: '10' }] };
			AFitemDelete1 = { action: sirenActionTestData.itemDelete1 };
		});

		it('sends 1 request when working with 1 action with no (i.e. undefined) fields', async() => {
			fetchMock.deleteOnce('http://api.x.io/orders/42/items/5', {});
			await performSirenActions('token', [AFitemDelete1]);
			expect(fetchMock.called()).to.be.true;
		});

		it('sends 1 request when working with 1 action with no (i.e. empty array) fields', async() => {
			fetchMock.deleteOnce('http://api.x.io/orders/42/items/5', {});
			AFitemDelete1.fields = [];
			await performSirenActions('token', [AFitemDelete1]);
			expect(fetchMock.called()).to.be.true;
		});

		it('sends 1 request when working with 1 action with fields', async() => {
			fetchMock.postOnce('http://api.x.io/orders/42/items', {});

			await performSirenActions('token', [AFitemsPost1]);

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('orderNumber')).to.equal('42');
				expect(form.get('productCode')).to.equal('10000');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('sends 2 requests when working with 2 actions with different endpoints', async() => {
			fetchMock.postOnce('http://api.x.io/orders/42/items', {});
			fetchMock.patchOnce('http://api.x.io/orders/42/items/5', {});

			await performSirenActions('token', [AFitemsPost1, AFitemPatch1]);

			let form = await getFormData(fetchMock.calls()[0].request);
			if (!form.notSupported) {
				expect(form.get('orderNumber')).to.equal('42');
				expect(form.get('productCode')).to.equal('10000');
			}

			form = await getFormData(fetchMock.calls()[1].request);
			if (!form.notSupported) {
				expect(form.get('orderNumber')).to.equal('50');
				expect(form.get('productCode')).to.equal('20000');
			}

			expect(fetchMock.done()).to.be.true;
		});

		it('sends 2 requests when working with 2 actions with the same endpoint but different methods', async() => {
			fetchMock.patchOnce('http://api.x.io/orders/42/items/5', {});
			fetchMock.deleteOnce('http://api.x.io/orders/42/items/5', {});

			await performSirenActions('token', [AFitemPatch1, AFitemDelete1]);

			const form = await getFormData(fetchMock.calls()[0].request);
			if (!form.notSupported) {
				expect(form.get('orderNumber')).to.equal('50');
				expect(form.get('productCode')).to.equal('20000');
			}

			expect(fetchMock.done()).to.be.true;
		});

		it('sends 1 request when working with 2 actions with the same endpoint and the same method', async() => {
			fetchMock.patchOnce('http://api.x.io/orders/42/items/5', {});

			await performSirenActions('token', [AFitemPatch1, AFitemPatch2]);

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('orderNumber')).to.equal('50');
				expect(form.get('productCode')).to.equal('20000');
				expect(form.get('visibleToCustomer')).to.equal('true');
				expect(form.get('quantity')).to.equal('10');
			}

			expect(fetchMock.called()).to.be.true;
		});
	});
});
