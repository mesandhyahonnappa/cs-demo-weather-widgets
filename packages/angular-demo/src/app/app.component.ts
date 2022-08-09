import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-demo';
  currentTemperature = '273.15';

  onTemperatureChange = (event: any) => {
    debugger;
    console.log('Value - ', event.detail.value);
    this.currentTemperature = event.detail.value;
  };
}
