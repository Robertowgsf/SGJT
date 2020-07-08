import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ListDefinition } from 'src/app/shared/models/list/list-definition.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() listDefinition: ListDefinition;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    window.getSelection().removeAllRanges();
  }

  goToRegister(id: number = null) {
    if (id) {
      if (window.getSelection().toString() == "") {
        this.router.navigate([this.listDefinition.registerURL, id]);
      }
    }
    else {
      this.router.navigate([this.listDefinition.registerURL, "new"]);
    }
  }
}
