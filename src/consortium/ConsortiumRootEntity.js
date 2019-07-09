import { Entity } from '../es6/Entity.js';

const consortiumTokensAction = 'consortium-tokens';
/**
 * Root entity that allows you to get {@link ConsortiumTokenCollectionEntity}
 * @hideconstructor
 * @extends Entity
 */
export class ConsortiumRootEntity extends Entity {

	getConsortiumCollection() {
		return this.getActionByName(consortiumTokensAction);
	}
}
