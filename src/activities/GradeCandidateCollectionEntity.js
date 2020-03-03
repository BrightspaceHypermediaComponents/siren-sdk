import { Entity } from '../es6/Entity';
import { Rels } from '../hypermedia-constants';

/**
 * Entity representation of a collection of grade candidates
 */
export class GradeCandidateCollectionEntity extends Entity {
	/**
	 * @returns {Array} Returns all grade-candidate and category sub-entity URLs from the grade-candidates collection
	 */
	getGradeCandidateHrefs() {
		return this._entity && this._entity.getSubEntitiesByRel('item').map(entity => {
			if (entity.hasLinkByRel(Rels.Grades.grade)) {
				return entity.getLinkByRel(Rels.Grades.grade).href;
			}
			if (entity.hasLinkByRel(Rels.Grades.category)) {
				return entity.getLinkByRel(Rels.Grades.category).href;
			}
		});
	}

	/**
	 * @param {*} href Href of an entity in the collection
	 * @returns {Array} Returns grade-candidate entity hrefs
	 */
	getGradeCandidatesForCategory(href) {
		const categories = this._entity && this._entity.getSubEntitiesByRel(Rels.Grades.category);
		for (const category of categories) {
			if (category.getLinkByRel(Rels.Grades.category).href === href) {
				return category.getSubEntitiesByRel(Rels.Grades.grade).map(grade => {
					if (grade.hasLinkByRel(Rels.Grades.grade)) {
						return grade.getLinkByRel(Rels.Grades.grade).href;
					}
				});
			}
		}

		return [];
	}
}
