/* global suite, test, fixture, expect, setup, teardown, sinon */

'use strict';

suite('SirenAction', function() {
	var element, sandbox;

	var testAction = { // example from https://github.com/kevinswiber/siren
		'name': 'add-item',
		'title': 'Add Item',
		'method': 'POST',
		'href': 'http://api.x.io/orders/42/items',
		'type': 'application/x-www-form-urlencoded',
		'fields': [
			{ 'name': 'orderNumber', 'type': 'hidden', 'value': '42' },
			{ 'name': 'productCode', 'type': 'text' },
			{ 'name': 'quantity', 'type': 'number' }
		]
	};

	var testAction2 = {
		'name': 'delete-item',
		'title': 'Delete Item',
		'method': 'DELETE',
		'href': 'http://api.x.io/orders/42/items/5',
		'type': 'application/x-www-form-urlencoded'
	};

	var testEntity = { // example from https://github.com/kevinswiber/siren
		'class': ['order'],
		'properties': {
			'orderNumber': 42,
			'itemCount': 3,
			'status': 'pending'
		},
		'entities': [
			{
				'class': ['items', 'collection'],
				'rel': ['http://x.io/rels/order-items'],
				'href': 'http://api.x.io/orders/42/items'
			},
			{
				'class': ['info', 'customer'],
				'rel': ['http://x.io/rels/customer'],
				'properties': {
					'customerId': 'pj123',
					'name': 'Peter Joseph'
				},
				'links': [
					{ 'rel': ['self'], 'href': 'http://api.x.io/customers/pj123' }
				]
			}
		],
		'actions': [
			{
				'name': 'add-item',
				'title': 'Add Item',
				'method': 'POST',
				'href': 'http://api.x.io/orders/42/items',
				'type': 'application/x-www-form-urlencoded',
				'fields': [
					{ 'name': 'orderNumber', 'type': 'hidden', 'value': '42' },
					{ 'name': 'productCode', 'type': 'text' },
					{ 'name': 'quantity', 'type': 'number' }
				]
			}
		],
		'links': [
			{ 'rel': ['self'], 'href': 'http://api.x.io/orders/42' },
			{ 'rel': ['previous'], 'href': 'http://api.x.io/orders/41' },
			{ 'rel': ['next'], 'href': 'http://api.x.io/orders/43' }
		]
	};

	setup(function() {
		sandbox = sinon.sandbox.create();
		element = fixture('basic');
		element.token = 'foozleberries';
	});

	teardown(function() {
		sandbox.restore();
		window.D2L.Siren.ActionQueue.queueEnd = Promise.resolve();
		window.D2L.Siren.EntityStore.clear();
	});

	suite('smoke test', function() {
		test('can be instantiated', function() {
			expect(element.tagName.toLowerCase()).to.equal('siren-action-test-component');
		});
	});

	suite('send action unit tests', function() {
		var fetchStub;
		setup(function() {
			fetchStub = sinon.stub(window.d2lfetch, 'fetch');
			var res = new window.Response(JSON.stringify(testEntity), {
				status: 200,
				headers: {
					'Content-type': 'application/json'
				},
			});

			fetchStub.returns(Promise.resolve(res));
		});

		teardown(function() {
			fetchStub.restore();
		});

		test('send form-urlencoded', function() {
			var result = element.performSirenAction(testAction);
			result.then(function() {
				expect(fetchStub.callCount).to.equal(1);
				var requestUrl = fetchStub.getCall(0).args[0];
				var requestMethod = fetchStub.getCall(0).args[1].method;
				expect(requestUrl).to.equal('http://api.x.io/orders/42/items');
				expect(requestMethod).to.equal('POST');
			});
			return result;
		});
	});

	suite('enqueue action unit tests', function() {
		var res1, res2;
		var fetchStub;
		var actionQueueSpy;
		setup(function() {
			actionQueueSpy = sinon.spy(window.D2L.Siren.ActionQueue, 'enqueue');
			fetchStub = sinon.stub(window.d2lfetch, 'fetch');
			res1 = new window.Response(JSON.stringify(testEntity), {
				status: 200,
				headers: {
					'Content-type': 'application/json'
				},
			});
			res2 = new window.Response(null, {
				status: 204
			});
		});

		teardown(function() {
			fetchStub.restore();
			actionQueueSpy.restore();
		});

		test('enqueues actions', function() {
			fetchStub.withArgs('http://api.x.io/orders/42/items').returns(
				new Promise(function(resolve) {
					setTimeout(function() {
						expect(fetchStub.callCount).to.equal(1);
						expect(actionQueueSpy.callCount).to.equal(2);
						resolve(res1);
					});
				})
			);
			fetchStub.withArgs('http://api.x.io/orders/42/items/5').returns(
				new Promise(function(resolve) {
					resolve(res2);
				})
			);
			var firstCall = element.performSirenAction(testAction);
			element.performSirenAction(testAction2);
			return firstCall;
		});

		test('immediate actions skip queue', function() {
			fetchStub.withArgs('http://api.x.io/orders/42/items').returns(
				new Promise(function(resolve) {
					setTimeout(function() {
						expect(fetchStub.callCount).to.equal(2);
						expect(actionQueueSpy.callCount).to.equal(1);
						resolve(res1);
					});
				})
			);
			fetchStub.withArgs('http://api.x.io/orders/42/items/5').returns(
				new Promise(function(resolve) {
					resolve(res2);
				})
			);
			var firstCall = element.performSirenAction(testAction);
			element.performSirenAction(testAction2, null, true);
			return firstCall;
		});
	});
});
