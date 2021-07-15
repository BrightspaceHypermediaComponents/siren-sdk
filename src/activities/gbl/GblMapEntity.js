import { Actions } from '../../hypermedia-constants';
import { Entity } from '../../es6/Entity';
import { performSirenAction } from '../../es6/SirenAction';

export class GblMapEntity extends Entity {

	/**
	 * @returns {string|null} the name
	 */
	name() {
		return this._entity && this._entity.properties && this._entity.properties.name;
	}

	/**
	 * @returns {string|null} the serialized JSON map data
	 */
	mapData() {
		return this._entity && this._entity.properties && this._entity.properties.mapData;
	}

	/**
	 * Updates the GBL map's name
	 * @param {string} name the name to set on the GBL map
	 */
	async setName(name) {
		if (!this._entity) {
			return;
		}

		const action = this._entity.getActionByName(Actions.gbl.updateName);
		if (!action) {
			return;
		}

		const fields = [{ name: 'name', value: name }];
		return await performSirenAction(this._token, action, fields);
	}

	/**
	 * Updates the GBL map's map data
	 * @param {string} mapData the serialized map data to set on the GBL map
	 */
	async setMapData(mapData) {
		if (!this._entity) {
			return;
		}

		const action = this._entity.getActionByName(Actions.gbl.updateMapData);
		if (!action) {
			return;
		}

		const fields = [{ name: 'mapDataJson', value: mapData }];
		return await performSirenAction(this._token, action, fields);
	}

	/**
	 * @param {object} gblMap Object containing GBL map properties
	 * @returns {boolean} Whether or not the passed in object equals this object
	 */
	equals(gblMap) {
		const diffs = [
			[this.name(), gblMap.name],
			[this.mapData(), gblMap.mapData]
		];

		for (const [left, right] of diffs) {
			if (left !== right) {
				return false;
			}
		}
		return true;
	}
}
