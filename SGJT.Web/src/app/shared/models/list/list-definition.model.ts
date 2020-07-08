import { ListColumnDefinition } from './list-column-definition.model';
import { Entity } from '../base/entity.model';

export class ListDefinition {
    title: string;
    registerURL: string;
    columns: Array<ListColumnDefinition>;
    dataSource: Array<Entity>;
    newEntryName: string;
    activeClass: string;
    propertyName: string;
}