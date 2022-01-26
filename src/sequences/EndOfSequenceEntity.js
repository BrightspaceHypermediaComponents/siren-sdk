import { Entity } from '../es6/Entity';

export class EndOfSequenceActivityEntity extends Entity {
	endOfSequenceSummaryProperties() {
		if (!this._entity) {
			return {};
		}

		const summaryEntity = this._entity.getSubEntityByRel('end-of-sequence-summary');
		return summaryEntity.properties || {};
	}
}
