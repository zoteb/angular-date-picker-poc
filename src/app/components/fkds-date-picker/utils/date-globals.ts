export class DateGlobals {
  /**
   * @property {Number} firstDayOfWeek
   * The day on which the week starts. `0` being Sunday, through `6` being Saturday.
   */
  static firstDayOfWeek: number = 0;

  /**
   * @property {String[]} monthNames
   * An array of textual month names.
   * Override these values for international dates.
   * @locale
   */
  static monthNames: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  /**
   * @property {String[]} dayNames
   * An array of textual day names.
   * Override these values for international dates.
   * @locale
   */
  static dayNames: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  /**
   * @property {Number[]} weekendDays
   * The days on which weekend falls. `0` being Sunday, through `6` being Saturday.
   */
  static weekendDays: number[] = [0, 6];

  /**
   * Get the last day of the month in which this date resides.
   * @param {number} iMonth The year
   * @param {number} iYear The month
   * @return {Number}
   */
  static getLastDayOfMonth(iMonth: number, iYear: number): number {
    return new Date(iYear, iMonth + 1, 0).getDate();
  }
  /**
   * Get the date of the first day of the month in which this date resides.
   * @param {Date} date The date
   * @return {Date}
   */
  static getFirstdateOfMonth(iMonth: number, iYear: number): Date {
    return new Date(iYear, iMonth, 1);
  }

  static yearMonthAreEquals(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth()
    );
  }

  static dateIsEqual(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
  /**
   * Checks if the date is a weekend day. Uses {@link #weekendDays}.
   * @param {Date} date The date.
   * @return {Boolean} `true` if the day falls on a weekend.
   *
   * @since 6.2.0
   */
  static isWeekend(date: Date): boolean {
    return this.weekendDays.indexOf(date.getDay()) > -1;
  }

  /**
   * Checks if a date falls on or between the given start and end dates.
   * @param {Date} date The date to check
   * @param {Date} start Start date
   * @param {Date} end End date
   * @return {Boolean} `true` if this date falls on or between the given start and end dates.
   */
  static between(date: Date, start: Date, end: Date): boolean {
    var t = date.getTime();
    return start.getTime() <= t && t <= end.getTime();
  }
}
