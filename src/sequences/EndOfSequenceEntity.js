import { Entity } from '../es6/Entity';

export class EndOfSequenceActivityEntity extends Entity {
	/**
	 * @return An object with numeric values: optional, required
	 */
	endOfSequenceSummaryProperties() {
		if (!this._entity) {
			return {};
		}

		const summaryEntity = this._entity.getSubEntityByRel('end-of-sequence-summary');
		return summaryEntity.properties || {};
	}
}
