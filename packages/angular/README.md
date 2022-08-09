# Weather Widgets - Angular

This is a sample custom element library that contains some simple weather related web components. This library contains the following components:

- Simple
  - **csdemo-temperature** - takes a temperature in Kelvin and displays the value in either Celsius or Fahrenheit
  - **csdemo-uv-index** - takes a UV Index value and displays the value with a description and color coding
  - **csdemo-condition** - given a mapping of condition types to image URLs and a condition code, determines which code to use and displays the image with a label
- Compound
  - **csdemo-daily-forecast** - condition, date, low, high

This package is intended for use in an Angular application. It wraps the web components in Angular proxies that make using the web components more natural within an Angular application.

This project is intended to be a simple example of how these proxies work with Stencil based web component projects. It is not intended to be a full-featured component library.

## Installation

```bash
npm @ionic-enterprise/cs-demo-weather-widgets-angular
```

Adjust accordingly if you are using `yarn`, `pnpm`, etc.

## Usage

### Module

Any module that is going to use a Weather Widget component needs to import the appropriate module or modules.

The most efficient strategy to use is to import the module(s) associated with the individual component(s) that will be used. For example:

```typescript
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CsdemoConditionModule, CsdemoTemperatureModule } from '@ionic-enterprise/cs-demo-weather-widgets-angular';
import { IonicModule } from '@ionic/angular';
import { CurrentWeatherPageRoutingModule } from './current-weather-routing.module';
import { CurrentWeatherPage } from './current-weather.page';

@NgModule({
  imports: [
    CommonModule,
    CsdemoConditionModule,
    CsdemoTemperatureModule,
    CurrentWeatherPageRoutingModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [CurrentWeatherPage],
})
export class CurrentWeatherPageModule {}
```

The `CsdemoWeatherWidgetsModule` module can be imported instead of individual component modules. This is more convenient, but it will also lead to larger bundle sizes.

```typescript
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CsdemoWeatherWidgetsModule } from '@ionic-enterprise/cs-demo-weather-widgets-angular';
import { IonicModule } from '@ionic/angular';
import { ForecastPageRoutingModule } from './forecast-routing.module';
import { ForecastPage } from './forecast.page';

@NgModule({
  imports: [IonicModule, CommonModule, CsdemoWeatherWidgetsModule, FormsModule, ForecastPageRoutingModule],
  declarations: [CurrentWeatherPage],
})
export class CurrentWeatherPageModule {}
```

### Components

Any component that take a `condition` assumes that the condition is one of the [condition codes](https://openweathermap.org/weather-conditions) used by [OpenWeatherMap.org](https://openweathermap.org).

#### `csdemo-temperature`

Displays the `temperature`, supplied in Kelvin, in the specified `scale` (C or F).

```html
<csdemo-temperature scale="F" temperature="297"></csdemo-temperature>
```

#### `csdemo-condition`

Displays the current condition in both text and icon form.

```html
<csdemo-condition [condition]="200"></csdemo-condition>
```

#### `csdemo-daily-forecast`

Displays the forecast for a given day.

```html
<csdemo-daily-forecast scale="F" [forecast]="forecastData"></csdemo-daily-forecast>
```

The forecast property is a forecast data object in the following format:

```TypeScript
export interface Forecast {
  date: Date;
  condition: number;
  low: number;
  high: number;
}
```

The low and high temperatures are specified in Kelvin.

#### `csdemo-uv-index`

Displays the UV index along with a risk level, in a color appropriate for the level of risk.

```html
<csdemo-uv-index [uvIndex]="value"></csdemo-uv-index>
```

### Image Handling

This library includes a set of images under `node_modules/@ionic-enterprise/cs-demo-weather-widgets/dist/images`. If you copy all of these images to `src/assets/images` they will be automatically loaded by the components that need them.

You are also free to use your own images, copy them to a different location, and/or name some of the images differently.

If you use a different location or name, you will need to specify a mapping that the components can use.  In Angular applications, it is often useful to attach this mapping object to the `environment` object as such:

```TypeScript
export const environment = {
  production: false,
  icons: {
    sunny: 'alt/location/sunny.png',
    cloudy: 'alt/location/cloudy.png',
    lightRain: 'alt/location/light-rain.png',
    shower: 'alt/location/shower.png',
    sunnyThunderstorm: 'alt/location/sunny-tstorm.png',
    thunderstorm: 'alt/location/tstorm.png',
    fog: 'alt/location/fog.png',
    snow: 'alt/location/snow.png',
    unknown: 'alt/location/unknown.png',
  },
};
```

You can also specify a partial list if only only a couple of icons are different or have different names:

```TypeScript
export const environment = {
  production: false,
  icons: {
    sunnyThunderstorm: 'assets/images/partial-tstorm.png',
    unknown: 'assets/images/this-is-wrong.png',
  },
};
```

If you have multiple environments, refactor as needed to keep your code DRY.

You can pass the icons to any component that has a `iconPaths` property:

```html
<csdemo-condition [condition]="200" [iconPaths]="icons"></csdemo-condition>
<csdemo-daily-forecast scale="F" [forecast]="forecast" [iconPaths]="icons"></csdemo-daily-forecast>
```

## Conclusion

That is it. We also have a [demo application](https://github.com/ionic-enterprise/ionic-weather-angular) you can check out if you would like to.

Happy Coding!! 🤓
