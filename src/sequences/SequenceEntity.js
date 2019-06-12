'use strict';

import { Entity } from '../es6/Entity.js';
import { Classes, Rels } from '../hypermedia-constants';

export const sequenceClasses = {
	sequence: 'sequence',
	sequenceDescription: 'sequence-description'
};

export const sequencedActivityClasses = {
	sequencedActivity: 'sequenced-activity',
	activity: 'activity',
};

export class SequenceEntity extends Entity {
	/**
	 * @return An object with indices: completed, total, optionalViewed, optionalTotal, isCompleted
	 */
	completion() {
		const completionEntity = this._entity && this._entity.getSubEntityByRel && this._entity.getSubEntityByRel(Rels.completion);
		if (!completionEntity) {
			return {};
		}

		const completionProperties = completionEntity.properties || {};
		completionProperties.isCompleted = completionEntity.hasClass && completionEntity.hasClass(Classes.activities.complete);

		return completionProperties;
	}

	title() {
		return this._entity && this._entity.properties && this._entity.properties.title;
	}

	sequenceViewerApplicationHref() {
		const sequenceViewerRel = 'https://sequences.api.brightspace.com/rels/sequence-viewer-application';
		return this._entity && this._entity.hasLinkByRel(sequenceViewerRel) &&
		this._entity.getLinkByRel(sequenceViewerRel).href;
	}

	onSubSequencesChange(onChange) {
		const subSequences = this._subSequences();

		subSequences.forEach((entity, index) => {
			const onChangeWithIndex = (subSequence) => {
				subSequence.index = () => index;
				onChange(subSequence);
			};
			entity && this._subEntity(SequenceEntity, entity, onChangeWithIndex);
		});
	}

	onSequencedActivityChange(onChange) {
		const sequencedActivities = this._sequencedActivity();

		sequencedActivities.forEach((entity, index) => {
			const onChangeWithIndex = (sequencedActivity) => {
				sequencedActivity.index = () => index;
				onChange(sequencedActivity);
			};
			entity && this._subEntity(SequencedActivityEntity, entity, onChangeWithIndex);
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
