import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  locale = {
    firstDayOfWeek: 1,
    monthNames: [
      'janvier',
      'février',
      'mars',
      'avril',
      'mai',
      'juin',
      'juillet',
      'août',
      'septembre',
      'octobre',
      'novembre',
      'décembre',
    ],
    weekDaysNames: [
      'dimanche',
      'lundi',
      'mardi',
      'mercredi',
      'jeudi',
      'vendredi',
      'samedi',
    ],
  };

  dateToSelect: Date = new Date(2024, 1, 15);
  maxDate : Date|null=null;//new Date(2024, 1, 15);
  minDate: Date|null=null;//new Date(2024, 0, 5);
  //maxDate : Date=new Date(2024, 1, 15);
  //minDate: Date=new Date(2024, 0, 5);
  name = 'Angular ' + VERSION.major;
}
