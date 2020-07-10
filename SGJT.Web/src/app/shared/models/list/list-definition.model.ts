import { ListColumnDefinition } from './list-column-definition.model';
import { Entity } from '../base/entity.model';
import { ApiService } from '../../services/api.service';

export class ListDefinition {
    title: string;
    registerURL: string;
    columns: Array<ListColumnDefinition>;
    dataSource: Array<Entity>;
    newEntryName: string;
    newEntryDatasource: Array<any>;
    activeClass: string;
    propertyName: string;
    addNewAssociation: any;
    service: ApiService;
}