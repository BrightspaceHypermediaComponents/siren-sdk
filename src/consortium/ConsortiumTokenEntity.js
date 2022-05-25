import { Entity } from '../es6/Entity.js';
import { entityFactory } from '../es6/EntityFactory.js';
import { Rels } from '../hypermedia-constants.js';
import { root } from '../root/root.js';
/**
 * ConsortiumTokenEntity contains all necessary information to navigate to another organization as a user.  Generally returned in a collection in {@link ConsortiumTokenCollectionEntity}
 * @hideconstructor
 * @extends Entity
 */
export class ConsortiumTokenEntity extends Entity {
	/**
	 * @returns JWT to allow api calls to another tenant
	 */
	consortiumToken() {
		return this._entity && this._entity.properties && this._entity.properties.token;
	}
	/**
	 * @returns tenantId of this tenant in a consortium
	 */
	consortiumTenant() {
		return this._entity && this._entity.properties && this._entity.properties.tenant;
	}
	/**
	 * A constructed {@link root} object
	 * @param function onChange Callback function to be called when entity changes
	 */
	rootOrganizationEntity(onChange) {
		if (!this._rootOranizationLink()) {
			return;
		}
		entityFactory(root, this._rootOranizationLink(), this.consortiumToken(), onChange);
	}

	_rootOranizationLink() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.root)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.root).href;
	}
}

