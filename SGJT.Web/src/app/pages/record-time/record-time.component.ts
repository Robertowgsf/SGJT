import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-record-time',
  templateUrl: './record-time.component.html',
  styleUrls: ['./record-time.component.scss']
})
export class RecordTimeComponent implements OnInit {

  time = new Date();
  
  constructor() { }

  ngOnInit() {
      setInterval(() => {
         this.time = new Date();
      }, 1000);
  }

}
