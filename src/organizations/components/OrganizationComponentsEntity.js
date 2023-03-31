import { Entity } from '../../es6/Entity.js';

/*
 * An organization that lets us know if there are any components.
 */
export class OrganizationComponentsEntity extends Entity {
	hasComponents() {
		return this._entity?.properties?.hasComponents;
	}
}
