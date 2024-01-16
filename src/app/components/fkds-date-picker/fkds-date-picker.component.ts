import {
  AfterContentInit,
  Component,
  Input,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { DatePickerDays } from './interface/date-picker-days';
import { DateGlobals } from './utils/date-globals';

@Component({
  selector: 'app-fkds-date-picker',
  templateUrl: './fkds-date-picker.component.html',
  styleUrls: ['./fkds-date-picker.component.scss'],
})
export class FkdsDatePickerComponent implements OnInit {
  public browserMonthName: string = '';
  public browserYearName: string = '';
  public calendarDays: DatePickerDays[] | null = null;
  public calendarMonths: DatePickerDays[] | null = null;
  public calendarYears: DatePickerDays[]| null = null;

  protected now: Date = new Date();
  protected browseDate: Date = new Date();
  protected readonly yearOffset: number = 13;

  @Input() firstDayOfWeek: number = DateGlobals.firstDayOfWeek;
  @Input() monthNames: string[] = DateGlobals.monthNames;
  @Input() weekDaysNames: string[] = DateGlobals.dayNames;
  @Input() disabledDays: Number[] = [0, 6];
  @Input() maxDate: Date| null = null;
  @Input() minDate: Date| null = null;
  @Input() selectedDate!: Date;

  constructor(protected viewContainerRef: ViewContainerRef) {
    
  }

  ngOnInit() {
    if (!this.selectedDate) this.selectedDate = new Date(this.now);
    this.browseDate = new Date(this.selectedDate);

    console.log('date initial', this.browseDate);
    this.renderMonthNameYear(this.browseDate);
    this.createDaysPage(this.browseDate);
  }

  private getYearPageInterval(): number {
    return this.yearOffset * 2 + 1;
  }

  private populateYears(initialYear: number): DatePickerDays[] {
    let years: DatePickerDays[] = [];
    let year = this.selectedDate.getFullYear();
    let finalYear = initialYear + this.getYearPageInterval();

    let elYearsContainer = document.createElement('div');
    elYearsContainer.classList.add('datepicker--year');

    for (let i = initialYear; i <= finalYear; i++) {
      let calendarYear = { className: ['year'], value: i };

      if (year === i) {
        calendarYear.className.push('current-selection');
      }

      if (this.now.getFullYear() === i) {
        calendarYear.className.push('now-date');
      }

      years.push(calendarYear);
    }
    return years;
  }

  private renderYears(initialYear: number) {
    this.calendarYears = this.populateYears(initialYear);
    this.resetCalendarData(false, true, true);
  }

  private populateMonths(date: Date) {
    //document.getElementsByClassName('toolbar-selector')[0].classList.add("separator");
    let months: DatePickerDays[] = [];
    for (let i = 0; i < this.monthNames.length; i++) {
      let calendarMonth = { className: ['month'], value: this.monthNames[i] };

      if (this.selectedDate?.getMonth() === i) {
        calendarMonth.className.push('current-selection');
      }

      if (
        date.getFullYear() === this.now.getFullYear() &&
        this.now.getMonth() === i
      ) {
        calendarMonth.className.push('now-date');
      }
      months.push(calendarMonth);
    }

    return months;
  }

  private populateWeekDays(): DatePickerDays[] {
    const weekDaysNames = this.weekDaysNames
      .slice(this.firstDayOfWeek)
      .concat(this.weekDaysNames.slice(0, this.firstDayOfWeek));
    let weekDays = [];
    for (let i = 0; i < weekDaysNames.length; i++) {
      weekDays.push({ className: ['day'], value: weekDaysNames[i][0] });
    }

    return weekDays;
  }

  private populateMonthCalendar(
    daysInMonth: number,
    date: Date
  ): DatePickerDays[] {
    let days: DatePickerDays[] = [];
    const daySelect = this.selectedDate?.getDate();
    let daysLeft = DateGlobals.getFirstdateOfMonth(
      date.getMonth(),
      date.getFullYear()
    ).getDay();
    daysLeft = daysLeft - this.firstDayOfWeek;

    for (let d = 0; d < daysLeft; d++) {
      days.push({ className: ['dateOff'] });
    }

    console.log(
      'populate days',
      date.toLocaleString(),
      this.selectedDate.toLocaleDateString()
    );

    for (let i = 0; i < daysInMonth; i++) {
      const day = i + 1;
      const calendarDate = new Date(date.getFullYear(), date.getMonth(), day);

      let calendarDay = { className: ['date'], value: day };

      if (
        DateGlobals.yearMonthAreEquals(date, this.selectedDate) &&
        daySelect &&
        day === daySelect
      ) {
        calendarDay.className.push('current-selection');
      }

      if (daySelect && day === daySelect) {
        calendarDay.className.push('current-day-selection');
      }

      if (
        DateGlobals.yearMonthAreEquals(date, this.now) &&
        day === this.now.getDate()
      ) {
        calendarDay.className.push('now-date');
      }

      if (this.disabledDays.indexOf(calendarDate.getDay()) !== -1) {
        calendarDay.className.push('disable');
      }

      if (this.maxDate && calendarDate.getTime() > this.maxDate.getTime()) {
        calendarDay.className.push('disable');
      }

      if (this.minDate && calendarDate.getTime() < this.minDate.getTime()) {
        calendarDay.className.push('disable');
      }

      days.push(calendarDay);
    }

    return days;
  }

  private createDaysPage(date:Date) {
    var totalDaysInMonth = DateGlobals.getLastDayOfMonth(
      date.getMonth(),
      date.getFullYear()
    );
    this.calendarDays = this.populateWeekDays().concat(
      this.populateMonthCalendar(totalDaysInMonth, date)
    );
  }

  private renderMonthNameYear(date: Date) {
    this.browserMonthName = this.monthNames[date.getMonth()];
    this.browserYearName = date.getFullYear().toString();
  }
  private renderMonthCalendar(date: Date) {
    this.calendarMonths = this.populateMonths(date);
    this.resetCalendarData(true, false, true);
  }
  private renderCalendar() {
    // todo use switch case as factory
    this.renderMonthNameYear(this.browseDate);
    this.createDaysPage(this.browseDate);
    this.resetCalendarData(true, true, false);
  }

  private resetCalendarData(years: boolean, month: boolean, days: boolean) {
    if (years) {
      this.calendarYears = null;
    }
    if (month) {
      this.calendarMonths = null;
    }
    if (days) {
      this.calendarDays = null;
    }
  }

  protected setBrowserData(year?: number, month?: number, date?: number) {
    const isNullOrUndefined = (val?:number) => val === undefined || val === null;
    if (!isNullOrUndefined(year)) this.browseDate.setFullYear(year!);
    if (!isNullOrUndefined(month)) this.browseDate.setMonth(month!);
    if (!isNullOrUndefined(date)) this.browseDate.setDate(date!);

    this.browseDate = new Date(this.browseDate);
  }

  browseCalendar(direction: number) {
    if (this.calendarDays?.length) {
      this.setBrowserData(undefined, this.browseDate.getMonth() + 1 * direction);
      this.renderCalendar();
    } else if (this.calendarMonths?.length) {
      this.setBrowserData(this.browseDate.getFullYear() + 1 * direction);
      this.renderMonthNameYear(this.browseDate);
    } else if (this.calendarYears?.length) {
      let initialYear =
        this.browseDate.getFullYear() + this.getYearPageInterval() * direction;
      this.setBrowserData(initialYear);
      this.renderYears(initialYear);
    }
  }

  /** Listeners */

  onCalendarClicked(event: MouseEvent) {
    const target = event.target as HTMLInputElement;
    if (target?.dataset) {
      if (target?.dataset['day']) {
        this.setBrowserData(undefined, undefined, +target.dataset['day']);
      } else if (target?.dataset['month']) {
        this.setBrowserData(undefined, +target.dataset['month']);
      } else if (target?.dataset['year']) {
        this.setBrowserData(+target.dataset['year']);
      }

      //validate date
      if (this.disabledDays.indexOf(this.browseDate.getDay()) !== -1) {
        // TODO : evaluate de nearest valid date
        this.setBrowserData(undefined, undefined, this.browseDate.getDate() - 1);
      }

      this.selectedDate = new Date(this.browseDate);

      console.log('Date selectedd', this.selectedDate); //replace with fire event
      this.renderCalendar();
    }
  }

  onMonthButtonClicked(event: MouseEvent) {
    if (!this.calendarMonths?.length) {
      this.renderMonthCalendar(this.browseDate);
    } else {
      if (!DateGlobals.dateIsEqual(this.selectedDate, this.browseDate)) {
        this.browseDate = new Date(this.selectedDate);
      }
      this.renderCalendar();
    }
  }

  onYearButtonClicked(event: MouseEvent) {
    if (!this.calendarYears?.length) {
      let initialYear = this.browseDate.getFullYear() - this.yearOffset;
      this.setBrowserData(initialYear);
      this.renderYears(initialYear);
    } else {
      if (!DateGlobals.dateIsEqual(this.selectedDate, this.browseDate)) {
        this.browseDate = new Date(this.selectedDate);
      }
      this.renderCalendar();
    }
  }

  onPreviousDateClicked(event: MouseEvent) {
    this.browseCalendar(-1);
  }

  onNextDateClicked(event: MouseEvent) {
    this.browseCalendar(+1);
  }
}
