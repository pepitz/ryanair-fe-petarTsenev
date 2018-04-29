import { Pipe, PipeTransform } from '@angular/core';
import { AirData } from '../interfaces/airData';

@Pipe({
  name: 'iataToCity'
})
export class IataToCityPipe implements PipeTransform {

  transform(value: string, arrAirports: AirData[]): string {

    let result = '';
    arrAirports.forEach(element => {

      if (element['iataCode'] === value) {
        result = element['name'];
      }

    });

    return result;
  }

}
