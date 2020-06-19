import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ListDefinition } from 'src/app/shared/models/list-definition.model';

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

  goToRegister(id: number) {
    if (window.getSelection().toString() == "") {
      this.router.navigate([this.listDefinition.registerURL, id]);
    }
  }
}
