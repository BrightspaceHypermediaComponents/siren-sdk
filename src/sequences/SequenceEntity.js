'use strict';

import { Entity } from '../es6/Entity.js';
import { Rels } from '../hypermedia-constants';

export const sequenceClasses = {
	sequence: 'sequence',
	sequenceDescription: 'sequence-description'
};

export const sequencedActivityClasses = {
	sequencedActivity: 'sequenced-activity',
	activity: 'activity',
};

export class SequenceEntity extends Entity {
	title() {
		return this._entity && this._entity.properties && this._entity.properties.title;
	}

	onSubSequencesChange(onChange) {
		const subSequences = this._subSequences();

		subSequences.forEach((entity) => {
			entity && this._subEntity(SequenceEntity, entity, onChange);
		});
	}

	onSequencedActivityChange(onChange) {
		const sequencedActivity = this._sequencedActivity();

		sequencedActivity.forEach((entity) => {
			entity && this._subEntity(SequencedActivityEntity, entity, onChange);
		});
	}

	_subSequences() {
		if (!this._entity) {
			return;
		}

		return this._entity.getSubEntitiesByClass(sequenceClasses.sequence);
	}

	_sequencedActivity() {
		if (!this._entity) {
			return;
		}

		return this._entity.getSubEntitiesByClass(sequencedActivityClasses.sequencedActivity);
	}
}

class SequencedActivityEntity extends Entity {
	title() {
		return this._entity && this._entity.properties && this._entity.properties.title;
	}

	organizationHrefs() {
		const activity = this._activitySubEntities();
		const orgHref = [];
		activity.forEach((entity) => {
			if (entity && entity.getSubEntitiesByClass(Rels.organization)) {
				orgHref.push(entity.getLinkByRel(Rels.organization).href);
			}
		});

		return orgHref;
	}

	_activitySubEntities() {
		if (!this._entity) {
			return;
		}

		return this._entity.getSubEntitiesByClass(sequencedActivityClasses.activity);
	}
}
