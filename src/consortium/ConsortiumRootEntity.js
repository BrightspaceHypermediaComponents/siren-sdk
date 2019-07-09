import { Entity } from '../es6/Entity.js';

const consortiumTokensAction = 'consortium-tokens';
/**
 * ConsortiumTokenEntity contains all necessary information to navigate to another organization as a user.  Generally returned in a collection in {@link ConsortiumTokenCollectionEntity}
 * @hideconstructor
 * @extends Entity
 */
export class ConsortiumRootEntity extends Entity {

	getConsortiumCollection() {
		return this.getActionByName(consortiumTokensAction);
	}
}
