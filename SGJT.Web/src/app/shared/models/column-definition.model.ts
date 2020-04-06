export class ColumnDefinition {
    header: string;
    property: string;

    constructor(header: string, property: string) {
        this.header = header;
        this.property = property;
    }
}