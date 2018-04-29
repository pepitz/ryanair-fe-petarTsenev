// tslint:disable:use-host-property-decorator
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css'],

  host: {
    '(document:click)': 'onCloseCalendar($event)'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true,
    }
  ]
})
export class DatepickerComponent implements OnInit, ControlValueAccessor, OnChanges {

  @Input() formCtrlName: FormControl;
  @Input() formRef: FormGroup;
  @Input() formRefSubmit: FormGroup;
  @Input() formControlType: string;
  @Input() value: string;
  @Output() update = new EventEmitter<string>();
  currentDate: number;
  date: Date = new Date();
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
  month: number;
  year: number;
  days: number[];
  result: string;
  showCalendar = false;
  tag: string;
  errorMsg: string;
  hasError = false;
  submitError = false;
  dateCtrl: string;

  private onChange: Function;
  private onTouched: Function;

  constructor() {
    this.onChange = (_: any) => { };
    this.onTouched = () => { };
  }

  ngOnInit() {

    this.currentDate = new Date().getDate();
    this.tag = this.formControlType;

    // Set date if default value is present
    if (this.value) { this.date = new Date(this.value); }
    this.month = this.date.getMonth();
    this.year = this.date.getFullYear();
    this.updateMonth();
    // Select day if default value is present
    if (this.value) { this.selectDay(this.date.getDate()); }
    this.updateMonth();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes && changes.formRefSubmit.firstChange === false) {

      this.submitError = this.formRefSubmit.controls.dateTo.invalid === true ||
        this.formRefSubmit.controls.dateFrom.invalid === true;
    }
  }

  setCtrl(ctrl): void {
    ctrl === 'From' ? this.dateCtrl = 'From' : this.dateCtrl = 'To';
  }

  hasValidInput(ctrl): void {
    switch (ctrl) {

      case 'To':
        if (this.formRef.controls.dateFrom.invalid && this.formRef.controls.dateTo.pristine) {
          this.hasError = true;
        }
        break;

      case 'From':
        if (this.formRef.controls.dateFrom.valid) {
          this.hasError = false;
        }
        break;

      default:
        break;
    }


  }

  checkRef(formRef): void {
    // console.log(formRef);
  }

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  setValue(val: string): void {
    this.value = val;
    this.onChange(this.value);
  }

  onShowCalendar(e: Event) {

    e.stopPropagation();
    this.showCalendar = true;

  }

  onCloseCalendar(e: Event) {
    if (this.showCalendar) {
      this.showCalendar = false;
      // this.update.emit(this.result);
    }
    return;
  }

  updateMonth(e?: Event, type?: string) {
    if (e) { e.stopPropagation(); }
    if (type === 'dec') { this.month--; }
    if (type === 'inc') { this.month++; }
    if (this.month < 0) {
      this.month = 11;
      this.year--;
    }
    if (this.month > 11) {
      this.month = 0;
      this.year++;
    }
    const date = new Date(this.year, this.month, 0);

    let days: number;
    if (this.month % 2 === 0) {
      days = 31;
    } else if (this.month === 1) {
      days = 28;
    } else {
      days = 30;
    }
    const day = date.getDay();
    const prefix = new Array(day);

    this.days = prefix.concat(this.range(0, days));
  }

  range(start = 1, days: number): number[] {
    const result: number[] = [];
    while (start < days) {
      ++start;
      result.push(start);
    }
    return result;
  }

  selectDay(day: number) {
    const isBeforeToday = this.isDayBeforeToday(day);
    if (!day || (day && isBeforeToday)) {
      return;
    }
    const pad = s => s.length < 2 ? 0 + s : s;
    this.date = new Date(this.year, this.month, day);
    this.result = `${this.year}-${pad(this.month + 1 + '')}-${pad(day + '')}`;

    this.value = this.result;
    this.onChange(this.result);

    // this.update.emit(this.result);
  }

  isDayBeforeToday(day: number): boolean {

    const pastDate = new Date(this.year, this.month, day + 1);
    // tslint:disable-next-line:no-unused-expression
    return pastDate < new Date() ? true : false;
  }



}
