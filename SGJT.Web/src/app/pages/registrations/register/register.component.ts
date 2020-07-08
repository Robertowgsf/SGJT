import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ListDefinition } from 'src/app/shared/models/list/list-definition.model';
import { FormDefinition } from 'src/app/shared/models/form/form-definition.model';
import { Entity } from 'src/app/shared/models/base/entity.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Input() listDefinitions: Array<ListDefinition>;
  @Input() formDefinition: FormDefinition;

  isNew: boolean;
  selectedListDefinition: ListDefinition;
  selectedListDefinitionIndex: number;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.listDefinitions && this.listDefinitions.length > 0) {
      this.selectedListDefinitionIndex = 0;
      this.selectTabItem(this.selectedListDefinitionIndex);
    }

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
    });
  }

  removeAssociation(id, index) {
    let propertyName = this.listDefinitions[this.selectedListDefinitionIndex].propertyName;
    // E quando tiver paginação??
    this.formDefinition.model[propertyName].splice(index, 1);
    // Criar método específico para remover associações?
    this.formDefinition.service.removerAssociacao(this.formDefinition.model).subscribe(success => {
      // this.listDefinitions[index].dataSource.splice(index, 1);
      // this.selectedListDefinition.dataSource = this.listDefinitions[index].dataSource;
    });
  }

  selectTabItem(index) {
    if (this.listDefinitions[index].activeClass != "container-tabs__item-active") {  
      this.listDefinitions.forEach(list => list.activeClass = "");
      this.listDefinitions[index].activeClass = "container-tabs__item-active";
      this.selectedListDefinition = this.listDefinitions[index];
      this.selectedListDefinitionIndex = index;
    }
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
