'use strict';

import { Entity } from '../es6/Entity.js';
import { Rels } from '../hypermedia-constants';

export class UserSettingsEntity extends Entity {
	userSettingsHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.widgetSettings)) {
			return;
		}
		return this._entity.getLinkByRel(Rels.widgetSettings).href;
    }

    userSettingsAction() {
		if (!this._entity || !this._entity.hasActionByName(Actions.enrollments.updateUserSettings)) {
			return;
		}
		return this._entity.getActionByName(Actions.enrollments.updateUserSettings);
    }

    mostRecentEnrollmentsSearchName() {
        return this._entity
            && this._entity.properties
            && this._entity.properties.MostRecentEnrollmentsSearchName;
    }

    mostRecentEnrollmentsSearchType() {
        return this._entity
            && this._entity.properties
            && this._entity.properties.MostRecentEnrollmentsSearchType;
    }
}