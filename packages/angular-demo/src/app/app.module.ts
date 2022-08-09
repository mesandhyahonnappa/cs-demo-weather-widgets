import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CsdemoTemperatureModule, CsdemoDailyForecastModule } from '@ionic-enterprise/cs-demo-weather-widgets-angular';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CommonModule, CsdemoTemperatureModule, CsdemoDailyForecastModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
