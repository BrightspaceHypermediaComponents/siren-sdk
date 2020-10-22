import { Entity } from '../../es6/Entity';
import { Actions, Rels } from '../../hypermedia-constants';
import { performSirenAction } from '../../es6/SirenAction';

/**
 * ContentEntity class representation of a d2l content entity.
 */
export class ContentEntity extends Entity {
	/**
	 * @returns {string} Title of the content item
	 */
	title() {
		return this._entity && this._entity.properties && this._entity.properties.title;
	}

	/**
	 * Updates the module to have the given title
	 * @param {string} title Title to set on the module
	 */
	async setModuleTitle(title) {
		const moduleEntity = this._getModuleEntity();
		const action = moduleEntity.getActionByName(Actions.content.updateTitle);
		if (!action) {
			return;
		}

		const fields = [{ name: 'title', value: title }];
		await performSirenAction(this._token, action, fields);
	}

	_getModuleEntity() {
		return this._entity
			&& this._entity.hasSubEntityByRel(Rels.Content.moduleEntity)
			&& this._entity.getSubEntityByRel(Rels.Content.moduleEntity);
	}
}
