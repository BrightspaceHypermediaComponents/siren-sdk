import { Entity } from '../es6/Entity';

/**
 * ActivityGrade: class representation of a grade for an activity
 */
export class ActivityGradeEntity extends Entity {
	/**
	 * @returns {('Numeric'|'LetterGrade')} The Grade's score type.
	 */
	scoreType() {
		return this._entity && this._entity.properties && this._entity.properties.scoreType;
	}

	/**
	 * @returns {number|null} The score given for a Numeric grade (numerator).
	 */
	score() {
		return this._entity && this._entity.properties && this._entity.properties.score;
	}

	/**
	 * @returns {number|null} How much the score is out of for a Numeric grade (denominator).
	 */
	outOf() {
		return this._entity && this._entity.properties && this._entity.properties.outOf;
	}

	/**
	 * @returns {string|null} The grade given for a LetterGrade.
	 */
	letterGrade() {
		return this._entity && this._entity.properties && this._entity.properties.letterGrade;
	}

	/**
	 * @returns {string[]|null} The possible options that can be given for a LetterGrade.
	 */
	letterGradeOptions() {
		return this._entity && this._entity.properties && this._entity.properties.letterGradeOptions;
	}
}
