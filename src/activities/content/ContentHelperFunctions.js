import { Classes } from '../../hypermedia-constants';

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
	}
};

export default ContentHelperFunctions;
