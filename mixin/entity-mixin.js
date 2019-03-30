'use strict';
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import { entityFactory, decompose } from '../es6/EntityFactory.js';

/*
	This mixin takes care of all the clean up. Thanks to entity be able to clean up all it's childern.
*/
/* @polymerMixin */
export const interalEntityMixin = function(superClass) {
	return class extends superClass {
		static get properties() {
			return {
				href: {
					type: String,
					reflectToAttribute: true
				},
				token: String,
				_entity: Object
			};
		}

		static get observers() {
			return [
				'__onHrefChange(href, token)'
			];
		}

		detached() {
			// this calls this._entity.decompose() if entity is actually an entity.
			// Note this will decompose all child entities used.
			decompose(this._entity);
		}

		// Protected method to set the entity type such as Organization Entity.
		// Requires to be called in the constructor
		_setEntityType(entityType) {
			if (typeof entityType === 'function') {
				this._entityType = entityType;
			}
		}

		__onHrefChange(href, token) {
			if (typeof this._entityType === 'function') {
				entityFactory(this._entityType, href, token, entity => {
					decompose(this._entity); // Make sure the entity is cleaned up before setting a new one.
					this._entity = entity;
				});
			}
		}

	};
};

export const EntityMixin = dedupingMixin(interalEntityMixin);
