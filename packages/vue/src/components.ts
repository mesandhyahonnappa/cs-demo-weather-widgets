/* eslint-disable */
/* tslint:disable */
/* auto-generated vue proxies */
import { defineContainer } from './vue-component-lib/utils';

import type { JSX } from '@ionic-enterprise/cs-demo-weather-widgets/components';

import { defineCustomElement as defineCsdemoCondition } from '@ionic-enterprise/cs-demo-weather-widgets/components/csdemo-condition.js';
import { defineCustomElement as defineCsdemoDailyForecast } from '@ionic-enterprise/cs-demo-weather-widgets/components/csdemo-daily-forecast.js';
import { defineCustomElement as defineCsdemoTemperature } from '@ionic-enterprise/cs-demo-weather-widgets/components/csdemo-temperature.js';
import { defineCustomElement as defineCsdemoUvIndex } from '@ionic-enterprise/cs-demo-weather-widgets/components/csdemo-uv-index.js';


export const CsdemoCondition = /*@__PURE__*/ defineContainer<JSX.CsdemoCondition>('csdemo-condition', defineCsdemoCondition, [
  'noIcon',
  'noLabel',
  'condition',
  'iconPaths'
]);


export const CsdemoDailyForecast = /*@__PURE__*/ defineContainer<JSX.CsdemoDailyForecast>('csdemo-daily-forecast', defineCsdemoDailyForecast, [
  'forecast',
  'scale',
  'iconPaths'
]);


export const CsdemoTemperature = /*@__PURE__*/ defineContainer<JSX.CsdemoTemperature>('csdemo-temperature', defineCsdemoTemperature, [
  'temperature',
  'scale',
  'csdemoChange'
]);


export const CsdemoUvIndex = /*@__PURE__*/ defineContainer<JSX.CsdemoUvIndex>('csdemo-uv-index', defineCsdemoUvIndex, [
  'uvIndex'
]);

