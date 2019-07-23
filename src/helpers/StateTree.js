
/**
 * StateTree helper class to simplify receiving state changed updates for nested onChange handlers.
 */
export class StateTree {
	/**
	 * Creates a new StateTree.
	 * @param {Function} onStateChanged A state change handler that is called whenever the state of the tree changes by adding, replacing, or removing items.
	 * @param {*} [item] The item to be stored at the root of the tree.
	 * @param {StateTree} [root] The root node of the state tree provided only when creating child nodes.
	 */
	constructor(onStateChanged, item, root) {
		this._children = [];
		this._onStateChanged = onStateChanged;
		this._item = item;
		this._root = root ? root : this;
	}

	/**
	 * Attaches or overwrites a child node on the tree.
	 * @param {Number} index  The location the child will be attached on the parent node.
	 * @param {*} [item] The item to be stored in the newly created child node.
	 * @returns {StateTree} The child node that was attached to the tree.
	 */
	setChild(index, item) {
		const child = new StateTree(this._onStateChanged, item, this._root);
		this._children[index] = child;

		this._notifyStateChanged(true);

		return child;
	}

	/**
	 * Removes all attached child nodes.
	 */
	removeAllChildren() {
		const hasStateChanged = this._children.length > 0;

		this._children = [];

		this._notifyStateChanged(hasStateChanged);
	}

	/**
	 * Retrieves all items stored in the tree without guaranteeing any particular order.
	 * @returns {Array} All items stored in the tree.
	 */
	items() {
		return this._root._itemsHelper();
	}

	_itemsHelper() {
		let items = this._item ? [this._item] : [];
		this._children.forEach(child => {
			items = items.concat(child._itemsHelper());
		});
		return items;
	}

	_notifyStateChanged(hasStateChanged) {
		if (!hasStateChanged) {
			return;
		}
		this._onStateChanged(this._root);
	}
}
