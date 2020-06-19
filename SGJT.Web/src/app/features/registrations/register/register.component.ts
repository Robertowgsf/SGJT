import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ListDefinition } from 'src/app/shared/models/list-definition.model';
import { FormDefinition } from 'src/app/shared/models/form-definition.model';
import { Entity } from 'src/app/shared/models/base/entity.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Input() listDefinition: ListDefinition;
  @Input() formDefinition: FormDefinition;

  isNew: boolean;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      let id = params['id'];
      this.isNew = id ? false : true;
    });
  }

  save(formValue) {
    this.castObjectIntoModel(formValue, this.formDefinition.model);

    if (formValue.id) {
      this.formDefinition.service.put(this.formDefinition.model).subscribe(success => {
        console.log(success);
      }, error => {
        this.setFormErrors(error.error);
      });
    }
    else {
      this.formDefinition.service.post(this.formDefinition.model).subscribe(success => {
        console.log(success);
      }, error => {
        this.setFormErrors(error.error);
      });
    }
  }

  remove() {
    let id = this.formDefinition.model.id;
    this.formDefinition.service.delete(id).subscribe(success => {
      console.log(success);
    })
  }

  private castObjectIntoModel(object: Object, model: Entity) {
    Object.keys(object).forEach(key => {
      let objProp = object[key];
      let modelProp = model[key];

      let castedProp = modelProp.constructor(objProp);

       if (castedProp == "null") {
        castedProp = "";
      }

      model[key] = castedProp;
    })
  }

  private setFormErrors(error) {
    error.forEach(a => {
      let formControl = this.formDefinition.formGroup.get(a.propertyName);
      formControl.setErrors(a.errors);
    });
  }
}
