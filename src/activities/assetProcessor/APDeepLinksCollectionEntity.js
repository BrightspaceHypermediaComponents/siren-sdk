import { Classes } from '../../hypermedia-constants.js';
import { Entity } from '../../es6/Entity.js';

class APDeepLinkEntity extends Entity {

	/**
	 * @returns {string} The name of the deployment this deep link belongs to.
	 */
	deploymentName() {
		return this._entity && this._entity.properties && this._entity.properties.deploymentName;
	}

	/**
	 * @returns {number} The link id of this deep link.
	 */
	linkId() {
		return this._entity && this._entity.properties && this._entity.properties.linkId;
	}

	/**
	 * @returns {string} The link name of this deep link.
	 */
	linkName() {
		return this._entity && this._entity.properties && this._entity.properties.linkName;
	}

	/**
	 * @returns {string} The relative launch route for this deep link.
	 */
	deepLinkLaunchRoute() {
		return this._entity && this._entity.properties && this._entity.properties.deepLinkLaunchRoute;
	}
}

/**
 * APDeepLinksCollection Entity representation of a D2L Asset Processor Deep Links Collection response
 */
export class APDeepLinksCollectionEntity extends Entity {
	_deepLinks() {
		if (!this._entity) {
			return;
		}
		return this._entity.getSubEntitiesByClass(Classes.assetProcessor.deepLink).map(deepLink => {
			const apDeepLinkEntity = new APDeepLinkEntity(deepLink);
			return apDeepLinkEntity;
		});
	}

	deepLinks() {
		return this._deepLinks();
	}
}
