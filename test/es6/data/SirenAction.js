export const sirenActionTestData = {
	itemsPost1: {
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
	},
	itemPatch1: {
		'name': 'patch1',
		'method': 'PATCH',
		'href': 'http://api.x.io/orders/42/items/5',
		'type': 'application/x-www-form-urlencoded',
		'fields': [
			{ 'name': 'orderNumber', 'type': 'hidden', 'value': '50' },
			{ 'name': 'productCode', 'type': 'text' }
		]
	},
	itemPatch2: {
		'name': 'patch2',
		'method': 'PATCH',
		'href': 'http://api.x.io/orders/42/items/5',
		'type': 'application/x-www-form-urlencoded',
		'fields': [
			{ 'name': 'orderNumber', 'type': 'hidden', 'value': '50' },
			{ 'name': 'visibleToCustomer', 'type': 'hidden', 'value': true },
			{ 'name': 'quantity', 'type': 'number' },
		]
	},
	itemDelete1: {
		'name': 'delete-item',
		'title': 'Delete Item',
		'method': 'DELETE',
		'href': 'http://api.x.io/orders/42/items/5',
		'type': 'application/x-www-form-urlencoded'
	}
};
