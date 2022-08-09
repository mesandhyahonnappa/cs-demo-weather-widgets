import { ConditionIconPaths } from '../../models/condition-icon-paths';

export class WeatherCondition {
  private sunny = 1;
  private cloudy = 10;
  private lightRain = 20;
  private shower = 30;
  private fog = 40;
  private sunnyThunderstorm = 50;
  private thunderstorm = 60;
  private snow = 70;

  private defaultIconPaths = {
    sunny: 'assets/images/sunny.png',
    cloudy: 'assets/images/cloudy.png',
    lightRain: 'assets/images/light-rain.png',
    shower: 'assets/images/shower.png',
    sunnyThunderstorm: 'assets/images/sunny-tstorm.png',
    thunderstorm: 'assets/images/tstorm.png',
    fog: 'assets/images/fog.png',
    snow: 'assets/images/snow.png',
    unknown: 'assets/images/unknown.png',
  };

  private conditions = {
    200: {
      title: 'Thunderstorm',
      description: 'Thunderstorm with light rain',
      image: 'thunderstorm',
    },
    201: {
      title: 'Thunderstorm',
      description: 'Thunderstorm with rain',
      image: 'thunderstorm',
    },
    202: {
      title: 'Thunderstorm',
      description: 'Thunderstorm with heavy rain',
      image: 'thunderstorm',
    },
    210: {
      title: 'Thunderstorm',
      description: 'Light thunderstorm',
      image: 'thunderstorm',
    },
    211: {
      title: 'Thunderstorm',
      description: 'Thunderstorm',
      image: 'thunderstorm',
    },
    212: {
      title: 'Thunderstorm',
      description: 'Heavy thunderstorm',
      image: 'thunderstorm',
    },
    221: {
      title: 'Thunderstorm',
      description: 'Ragged thunderstorm',
      image: 'sunnyThunderstorm',
    },
    230: {
      title: 'Thunderstorm',
      description: 'Thunderstorm with light drizzle',
      image: 'sunnyThunderstorm',
    },
    231: {
      title: 'Thunderstorm',
      description: 'Thunderstorm with drizzle',
      image: 'sunnyThunderstorm',
    },
    232: {
      title: 'Thunderstorm',
      description: 'Thunderstorm with heavy drizzle',
      image: 'sunnyThunderstorm',
    },
    300: {
      title: 'Drizzle',
      description: 'Light drizzle',
      image: 'lightRain',
    },
    301: {
      title: 'Drizzle',
      description: 'Drizzle',
      image: 'lightRain',
    },
    302: {
      title: 'Drizzle',
      description: 'Heavy drizzle',
      image: 'lightRain',
    },
    310: {
      title: 'Drizzle',
      description: 'Light drizzle',
      image: 'lightRain',
    },
    311: {
      title: 'Drizzle',
      description: 'Drizzle',
      image: 'lightRain',
    },
    312: {
      title: 'Drizzle',
      description: 'Heavy drizzle',
      image: 'lightRain',
    },
    313: {
      title: 'Drizzle',
      description: 'Rain and drizzle',
      image: 'lightRain',
    },
    314: {
      title: 'Drizzle',
      description: 'Heavy drizzle',
      image: 'lightRain',
    },
    321: {
      title: 'Drizzle',
      description: 'Shower drizzle',
      image: 'shower',
    },
    500: {
      title: 'Rain',
      description: 'Light rain',
      image: 'lightRain',
    },
    501: {
      title: 'Rain',
      description: 'Rain',
      image: 'shower',
    },
    502: {
      title: 'Rain',
      description: 'Heavy rain',
      image: 'shower',
    },
    503: {
      title: 'Rain',
      description: 'Very heavy rain',
      image: 'shower',
    },
    504: {
      title: 'Shower',
      description: 'Extreme rain',
      image: 'shower',
    },
    511: {
      title: 'Freezing rain',
      description: 'Freezing rain',
      image: 'shower',
    },
    520: {
      title: 'Shower',
      description: 'Light shower',
      image: 'lightRain',
    },
    521: {
      title: 'Shower',
      description: 'Shower',
      image: 'shower',
    },
    522: {
      title: 'Shower',
      description: 'Heavy shower',
      image: 'shower',
    },
    531: {
      title: 'Shower',
      description: 'Ragged shower',
      image: 'shower',
    },
    600: {
      title: 'Snow',
      description: 'Light snow',
      image: 'snow',
    },
    601: {
      title: 'Snow',
      description: 'Snow',
      image: 'snow',
    },
    602: {
      title: 'Snow',
      description: 'Heavy snow',
      image: 'snow',
    },
    611: {
      title: 'Sleet',
      description: 'Sleet',
      image: 'snow',
    },
    612: {
      title: 'Sleet',
      description: 'Light sleet',
      image: 'snow',
    },
    613: {
      title: 'Sleet',
      description: 'Shower sleet',
      image: 'snow',
    },
    615: {
      title: 'Rain and snow',
      description: 'Light rain and snow',
      image: 'snow',
    },
    616: {
      title: 'Rain and snow',
      description: 'Mixed rain and snow',
      image: 'snow',
    },
    620: {
      title: 'Snow',
      description: 'Light snow shower',
      image: 'snow',
    },
    621: {
      title: 'Snow',
      description: 'Snow shower',
      image: 'snow',
    },
    622: {
      title: 'Snow',
      description: 'Heavy snow shower',
      image: 'snow',
    },
    701: {
      title: 'Mist',
      description: 'Mist',
      image: 'fog',
    },
    711: {
      title: 'Smoke',
      description: 'Smoke',
      image: 'fog',
    },
    721: {
      title: 'Haze',
      description: 'Haze',
      image: 'fog',
    },
    731: {
      title: 'Dust',
      description: 'Sand and dust whirls',
      image: 'fog',
    },
    741: {
      title: 'Fog',
      description: 'Fog',
      image: 'fog',
    },
    751: {
      title: 'Sand',
      description: 'Sand',
      image: 'fog',
    },
    761: {
      title: 'Dust',
      description: 'Dust',
      image: 'fog',
    },
    762: {
      title: 'Ash',
      description: 'Volcanic ash',
      image: 'fog',
    },
    771: {
      title: 'Squalls',
      description: 'Squalls',
      image: 'thunderstorm',
    },
    781: {
      title: 'Tornado',
      description: 'Tornado',
      image: 'thunderstorm',
    },
    800: {
      title: 'Clear',
      description: 'Clear sky',
      image: 'sunny',
    },
    801: {
      title: 'Clouds',
      description: 'Few clouds',
      image: 'cloudy',
    },
    802: {
      title: 'Clouds',
      description: 'Scattered clouds',
      image: 'cloudy',
    },
    803: {
      title: 'Clouds',
      description: 'Broken clouds',
      image: 'cloudy',
    },
    804: {
      title: 'Clouds',
      description: 'Overcast clouds',
      image: 'cloudy',
    },
  };

  rank(condition: number): number {
    if (condition >= 200 && condition < 230) {
      return this.thunderstorm;
    }

    if (condition >= 230 && condition < 300) {
      return this.sunnyThunderstorm;
    }

    if (condition >= 300 && condition < 400) {
      return this.lightRain;
    }

    if (condition >= 500 && condition < 600) {
      return this.shower;
    }

    if ((condition >= 600 && condition < 700) || condition === 903) {
      return this.snow;
    }

    if (condition >= 701 && condition < 772) {
      return this.fog;
    }

    if (condition === 800 || condition === 904) {
      return this.sunny;
    }

    if (condition >= 801 && condition < 810) {
      return this.cloudy;
    }

    return 0;
  }

  description(condition: number): string {
    const c = this.conditions[condition];
    return c?.description || 'Unknown';
  }

  imageUrl(condition: number, overridePaths: ConditionIconPaths): string {
    const paths = { ...this.defaultIconPaths, ...overridePaths };
    const c = this.conditions[condition];
    return paths[c?.image || 'unknown'];
  }
}
