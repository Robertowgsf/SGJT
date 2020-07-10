import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

  isAddingNewAssociation: boolean = false;
  newEntry;

  constructor(
    private route: ActivatedRoute,
    private router: Router
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
        this.formDefinition.model = success;
        this.router.navigate([`../${success.id}`], { relativeTo: this.route })
      }, error => {
        this.setFormErrors(error.error);
      });
    }
  }

  remove() {
    let id = this.formDefinition.model.id;
    this.formDefinition.service.delete(id).subscribe(success => {
      this.router.navigateByUrl(this.router.url.replace(`/${id}`, "").replace("register", "list"));
    });
  }

  removeAssociation(id, index) {
    let propertyName = this.listDefinitions[this.selectedListDefinitionIndex].propertyName;
    // E quando tiver paginação??
    // Criar método específico para remover associações?
    this.formDefinition.service.removeAssociation(this.formDefinition.model.id, id).subscribe(success => {
      this.formDefinition.model[propertyName].splice(index, 1);
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

  addNewAssociation() {
    let newEntry = this.newEntry ? parseInt(this.newEntry) : this.newEntry;
    this.selectedListDefinition.addNewAssociation(this.formDefinition.model.id, newEntry).subscribe(success => {
      if (!this.selectedListDefinition.dataSource) {
        this.selectedListDefinition.dataSource = [];
      }
      this.selectedListDefinition.dataSource.push(success);
    }, error => {
      console.log(error);
    });

    this.cancelNewAssociation();
  }

  cancelNewAssociation() {
    this.isAddingNewAssociation = false;
    this.newEntry = null;
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
