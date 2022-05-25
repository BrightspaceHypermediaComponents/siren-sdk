import 'd2l-polymer-siren-behaviors/store/siren-action-behavior.js';
import { dispose, entityFactory } from '../es6/EntityFactory.js';
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';

/**
 * This mixin takes care of all the clean up. Thanks to entity be able to clean up all it's childern.
 * @polymerMixin
 */
export const interalEntityMixin = function(superClass) {
	return class extends mixinBehaviors([
		D2L.PolymerBehaviors.Siren.SirenActionBehavior,
	], superClass) {
		static get properties() {
			return {
				/**
				 * Href for the entity
				 */
				href: {
					type: String,
					reflectToAttribute: true
				},
				/**
				 * Token JWT Token for brightspace | a function that returns a JWT token for brightspace
				 */
				token: String,
				/**
				 * Entity object that extends the Entity class.
				 */
				_entity: Object
			};
		}

		static get observers() {
			return [
				'__onHrefChange(href, token)'
			];
		}

		disconnectedCallback() {
			super.disconnectedCallback();
			// this calls this._entity.dispose() if entity is actually an entity.
			// Note this will dispose all child entities used.
			dispose(this._entity);
		}

		/**
		 * Protected method to set the entity type such as Organization Entity.
		 * Requires to be called in the constructor
		 * @param {Function} entityType  The type of the entity. For example OrganizationEntity
		 */
		_setEntityType(entityType) {
			if (typeof entityType === 'function') {
				this._entityType = entityType;
			}
		}

		_performAction(action, onChange) {
			this.performSirenAction(action).then((entity) => {
				dispose(this._entity);
				if (typeof this._entityType === 'function') {
					entityFactory(this._entityType, this.href, this.token, entity => {
						this._entity = entity;
						if (typeof onChange === 'function') {
							onChange(entity);
						}
					}, entity);
				}
			});
		}

		__onHrefChange(href, token) {
			if (!href || (typeof token !== 'string' && typeof token !== 'function')) {
				return;
			}
			dispose(this._entity); // Make sure the entity is cleaned up before setting a new one.
			if (typeof this._entityType === 'function') {
				entityFactory(this._entityType, href, token, entity => {
					this._entity = entity;
				});
			}
		}

	};
};

export const EntityMixin = dedupingMixin(interalEntityMixin);
