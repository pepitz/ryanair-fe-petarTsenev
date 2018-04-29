import { Pipe, PipeTransform } from '@angular/core';
import { AirData } from '../interfaces/airData';

@Pipe({
  name: 'cityToIata'
})
export class CityToIataPipe implements PipeTransform {

  transform(value: any, airports?: AirData[]): string {
    for (let i = 0; i < airports.length; i++) {
      if (airports[i]['name'].toLocaleLowerCase() === value.toLocaleLowerCase()) {
        const resultIata = `${airports[i]['name']} ( ${airports[i]['iataCode']} )`;
        return resultIata;
      }
    }
  }

}
