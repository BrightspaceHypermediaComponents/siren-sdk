import { Actions, Classes } from '../../hypermedia-constants.js';
import { Entity } from '../../es6/Entity.js';
import { performSirenAction } from '../../es6/SirenAction.js';

export class APAttachedProcessorEntity extends Entity {

	/**
	 * @returns {string} The external deployment id of the deployment this processor belongs to.
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
	 * @returns {bool} Whether this processor is enabled.
	 */
	isEnabled() {
		return this._entity && this._entity.properties && this._entity.properties.isEnabled;
	}

	/**
	 * @returns {bool} Whether this processor will open in a new window/external resource or an iframe.
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

	/**
	 * @returns {bool} Whether this processor is enabled.
	 */
	enabled() {
		return this._entity && this._entity.properties && this._entity.properties.isEnabled;
	}

	/**
	 * @returns {bool} Whether this processor can be enabled.
	 */
	canEnable() {
		return !this.enabled() && this._entity.hasActionByName(Actions.LTI.enableAssetProcessor);
	}

	/**
	 * @returns {bool} Whether this processor can be disabled.
	 */
	canDisable() {
		return this.enabled() && this._entity.hasActionByName(Actions.LTI.disableAssetProcessor);
	}

	/**
	 * @returns {bool} Whether this processor can be deleted.
	 */
	canDelete() {
		return this._entity.hasActionByName(Actions.LTI.deleteAssetProcessor);
	}

	/**
	 * @summary Enables this processor.
	 */
	async enable() {
		const action = this.canEnable() && this._entity.getActionByName(Actions.LTI.enableAssetProcessor);
		if (!action) {
			return;
		}

		const fields = [
			{ name: 'isEnabled', value: true }
		];

		await performSirenAction(this._token, action, fields);
	}

	/**
	 * @summary Disables this processor.
	 */
	async disable() {
		const action = this.canDisable() && this._entity.getActionByName(Actions.LTI.disableAssetProcessor);
		if (!action) {
			return;
		}

		const fields = [
			{ name: 'isEnabled', value: false }
		];

		await performSirenAction(this._token, action, fields);
	}

	/**
	 * @summary Deletes this processor.
	 */
	async delete() {
		const action = this.canDelete() && this._entity.getActionByName(Actions.LTI.deleteAssetProcessor);
		if (!action) {
			return;
		}

		await performSirenAction(this._token, action, []).then(() => {
			this.dispose();
		});
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
		return this._entity.getSubEntitiesByClass(Classes.assetProcessor.attachedProcessor).map(attachedProcessor => {
			const apAttachedProcessorEntity = new APAttachedProcessorEntity(attachedProcessor);
			return apAttachedProcessorEntity;
		});
	}

	attachedProcessors() {
		return this._attachedProcessors();
	}
}
