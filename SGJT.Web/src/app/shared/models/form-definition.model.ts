import { Entity } from './base/entity.model';
import { FormFieldDefinition } from './form-field-definition.model';

export class FormDefinition {
    name: string;
    model: Entity;
    fields: Array<FormFieldDefinition>;

    constructor(name: string, model: Entity, fields: Array<FormFieldDefinition>) {
        this.name = name;
        this.model = model;
        this.fields = fields;
    }
}