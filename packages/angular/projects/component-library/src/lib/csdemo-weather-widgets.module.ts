import { NgModule } from '@angular/core';
import { CsdemoConditionModule } from './csdemo-condition.module';
import { CsdemoDailyForecastModule } from './csdemo-daily-forecast.module';
import { CsdemoTemperatureModule } from './csdemo-temperature.module';
import { CsdemoUvIndexModule } from './csdemo-uv-index.module';

@NgModule({
  imports: [CsdemoConditionModule, CsdemoDailyForecastModule, CsdemoTemperatureModule, CsdemoUvIndexModule],
  exports: [CsdemoConditionModule, CsdemoDailyForecastModule, CsdemoTemperatureModule, CsdemoUvIndexModule]
})
export class CsdemoWeatherWidgetsModule {}
