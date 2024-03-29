import { Entity } from '../es6/Entity.js';
import { OrganizationEntity } from '../organizations/OrganizationEntity.js';
import { Rels } from '../hypermedia-constants.js';

export const sequenceClasses = {
	sequence: 'sequence',
	sequenceDescription: 'sequence-description'
};

export const sequencedActivityClasses = {
	sequencedActivity: 'sequenced-activity',
	activity: 'activity',
};

class SequencedActivityEntity extends Entity {
	title() {
		return this._entity && this._entity.properties && this._entity.properties.title;
	}

	organizationHref() {
		const activity = this._activitySubEntity();
		if (!activity || !activity.hasLinkByRel(Rels.organization)) {
			return;
		}

		return activity.getLinkByRel(Rels.organization).href;
	}

	onOrganizationChange(onChange) {
		const organizationHref = this.organizationHref();
		organizationHref && this._subEntity(OrganizationEntity, organizationHref, onChange);
	}

	_activitySubEntity() {
		if (!this._entity) {
			return;
		}

		return this._entity.getSubEntityByClass(sequencedActivityClasses.activity);
	}
}

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
		const completed = 'completed';
		completionProperties.isCompleted = completionEntity.hasClass && completionEntity.hasClass(completed);

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

	alternateViewerHref() {
		const alternateViewerRel = 'alternate';
		return (
			this._entity &&
			this._entity.hasLinkByRel(alternateViewerRel) &&
			this._entity.getLinkByRel(alternateViewerRel).href
		);
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
