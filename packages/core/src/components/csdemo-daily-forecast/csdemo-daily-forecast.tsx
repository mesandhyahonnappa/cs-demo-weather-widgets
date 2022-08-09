import { Component, h, Prop } from '@stencil/core';
import { format } from 'date-fns';
import { ConditionIconPaths } from '../../models/condition-icon-paths';
import { Forecast } from '../../models/forecast';
import { WeatherCondition } from '../../services/weather-condition/weather-condition';

@Component({
  tag: 'csdemo-daily-forecast',
  styleUrl: 'csdemo-daily-forecast.css',
  shadow: true,
})
export class csdemoDailyForecast {
  /**
   * The forecast to display information about.
   */
  @Prop() forecast: Forecast;

  /**
   * The temperature in the forecast is specified in Kelvin.
   * The scale specifies the units to display the temperature in, 'C' for Celsius and 'F' for Fahrenheit.
   */
  @Prop() scale: string;

  /**
   * Override the default icon paths. If the default icon names that we have are used
   * and put in `assets/images`.
   */
  @Prop() iconPaths: ConditionIconPaths;

  private weatherCondition: WeatherCondition;

  constructor() {
    this.weatherCondition = new WeatherCondition();
  }

  private dateString(): string {
    return this.forecast && format(new Date(this.forecast.date), 'E MMM d, yyyy');
  }

  render() {
    const label = this.forecast && this.weatherCondition.description(this.forecast.condition);
    const iconUrl = this.forecast && this.weatherCondition.imageUrl(this.forecast.condition, this.iconPaths);
    return (
      <div class="container">
        {iconUrl && (
          <div class="icon">
            <img alt={label} src={iconUrl} />
          </div>
        )}
        <div class="description">
          <div class="date">{this.dateString()}</div>
          <csdemo-condition condition={this.forecast?.condition} noIcon={true} />
          <div class="temperature-group">
            <div class="temperature-item temperature-low">
              <span class="label">Low: </span>
              <csdemo-temperature temperature={this.forecast?.low} scale={this.scale} />
            </div>
            <div class="temperature-item temperature-high">
              <span class="label">High: </span>
              <csdemo-temperature temperature={this.forecast?.high} scale={this.scale} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
