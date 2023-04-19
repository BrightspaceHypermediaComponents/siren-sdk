import { Entity } from '@brightspace-hmc/siren-sdk/src/es6/Entity.js';

/*
 * Lets us know if org has user progress.
 */
export class OrganizationUserProgressEntity extends Entity {
	hasUserProgress() {
		return this._entity?.properties?.hasUserProgress;
	}
}
