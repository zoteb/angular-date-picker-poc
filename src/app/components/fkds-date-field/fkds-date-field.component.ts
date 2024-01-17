import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fkds-date-field',
  templateUrl: './fkds-date-field.component.html',
  styleUrls: ['./fkds-date-field.component.scss']
})
export class FkdsDateFIeldComponent implements OnInit {
  value:Date|null = null;
  constructor() { }

  ngOnInit() {
  }

}