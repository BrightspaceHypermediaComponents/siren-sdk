import { Entity } from './Entity.js';

/**
 * Generic Entity class that only returns an entity itself
 */
export class SimpleEntity extends Entity {
	entity() {
		return this._entity;
	}
}
