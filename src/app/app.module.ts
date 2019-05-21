import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AirportsService } from './airports.service';


import { AppComponent } from './app.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { ClickOutsideDirective } from './dropdown.directive';
import { SearchFilterPipe } from './filter-pipe.pipe';
import { AirSelectorComponent } from './air-selector/air-selector.component';
import { IataToCityPipe } from './iata-to-city.pipe';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { CityToIataPipe } from './city-to-iata.pipe';
import { FlightResultsComponent } from './flight-results/flight-results.component';
import { AppRoutingModule } from './/app-routing.module';
import { TestComponent } from './test/test.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    ClickOutsideDirective,
    SearchFilterPipe,
    AirSelectorComponent,
    IataToCityPipe,
    DatepickerComponent,
    CityToIataPipe,
    FlightResultsComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AirportsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
