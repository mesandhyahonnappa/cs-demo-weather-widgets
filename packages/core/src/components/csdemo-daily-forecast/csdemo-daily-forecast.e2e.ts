import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import { Forecast } from '../../models/forecast';

describe('csdemo-daily-forecast', () => {
  describe('without data', () => {
    it('renders', async () => {
      const page = await newE2EPage();

      await page.setContent('<csdemo-daily-forecast></csdemo-daily-forecast>');
      const conditionElement = await page.find('csdemo-daily-forecast >>> csdemo-condition');
      const label = conditionElement.shadowRoot.querySelector('.condition-label');
      const temperatureElements = await page.findAll('csdemo-daily-forecast >>> csdemo-temperature');
      expect(conditionElement).toHaveClass('hydrated');
      expect(temperatureElements.length).toEqual(2);
      expect(temperatureElements[0]).toHaveClass('hydrated');
      expect(temperatureElements[1]).toHaveClass('hydrated');
      expect(label.textContent).toEqual('Unknown');
    });
  });

  describe('with data', () => {
    let paths;
    let forecast: Forecast;
    let element: E2EElement;
    let page: E2EPage;

    beforeEach(async () => {
      paths = {
        sunny: './assets/images/sunny.png',
        cloudy: './assets/images/cloudy.png',
        lightRain: './assets/images/light-rain.png',
        shower: './assets/images/shower.png',
        sunnyThunderstorm: './assets/images/sunny-tstorm.png',
        thunderstorm: './assets/images/tstorm.png',
        fog: './assets/images/fog.png',
        snow: './assets/images/snow.png',
        unknown: './assets/images/unknown.png',
      };

      forecast = {
        date: new Date(2018, 5, 17, 19, 0, 0),
        condition: 600,
        low: 270.15,
        high: 297.15,
      };
      page = await newE2EPage();
      await page.setContent('<csdemo-daily-forecast></csdemo-daily-forecast>');
      element = await page.find('csdemo-daily-forecast');
      element.setProperty('iconPaths', paths);
      element.setProperty('forecast', forecast);
      element.setProperty('scale', 'C');
      await page.waitForChanges();
    });

    it('displays the date', async () => {
      const dateElement = await page.find('csdemo-daily-forecast >>> .date');
      expect(dateElement.textContent).toEqual('Sun Jun 17, 2018');
    });

    it('displays the icon for the condition', async () => {
      const imgElement = await page.find('csdemo-daily-forecast >>> img');
      expect(imgElement.getAttribute('src')).toEqual('./assets/images/snow.png');
    });

    it('displays the label for the condition', async () => {
      const condition = await page.find('csdemo-daily-forecast >>> csdemo-condition');
      const label = condition.shadowRoot.querySelector('.condition-label');
      expect(label.textContent).toEqual('Light snow');
    });

    it('displays the low temperature', async () => {
      const temperatureElements = await page.findAll('csdemo-daily-forecast >>> csdemo-temperature');
      const temp = temperatureElements[0].shadowRoot.querySelector('span');
      expect(temp.textContent).toEqual('-3 ℃');
    });

    it('displays the high temperature', async () => {
      const temperatureElements = await page.findAll('csdemo-daily-forecast >>> csdemo-temperature');
      const temp = temperatureElements[1].shadowRoot.querySelector('span');
      expect(temp.textContent).toEqual('24 ℃');
    });
  });
});
