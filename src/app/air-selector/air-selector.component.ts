import { Component, OnInit, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup } from '@angular/forms';
import { AIRPORTS } from '../data-model';
import { AirportsService } from '../airports.service';
import { AirData } from '../../interfaces/airData';
import { FullData } from '../../interfaces/fullData';

@Component({
  selector: 'app-air-selector',
  templateUrl: './air-selector.component.html',
  styleUrls: ['./air-selector.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AirSelectorComponent),
      multi: true,
    }]
})
export class AirSelectorComponent implements OnInit, ControlValueAccessor, OnChanges {

  @Input() formControlType: string;
  @Input() formRef: any;
  @Input() formRefSubmit: FormGroup;
  inputValue: string;
  label: string;
  showDropDown = false;
  hasError = false;


  private onChange: Function;
  private onTouched: Function;

  fullDataObj: FullData;
  airports: AirData[] = [];
  filteredCitites: string[] = [];
  cities: string[] = [];
  routes: { key: string, value: string[] };
  IATAcodes: string[] = [];


  constructor(private airportService: AirportsService) {
    this.onChange = (_: any) => { };
    this.onTouched = () => { };
  }

  ngOnInit() {
    this.getAirportData();
    this.label = this.formControlType;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.formRefSubmit && changes.formRefSubmit.firstChange === false) {

      this.hasError = this.formRefSubmit.controls.airportTo.invalid === true ||
        this.formRefSubmit.controls.airportFrom.invalid === true;
    }
  }



  extractAirportsData(): void {

    this.airports = this.fullDataObj['airports'];
    this.cities = this.airports.map(airport => airport.name);
    this.IATAcodes = this.airports.map(airport => airport.iataCode);
    this.routes = this.fullDataObj['routes'];

  }

  getAirportData(): void {
    this.airportService.getAirports()
      .subscribe(response => {

        this.fullDataObj = response;
        this.extractAirportsData();

      });
  }

  writeValue(obj: any): void {
    this.inputValue = obj;

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

  checkRef(event): void {

    if (event.target.id === 'searchTo' && this.formRef) {

      const listDestinations = this.loadAirportRoutes(this.formRef);
      this.filteredCitites = this.IataArrayToCities(listDestinations);

    } else if (event.target.id === 'searchFrom') {
      this.filteredCitites = this.cities;
    }

  }



  setValue(value: string): void {
    this.inputValue = value;
    this.onChange(this.inputValue);
  }

  toggleDropDown(event): void {

    this.showDropDown = !this.showDropDown;
  }

  IataArrayToCities(iataArr): string[] {

    const citiesList = [];
    iataArr.forEach(element => {
      this.airports.forEach(item => {
        if (element === item['iataCode']) {
          citiesList.push(item['name']);
        }
      });
    });
    return citiesList;
  }

  getIataFromCity(city: string): string {

    for (let i = 0; i < this.airports.length; i++) {
      if (this.airports[i]['name'].toLocaleLowerCase() === city.toLocaleLowerCase()) {
        const resultIata = this.airports[i]['iataCode'];
        return resultIata;
      }
    }

  }

  loadAirportRoutes(originCity: string): string[] {

    const iataCode = this.getIataFromCity(originCity);
    let routesArr = [];

    for (const prop in this.routes) {
      if (prop === iataCode) {
        return routesArr = this.routes[prop];
      }
    }

  }

  getSearchValue(inputField: any): string {
    return inputField.value;
  }

  selectValue(inputField: any, value: string): void {
    this.setValue(value);
    this.showDropDown = false;
  }



}
