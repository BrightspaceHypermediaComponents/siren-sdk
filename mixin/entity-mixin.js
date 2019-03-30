'use strict';
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import { entityFactory, dispose } from '../es6/EntityFactory.js';

/**
 * This mixin takes care of all the clean up. Thanks to entity be able to clean up all it's childern.
 * @polymerMixin
 */
export const interalEntityMixin = function(superClass) {
	return class extends superClass {
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
				 * Token
				 */
				token: String,
				/**
				 * A real object.
				 */
				_entity: Object
			};
		}

		static get observers() {
			return [
				'__onHrefChange(href, token)'
			];
		}

		detached() {
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

		__onHrefChange(href, token) {
			if (typeof this._entityType === 'function') {
				entityFactory(this._entityType, href, token, entity => {
					dispose(this._entity); // Make sure the entity is cleaned up before setting a new one.
					this._entity = entity;
				});
			}
		}

	};
};

export const EntityMixin = dedupingMixin(interalEntityMixin);
