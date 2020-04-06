import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class NavbarComponent implements OnInit {
  
  @Input() menus;

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu(event) {
    if (event.target.classList.contains("dropdown") || event.target.classList.contains("dropdown__icon")) {
      event.currentTarget.classList.toggle('open');
    }
  }
}
