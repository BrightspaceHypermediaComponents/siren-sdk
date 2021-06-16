import { Entity } from '../../es6/Entity';

/**
 * ContentLTILinkFrameOptionsEntity class representation of a d2l frame-options entity.
 */
export class ContentLTILinkFrameOptionsEntity extends Entity {

	/**
	 * @returns {boolean|undefined} Bool if the quicklink can be embedded
	 */
	canBeEmbedded() {
		return this._entity && this._entity.properties && this._entity.properties.canBeEmbedded;
	}

	/**
	 * @returns {string|undefined} Quicklink of the frame-options entity
	 */
	quickLink() {
		return this._entity && this._entity.properties && this._entity.properties.quickLink;
	}
}
