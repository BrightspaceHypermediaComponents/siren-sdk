import { OrganizationCollectionEntity } from '../OrganizationCollectionEntity.js';

/*
 * A collection of organization components to implement specific functionality.
 */
export class ComponentsOrganizationCollectionEntity extends OrganizationCollectionEntity {
    hasComponents() {
        return this._entity?.properties?.hasComponents;
    }
}