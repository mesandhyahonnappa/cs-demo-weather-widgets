import { NgModule } from '@angular/core';
import { CsdemoDailyForecast } from './stencil-generated/components';

@NgModule({
  declarations: [CsdemoDailyForecast],
  exports: [CsdemoDailyForecast],
})
export class CsdemoDailyForecastModule {}
