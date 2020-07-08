import { FormFieldDefinition } from './form-field-definition.model';
import { FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service';

export class FormDefinition {
    name: string;
    model;
    fields: Array<FormFieldDefinition>;
    formGroup: FormGroup;
    service: ApiService;

    // constructor(name: string, model: Entity, fields: Array<FormFieldDefinition>, formGroup: FormGroup, service: ApiService) {
    //     this.name = name;
    //     this.model = model;
    //     this.fields = fields;
    //     this.formGroup = formGroup;
    //     this.service = service;
    // }
}