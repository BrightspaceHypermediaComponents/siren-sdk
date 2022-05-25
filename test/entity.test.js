import { Entity } from '../src/es6/Entity.js';
import { expect } from '@open-wc/testing';
import { Nothing } from './nothing-entity.js';

describe('entity abstract', () => {
	it('init throws', () => {
		expect(() => { new Entity(); }).to.throw(TypeError);
	});

	it('init on extended does not throw', () => {
		expect(() => { new Nothing(); }).to.not.throw(TypeError);
	});
});
