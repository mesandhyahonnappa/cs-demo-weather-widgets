import { NgModule } from '@angular/core';
import { CsdemoTemperature } from './stencil-generated/components';

@NgModule({
  declarations: [CsdemoTemperature],
  exports: [CsdemoTemperature],
})
export class CsdemoTemperatureModule {}
