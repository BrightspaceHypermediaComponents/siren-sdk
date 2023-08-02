import { Entity } from '@brightspace-hmc/siren-sdk/src/es6/Entity.js';

/*
 * An entity representing the user progress within an organization.
 */
export class OrganizationUserProgressEntity extends Entity {
	hasUserProgress() {
		return this._entity?.properties?.hasUserProgress;
	}
}
