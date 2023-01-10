import { Actions, Classes, Rels } from '../../hypermedia-constants.js';
import { Entity } from '../../es6/Entity.js';
import { performSirenAction } from '../../es6/SirenAction.js';
import { RestrictedTopicTileEntity } from './RestrictedTopicTileEntity.js';
import { GroupSectionRestrictionActionsEntity } from './GroupSectionRestrictionActionsEntity.js';

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
		return !this.isRestrictedThreads() && !this.isRestrictedTopic();
	}
	isLocked() {
		if (!this._entity) return;
		return !this._entity.hasActionByName(Actions.discussions.groupSectionRestrictions.startUpdateRestrictions);
	}
	canDeleteRestrictions() {
		if (!this._entity) return;

		const subEntity = this._entity.getSubEntityByRel(Rels.Discussions.groupSectionRestrictionsDetail);
		if (!subEntity) return;

		return subEntity.hasActionByName(Actions.discussions.delete);
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

	async startUpdateRestrictions() {
		if (!this._entity) return;

		const action = this._entity.getActionByName(Actions.discussions.groupSectionRestrictions.startUpdateRestrictions);
		if (!action) return;

		const returnedEntity = await this._performGetActionWithWorkingCopy(action);
		if (!returnedEntity) return;
		return new GroupSectionRestrictionActionsEntity(returnedEntity);
	}

	/* This helper is for GET actions with a workingCopyId query parameter only, needed because of a bug in SirenAction.js.
	 * Other action methods (PATCH/POST/DELETE work correctly without this helper.)
	*/
	_performGetActionWithWorkingCopy(action) {
		const fields = [];
		// HACK adding query params as fields due to bug in performSirenAction (_getSirenFields function)
		const url = new URL(action.href, window.location.origin);
		for (const [key, value] of url.searchParams) {
			fields.push({ name: key, value: value });
		}

		return performSirenAction(this._token, action, fields, false, true);
	}

	_canCheckout() {
		return this._entity && this._entity.hasActionByName(Actions.workingCopy.checkout);
	}

	canCheckin() {
		return this._entity && this._entity.hasActionByName(Actions.workingCopy.checkin);
	}

	/**
	 * Checkout activity usage working copy
	 */
	async checkout() {
		if (this._canCheckout()) {
			const action = this.getActionByName(Actions.workingCopy.checkout);
			const entity = await performSirenAction(this._token, action);
			if (!entity) return;
			return new TopicGroupSectionRestrictionsEntity(entity, this._token);
		}
	}

	/**
	 * Checkin activity usage working copy
	 */
	async checkin() {
		if (this.canCheckin()) {
			const action = this.getActionByName(Actions.workingCopy.checkin);
			let entity;
			try {
				entity = await performSirenAction(this._token, action);
			} catch (e) {
				return Promise.reject(e);
			}
			if (!entity) return;
			return new TopicGroupSectionRestrictionsEntity(entity, this._token);
		}
	}

	equals(restrictionsEntity) {
		const diffs = [
			[restrictionsEntity.isUnRestricted, this.isUnRestricted()]
		];

		for (const [current, initial] of diffs) {
			if (current !== initial) {
				return false;
			}
		}

		return true;
	}
}
