import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { FlightsResultData } from '../../interfaces/flightsResultData';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { AirportsService } from '../airports.service';

@Component({
  selector: 'app-flight-results',
  templateUrl: './flight-results.component.html',
  styleUrls: ['./flight-results.component.css']
})
export class FlightResultsComponent implements OnInit, OnChanges {
  @Input() form: FormGroup;
  @Input() results: any;
  dateFrom: string;
  hourFrom: string;
  dateTo: string;
  hourTo: string;
  airportFrom: string;
  airportTo: string;
  currency: string;
  price: number;
  arrFlights: any[] = [];
  hasError = false;


  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private airportService: AirportsService,
  ) {

  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params: Params) => {

      this.hasError = false;
      this.arrFlights = [];

      this.airportFrom = this.activatedRoute.snapshot.paramMap.get('fromPort');
      this.airportTo = this.activatedRoute.snapshot.paramMap.get('toPort');
      this.dateFrom = this.activatedRoute.snapshot.paramMap.get('fromDate');
      this.dateTo = this.activatedRoute.snapshot.paramMap.get('toDate');


      this.airportService.getFlights(this.airportFrom, this.airportTo, this.dateFrom, this.dateTo)
        .subscribe(data => {

          if (data.flights.length > 0) {

            data.flights.forEach(flight => {
              this.arrFlights.push(this.extractFlightData(flight));
            });

          } else if (data.flights.length === 0) {

            this.hasError = true;
          }

        });

    });


  } // END ngOnInit()

  ngOnChanges(changes: SimpleChanges) {
    this.hasError = false;
  }

  extractFlightData(results: FlightsResultData): any {
    const resultsObj: FlightsResultData = results;
    const flightCardObj = {};

    this.currency = resultsObj['currency'];
    this.price = parseInt(resultsObj['price'].toFixed(), 10);
    this.dateFrom = this.convStringToDate(resultsObj['dateFrom']);
    this.hourFrom = this.extractTime(resultsObj['dateFrom']);
    this.dateTo = this.convStringToDate(resultsObj['dateTo']);
    this.hourTo = this.extractTime(resultsObj['dateTo']);

    flightCardObj['currency'] = this.currency;
    flightCardObj['price'] = this.price;
    flightCardObj['dateFrom'] = this.dateFrom;
    flightCardObj['dateTo'] = this.dateTo;
    flightCardObj['hourFrom'] = this.hourFrom;
    flightCardObj['hourTo'] = this.hourTo;

    return flightCardObj;
  }

  convStringToDate(str: string): string {
    let res: string;
    let dd: string;
    let mm: string;
    let yyyy: string;

    yyyy = str.substring(0, 4);
    mm = str.substring(5, 7);
    dd = str.substring(8, 10);
    return res = `${dd}/${mm}/${yyyy}`;
  }

  extractTime(str): string {
    let res: string;
    let HH: string;
    let mm: string;

    HH = str.substring(11, 13);
    mm = str.substring(14, 16);

    return res = `${HH}:${mm}`;
  }


} // END class
