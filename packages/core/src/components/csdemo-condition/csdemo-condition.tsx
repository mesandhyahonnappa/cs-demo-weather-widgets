import { Component, Prop, h } from '@stencil/core';
import { ConditionIconPaths } from '../../models/condition-icon-paths';
import { WeatherCondition } from '../../services/weather-condition/weather-condition';

@Component({
  tag: 'csdemo-condition',
  styleUrl: 'csdemo-condition.css',
  shadow: true,
})
export class csdemoCondition {
  /**
   * Specify that the icon / image for the condition should not be displayed
   */
  @Prop() noIcon: boolean;

  /**
   * Specify that the label for the condition should not be displayed
   */
  @Prop() noLabel: boolean;

  /**
   * The overall weather condition as defined by the OpenWeatherMap API.
   * https://openweathermap.org/weather-conditions
   */
  @Prop() condition: number;

  /**
   * Override the default icon paths. If the default icon names that we have are used
   * and put in `assets/images`.
   */
  @Prop() iconPaths: ConditionIconPaths;

  private weatherCondition: WeatherCondition;

  constructor() {
    this.weatherCondition = new WeatherCondition();
  }

  render() {
    const url = !this.noIcon && this.weatherCondition.imageUrl(this.condition, this.iconPaths);
    const label = !this.noLabel && this.weatherCondition.description(this.condition);
    return (
      <div class="condition-container">
        {url && (
          <div class="condition-image">
            <img alt={label} src={url} />
          </div>
        )}
        {label && <div class="condition-label">{label}</div>}
      </div>
    );
  }
}
