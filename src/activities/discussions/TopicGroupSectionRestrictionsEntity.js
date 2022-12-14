import { Actions, Classes, Rels } from '../../hypermedia-constants.js';
import { Entity } from '../../es6/Entity.js';
import { RestrictedTopicTileEntity } from './RestrictedTopicTileEntity.js';

/**
 * TopicGroupSectionRestrictionsEntity class representation of a D2L Discussion Topic Group Section Restrictions entity.
 */
export class TopicGroupSectionRestrictionsEntity extends Entity {
	isRestrictedThreads() {
		if (!this._entity) return;
		return this._entity.hasClass(Classes.discussions.restrictedThreads);
	}
	isRestrictedTopic() {
		if (!this._entity) return;
		return this._entity.hasClass(Classes.discussions.restrictedTopic);
	}
	hasNoGroupsOrSections() {
		if (!this._entity) return;
		return this._entity.hasClass(Classes.discussions.noGroupsOrSections);
	}
	isUnRestricted() {
		return !this.isRestrictedThreads() && !this.isRestrictedTopic() && !this.hasNoGroupsOrSections();
	}
	isLocked() {
		if (!this._entity) return;
		return !this._entity.hasActionByName(Actions.discussions.groupSectionRestrictions.startUpdateRestrictions);
	}
	async deleteRestrictions() {
		if (!this._entity) return;

		const subEntity = this._entity.getSubEntityByRel(Rels.Discussions.groupSectionRestrictionsDetail);
		if (!subEntity) return;

		const action = subEntity.getActionByName(Actions.discussions.delete);
		if (!action) return;

		const returnedEntity = await performSirenAction(this._token, action);

		if (!returnedEntity) return;
		return new TopicGroupSectionRestrictionsEntity(returnedEntity);
	}
	restrictedThreadCategoryName() {
		if (!this._entity) {
			return false;
		}
		const subEntity = this._entity.getSubEntityByRel(Rels.Discussions.groupSectionRestrictionsDetail);
		if (!subEntity) {
			return false;
		}
		return subEntity.properties?.categoryName;
	}
	restrictedThreadIsBySection() {
		if (!this._entity) {
			return false;
		}
		const subEntity = this._entity.getSubEntityByRel(Rels.Discussions.groupSectionRestrictionsDetail);
		if (!subEntity) {
			return false;
		}
		return subEntity.hasClass(Classes.discussions.bySection);
	}
	restrictedTopicTileCollection() {
		if (!this._entity) {
			return false;
		}
		const subEntity = this._entity.getSubEntityByRel(Rels.Discussions.groupSectionRestrictionsDetail);
		if (!subEntity) {
			return false;
		}
		return (subEntity.getSubEntitiesByRel('item') || []).map(item => {
			return new RestrictedTopicTileEntity(item);
		});
	}
}
