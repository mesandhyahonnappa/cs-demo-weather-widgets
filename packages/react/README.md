# Demo Weather Widgets - React

This is a sample custom element library that contains some simple weather related elements. This library contains the following custom elements:

- Simple
  - **csdemo-temperature** - takes a temperature in Kelvin and displays the value in either Celsius or Fahrenheit
  - **csdemo-uv-index** - takes a UV Index value and displays the value with a description and color coding
  - **csdemo-condition** - given a mapping of condition types to image URLs and a condition code, determines which code to use and displays the image with a label
- Compound
  - **csdemo-daily-forecast** - condition, date, low, high

## Usage

```bash
npm i @ionic-enterprise/cs-demo-weather-widgets-react
```

### Handling Icons

This library includes a set of images under `node_modules/@ionic-enterprise/cs-demo-weather-widgets/dist/images`. If you copy all of these images to `public/assets/images` they will be automatically loaded by the components that need them.

You are also free to use your own images, copy them to a different location, and/or name some of the images differently.

If you use a different location or name, you need to let the components know the proper paths or names through a mapping. For example:

```typescript
  const icons = {
    sunny: 'alt-location/images/sunny.png',
    cloudy: 'alt-location/images/cloudy.png',
    lightRain: 'alt-location/images/light-rain.png',
    shower: 'alt-location/images/shower.png',
    sunnyThunderstorm: 'alt-location/images/sunny-tstorm.png',
    thunderstorm: 'alt-location/images/tstorm.png',
    fog: 'alt-location/images/fog.png',
    snow: 'alt-location/images/snow.png',
    unknown: 'alt-location/images/unknown.png',
  };
```

You can also use a partial mapping if only a couple of names have changed:

```typescript
  const icons = {
    sunnyThunderstorm: 'assets/images/partial-tstorm.png',
    unknown: 'assets/images/dunno.png',
  };
```

The overrides can be specified on any component that has a `iconPaths` property:

```jsx
    <CsdemoCondition condition="200" iconPaths={icons} />
    <CsdemoDailyForecast scale={scale} forecasts={dailyForecast} iconPaths={icons} />
```

### `CsdemoTemperature`

Displays the `temperature`, supplied in Kelvin, in the specified `scale` (C or F).

```tsx
import { useState } from 'react';
import { CsdemoTemperature } from '@ionic-enterprise/cs-demo-weather-widgets-react';

const SomePage: React.FC = () => {
  const [scale, setScale] = useState('F');

  return (
    <CsdemoTemperature
      scale={scale}
      temperature="297"
      onClick={() => setScale(scale === 'F' ? 'C' : 'F')}
    />
  );
};
```

### `CsdemoCondition`

Displays the current condition in both text and icon form. The condition is one of the [condition codes](https://openweathermap.org/weather-conditions) used by [OpenWeatherMap.org](https://openweathermap.org).

```tsx
import { CsdemoCondition } from '@ionic-enterprise/cs-demo-weather-widgets-react';

const SomePage: React.FC = () => {
  return (
    <CsdemoCondition condition="200" />
  );
};
```

#### `CsdemoUvIndex`

Displays the UV index along with a risk level, in a color appropriate for the level of risk.

```tsx
import { CsdemoUvIndex } from '@ionic-enterprise/cs-demo-weather-widgets-react';

const SomePage: React.FC = () => {
  return (
    <CsdemoUvIndex uvIndex="2.5" />
  );
};
```

#### `CsdemoDailyForecast`

Displays the forecast for a given day.

```tsx
import { useState } from 'react';
import { CsdemoDailyForecast } from '@ionic-enterprise/cs-demo-weather-widgets-react';

const SomePage: React.FC = () => {
  const [scale, setScale] = useState('F');
  const dailyForecast: Forecast = data;

  return (
    <CsdemoDailyForecast scale={scale} forecast={dailyForecast} />
  );
};
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

The condition is one of the [condition codes](https://openweathermap.org/weather-conditions) used by [OpenWeatherMap.org](https://openweathermap.org).

## Conclusion

That is it. We also have a [demo application](https://github.com/ionic-enterprise/ionic-weather-react) you can check out if you would like to.

Happy Coding!!