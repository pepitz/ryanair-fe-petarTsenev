import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AIRPORTS } from '../data-model';

import { AirportsService } from '../airports.service';
import { AirData } from '../../interfaces/airData';
import { IataToCityPipe } from '../iata-to-city.pipe';

import { AirSelectorComponent } from '../air-selector/air-selector.component';
import { FlightsResultData } from '../../interfaces/flightsResultData';
import { FlightResultsComponent } from '../flight-results/flight-results.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  from = 'From';
  to = 'To';

  form: FormGroup;
  ports: string[] = AIRPORTS;
  showDropDown = false;

  fullDataObj = {};
  airports: AirData[] = [];
  cities: string[] = [];
  IATAcodes: string[] = [];
  initialDate: string = new Date().toString();
  flightResults: FlightResultsComponent[] = [];
  formErrors: FormGroup;


  constructor(
    private fb: FormBuilder,
    private airportService: AirportsService,
    private router: Router,
  ) {

  }

  ngOnInit() {

    this.createForm();
    this.getAirportData();

  }


  onSubmit(): void {

    if (this.form.invalid === false) {

      const from_air = this.getIataFromCity(this.form.controls['airportFrom'].value);
      const to_air = this.getIataFromCity(this.form.controls['airportTo'].value);
      const date_from = this.form.controls['dateFrom'].value;
      const date_to = this.form.controls['dateTo'].value;

      this.router.navigateByUrl(`/flight-results/${from_air}/${to_air}/${date_from}/${date_to}`);

    } else {
      console.error('Form NOT valid!', this.form);
      this.formErrors = this.form;
    }

  }

  createForm(): void {
    this.form = this.fb.group({
      airportFrom: ['', Validators.required],
      airportTo: ['', Validators.required],
      dateFrom: ['', Validators.required],
      dateTo: ['', Validators.required]
    });
  }

  getIataFromCity(city: string): string {

    for (let i = 0; i < this.airports.length; i++) {
      if (this.airports[i]['name'].toLocaleLowerCase() === city.toLocaleLowerCase()) {
        const resultIata = this.airports[i]['iataCode'];
        return resultIata;
      }
    }

  }

  extractAirportsData(): void {
    this.airports = this.fullDataObj['airports'];
    this.cities = this.airports.map(airport => airport.name);
    this.IATAcodes = this.airports.map(airport => airport.iataCode);
  }

  getAirportData(): void {
    this.airportService.getAirports()
      .subscribe(response => {
        this.fullDataObj = response;


        this.extractAirportsData();

      });
  }

}
