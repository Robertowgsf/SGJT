import { ColumnDefinition } from './column-definition.model';
import { Entity } from './base/entity.model';

export class ListDefinition {
    pageTitle: string;
    registerURL: string;
    columns: Array<ColumnDefinition>;
    dataSource: Array<Entity>;

    constructor(pageTitle: string, registerURL: string, columns: Array<ColumnDefinition>, dataSource: Array<Entity>) {
        this.pageTitle = pageTitle;
        this.registerURL = registerURL;
        this.columns = columns;
        this.dataSource = dataSource;
    }
}