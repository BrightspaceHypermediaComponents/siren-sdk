'use strict';

import { Entity } from '../es6/Entity.js';

export class PromotedSearchEntity extends Entity {
    actions() {
      return this._entity
        && this._entity.actions
    }

    userEnrollmentsSearchType() {
        return this._entity
            && this._entity.properties
            && this._entity.properties.UserEnrollmentsSearchType;
    }
}