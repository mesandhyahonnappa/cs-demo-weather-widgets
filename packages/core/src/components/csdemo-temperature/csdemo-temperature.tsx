import { Component, Prop, h, EventEmitter, Event } from '@stencil/core';
import { TemperatureChangeEventDetail } from './csdemo-temperature-interface';

@Component({
  tag: 'csdemo-temperature',
  styleUrl: 'csdemo-temperature.css',
  shadow: true,
})
export class csdemoTemperature {
  /**
   * The temperature specified in Kelvin.
   */
  @Prop() temperature: number;

  /**
   * The temperature is specified in Kelvin.
   * The scale specifies the units to display the temperature in, 'C' for Celsius and 'F' for Fahrenheit.
   */
  @Prop() scale: string;
  /**
   * Emitted when the value temperature value is changed.
   */
  @Event() csdemoChange!: EventEmitter<TemperatureChangeEventDetail>;

  private celsius(): string {
    return `${(this.temperature - 273.15).toFixed(0)} ℃`;
  }

  private fahrenheit(): string {
    return `${((this.temperature * 9) / 5 - 459.67).toFixed(0)} ℉`;
  }

  private stepUpTemperature = () => {
    this.temperature = this.temperature + 1;
    this.csdemoChange.emit({ value: this.temperature.toString() });
  };

  render() {
    if (this.temperature || this.temperature === 0) {
      return (
        <div>
          <span>{this.scale === 'C' ? this.celsius() : this.fahrenheit()}</span>
          <button onClick={this.stepUpTemperature}>+</button>
        </div>
      );
    }
  }
}
