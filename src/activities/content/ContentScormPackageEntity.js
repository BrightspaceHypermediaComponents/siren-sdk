import { Actions } from '../../hypermedia-constants';
import { performSirenAction } from '../../es6/SirenAction';
import { ActivityGradeEntity } from '../ActivityGradeEntity';

/**
 * ContentScormPackageEntity class representation of a d2l content-scorm-package entity.
 */
export class ContentScormPackageEntity extends ActivityGradeEntity {

	/**
	 * @returns {string|undefined} Title of the content-scorm-package item
	 */
	title() {
		return this._entity && this._entity.properties && this._entity.properties.title;
	}

	/**
	 * Updates the SCORM package to have the given title
	 * @param {string} title Title to set on the SCORM package
	 */
	async setScormPackageTitle(title) {
		if (!this._entity) {
			return;
		}

		const action = this._entity.getActionByName(Actions.content.updateTitle);
		if (!action) {
			return;
		}

		const fields = [{ name: 'title', value: title }];
		await performSirenAction(this._token, action, fields);
	}

	/**
	 * Deletes the SCORM package
	 */
	async deleteScormPackage() {
		if (!this._entity) {
			return;
		}

		const action = this._entity.getActionByName(Actions.scormPackage.deleteScormPackage);
		if (!action) {
			return;
		}

		await performSirenAction(this._token, action);
		this.dispose();
	}

	/**
	 * Checks if content scorm package properties passed in match what is currently stored
	 * @param {object} SCORMPackage Object containing scorm package specific properties
	 */
	equals(contentScormPackage) {
		const diffs = [
			[this.title(), contentScormPackage.title],
		];
		for (const [left, right] of diffs) {
			if (left !== right) {
				return false;
			}
		}
		return true;
	}
}
