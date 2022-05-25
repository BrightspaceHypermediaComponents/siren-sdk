import { assert, expect } from '@open-wc/testing';
import sinon from 'sinon';
import { StateTree } from '../../src/helpers/StateTree.js';

describe('StateTree', () => {
	describe('Tests for removeAllChildren', () => {
		it('should not notify of state change on empty sub-tree', () => {
			const tree = new StateTree(() => {
				assert.fail('Unexpected state change');
			});
			tree.removeAllChildren();
		});

		it('should remove all items in the sub-tree', () => {
			let items = [];
			const tree = new StateTree(newState => {
				items = newState.items();
			});

			const tree0 = tree.setChild(0, 'a');
			tree.setChild(3, 'b');

			tree0.setChild(2, 'c');
			const tree0_4 = tree0.setChild(4, 'd');

			const tree0_4_1 = tree0_4.setChild(1, 'e');

			tree0_4_1.setChild(0, 'f');
			tree0_4_1.setChild(1, 'g');
			tree0_4_1.setChild(2, 'h');

			tree0_4.removeAllChildren();

			const expectedItems = ['a', 'b', 'c', 'd'];
			expect(items.length).to.equal(expectedItems.length);
			expect(items).to.include.members(expectedItems);
		});
	});

	describe('Tests for setChild', () => {
		const testCases = [
			{ index: 0, item: undefined },
			{ index: 3, item: null },
			{ index: 2, item: {} },
			{ index: 5 }
		];

		testCases.forEach(testCase => {
			it('should notify of state change on item-less child set', () => {
				const stateChangedStub = sinon.stub();

				const tree = new StateTree(stateChangedStub);
				tree.setChild(testCase.index, testCase.item);

				sinon.assert.calledWith(stateChangedStub, tree);
			});
		});

		it('should overwrite sub-tree', () => {
			let items = [];
			const tree = new StateTree(newState => {
				items = newState.items();
			});

			const tree0 = tree.setChild(0, 'a');
			tree.setChild(3, 'b');

			const tree0_2 = tree0.setChild(2, 'w');
			tree0.setChild(4, 'd');

			tree0_2.setChild(0, 'x');
			const tree0_2_1 = tree0_2.setChild(1, 'y');
			tree0_2.setChild(3, 'z');

			tree0_2_1.setChild(0, '0');

			// Overwrite sub-tree containing 'w', 'x', 'y', 'z' and '0' with 'c'
			tree0.setChild(2, 'c');

			const expectedItems = ['a', 'b', 'c', 'd'];
			expect(items.length).to.equal(expectedItems.length);
			expect(items).to.include.members(expectedItems);
		});
	});

	it('should list all non-overwritten or removed items', () => {
		let items = [];
		let stateChangeCount = 0;
		const tree = new StateTree(newState => {
			items = newState.items();
			stateChangeCount += 1;
		});

		tree.removeAllChildren();

		const tree1 = tree.setChild(1, 'a');

		expect(stateChangeCount).to.equal(1);

		const tree3 = tree.setChild(3);

		tree1.setChild(5, 'v');

		tree3.setChild(0, 'b');
		const tree3_1 = tree3.setChild(1, 'c');
		tree3.setChild(2);
		tree3.setChild(3, 'w');

		// Remove 'v'
		tree1.removeAllChildren();

		const tree3_1_0 = tree3_1.setChild(0, 'e');
		const tree3_1_4 = tree3_1.setChild(1, 'f');

		tree3_1_4.setChild(0, 'x');
		const tree3_1_4_1 = tree3_1_4.setChild(1, 'y');
		tree3_1_4.setChild(2, 'z');

		tree3_1_4_1.setChild(4, '0');

		// Overwrite 'w'
		tree3.setChild(3, 'd');

		const tree3_1_0_6 = tree3_1_0.setChild(6, 'g');

		tree3_1_0_6.setChild(2, 'h');

		// Remove the sub-tree containing 'x', 'y', 'z' and '0'
		tree3_1_4.removeAllChildren();

		const expectedItems = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
		expect(stateChangeCount).to.equal(18);
		expect(items.length).to.equal(expectedItems.length);
		expect(items).to.include.members(expectedItems);
	});
});
