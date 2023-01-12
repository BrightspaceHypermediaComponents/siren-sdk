import { Classes } from '../../hypermedia-constants.js';

const ContentHelperFunctions = {
	getHrefFromRel: (rel, entity) => {
		return entity
			&& entity.hasLinkByRel(rel)
			&& entity.getLinkByRel(rel).href;
	},
	getDescriptionSubEntity: (entity) => {
		const [subEntity] = entity.getSubEntitiesByClass(Classes.content.description);
		if (!subEntity || !subEntity.properties) {
			return null;
		}
		return subEntity;
	},
	getRawDescriptionSubEntity: (entity) => {
		const [subEntity] = entity.getSubEntitiesByClass(Classes.content.rawDescription);
		if (!subEntity || !subEntity.properties) {
			return null;
		}
		return subEntity;
	},
	getLastModifiedSubEntity: (entity) => {
		const [subEntity] = entity.getSubEntitiesByClass(Classes.content.lastModified);

		if (!subEntity || !subEntity.properties) {
			return null;
		}
		return subEntity;
	}
};

export default ContentHelperFunctions;
