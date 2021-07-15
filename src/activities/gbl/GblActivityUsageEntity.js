import { Entity } from '../../es6/Entity';
import { Rels } from '../../hypermedia-constants';

export class GblActivityUsageEntity extends Entity {

	/**
	 * @returns {string|null} gbl-map link
	 */
	getGblMapHref() {
		const { Gbl: { gblMap } } = Rels;
		if (!this._entity || !this._entity.hasLinkByRel(gblMap)) {
			return null;
		}
		return this._entity.getLinkByRel(gblMap).href;
	}
}
