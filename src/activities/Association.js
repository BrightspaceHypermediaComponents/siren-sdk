import { Entity } from '../es6/Entity.js';
import { Rels } from '../hypermedia-constants';

/**
 * Association class representation of an association.
 */

export class Association extends Entity {

	getRubricLink() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.Rubrics.rubric)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.Rubrics.rubric).href;

	}

}
