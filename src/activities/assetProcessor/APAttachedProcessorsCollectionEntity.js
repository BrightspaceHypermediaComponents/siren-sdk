import { Entity } from '../es6/Entity.js';

class APAttachedProcessorEntity extends Entity {

	/**
	 * @returns {number} The external deployment id of the deployment this processor belongs to.
	 */
	externalDeploymentId() {
		return this._entity && this._entity.properties && this._entity.properties.externalDeploymentId;
	}

	/**
	 * @returns {string} The name of the deployment this processor belongs to.
	 */
	deploymentName() {
		return this._entity && this._entity.properties && this._entity.properties.deploymentName;
	}

	/**
	 * @returns {number} The asset processor id of this processor.
	 */
	assetProcessorId() {
		return this._entity && this._entity.properties && this._entity.properties.assetProcessorId;
	}

	/**
	 * @returns {string} The title of this asset processor.
	 */
	title() {
		return this._entity && this._entity.properties && this._entity.properties.title;
	}

	/**
	 * @returns {number} The link id of the settings link for this processor.
	 */
	settingsLinkId() {
		return this._entity && this._entity.properties && this._entity.properties.settingsLinkId;
	}

	/**
	 * @returns {string} The launch route for the EULA.
	 */
	eulaLaunchRoute() {
		return this._entity && this._entity.properties && this._entity.properties.eulaLaunchRoute;
	}
	
	/**
	 * @returns {boolean} Whether this processor is enabled.
	 */
	isEnabled() {
		return this._entity && this._entity.properties && this._entity.properties.isEnabled;
	}
	
	/**
	 * @returns {boolean} Whether this processor will open in a new window/external resource or an iframe.
	 */
	isExternalResource() {
		return this._entity && this._entity.properties && this._entity.properties.isExternalResource;
	}
	
	/**
	 * @returns {number|null} The iframe width of this processor.
	 */
	width() {
		return this._entity && this._entity.properties && this._entity.properties.width;
	}
	
	/**
	 * @returns {number|null} The iframe height of this processor.
	 */
	height() {
		return this._entity && this._entity.properties && this._entity.properties.height;
	}
}

/**
 * APAttachedProcessorsCollection Entity representation of a D2L Asset Processor Attached Processors Collection response
 */
export class APAttachedProcessorsCollectionEntity extends Entity {
	_attachedProcessors() {
		if (!this._entity) {
			return;
		}
		return this._entity.getSubEntitiesByRel('asset-processor-attached-processor').map(attachedProcessor => {
			const apAttachedProcessorEntity = new APAttachedProcessorEntity(this._sdkParentEntity, attachedProcessor);
			return apAttachedProcessorEntity;
		});
	}

	attachedProcessors() {
		return this._attachedProcessors();
	}
}
