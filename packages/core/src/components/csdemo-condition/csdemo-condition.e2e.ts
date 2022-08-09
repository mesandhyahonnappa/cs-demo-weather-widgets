import { newE2EPage } from '@stencil/core/testing';

describe('csdemo-condition', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<csdemo-condition></csdemo-condition>');
    const element = await page.find('csdemo-condition');
    const label = await page.find('csdemo-condition >>> .condition-label');
    expect(element).toHaveClass('hydrated');
    expect(label.textContent).toEqual('Unknown');
  });

  it('does not render an icon if noIcon is true', async () => {
    const page = await newE2EPage();

    await page.setContent('<csdemo-condition></csdemo-condition>');
    const element = await page.find('csdemo-condition');

    element.setProperty('noIcon', true);
    await page.waitForChanges();
    const img = await page.find('csdemo-condition >>> .condition-image');
    expect(img).toBeFalsy();
  });

  it('does not render a condition label if noLabel is true', async () => {
    const page = await newE2EPage();

    await page.setContent('<csdemo-condition></csdemo-condition>');
    const element = await page.find('csdemo-condition');

    element.setProperty('noLabel', true);
    await page.waitForChanges();
    const img = await page.find('csdemo-condition >>> .condition-label');
    expect(img).toBeFalsy();
  });

  it('renders the correct icon for the condition', async () => {
    const paths = {
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

    const page = await newE2EPage();

    await page.setContent('<csdemo-condition></csdemo-condition>');
    const element = await page.find('csdemo-condition');

    element.setProperty('iconPaths', paths);
    element.setProperty('condition', 200);
    await page.waitForChanges();
    const img = await page.find('csdemo-condition >>> img');
    expect(img.getAttribute('src')).toEqual(paths.thunderstorm);

    element.setProperty('condition', 221);
    await page.waitForChanges();
    expect(img.getAttribute('src')).toEqual(paths.sunnyThunderstorm);

    element.setProperty('condition', 800);
    await page.waitForChanges();
    expect(img.getAttribute('src')).toEqual(paths.sunny);
  });

  it('renders the correct text for the condition', async () => {
    const page = await newE2EPage();

    await page.setContent('<csdemo-condition></csdemo-condition>');
    const element = await page.find('csdemo-condition');

    element.setProperty('condition', 200);
    await page.waitForChanges();
    const label = await page.find('csdemo-condition >>> .condition-label');
    expect(label.textContent).toEqual('Thunderstorm with light rain');

    element.setProperty('condition', 202);
    await page.waitForChanges();
    expect(label.textContent).toEqual('Thunderstorm with heavy rain');

    element.setProperty('condition', 800);
    await page.waitForChanges();
    expect(label.textContent).toEqual('Clear sky');
  });
});
