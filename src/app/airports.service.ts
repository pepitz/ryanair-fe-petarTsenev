
// tslint:disable:max-line-length
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { FlightsResultData } from '../interfaces/flightsResultData';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AirportsService {

  constructor(private http: HttpClient) { }

  getAirports(): Observable<any> {
    return this.http.get<any>('https://murmuring-ocean-10826.herokuapp.com/en/api/2/forms/flight-booking-selector/');
  }

  getFlights(fromPort: string, toPort: string, dateFrom: string, dateTo: string): Observable<any> {

    return this.http.get<FlightsResultData>(`https://murmuring-ocean-10826.herokuapp.com/en/api/2/flights/from/${fromPort}/to/${toPort}/${dateFrom}/${dateTo}/250/unique/?limit=15&offset-0`);

  } // END search()

}
