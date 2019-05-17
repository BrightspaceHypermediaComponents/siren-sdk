'use strict';

import { Entity } from 'siren-sdk/es6/Entity.js';
import { Rels } from 'd2l-hypermedia-constants';

export const sequenceClasses = {
	sequence: 'sequence',
	sequenceDescription: 'sequence-description'
};

export const sequencedActivityClasses = {
	sequencedActivity: 'sequenced-activity',
};

export class SequenceEntity extends Entity {
	title() {
		return this._entity && this._entity.properties && this._entity.properties.title;
	}

	onSubSequencesChange(onChange) {
		const subSequences = this._subSequences();

		subSequences.forEach((entity) => {
			entity && entity.href && this._subEntity(SequenceEntity, entity.href, onChange);
		});
	}

	onSequencedActivityChange(onChange) {
		const sequencedActivity = this._sequencedActivity();

		sequencedActivity.forEach((entity) => {
			entity && entity.href && this._subEntity(SequencedActivityEntity, entity.href, onChange);
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

	organizationHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.organization)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.organization).href;
	}
}
