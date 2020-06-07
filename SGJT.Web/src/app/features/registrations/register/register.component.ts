import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListDefinition } from 'src/app/shared/models/list-definition.model';
import { FormDefinition } from 'src/app/shared/models/form-definition.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  @Input() listDefinition: ListDefinition;
  @Input() formDefinition: FormDefinition;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log(this.formDefinition);
  }
}
